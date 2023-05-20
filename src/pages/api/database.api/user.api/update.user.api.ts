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
      res.status(404).json({
        user: null,
      });
      return;
    }

    const fields = ["name", "role"];

    fields.forEach((field) => {
      old_User[field] = data[field];
    });

    await old_User.save();

    res.status(200).json({
      user: old_User,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
