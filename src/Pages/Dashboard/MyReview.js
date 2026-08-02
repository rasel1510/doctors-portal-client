import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Star, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const MyReview = () => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      toast.error('Please enter your feedback description.');
      return;
    }
    toast.success('Thank you! Your review has been submitted.');
    setReviewText('');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Patient Review</h2>
        <p className="text-xs text-slate-500">Share your consultation and treatment feedback with us</p>
      </div>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900">Write A Review</CardTitle>
          <CardDescription className="text-xs text-slate-500">Your feedback helps us improve our medical services.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating Stars */}
            <div className="space-y-1.5">
              <Label>Rating Score</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-700 ml-2">{rating} / 5 Stars</span>
              </div>
            </div>

            {/* Review Description */}
            <div className="space-y-1.5">
              <Label htmlFor="review">Your Feedback & Experience</Label>
              <textarea
                id="review"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your experience with your doctor and clinic staff..."
                className="flex w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyReview;