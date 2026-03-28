export default function StatsBar() {
  return (
    <section className="px-6 py-16 md:px-16 bg-gradient-to-b from-green-600 via-green-700 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-around items-center text-center space-y-4 sm:space-y-0 text-8xl font-medium">
       <div>
          <p className="text-4xl font-extrabold">15,000+</p>
          <p className="text-lg font-semibold">Borrowers Funded</p>
        </div>

        <div>
          <p className="text-4xl font-extrabold">$2.5M+</p>
          <p className="text-lg font-semibold">Donated to Charities</p>
        </div>

        <div>
          <p className="text-4xl font-extrabold">50,000+</p>
          <p className="text-lg font-semibold">Meals Funded via Charity</p>
        </div>

        <div>
          <p className="text-4xl font-extrabold">98%</p>
          <p className="text-lg font-semibold">Client Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
}