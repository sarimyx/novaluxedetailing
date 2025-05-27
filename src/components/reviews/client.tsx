"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Identity } from "@/constants/identity";
import { getReviews } from "@/utils/server/get-reviews";
import { Review } from "@/types/reviews";

export default function ReviewsClient() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data.reviews);
      } catch (err) {
        setError("Failed to load reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-secondary/30 p-6 rounded-lg h-40"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews
        ?.filter((r) => r.starRating === 5)
        ?.map((review) => (
          <div
            key={review.reviewId}
            className="text-left bg-secondary/50 text-white p-6 rounded-xl transition-colors shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={review.reviewer.profilePhotoUrl}
                    alt={review.reviewer.displayName}
                  />
                  <AvatarFallback>
                    {review.reviewer.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold leading-tight text-sm">
                    {review.reviewer.displayName}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    {Array.from({ length: review.starRating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(review.createTime), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/90">
                {review.comment}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <a
                href={Identity.googleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <svg viewBox="0 0 48 48" className="h-5 w-5">
                  <clipPath id="g">
                    <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                  </clipPath>
                  <g className="colors" clipPath="url(#g)">
                    <path fill="#FBBC05" d="M0 37V11l17 13z" />
                    <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                    <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                    <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}
