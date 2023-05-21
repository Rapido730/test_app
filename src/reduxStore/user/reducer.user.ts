import { UserActionType } from "./types.user";

import { UserType } from "../../database/models/user.model";

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

      const UpdatedFilteredUserList = State.FilteredUserData.map((user) =>
        user._id === payload._id ? payload : user
      );

      const NewState = {
        ...State,
        RedUserData: UpdatedUserList,
        FilteredUserData: UpdatedFilteredUserList,
      };
      return NewState;
    }
    case UserActionType.DeleteUser: {
      const UpdatedUserList = State.RedUserData.filter(
        (user) => user._id !== payload._id
      );

      const NewTotalPage = Math.ceil(UpdatedUserList.length / 6);

      const NewCurrentPage =
        State.CurrentPage === 0
          ? NewTotalPage >= 1
            ? 1
            : 0
          : Math.min(State.CurrentPage, NewTotalPage);

      let FilteredData: Array<UserType> = [];

      if (NewCurrentPage != 0) {
        FilteredData = UpdatedUserList.slice(
          (NewCurrentPage - 1) * limit,
          (NewCurrentPage - 1) * limit + 6
        );
      }

      const NewState = {
        ...State,
        RedUserData: UpdatedUserList,
        FilteredUserData: FilteredData,
        CurrentPage: NewCurrentPage,
        TotalPage: NewTotalPage,
      };
      return NewState;
    }
    default:
      return State;
  }
};
