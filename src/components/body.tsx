import React, { useEffect, useState } from "react";
import { UserType } from "@/database/models/user.model";
import axios from "axios";
import R_Table from "./Table";
import Add_User_Modal from "./add_user_modal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GetAllUsers } from "@/services/user.services";
import { useDispatch, useSelector } from "react-redux";
import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";
import { StateType } from "@/reduxStore/rootReducer";
const User: UserType = {
  name: "amit",
  email: "sharmamit510@gmail.com",
  role: "Admin",
  status: "invited",
  last_login: new Date("2023-05-18T11:19:25.385Z"),
  created_At: new Date("2023-05-18T11:19:24.392Z"),
  updated_At: new Date("2023-05-18T11:19:24.392Z"),
};

const Body = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const { RedUserData } = useSelector((State: StateType) => State.User);

  const [UsersData, SetUsersData] = useState<Array<UserType>>(RedUserData);

  const GetAllUserData = async () => {
    const { Status, ResponseData } = await GetAllUsers();

    if (Status === "Success") {
      dispatch(Create_Action(UserActionType.SetUserData, ResponseData));
    }
  };

  useEffect(() => {
    GetAllUserData();
  }, []);

  useEffect(() => {
    SetUsersData(RedUserData);
  }, [RedUserData]);

  // console.log({ UserData });

  return (
    <>
      <div>
        <div>
          <h1>{"Company Settings"}</h1>
        </div>
        <div className="tw-flex tw-my-4 tw-border-collapse tw-border-2 tw-px-4 tw-rounded-lg tw-w-fit">
          <div className="tw-border-r-2 tw-px-2">
            <h1 className="tw-text-xl  ">user</h1>
          </div>
          <div className="tw-border-r-2 tw-px-2">
            <h1 className="tw-text-xl  ">user</h1>
          </div>
          <div className="tw-border-r-2 tw-px-2">
            <h1 className="tw-text-xl ">user</h1>
          </div>
          <div className="tw-border-r-2 tw-px-2">
            <h1 className="tw-text-xl ">user</h1>
          </div>
          <div className=" tw-px-2">
            <h1 className="tw-text-xl ">user</h1>
          </div>
        </div>
        <div className="tw-flex tw-flex-col tw-border-2">
          <div className="tw-flex tw-justify-between">
            <div className="">
              <div className="tw-flex">
                <h1 className="tw-font-bold tw-text-xl">Users</h1>
                <h1></h1>
              </div>
              <div>
                <h1 className="tw-text-sm">
                  Manage your team members and their account permissions here.
                </h1>
              </div>
            </div>
            <div className=" tw-space-x-2">
              <button className="tw-border-2 tw-rounded-md tw-px-2 tw-py-1 tw-font-bold">
                {" "}
                Download CSV{" "}
              </button>
              <button
                className="tw-border-2 text-md tw-rounded-md tw-px-2 tw-py-1 tw-font-bold"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                {" "}
                Add User
              </button>
            </div>
          </div>
          <R_Table />
       
        </div>
      </div>

      {modalShow && (
        <Add_User_Modal
          ModalFormVisible={modalShow}
          SetModalFormVisible={setModalShow}
        />
      )}
    </>
  );
};

export default Body;
