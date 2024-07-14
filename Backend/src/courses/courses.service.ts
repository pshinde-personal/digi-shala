import { Injectable } from '@nestjs/common';
import { Course } from './courses.schema';
import { Model } from 'mongoose';
import { CreateCourseDTO, SearchCoursesDto, UpdateCourseDTO } from './courses.contants';

@Injectable()
export class CoursesService {
    constructor(private readonly coursesModel: Model<Course>) {}

    async create(course: CreateCourseDTO): Promise<Course> {
        const createdCourse = new this.coursesModel(course);
        return createdCourse.save();
    }

    async findAll(searchCourse: SearchCoursesDto): Promise<Course[]> {
        const query: any = {}
        if (searchCourse.ids) {
            query._id = { $in: searchCourse.ids}
        }
        if (searchCourse.tags) {
            query.tags = { $in: searchCourse.tags}
        }
        if (searchCourse.categories) {
            query.category= { $in: searchCourse.categories}
        }
        if (searchCourse.title) {
            query.title= { $regex: searchCourse.title, $options: 'i'}
        }
        //  if nothing provided find will get all records
        return this.coursesModel.find(query).exec();
    }

    async findById(id: string): Promise<Course> {
        return this.coursesModel.findById(id).exec();
    }

    async findAndUpdate(id: string, course: UpdateCourseDTO): Promise<Course> {
        return this.coursesModel.findByIdAndUpdate(id, course, { new: true }).exec();
    }

    async findAndDelete(id: string): Promise<string> {
        return this.coursesModel.findByIdAndDelete(id)
    }
}
