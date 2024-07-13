import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/users.schema';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { CoursesService } from './courses/courses.service';
import { CoursesController } from './courses/courses.controller';
import { UsersModule } from './users/users.module';
import { Course, CourseSchema } from './courses/courses.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {name: Course.name, schema: CourseSchema}]),
    AuthModule,
    CoursesModule,
    UsersModule
  ],
  controllers: [AppController, UsersController, CoursesController],
  providers: [AppService, UsersService, CoursesService],
})
export class AppModule {}
