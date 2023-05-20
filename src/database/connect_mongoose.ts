require("./models/user.model");
import { set, connect } from "mongoose";

const DB_URL = process.env.DB_URL || "";
set("strictQuery", false);
export const connectMongoose = () => connect(DB_URL);
