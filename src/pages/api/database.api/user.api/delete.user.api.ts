import { connectMongoose } from "../../../../database/connect_mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserType } from "../../../../database/models/user.model";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.body;
    console.log({ data });
    connectMongoose();
    const old_User = await User.deleteOne({
      email: data.email,
    });

    if (!old_User) {
      res.status(404).json({
        user: null,
      });
      return;
    }
    res.status(200).json({
      user: old_User,
    });
  } catch (err) {
    res.status(400).json(err);
  }
}
