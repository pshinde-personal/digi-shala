
export enum CourseStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived',
}

export interface Review {
    userId: string; // The ID of the user who wrote the review
    rating: number; // The numerical rating (e.g., 1-5 stars)
    comment: string; // The user's written feedback
    createdAt: Date; // When the review was submitted
}