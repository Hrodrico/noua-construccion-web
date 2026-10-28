import type { Review } from "@/types/content";
import { Rating } from "@/components/ui/Rating";

type Props = {
  review: Review;
};

export function ReviewCard({ review }: Props) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
      <Rating value={review.rating} />
      <blockquote className="mt-4 flex-1 text-base">“{review.text}”</blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-semibold">{review.author}</span>
        {review.role && <span className="text-muted"> · {review.role}</span>}
      </figcaption>
    </figure>
  );
}
