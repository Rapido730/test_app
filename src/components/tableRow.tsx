import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Image from "next/image";
import { User, UserType } from "@/database/models/user.model";
type props = {
  user: UserType;
  index: number;
};

import Edit_Icon from "../assests/Edit.svg";
import Delete_Icon from "../assests/Delete.svg";
import Save_Icon from "../assests/Save.svg";
import Circle_Icon from "../assests/circle.svg";
import Circle_Icon_Green from "../assests/circle_green.svg";
import { DeleteUser, UpdateUser } from "@/services/user.services";
import { useDispatch } from "react-redux";
import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";

const TableRow = ({ user, index }: props) => {
  const [IsEdit, SetEdit] = useState(false);
  const dispatch = useDispatch();

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
    <div
      key={user.email}
      className={
        "tw-grid tw-grid-cols-2 tw-justify-between tw-px-4 " +
        (index % 2 == 0 ? " tw-bg-gray-100" : "")
      }
    >
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
      <div className="tw-grid tw-grid-cols-4 tw-gap-4 ">
        <div
          className={
            "tw-flex tw-my-auto tw-w-fit tw-px-2 tw-rounded-full tw-space-x-2 " +
            (user.status === "Invited" ? " tw-bg-gray-200" : "tw-bg-green-200")
          }
        >
          {user.status === "Invited" ? (
            <Image
              className={"tw-h-2 tw-w-2 tw-my-auto tw-stroke-green-500"}
              src={Circle_Icon_Green}
              alt="cir"
            />
          ) : (
            <Image
              className={"tw-h-2 tw-w-2 tw-my-auto "}
              src={Circle_Icon_Green}
              alt="cir"
            />
          )}
          <h1 className="tw-text-base tw-my-auto">{user.status}</h1>
        </div>
        {IsEdit ? (
          <div className="tw-my-auto">
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
          <div className="tw-my-auto">{user.role}</div>
        )}
        <div className="tw-flex tw-flex-col">
          <h1 className="tw-text-base tw-mx-auto">
            {user.last_login?.toString().slice(0, 10)}
          </h1>
          <h1 className="tw-text-base tw-mx-auto">
            {user.last_login?.toString().slice(11, 19)}
          </h1>
        </div>
        <div className="tw-flex space-x-4 md:tw-space-x-8 tw-my-auto">
          <div>
            <Image
              className="tw-h-6 tw-w-6  tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300 "
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
                className="tw-h-6 tw-w-6   tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300"
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
