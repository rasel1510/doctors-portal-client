import React from 'react';
import quote from '../../assets/icons/quote.svg';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const Textimonials = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      location: "California",
      review: "Booking an appointment was effortless. The doctor was extremely attentive and thorough. Best healthcare experience I've had in years!",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      _id: 2,
      name: "Sophia Martinez",
      location: "Texas",
      review: "The portal dashboard made managing my family's dental visits super simple. Clean interface, clear reminders, and zero wait time.",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      rating: 5
    },
    {
      _id: 3,
      name: "David Chen",
      location: "New York",
      review: "Top-notch medical professionals and painless teeth whitening. I recommended DoctorsPortal to all my colleagues immediately.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Patient Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Patients Say
          </h2>
        </div>
        <img src={quote} alt="Quote" className="h-16 w-16 sm:h-20 sm:w-20 opacity-30 shrink-0" />
      </div>

      {/* Reviews Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((item) => (
          <Card key={item._id} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-4">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{item.review}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <Avatar className="h-10 w-10 border border-sky-200">
                  <AvatarImage src={item.img} alt={item.name} />
                  <AvatarFallback className="bg-sky-500 text-white font-bold">
                    {item.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Textimonials;