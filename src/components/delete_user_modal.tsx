import { UserType } from "@/database/models/user.model";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal, Button } from "react-bootstrap";
import { StateType } from "@/reduxStore/rootReducer";
import CreateAction from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";
import { DeleteUser } from "@/services/user.services";

interface Props {
  SetModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ModalVisible: boolean;
  UserData: UserType;
}

const DeleteUserModal = ({
  SetModalVisible,
  ModalVisible,
  UserData,
}: Props) => {
  const dispatch = useDispatch();
  const UserDeleteHandler = async () => {
    try {
      const data = {
        ...UserData,
      };

      const { Status, ResponseData } = await DeleteUser(data);
      if (Status === "Success" && ResponseData) {
        dispatch(CreateAction(UserActionType.DeleteUser, data));
        SetModalVisible(false);
      } else {
        return;
      }
    } catch (err) {}
  };

  return (
    <Modal
      show={ModalVisible}
      onHide={() => SetModalVisible(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="tw-text-base ">
          {"Are you sure to delete data of "}
          {UserData.name}
          {"?"}
        </h1>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-3">
          <Button variant="danger" onClick={() => UserDeleteHandler()}>
            Delete
          </Button>
          <p
            className="my-auto tw-cursor-pointer"
            onClick={() => SetModalVisible(false)}
          >
            Cancel
          </p>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
