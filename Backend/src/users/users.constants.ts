import { IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
}

export class GetUserParam {
    @IsOptional()
    @IsString()
    @IsEmail()
    readonly email: string;
}

export enum UserRole {
    GUEST = 'guest',
    STUDENT = 'student',
    INSTRUCTOR = 'instructor',
}