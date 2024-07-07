import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from './users.schema';
import { CreateUserDto } from './users.constants';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      //  hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      delete createUserDto.password

      //  update user object
      Object.assign(createUserDto, {isVerified: false, passwordHash: hashedPassword})
      const createdUser = new this.userModel(createUserDto);
      
      //  save user
      return await createdUser.save();
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestException(`Validation failed: ${error.message}`)
      }
      throw new ConflictException(`Internal server error`)
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with Email: ${email} not found`);
    }
    return user
  }

  async setResetToken(email: string): Promise<void> {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await this.userModel.updateOne(
      { email },
      { resetPasswordToken: resetToken, resetPasswordExpires: resetTokenExpiry }
    ).exec();
  }

  async validateResetToken(email: string, token: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email, resetToken: token }).exec();
    if (!user) return false;

    const tokenExpired = user.resetPasswordToken && user.resetPasswordExpires < new Date();
    return !tokenExpired;
  }
}
