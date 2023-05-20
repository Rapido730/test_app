import { connectMongoose } from "../../../../database/connect_mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserType } from "../../../../database/models/user.model";
export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    connectMongoose();
    const Users = await User.find();

    res.status(200).json({
      users: Users,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
