import { Schema, models, Types, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "invited",
  },
  last_login: {
    type: Date,
  },
  created_At: {
    type: Date,
    default: new Date(),
  },
  updated_At: {
    type: Date,
    default: new Date(),
  },
});

export type UserType = {
  name: string;
  email: string;
  role: string;
  status?: string;
  last_login?: Date;
  created_At?: Date;
  updated_At?: Date;
  _id?: Types.ObjectId;
};

export const User = models.User || model("User", UserSchema);
