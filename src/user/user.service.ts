import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneById(userId: string): Promise<User | undefined> {
    return this.userModel.findById(userId).exec();
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userModel
      .findOne({ username })
      .select('+password')
      .exec();
  }

  async update(userId: string, updateData: any): Promise<User> {
    console.log(updateData);
    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    return this.userModel
      .findByIdAndUpdate(userId, updateData, { new: true })
      .exec();
  }
}
