import { 
  BoltIcon,             
  CurrencyDollarIcon, 
  ClockIcon, 
  UserCircleIcon 
} from "@heroicons/react/24/outline";

export default function Advantages() {
  return (
    <section className="px-6 py-16 md:px-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="inline-flex items-center justify-center gap-2 text-2xl font-semibold px-4 py-2 rounded-full mb-6 bg-yellow-400/90 text-black shadow-sm mx-auto">
          Our Advantages
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Built to Remove Financial Barriers<br/>
          Traditional lenders turn away millions of qualified borrowers every year over technicalities. We built FastCash to fix that — permanently.
        </p>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">

          {/* Card Component */}
          {[
            {
              icon: <CurrencyDollarIcon className="w-6 h-6 text-green-600" />,
              title: "Zero Interest Rate",
              text: "You borrow $5,000, you pay back $5,000. No interest, no origination fees, no prepayment penalties."
            },
            {
              icon: <UserCircleIcon className="w-6 h-6 text-green-600" />,
              title: "No Minimum Credit Score",
              text: "Scores below 580 are welcome. We look at your employment and income, not just a three-digit number."
            },
            {
              icon: <ClockIcon className="w-6 h-6 text-green-600" />,
              title: "Same-Day Decisions",
              text: "Submit your application before 2 PM Eastern and receive a lending decision the same business day."
            },
            {
              icon: <BoltIcon className="w-6 h-6 text-green-600" />,
              title: "Human-Reviewed Applications",
              text: "Every application is personally reviewed by a loan specialist who understands real-life circumstances."
            }
          ].map((adv, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-6 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg duration-300 group cursor-pointer bg-white hover:bg-gradient-to-r hover:from-green-600 hover:via-green-700 hover:to-green-800"
            >
              <div className="mt-1 text-white group-hover:text-white">{adv.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white">{adv.title}</h3>
                <p className="text-gray-600 mt-1 group-hover:text-gray-100">{adv.text}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}