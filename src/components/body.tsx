import React, { useEffect, useState } from "react";
import { UserType } from "@/database/models/user.model";
import Table from "./Table";
import Add_User_Modal from "./add_user_modal";
import Image from "next/image";
import { GetAllUsers } from "@/services/user.services";
import { useDispatch, useSelector } from "react-redux";
import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";
import { StateType } from "@/reduxStore/rootReducer";
import Download_Icon from "../assests/download.svg";
import Plus_Icon from "../assests/plus.svg";

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
      <div className=" max-md:tw-w-max   ">
        <div>
          <h1>{"Company Settings"}</h1>
        </div>
        <div className="tw-flex tw-my-4 tw-border-collapse tw-border-2 tw-px-4 tw-rounded-lg tw-w-fit">
          <div className="tw-cursor-pointer tw-border-r-2 tw-px-2">
            <h1 className="tw-text-sm tw-my-auto tw-mx-auto  ">{"General"}</h1>
          </div>
          <div className="tw-cursor-pointer  tw-border-r-2 tw-px-2 tw-bg-gray-200">
            <h1 className="tw-text-sm tw-my-auto tw-mx-auto tw-font-bold ">
              {"Users"}
            </h1>
          </div>
          <div className="tw-cursor-pointer tw-border-r-2 tw-px-2">
            <h1 className="tw-text-sm tw-my-auto tw-mx-auto ">{"Plan"}</h1>
          </div>
          <div className="tw-cursor-pointer tw-border-r-2 tw-px-2">
            <h1 className="tw-text-sm tw-my-auto tw-mx-auto ">{"Billing"}</h1>
          </div>
          <div className="tw-cursor-pointer  tw-px-2">
            <h1 className="tw-text-sm tw-my-auto tw-mx-auto ">
              {"Integrations"}
            </h1>
          </div>
        </div>
        <div className="tw-flex tw-flex-col tw-border-2 tw-rounded-md">
          <div className="tw-flex tw-justify-between tw-border-b-2 tw-px-4 tw-py-2">
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
            <div className=" tw-space-x-2 tw-h-fit tw-my-auto tw-flex">
              <button className="tw-border-2 tw-rounded-md tw-px-2  tw-font-bold hover:tw-bg-gray-200 tw-flex tw-space-x-2 ">
                <Image
                  className="tw-h-4 tw-w-4 tw-my-auto  tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300 "
                  src={Download_Icon}
                  alt="delete"
                />
                <h1 className="my-auto tw-text-lg">Download CSV</h1>
              </button>
              <button
                className="tw-border-2 text-md tw-rounded-md tw-px-2  tw-font-bold tw-flex tw-space-x-2  tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                <Image
                  className="tw-h-4 tw-w-4 tw-my-auto  tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300 tw-invert"
                  src={Plus_Icon}
                  alt="delete"
                />
                <h1 className="my-auto tw-text-lg">Add User</h1>
              </button>
            </div>
          </div>
          <Table />
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
