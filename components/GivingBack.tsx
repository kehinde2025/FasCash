export default function GivingBack() {
  const steps = [
    {
      number: "01",
      title: "You get approved",
      description: "You get approved and receive your requested loan amount in full.",
    },
    {
      number: "02",
      title: "We match your loan",
      description: "SwiftLoan separately funds twice the loan amount from our resources.",
    },
    {
      number: "03",
      title: "Half goes to charity",
      description: "Half goes to you. The other half is donated to our verified charity network.",
    },
    {
      number: "04",
      title: "No extra cost",
      description: "Zero additional cost to you. You repay only your original loan amount.",
    },
  ];

  const charities = [
    "Feeding America (EIN: 36-3673599)",
    "National Coalition for the Homeless",
    "Verified via CharityNavigator.org",
    "Financial professional",
  ];

  return (
    <section className="relative w-full py-16 bg-gradient-to-r from-green-100 via-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-start gap-12">
        
        {/* Left: Steps & Text */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-4 bg-yellow-400/90 text-black shadow-sm mx-auto lg:mx-0">
            Lending with Purpose
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            The Giving Back Initiative
          </h3>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            At SwiftLoan, approving your loan is only half the story. We commit an equal amount from our own resources to supporting families in crisis.
          </p>

          {/* Steps Timeline */}
          <div className="flex flex-col gap-6 relative">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-600 text-white font-bold text-lg">
                    {step.number}
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className="w-1 h-full bg-green-300 mt-1"></div>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charity List */}
          <div className="mt-10">
            <h4 className="text-xl font-bold text-gray-900 mb-3">Verified Charities</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              {charities.map((charity, index) => (
                <li key={index}>• {charity}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Donation Image */}
        <div className="lg:w-1/2 w-full h-80 md:h-[400px] rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://picsum.photos/id/1059/800/600" // fully public placeholder
            alt="Donation"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}