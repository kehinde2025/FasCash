"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this really zero interest?",
      answer:
        "Completely real. Through our Giving Back Initiative, you borrow an amount and pay back exactly that amount. We fund the charitable match separately from our own resources.",
    },
    {
      question: "Do I need a high credit score?",
      answer:
        "We do not have a hard minimum. Borrowers with scores from 550 upward have successfully received funding. We base decisions primarily on current employment and verifiable income.",
    },
    {
      question: "How fast can I receive funds?",
      answer:
        "Same-day approval is common for applications before 2 PM Eastern. Once you e-sign, funds are dispatched via ACH and typically clear your account by the next business day.",
    },
    {
      question: "Is FashCash legitimate?",
      answer:
        "Yes. FashCash has been operating since 2019, is registered with NMLS (#123456), holds BBB A+ accreditation, and is FDIC compliant. We never request upfront payments or gift cards.",
    },
    {
      question: "What can I use the loan for?",
      answer:
        "Personal loans carry no usage restrictions. Common purposes include consolidating debt, covering medical costs, home repairs, vehicle expenses, or managing emergencies.",
    },
    {
      question: "What documents do I need?",
      answer:
        "A government-issued photo ID, recent proof of income, and an active checking account. The full application takes approximately 10 minutes.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-16 md:px-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-full mb-4 bg-yellow-400/90 text-black shadow-sm">
            FAQs
          </h2>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Common Questions
          </h3>

          <p className="text-gray-600 text-lg">
            Straight answers to the questions we receive most often.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg bg-white overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>

                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                  openIndex === index ? "max-h-40 pb-5" : "max-h-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}