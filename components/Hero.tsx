import { 
  BoltIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  StarIcon, 
  ShieldCheckIcon, 
  BanknotesIcon, 
  CheckBadgeIcon, 
  IdentificationIcon, 
  GlobeAmericasIcon, 
  CalendarIcon 
} from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Hero Section */}
      <div className="relative px-6 py-10 md:px-16 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white">

        {/* Decorative circles */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-green-200 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>

        {/* Container */}
        <div className="relative max-w-5xl mx-auto text-center">

          {/* Badge */}
          <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6 bg-yellow-400/90 text-black shadow-sm mx-auto">
            <BoltIcon className="w-4 h-4" />
            Funds Delivered as Fast as 24hrs
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900 max-w-3xl mx-auto">
            Personal Loans That Work for
            <span className="text-amber-400"> Real People</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Borrow up to <span className="font-semibold text-gray-900">$80,000</span> at zero interest.
            We evaluate your current income, not your credit history — giving everyone a fair shot at the funds they need.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            <button className="px-8 py-3.5 bg-green-800 text-white rounded-full hover:bg-green-900 transition font-medium shadow-lg">
              Apply in 10 Minutes
            </button>
            <button className="px-8 py-3.5 border border-gray-300 text-gray-800 rounded-full hover:bg-gray-100 transition font-medium shadow-sm">
              See the Process
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-14 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <BoltIcon className="w-6 h-6 text-green-600" />
              <p className="text-3xl font-bold text-gray-900">0%</p>
              <p className="text-sm text-gray-500">Interest Rate</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
              <p className="text-3xl font-bold text-gray-900">$80K</p>
              <p className="text-sm text-gray-500">Max Loan</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-green-600" />
              <p className="text-3xl font-bold text-gray-900">15K+</p>
              <p className="text-sm text-gray-500">Clients Served</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <StarIcon className="w-6 h-6 text-yellow-400" />
              <p className="text-3xl font-bold text-gray-900">4.8/5</p>
              <p className="text-sm text-gray-500">Client Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust / Credibility Section */}
      <div className="px-6 py-16 md:px-16 bg-gradient-to-b from-green-600 via-green-700 to-green-800 text-white">
        <div className="max-w-5xl mx-auto text-center">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-5 h-5 text-white" />
              <span>256-Bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <BanknotesIcon className="w-5 h-5 text-white" />
              <span>FDIC Insured Institution</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckBadgeIcon className="w-5 h-5 text-white" />
              <span>BBB A+ Accredited</span>
            </div>
            <div className="flex items-center gap-3">
              <IdentificationIcon className="w-5 h-5 text-white" />
              <span>NMLS Licensed #123456</span>
            </div>
            <div className="flex items-center gap-3">
              <GlobeAmericasIcon className="w-5 h-5 text-white" />
              <span>Serving All 50 States</span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-5 h-5 text-white" />
              <span>Established 2019</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}