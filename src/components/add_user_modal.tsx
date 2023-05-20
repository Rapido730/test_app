import { UserType } from "@/database/models/user.model";
import { create_user } from "@/services/user.services";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal, Form, Button } from "react-bootstrap";
import { StateType } from "@/reduxStore/rootReducer";
import Create_Action from "@/reduxStore/actionCreator";
import { UserActionType } from "@/reduxStore/user/types.user";

interface Props {
  SetModalFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ModalFormVisible: boolean;
}

const Add_Task_Modal_Form = ({
  SetModalFormVisible,
  ModalFormVisible,
}: Props) => {
  const [FormField, SetFormField] = useState<UserType>({
    name: "",
    email: "",
    role: "",
  });

  const FormFieldChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    SetFormField({ ...FormField, [name]: value });
  };

  const [EmailErrorNotification, SetEmailErrorNotification] = useState({
    IsOpen: false,
    text: "",
  });

  const cancelButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    SetModalFormVisible(false);
  };

  const { RedUserData } = useSelector((State: StateType) => State.User);
  const dispatch = useDispatch();

  const FormSubmitHandler = async (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const data = {
        name: FormField.name,
        email: FormField.email,
        role: FormField.role,
      };

      const res = RedUserData.reduce((res, user) => {
        if (user.email === data.email) {
          return res || true;
        }
        return res || false;
      }, false);

      if (res) {
        SetEmailErrorNotification({
          IsOpen: true,
          text: "Email already exists!",
        });
        setTimeout(() => {
          SetEmailErrorNotification({
            IsOpen: false,
            text: "",
          });
        }, 3000);
        return;
      }

      const { Status, ResponseData } = await create_user(data);
      if (Status === "Success" && ResponseData) {
        const NewData = RedUserData;
        NewData.push(ResponseData);
        dispatch(Create_Action(UserActionType.SetUserData, NewData));
        SetModalFormVisible(false);
      } else if (Status == "Database_Error") {
      } else if (Status === "Worker not found!") {
        // Set_Worker_Error_Notification({
        //   IsOpen: true,
        //   text: "developer name doesn't exists!",
        // });
        // setTimeout(() => {
        //   Set_Worker_Error_Notification({
        //     IsOpen: false,
        //     text: "",
        //   });
        // }, 3000);
        return;
      } else {
        // Set_Worker_Error_Notification({
        //   IsOpen: true,
        //   text: "developer name doesn't exists!",
        // });
        // setTimeout(() => {
        //   Set_Worker_Error_Notification({
        //     IsOpen: false,
        //     text: "",
        //   });
        // }, 3000);

        return;
      }
    } catch (err) {
      //   Set_Notification_Data({
      //     Heading: "Error in app",
      //     Body: " try again!",
      //   });
      //   Set_Notification_Toast_Show(true);
    }

    // console.log(response);
  };

  return (
    <Fragment>
      <Modal
        show={ModalFormVisible}
        onHide={() => SetModalFormVisible(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={FormSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="User Name"
                name="name"
                onChange={FormFieldChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                onChange={FormFieldChangeHandler}
              />
              {EmailErrorNotification.IsOpen && (
                <Form.Text className="text-muted">
                  <span className="tw-mx-4 tw-text-red-500">
                    {EmailErrorNotification.text}
                  </span>
                </Form.Text>
              )}
            </Form.Group>
            {
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Role"
                  name="role"
                  onChange={FormFieldChangeHandler}
                />
              </Form.Group>
            }
            <div className="d-flex gap-3">
              <Button variant="dark" type="submit">
                Add
              </Button>
              <p
                className="my-auto tw-cursor-pointer"
                onClick={() => SetModalFormVisible(false)}
              >
                Cancel
              </p>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Add_Task_Modal_Form;
