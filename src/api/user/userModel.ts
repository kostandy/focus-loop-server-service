import mongoose, { Schema, type Document } from "mongoose";

export type User = {
  wallet: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocument = User & Document;

export const UserSchema = new Schema<User>({
  wallet: { type: String, required: true },
  createdAt: { type: Date, default: new Date(), required: true },
  updatedAt: { type: Date, default: new Date(), required: true },
});

export const UserModel = mongoose.model<User>("User", UserSchema);
