import { UserType } from "../database/models/user.model";

export interface ActionType {
  type: String;
  payload: undefined | null;
}

export type Payload = undefined | UserType | UserType[] | null | number;

const Create_Action = (type: String, payload: Payload) => {
  return { type, payload };
};
export default Create_Action;
