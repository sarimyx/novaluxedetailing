export interface Reviewer {
  profilePhotoUrl: string;
  displayName: string;
}

export interface Review {
  reviewId: string;
  reviewer: Reviewer;
  starRating: number;
  comment: string;
  createTime: string;
  updateTime: string;
}

export interface ReviewsResponse {
  success: boolean;
  widget: string;
  reviews: Review[];
  totalReviewCount: number;
  averageRating: number;
}
