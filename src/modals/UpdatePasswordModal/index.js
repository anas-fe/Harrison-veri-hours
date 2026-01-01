import { Patch } from "@/axios/AxiosFunctions";
import { Button } from "@/components/Core/Button";
import { Input } from "@/components/Core/Input";
import { BaseURL } from "@/config/apiUrl";
import {
  apiHeader,
  RenderToast,
  validateNestedParams,
} from "@/helper/HelperFunction";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalSkeleton from "../ModalSkeleton";
import { updateToken } from "@/store/auth/authSlice";

export default function UpdatePasswordModal({ show, setShow }) {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.authReducer);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Update Password
  const updatePassword = async () => {
    const params = {
      currentPassword,
      password: newPassword,
      confirmPassword,
    };

    if (!validateNestedParams(params)) return;

    if (params?.password !== params?.confirmPassword) {
      return RenderToast({
        type: "error",
        message: "New password and confirm password do not match!",
      });
    }

    setLoading("update-password");
    const url = "auth/change-password";
    const response = await Patch(BaseURL(url), params, apiHeader(access_token));
    if (response !== undefined) {
      dispatch(updateToken(response?.data?.token));
      RenderToast({
        type: "success",
        message: `Password updated successfully!`,
      });
    }
    setShow(false);
    setLoading(false);
  };

  return (
    <ModalSkeleton
      header={"Update Password"}
      borderRadius={"var(--global-border-radius)"}
      width={"600px"}
      setShow={setShow}
      show={show}
      showCloseIcon={true}
    >
      <div>
        <Input
          value={currentPassword}
          setter={setCurrentPassword}
          label={"Current Password"}
          placeholder={"Enter Current Password"}
          type={"password"}
        />
      </div>
      <div className="mt-4">
        <Input
          value={newPassword}
          setter={setNewPassword}
          label={"New Password"}
          placeholder={"Enter New Password"}
          type={"password"}
        />
      </div>
      <div className="mt-4">
        <Input
          value={confirmPassword}
          setter={setConfirmPassword}
          label={"confirm New Password"}
          placeholder={"Enter New Password Again"}
          type={"password"}
        />
      </div>
      <div className="mt-4">
        <Button
          label={loading === "update-password" ? "Updating..." : "Update"}
          disabled={loading}
          onClick={updatePassword}
          loading={loading === "update-password"}
        />
      </div>
    </ModalSkeleton>
  );
}
