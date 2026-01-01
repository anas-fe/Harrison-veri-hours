import axios from "axios";
import { toast } from "react-toastify";
import { signOutRequest } from "../store/auth/authSlice";
import { BaseURL } from "../config/apiUrl.js";
import moment from "moment";
import { apiHeader } from "@/helper/HelperFunction";

const getHeaders = (accessToken) => ({
  Accept: "application/json",
  Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
  "ngrok-skip-browser-warning": "69420",
  "timezone-offset": moment().utcOffset(),
});

const handleError = (error, showAlert, dispatch) => {
  let errorMessage = "";
  if (Array.isArray(error?.response?.data?.message?.error)) {
    error?.response?.data?.message?.error?.forEach(
      (item) => (errorMessage += ` • ${item} \n`)
    );
  } else {
    errorMessage = error?.response?.data?.message?.error;
  }

  if (error.response?.status === 401) {
    dispatch && dispatch(signOutRequest());
  }

  if (showAlert) {
    const message =
      error.message === "Network Error"
        ? `${error.message} : Please Check Your Network Connection`
        : errorMessage;
    toast.error(message, { position: "top-center" });
  }
};

export const Get = async (route, accessToken, showAlert = true, dispatch) => {
  const options = { headers: getHeaders(accessToken) };
  try {
    const response = await axios.get(route, options);
    return response;
  } catch (error) {
    handleError(error, showAlert, dispatch);
  }
};

const apiRequest = async (
  method,
  route,
  data,
  { headers },
  showAlert,
  dispatch
) => {
  const options = {
    method,
    url: route,
    ...(data && { data }),
    headers,
  };
  try {
    return await axios(options);
  } catch (error) {
    handleError(error, showAlert, dispatch);
  }
};

export const Post = (route, data, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("post", route, data, apiHeaders, showAlert, dispatch);
};

export const Patch = (route, data, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("patch", route, data, apiHeaders, showAlert, dispatch);
};

export const Put = (route, data, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("put", route, data, apiHeaders, showAlert, dispatch);
};

export const Delete = (route, headers, showAlert = true, dispatch) => {
  const apiHeaders = headers || { headers: getHeaders() };
  return apiRequest("delete", route, null, apiHeaders, showAlert, dispatch);
};
const UploadFilesToAwsBySignedUrl = async (urlsArray, files) => {
  const promises = urlsArray.map((url, index) => {
    const contentType = files?.[index]?.name?.split(".").pop();
    return axios.put(url, files[index], {
      headers: {
        "Content-Type": contentType == "pdf" ? "application/pdf" : contentType,
        "ngrok-skip-browser-warning": "69420",
      },
    });
  });
  const response = await Promise.allSettled(promises);
  return response;
};
export const uploadMedia = async (selectedFiles, access_token) => {
  if (selectedFiles?.length === 0) return [];
  const params = {
    files: selectedFiles?.map((ele) => ({
      mimeType: ele?.name?.split(".").pop(),
      name: ele?.name,
    })),
  };
  const apiUrl = BaseURL("get-signed-url");
  const response = await Post(apiUrl, params, apiHeader(access_token));
  console.log("response100", response);
  if (response) {
    if (response?.data?.urls?.length > 0) {
      await UploadFilesToAwsBySignedUrl(response?.data?.urls, selectedFiles);
    }
    return response?.data?.keys;
  }
  return null;
};
