import { connectMongoose } from "../../../../database/connect_mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserType } from "../../../../database/models/user.model";
export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;
    console.log({ data });
    connectMongoose();
    const old_User = await User.findOne({
      email: data.email,
    });
    console.log("hello");
    if (!old_User) {
      const new_User = new User({
        name: data.name,
        email: data.email,
        role: data.role,
        status: "Invited",
        last_login: new Date(),
      });
      await new_User.save();
      res.status(201).json({
        user: new_User,
      });
      return;
    }
    res.status(409).json({
      user: old_User,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
