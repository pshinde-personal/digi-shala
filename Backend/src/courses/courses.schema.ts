import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CourseStatus, Review } from "./courses.contants";
import { Types, Document } from "mongoose";

@Schema()
export class Course extends Document {
    @Prop({maxlength: 255})
    title: string // The name of the course.

    @Prop({maxlength: 2000})
    description: string // A detailed overview of the course content and objectives.

    @Prop()
    price: number // The cost of the course.

    @Prop({default: Date.now})
    createdAt: Date // The date and time when the course was created.

    @Prop({default: Date.now})
    updatedAt: Date // The date and time when the course was last modified.

    @Prop({type: Types.ObjectId, ref: 'User', index: true})
    instructorId: Types.ObjectId // The ID of the instructor who created the course.

    @Prop({index: true})
    category: string // The subject or area of study the course belongs to (e.g., "Web Development", "Data Science").

    @Prop()
    duration: number // The length of the course in hours, weeks, or months.

    @Prop()
    level: string // The difficulty level of the course (e.g., "Beginner", "Intermediate", "Advanced").

    @Prop()
    thumbnailUrl: string // The URL of the course's thumbnail image.

    @Prop()
    contentUrl: string // The URL where the course content is hosted.

    @Prop()
    rating: number // The average rating of the course based on user reviews.

    @Prop()
    language: string // The language in which the course is taught.

    @Prop()
    enrollmentCount: number // The number of students currently enrolled in the course.

    @Prop()
    requirements: string // A list of prerequisites or skills needed to take the course.

    @Prop()
    outcomes: string // A description of what students will learn or be able to do after completing the course.

    @Prop()
    syllabus: string // A detailed outline of the course curriculum, including topics covered and learning activities.

    @Prop({index: true})
    tags: string[] // Keywords or tags related to the course content.

    @Prop({enum: CourseStatus, default: CourseStatus.DRAFT})
    status: CourseStatus // The current status of the course (e.g., "Draft", "Published", "Archived").

    @Prop()
    reviews: Review[] // An array of user reviews for the course.

    @Prop()
    certification: boolean // Whether the course offers a certificate upon completion.

    @Prop()
    featured: boolean // Whether the course is highlighted as a featured course.

    @Prop()
    discount: number // The percentage discount applied to the course price.

    @Prop()
    startDate: Date // The start date of the course.

    @Prop()
    endDate: Date // The end date of the course.
}

export const CourseSchema = SchemaFactory.createForClass(Course)
