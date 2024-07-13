import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './auth.constants';
import { User } from 'src/users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
// import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModal: Model<User>) {}

    async registerUser(regUser: RegisterUserDTO):Promise<User> {

        //  hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(regUser.password, salt);
        delete regUser.password

        //  update user object
        Object.assign(regUser, {isVerified: false, passwordHash: hashedPassword})

        const user =  new this.userModal(regUser)
        return await user.save()
    }

}
