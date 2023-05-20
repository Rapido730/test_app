import axios from "axios";
import { UserType, User } from "../database/models/user.model";

import { Types } from "mongoose";

export const create_user = async (user_data: UserType) => {
  const response = await axios.post(
    "/api/database.api/user.api/create.user.api",
    {
      email: user_data.email,
      name: user_data.name,
      role: user_data.role,
    }
  );

  if (response.status === 201) {
    return { Status: "Success", ResponseData: response.data.user };
  } else {
    return { Status: "Error", ResponseData: null };
  }
};

export const GetAllUsers = async () => {
  const response = await axios.get("/api/database.api/user.api/get.users.api");

  if (response.status === 200) {
    return { Status: "Success", ResponseData: response.data.users };
  } else {
    return { Status: "Error", ResponseData: null };
  }
};
