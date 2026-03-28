export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Submit Online",
      description: "Complete our secure digital form in about 10 minutes. No printing, scanning, or faxing required.",
    },
    {
      number: "02",
      title: "Speak to a Specialist",
      description: "A dedicated loan specialist contacts you to review your situation and confirm the right loan amount.",
    },
    {
      number: "03",
      title: "Review Your Offer",
      description: "Read through your personalized loan terms. E-sign when ready. No pressure, no countdown timers.",
    },
    {
      number: "04",
      title: "Receive Your Funds",
      description: "Money hits your bank account via ACH transfer, typically within one business day of signing.",
    },
  ];

  return (
    <section className="px-6 py-16 md:px-16 md:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6 bg-yellow-400/90 text-black shadow-sm mx-auto">
          Simple Process
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Four Steps to Funding
        </h3>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          We have cut unnecessary steps so you spend less time on paperwork and more time on what matters.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center gap-4 p-6 rounded-lg bg-white shadow-md transition transform hover:-translate-y-1 hover:shadow-lg duration-300 cursor-pointer text-center max-w-sm"
            >
              {/* Step Number */}
              <div className="text-3xl font-bold text-green-600">{step.number}</div>
              
              {/* Step Title */}
              <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
              
              {/* Step Description */}
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}