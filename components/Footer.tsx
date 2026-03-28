export default function Footer() {
  return (
    <footer className=" text-white px-6 py-14 md:px-16 bg-gradient-to-r from-green-600 via-green-700 to-green-800 shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* Icon: lightning bolt for speed */}
            <div className="bg-amber-400 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 text-green-800"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            {/* Brand Name */}
            <span className="text-xl font-bold text-white select-none">
              FastCash
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Licensed personal loan provider serving customers across all 50 states since 2019.
          </p>

          <div className="mt-4 space-y-1 text-sm">
            <p>FDIC Compliant</p>
            <p>BBB A+ Rated</p>
            <p>NMLS #195624</p>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#advantages" className="hover:text-white">Why Choose Us</a></li>
            <li><a href="#process" className="hover:text-white">How It Works</a></li>
            <li><a href="#mission" className="hover:text-white">Our Mission</a></li>
            <li><a href="#faq" className="hover:text-white">FAQs</a></li>
            <li><a href="#apply" className="hover:text-white">Apply Now</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Responsible Lending</a></li>
            <li><a href="#" className="hover:text-white">NMLS Registry</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>hello@FastCashLoan.live</li>
            <li>1-888-555-0100</li>
            <li>Live Chat Support</li>
            <li>Nationwide Coverage</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-white text-center space-y-3">

        <p>
          © 2019–{new Date().getFullYear()} FastCash. FastCash Financial Corp. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Accessibility</a>
        </div>

        {/* Disclaimer */}
        <p className="max-w-3xl mx-auto text-xs leading-relaxed">
          APR ranges from 5.99% to 24.99%. Loan amounts from $1,000 to $80,000.
          Repayment terms 12–60 months. All loans subject to credit approval.
          FastCash Financial Corp, NMLS #195624.
        </p>

      </div>
    </footer>
  );
}