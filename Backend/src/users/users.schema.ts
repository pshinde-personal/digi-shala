import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './users.constants';

@Schema()
export class User extends Document {
  @Prop({ required: true, maxlength: 60 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 50, index: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true, select: false })
  passwordHash: string;
  
  @Prop({ length: 10, unique: true, index: true })
  phoneNumber: string;

  @Prop({ required: true, index: true })
  isVerified: boolean;

  @Prop({ enum: UserRole, default: UserRole.GUEST })
  role: string; 

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
  
  @Prop()
  lastLogin: Date;
  
  @Prop()
  authProvider: string;
  
  @Prop()
  profilePicture: string;
  
  @Prop()
  twoFactorEnabled: boolean;
  
  @Prop()
  twoFactorSecret: string;
  
  @Prop({index: true})
  resetPasswordToken: string;
  
  @Prop()
  resetPasswordExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
