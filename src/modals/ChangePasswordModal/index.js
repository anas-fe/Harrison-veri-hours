import classes from "./ChangePasswordModal.module.css";
import ModalSkeleton from "../ModalSkeleton";
import { Input } from "@/components/Core/Input";
import { Button } from "@/components/Core/Button";
import { useState } from "react";
import { RenderToast } from "@/helper/HelperFunction";

export default function ChangePasswordModal({
  show,
  setShow,
  onClick,
  loading,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleValidation = () => {
    const params = {
      newPassword: password,
      confirmPassword,
      currentPassword,
    };
    if (!password) {
      return RenderToast({
        type: "error",
        message: "Please fill all the fields!",
      });
    }
    if (password !== confirmPassword) {
      return RenderToast({
        type: "error",
        message: "Passwords do not match!",
      });
    }
    if (password.length < 8) {
      return RenderToast({
        type: "error",
        message: "Password must be at least 8 characters long!",
      });
    }
    onClick(params);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={`Change Password`}
      headerClass={classes.header}
      width={"600px"}
    >
      <div className={classes.container}>
        <Input
          label={"Current Password"}
          type={"password"}
          value={currentPassword}
          setter={setCurrentPassword}
          placeholder={"Enter Current Password"}
        />
        <Input
          type={"password"}
          label={"New Password"}
          value={password}
          setter={setPassword}
          placeholder={"Enter New Password"}
        />
        <Input
          type={"password"}
          label={"Confirm New Password"}
          value={confirmPassword}
          setter={setConfirmPassword}
          placeholder={"Confirm New Password"}
        />
        <div className={classes.button}>
          <Button
            label="Cancel"
            variant={"primary-outline"}
            onClick={() => setShow(false)}
            type="square"
          />
          <Button
            label={loading ? "Wait..." : "Save"}
            disabled={loading}
            onClick={handleValidation}
            type="square"
          />
        </div>
      </div>
    </ModalSkeleton>
  );
}
