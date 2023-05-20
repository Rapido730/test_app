import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { UserType } from "@/database/models/user.model";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "@/reduxStore/rootReducer";
import Image from "next/image";

import Edit_Icon from "../assests/Edit.svg";
import Delete_Icon from "../assests/Delete.svg";
import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";

interface u {
  name: string;
  email: string;
  role: string;
  status: string;
}

const R_Table = () => {
  const { FilteredUserData, CurrentPage, TotalPage } = useSelector(
    (State: StateType) => State.User
  );
  const [UserData, SetUserData] = useState<Array<UserType>>(FilteredUserData);

  const dispatch = useDispatch();

  useEffect(() => {
    SetUserData(FilteredUserData);
  }, [FilteredUserData]);

  return (
    <div className="tw-flex tw-flex-col tw-px-4">
      {UserData.map((user) => (
        <div
          key={user.email}
          className="tw-grid tw-grid-cols-2 tw-justify-between"
        >
          <div className="">
            <h1 className="tw-text-xl tw-font-bold">{user.name}</h1>
            <h1 className="tw-text-sm">{user.email}</h1>
          </div>
          <div className=" tw-grid tw-grid-cols-4 tw-space-x-8">
            <div>{user.status}</div>
            <div>{user.role}</div>
            <div>{user.last_login}</div>
            <div className="tw-flex tw-space-x-4">
              <div>
                <Image
                  className="tw-h-6 tw-w-6 tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300 "
                  src={Delete_Icon}
                  alt="delete"
                />
              </div>
              <div>
                <Image
                  className="tw-h-6 tw-w-6 tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300"
                  src={Edit_Icon}
                  alt="edit"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="tw-flex tw-justify-between">
        <button
          className={
            "tw-p-2 tw-border-2 " + (CurrentPage === 1 ? " tw-invisible " : "")
          }
          onClick={() => {
            dispatch(Create_Action(UserActionType.PageChange, CurrentPage - 1));
          }}
        >
          {" "}
          prev
        </button>

        <button
          className={
            "tw-p-2 tw-border-2 " +
            (CurrentPage === TotalPage ? " tw-invisible " : "")
          }
          onClick={() => {
            dispatch(Create_Action(UserActionType.PageChange, CurrentPage + 1));
          }}
        >
          {" "}
          next
        </button>
      </div>
    </div>
  );
};

export default R_Table;
