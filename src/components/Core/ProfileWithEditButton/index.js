"use client";
import { imageUrl } from "@/config/apiUrl";
import { useRef } from "react";
import { Spinner } from "react-bootstrap";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import classes from "./ProfileEdit.module.css";
import { UserProfile } from "@/constant/imagePath";

export const ProfileWithEditButton = ({
  updateImage,
  setUpdateImage,
  isEdit,
  loader = false,
  parentClass = "",
}) => {
  const inputRef = useRef(null);
  return (
    <>
      <div className={`${classes.profileEditContainer} ${parentClass}`}>
        {updateImage?.name ? (
          <div className={`${classes.profileEditImage_box}`}>
            <img
              className={`${classes.profileEditImage}`}
              src={URL.createObjectURL(updateImage)}
              alt="profileImage"
            />
          </div>
        ) : updateImage == null ? (
          <div className={`${classes.profileEditImage_box}`}>
            <img
              className={`${classes.profileEditImage}`}
              src={UserProfile}
              alt="profileImage"
            />
          </div>
        ) : (
          typeof updateImage == "string" && (
            <div className={`${classes.profileEditImage_box}`}>
              <img
                className={`${classes.profileEditImage}`}
                src={imageUrl(updateImage)}
                alt="profileImage"
              />
            </div>
          )
        )}

        {isEdit && (
          <div className={`${classes.profileEditPen_box}`}>
            <TbEdit
              className={`${classes.profileEditPen}`}
              onClick={() => {
                inputRef.current.click();
              }}
              color={"var(--white-color)"}
              size={12}
            />
            <input
              ref={inputRef}
              type="file"
              size="2000000"
              className={`${classes.file_upload_form3rd}`}
              onChange={(e) => {
                if (e.target.files?.length > 0) {
                  if (
                    ![
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "image/gif",
                    ].includes(e.target.files[0].type)
                  ) {
                    return toast.error(
                      "Please upload a valid image. [jpg and png formats only]"
                    );
                  }
                  // max size 2MB
                  if (e.target.files[0]?.size / 1024 / 1024 > 2)
                    return toast.error(
                      "Please upload a valid image. [Max size: 2MB]"
                    );

                  setUpdateImage(e.target.files[0]);
                }
              }}
            />
          </div>
        )}
        {loader && (
          <div className={classes.uploadingOverlay}>
            <Spinner animation="border" variant="white" />
          </div>
        )}
      </div>
    </>
  );
};
