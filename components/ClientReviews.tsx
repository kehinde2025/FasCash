import { StarIcon } from "@heroicons/react/24/solid";

export default function ClientReviews() {
  const reviews = [
    {
      quote: "My local bank rejected me twice. FastCash approved my $8,000 application within hours. The money was in my account the following morning.",
      initials: "SM",
      name: "Sarah M.",
      location: "Phoenix, AZ",
    },
    {
      quote: "After a medical emergency wrecked my credit score, FashCash assessed my current income, approved my request, and charged zero interest.",
      initials: "JT",
      name: "James T.",
      location: "Atlanta, GA",
    },
    {
      quote: "What set FastCash apart was transparency. My specialist walked me through every line of the agreement. No jargon, no surprises.",
      initials: "MR",
      name: "Maria R.",
      location: "Los Angeles, CA",
    },
    {
      quote: "From submitting the form to receiving funds took under 48 hours total. The team was responsive and professional.",
      initials: "DK",
      name: "David K.",
      location: "Chicago, IL",
    },
    {
      quote: "I didn’t think I’d qualify, but the process was smooth and stress-free. Highly recommend.",
      initials: "AL",
      name: "Amanda L.",
      location: "Dallas, TX",
    },
    {
      quote: "Fast approval and zero interest? I was skeptical at first, but they delivered exactly as promised.",
      initials: "RW",
      name: "Robert W.",
      location: "Miami, FL",
    },
  ];

  return (
    <section className="px-6 py-16 md:px-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header */}
        <h2 className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded-full mb-4 bg-yellow-400/90 text-black shadow-sm">
          Client Reviews
        </h2>

        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          What Our Borrowers Say
        </h3>

        <p className="text-lg text-gray-600 mb-10">
          Over 2,300 verified reviews from real customers across the United States.
        </p>

        {/* Rating */}
        <div className="text-2xl font-bold text-green-600 mb-12">
          4.8 out of 5.0 from 2,300+ verified clients
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-4 text-base">
                "{review.quote}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  {review.initials}
                </div>

                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {review.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}