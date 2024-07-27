import mongoose, { Schema, Document } from "mongoose";

//ek data type banaya hai hamne :: TypeScript
export interface Message extends Document {
  content: string;
  createdAt: Date;
}

//ye ek schema banaya hai hamne
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//matlab mote taur pe user schema ka data type aise hi dikhega :: type script
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  isVerified: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "please use a valid email",
    ],
  },
  password: {
    required: [true, "Password is required"],
    type: String,
  },
  verifyCode: {
    required: [true, "VerifyCode is required"],
    type: String,
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "VerifyCodeExpiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: false,
  },
  messages: [MessageSchema],
});

//TODO: next js edge case pe run karta hai ? jaise jaise demant create hoti hai waise waise connection banta rehta hai

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
