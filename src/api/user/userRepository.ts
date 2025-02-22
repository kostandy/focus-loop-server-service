import { type UserDocument, UserModel } from "@/api/user/userModel.js";

export class UserRepository {
  async findAllAsync(): Promise<UserDocument[]> {
    return UserModel.find().exec();
  }

  async findByIdAsync(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  async findByWalletAsync(walletAddress: string): Promise<UserDocument | null> {
    return UserModel.findOne({ wallet: walletAddress }).exec();
  }
}
