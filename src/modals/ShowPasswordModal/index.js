import classes from "./ShowPasswordModal.module.css";
import ModalSkeleton from "../ModalSkeleton";
import { Input } from "@/components/Core/Input";
import { Button } from "@/components/Core/Button";
import { useState } from "react";
import { apiHeader, RenderToast } from "@/helper/HelperFunction";
import ViewField from "@/components/ViewField";
import { Post } from "@/axios/AxiosFunctions";
import { useSelector } from "react-redux";
import { BaseURL } from "@/config/apiUrl";
import { Label } from "@/components/Core/Label";
import { toast } from "react-toastify";
import { BiCopy } from "react-icons/bi";

export default function ShowPasswordModal({ show, setShow, selectedItem }) {
  const { access_token } = useSelector((state) => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [tabs, setTabs] = useState("password");
  const handleCheckPassword = async () => {
    const params = {
      password: currentPassword,
    };
    if (!currentPassword) {
      return RenderToast({
        type: "error",
        message: "Please fill all the fields!",
      });
    }
    setLoading(true);
    const response = await Post(
      BaseURL("auth/admin/authenticate"),
      params,
      apiHeader(access_token)
    );
    if (response?.data !== undefined) {
      setTabs("show");
      setCurrentPassword("");
      toast.success("Current Password Verified Successfully");
    }
    setLoading(false);
  };
  return (
    <ModalSkeleton
      show={show}
      setShow={setShow}
      header={
        tabs === "password" ? "Show Password" : `${selectedItem?.name} Password`
      }
      headerClass={classes.header}
      width={"600px"}
    >
      <div className={classes.container}>
        {tabs === "password" && (
          <Input
            label={"Please Enter Your Password"}
            value={currentPassword}
            setter={setCurrentPassword}
            placeholder={"Enter Current Password"}
          />
        )}
        {tabs === "show" && (
          <div className={classes.passwordContainer}>
            <Label>{`Password`}</Label>
            <div className={classes.passwordField}>
              {selectedItem?.passwordVisible || "N/A"}
              <div className={classes.copyIcon}>
                <BiCopy
                  onClick={() => {
                    navigator.clipboard.writeText(
                      selectedItem?.passwordVisible
                    );
                    toast.success("Password Copied to Clipboard");
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className={classes.button}>
          <Button
            label="Cancel"
            variant={"primary-outline"}
            onClick={() => setShow(false)}
            type="square"
          />
          {tabs === "password" && (
            <Button
              label={loading ? "Wait..." : "Save"}
              disabled={loading}
              onClick={handleCheckPassword}
              type="square"
            />
          )}
        </div>
      </div>
    </ModalSkeleton>
  );
}
