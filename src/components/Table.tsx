import React, { useEffect, useState } from "react";
import { UserType } from "@/database/models/user.model";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "@/reduxStore/rootReducer";
import Image from "next/image";
import { Form } from "react-bootstrap";

import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";
import TableRow from "./tableRow";

interface u {
  name: string;
  email: string;
  role: string;
  status: string;
}

const R_Table = () => {
  const dispatch = useDispatch();

  const { FilteredUserData, CurrentPage, TotalPage } = useSelector(
    (State: StateType) => State.User
  );

  const [Pages, SetPages] = useState(
    Array.from({ length: TotalPage }, (_, i) => i + 1)
  );
  const [UserData, SetUserData] = useState<Array<UserType>>(FilteredUserData);

  useEffect(() => {
    SetUserData(FilteredUserData);
  }, [FilteredUserData]);

  useEffect(() => {
    SetPages(Array.from({ length: TotalPage }, (_, i) => i + 1));
  }, [TotalPage]);

  return (
    <div className="tw-flex tw-flex-col tw-my-2 tw-px-4">
      <div className="tw-grid tw-grid-cols-2 tw-text-gray-500 tw-font-bold tw-justify-between">
        <div className="">
          <h1 className="tw-text-sm tw-font-bold tw">{"Name"}</h1>
        </div>
        <div className=" tw-text-sm tw-grid tw-grid-cols-4 tw-space-x-8">
          <div>{"Status"}</div>
          <div>{"Role"}</div>
          <div>{"Last Login"}</div>
          <div className="tw-flex tw-space-x-4"></div>
        </div>
      </div>
      {UserData.map((user) => (
        <TableRow key={user.email} user={user} />
      ))}
      <div className="tw-flex tw-justify-between tw-mb-4">
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
        <div className="tw-flex  tw-px-2 tw-rounded-lg tw-space-x-2 tw-w-fit">
          {Pages.map((page) => (
            <div
              key={page}
              onClick={() => {
                dispatch(Create_Action(UserActionType.PageChange, page));
              }}
              className={
                " tw-px-4 tw-cursor-pointer tw-rounded-lg tw-shadow-lg" +
                (page !== CurrentPage ? " tw-text-gray-500" : "")
              }
            >
              <h1 className="tw-text-xl  ">{page}</h1>
            </div>
          ))}
        </div>
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
