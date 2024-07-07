import { IsOptional, IsString, IsEmail, MinLength, MaxLength, IsEnum, IsNotEmpty } from 'class-validator';

export enum UserRole {
    GUEST = 'guest',
    STUDENT = 'student',
    INSTRUCTOR = 'instructor',
}

//  create user payload
export class CreateUserDto {
    @IsNotEmpty({message: "name is required"})
    @IsString()
    @MinLength(4, {message: "name should be atleast 4 chars"})
    @MaxLength(60, {message: "name should be less than 60 chars"})
    readonly name: string;
    
    @IsNotEmpty({message: "username is required"})
    @IsString()
    @MinLength(2, {message: "username should be atleast 2 chars"})
    @MaxLength(50, {message: "username should be less than 50 chars"})
    readonly username: string;

    @IsNotEmpty({message: "password is required"})
    @IsString()
    @MinLength(8, {message: "At least 8 chars required for password"})
    password: string;
}

//  get user payload
export class GetUserParam {
    @IsOptional()
    @IsString()
    readonly username: string;
}