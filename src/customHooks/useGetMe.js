import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get } from "../axios/AxiosFunctions.js";
import { BaseURL } from "../config/apiUrl.js";
import { updateUser } from "../store/auth/authSlice.js";
import { setUnReadNotificationCount } from "store/common/commonSlice.js";

export const useGetMe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLogin, access_token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const getMe = async () => {
    const apiUrl = BaseURL("users/get-me");
    const notificationUrl = BaseURL("notifications/unread-count");
    setIsLoading(true);
    const [userRes, notificationRes] = await Promise.allSettled([
      Get(apiUrl, access_token, false, dispatch),
      Get(notificationUrl, access_token, false, dispatch),
    ]);
    if (userRes?.value || notificationRes?.value) {
      dispatch(updateUser(userRes?.value?.data?.data));
      dispatch(setUnReadNotificationCount(notificationRes?.value?.data?.data));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLogin) {
      // getMe();
    }
  }, [isLogin]);
  return isLoading;
};
