import React, { useEffect, useState } from "react";
import { UserType } from "@/database/models/user.model";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "@/reduxStore/rootReducer";
import Image from "next/image";
import { Form } from "react-bootstrap";

import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";
import TableRow from "./table_row";
import Right_Arrow from "../assests/arrow-right-solid.svg";
import Left_Arrow from "../assests/arrow-left-solid.svg";
import Up_Arrow from "../assests/arrow-up-solid.svg";
import Down_Arrow from "../assests/arrow-down-solid.svg";

interface u {
  name: string;
  email: string;
  role: string;
  status: string;
}

const Table = () => {
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

  const [SortState, SetSortState] = useState([-1, -1, -1, -1]);

  const DataSortHandler = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    field: string
  ) => {
    event.preventDefault();
    const TempData = UserData.slice(0);

    if (field === "name") {
      if (SortState[0] === -1) {
        TempData.sort((a, b) => {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        });
        const NewSortState = SortState;
        NewSortState[0] = 1;
        SetSortState(NewSortState);
      } else {
        TempData.sort((a, b) => {
          return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
        });
        const NewSortState = SortState;
        NewSortState[0] = -1;
        SetSortState(NewSortState);
      }
    } else if (field === "role") {
      if (SortState[2] === -1) {
        TempData.sort((a, b) => {
          return a.role.toLowerCase() < b.role.toLowerCase() ? -1 : 1;
        });
        const NewSortState = SortState;
        NewSortState[2] = 1;
        SetSortState(NewSortState);
      } else {
        TempData.sort((a, b) => {
          return a.role.toLowerCase() > b.role.toLowerCase() ? -1 : 1;
        });
        const NewSortState = SortState;
        NewSortState[2] = -1;
        SetSortState(NewSortState);
      }
    } else if (field === "status") {
      if (SortState[1] === -1) {
        TempData.sort((a, b) => {
          if (a.status && b.status) {
            return a.status.toLowerCase() < b.status.toLowerCase() ? -1 : 1;
          }
          return -1;
        });
        const NewSortState = SortState;
        NewSortState[1] = 1;
        SetSortState(NewSortState);
      } else {
        TempData.sort((a, b) => {
          if (a.status && b.status) {
            return a.status.toLowerCase() > b.status.toLowerCase() ? -1 : 1;
          }
          return -1;
        });
        const NewSortState = SortState;
        NewSortState[1] = -1;
        SetSortState(NewSortState);
      }
    } else if (field === "last_login") {
      if (SortState[3] === -1) {
        TempData.sort((a, b) => {
          if (a.last_login && b.last_login) {
            return a.last_login < b.last_login ? -1 : 1;
          }
          return -1;
        });
        const NewSortState = SortState;
        NewSortState[3] = 1;
        SetSortState(NewSortState);
      } else {
        TempData.sort((a, b) => {
          if (a.last_login && b.last_login) {
            return a.last_login > b.last_login ? -1 : 1;
          }
          return -1;
        });
        const NewSortState = SortState;
        NewSortState[3] = -1;
        SetSortState(NewSortState);
      }
    }
    SetUserData(TempData);
  };
  console.log("he");

  return (
    <div className="tw-flex tw-flex-col tw-my-2 ">
      <div className="tw-grid tw-grid-cols-2 tw-text-gray-500 tw-font-bold tw-justify-between tw-px-4">
        <div
          className="tw-cursor-pointer tw-flex tw-space-x-2 tw-w-fit"
          onClick={(event) => {
            DataSortHandler(event, "name");
          }}
        >
          <h1 className="tw-text-sm tw-font-bold tw">{"Name"}</h1>
          {SortState[0] === -1 ? (
            <Image className="tw-h-4 tw-w-4" src={Up_Arrow} alt="up" />
          ) : (
            <Image className="tw-h-4 tw-w-4" src={Down_Arrow} alt="down" />
          )}
        </div>
        <div className=" tw-text-sm tw-grid tw-grid-cols-4 tw-space-x-8">
          <div
            onClick={(event) => {
              DataSortHandler(event, "status");
            }}
            className=" tw-flex tw-space-x-2 tw-cursor-pointer tw-w-fit"
          >
            <h1 className="tw-text-sm tw-font-bold ">{"Status"}</h1>
            {SortState[1] === -1 ? (
              <Image className="tw-h-4 tw-w-4" src={Up_Arrow} alt="up" />
            ) : (
              <Image className="tw-h-4 tw-w-4" src={Down_Arrow} alt="down" />
            )}
          </div>
          <div
            onClick={(event) => {
              DataSortHandler(event, "role");
            }}
            className=" tw-flex tw-space-x-2 tw-cursor-pointer tw-w-fit"
          >
            <h1 className="tw-text-sm tw-font-bold ">{"Role"}</h1>
            {SortState[2] === -1 ? (
              <Image className="tw-h-4 tw-w-4" src={Up_Arrow} alt="up" />
            ) : (
              <Image className="tw-h-4 tw-w-4" src={Down_Arrow} alt="down" />
            )}
          </div>
          <div
            onClick={(event) => {
              DataSortHandler(event, "last_login");
            }}
            className=" tw-flex tw-space-x-2 tw-cursor-pointer tw-w-fit"
          >
            <h1 className="tw-text-sm tw-font-bold ">{"Last Login"}</h1>
            {SortState[3] === -1 ? (
              <Image className="tw-h-4 tw-w-4" src={Up_Arrow} alt="up" />
            ) : (
              <Image className="tw-h-4 tw-w-4" src={Down_Arrow} alt="down" />
            )}
          </div>
          <div className="tw-flex tw-space-x-4"></div>
        </div>
      </div>
      {UserData.map((user, index) => (
        <TableRow key={user.email} user={user} index={index} />
      ))}
      <div className="tw-flex tw-justify-between tw-mb-4 tw-mt-4 tw-px-2">
        <button
          className={
            "tw-px-2 tw-border-2 tw-flex tw-space-x-2 tw-rounded-md " +
            (CurrentPage === 1 ? " tw-invisible " : "")
          }
          onClick={() => {
            dispatch(Create_Action(UserActionType.PageChange, CurrentPage - 1));
          }}
        >
          <Image
            className="tw-h-4 tw-w-4 tw-my-auto  tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300 "
            src={Left_Arrow}
            alt="delete"
          />
          <h1 className="my-auto tw-text-lg">Prev</h1>
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
            "tw-px-2 tw-border-2 tw-flex tw-space-x-2 tw-rounded-md" +
            (CurrentPage === TotalPage ? " tw-invisible " : "")
          }
          onClick={() => {
            dispatch(Create_Action(UserActionType.PageChange, CurrentPage + 1));
          }}
        >
          <h1 className="my-auto tw-text-lg">Next</h1>
          <Image
            className="tw-h-4 tw-w-4 tw-my-auto  tw-cursor-pointer hover:tw-ease-in-out hover:tw-scale-125 tw-duration-300 "
            src={Right_Arrow}
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
};

export default Table;
