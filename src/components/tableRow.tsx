import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Image from "next/image";
import { UserType } from "@/database/models/user.model";
type props = {
  user: UserType;
};

import Edit_Icon from "../assests/Edit.svg";
import Delete_Icon from "../assests/Delete.svg";
import Save_Icon from "../assests/Save.svg";
import { DeleteUser, UpdateUser } from "@/services/user.services";
import { useDispatch } from "react-redux";
import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";

const TableRow = ({ user }: props) => {
  const dispatch = useDispatch();
  const [IsEdit, SetEdit] = useState(false);

  const [UserData, SetUserData] = useState(user);

  const FieldChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    SetUserData({ ...UserData, [name]: value });
  };

  const UserDeleteHandler = async () => {
    try {
      const data = {
        ...UserData,
      };

      const { Status, ResponseData } = await DeleteUser(data);
      if (Status === "Success" && ResponseData) {
        dispatch(Create_Action(UserActionType.DeleteUser, data));
      } else {
        return;
      }
    } catch (err) {}
  };

  const UpdateUserHandler = async () => {
    try {
      const data = {
        ...UserData,
      };

      const { Status, ResponseData } = await UpdateUser(data);
      if (Status === "Success" && ResponseData) {
        dispatch(Create_Action(UserActionType.UpdateUser, ResponseData));
        SetEdit(false);
      } else {
        return;
      }
    } catch (err) {}
  };

  return (
    <div key={user.email} className="tw-grid tw-grid-cols-2 tw-justify-between">
      <div className="">
        {IsEdit ? (
          <div>
            <Form.Group className="mb-3 tw-w-8/12" controlId="formBasicEmail">
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                onChange={FieldChangeHandler}
                value={UserData.name}
              />
            </Form.Group>
          </div>
        ) : (
          <h1 className="tw-text-xl tw-font-bold">{user.name}</h1>
        )}
        <h1 className="tw-text-sm">{user.email}</h1>
      </div>
      <div className=" tw-grid tw-grid-cols-4 tw-space-x-8">
        <div>{user.status}</div>
        {IsEdit ? (
          <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                required
                type="text"
                placeholder="Role"
                name="role"
                onChange={FieldChangeHandler}
                value={UserData.role}
              />
            </Form.Group>
          </div>
        ) : (
          <div>{user.role}</div>
        )}
        <div>{user.last_login}</div>
        <div className="tw-flex tw-space-x-4">
          <div>
            <Image
              className="tw-h-6 tw-w-6 tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300 "
              src={Delete_Icon}
              alt="delete"
              onClick={() => {
                UserDeleteHandler();
              }}
            />
          </div>
          <div>
            {IsEdit ? (
              <Image
                className="tw-h-6 tw-w-6 tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300"
                src={Save_Icon}
                alt="edit"
                onClick={() => {
                  UpdateUserHandler();
                }}
              />
            ) : (
              <Image
                className="tw-h-6 tw-w-6 tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300"
                src={Edit_Icon}
                alt="edit"
                onClick={() => {
                  SetEdit(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableRow;
