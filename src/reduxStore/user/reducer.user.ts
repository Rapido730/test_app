import { UserActionType } from "./types.user";

// import { Template_User_Type } from "DB/models/template_Categories.model";
import { UserType } from "../../database/models/user.model";
import { ActionType } from "../actionCreator";

export interface UserStateType {
  RedUserData: UserType[];
  FilteredUserData: UserType[];
  CurrentPage: number;
  TotalPage: number;
}

const INITIALSTATE: UserStateType = {
  RedUserData: [],
  FilteredUserData: [],
  CurrentPage: 0,
  TotalPage: 0,
};

export const UserReducer = (State = INITIALSTATE, Action: any) => {
  const { type, payload } = Action;
  const limit = 6;
  switch (type) {
    case UserActionType.SetUserData: {
      const NewData: UserType[] = payload;

      const NewTotalPage = Math.ceil(NewData.length / 6);

      const NewCurrentPage =
        State.CurrentPage === 0
          ? NewTotalPage >= 1
            ? 1
            : 0
          : Math.min(State.CurrentPage, State.TotalPage);

      let FilteredData: Array<UserType> = [];

      if (NewCurrentPage != 0) {
        FilteredData = NewData.slice(
          (NewCurrentPage - 1) * limit,
          (NewCurrentPage - 1) * limit + 6
        );
      }

      return {
        ...State,
        RedUserData: NewData,
        FilteredUserData: FilteredData,
        CurrentPage: NewCurrentPage,
        TotalPage: NewTotalPage,
      };
    }

    case UserActionType.PageChange: {
      let FilteredData: Array<UserType> = [];
      const NewCurrentPage = payload;
      if (NewCurrentPage != 0) {
        FilteredData = State.RedUserData.slice(
          (NewCurrentPage - 1) * limit,
          (NewCurrentPage - 1) * limit + 6
        );
      }

      return {
        ...State,
        FilteredUserData: FilteredData,
        CurrentPage: payload,
      };
    }

    case UserActionType.UpdateUser: {
      const UpdatedUserList = State.RedUserData.map((user) =>
        user._id === payload._id ? payload : user
      );

      return {
        ...State,
        User_Data: UpdatedUserList,
      };
    }
    case UserActionType.UpdateUser: {
      const FilteredUserList = State.RedUserData.filter(
        (user) => user._id !== payload._id
      );

      return {
        ...State,
        User_Data: FilteredUserList,
      };
    }
    default:
      return State;
  }
};
