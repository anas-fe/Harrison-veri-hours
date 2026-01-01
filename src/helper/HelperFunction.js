import moment from "moment";
import {
  CURRENCY,
  notProtectedRoute,
  permissionRoute,
} from "../constant/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { formRegEx, formRegExReplacer } from "constant/regex";
import classNames from "classnames";
import { routes } from "@/routes";
import { BaseURL } from "@/config/apiUrl";

export const apiHeader = (token, isFormData) => {
  const headers = {
    "ngrok-skip-browser-warning": "69420",
    "timezone-offset": moment().utcOffset(),
    "Content-Type": isFormData ? "multipart/form-data" : "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { headers };
};

export const formatMessageDate = (date) => {
  const messageDate = moment(date);
  const now = moment();

  if (messageDate.isSame(now, "minute")) {
    // If the date is exactly now, show the current time, e.g., 'HH:mm A'
    return now.format("HH:mm A");
  } else if (messageDate.isSame(now, "day")) {
    // If the date is today, use fromNow()
    return messageDate.fromNow();
  } else if (messageDate.isSame(now.subtract(1, "day"), "day")) {
    // If the date is yesterday, use fromNow()
    return messageDate.fromNow();
  } else {
    // Otherwise, show the date in a standard format, e.g., 'DD/MM/YYYY'
    return messageDate.format("DD/MM/YYYY");
  }
};

export const formatDate = (date) => {
  const formattedDate = moment(date);
  return formattedDate.format("DD/MM/YYYY");
};

export const formatTime = (time) => {
  const formattedTime = moment(time);
  return formattedTime.format("hh:mm A");
};
export function stripAllHtmlTags(input) {
  return input?.replace(/<[^>]*>?/gm, "");
}

const options = {
  onDownloadProgress: (progressEvent) => {
    const { loaded, total } = progressEvent;
  },
};
export function downloadFileFromUrl(fileUrl, filename) {
  axios
    .get(fileUrl, {
      responseType: "blob",
      ...options,
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers["content-type"],
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    })
    .catch((e) => {});
}

export const scrollToTop = (topVal = 0) => {
  window.scrollTo({
    top: topVal,
    behavior: "smooth",
  });
};

export const formatNumber = (num) => {
  if (num % 1 === 0) {
    return `${CURRENCY}${num?.toLocaleString()}`;
  } else {
    return `${CURRENCY}${num?.toFixed(2)?.toLocaleString()}`;
  }
};

export async function convertImageFile(file) {
  if (typeof window !== "undefined") {
    const heic2any = require("heic2any");
    if (file?.type === "image/heic") {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });
        return new File(
          [convertedBlob],
          file.name.replace(/\.heic$/i, ".jpg"),
          {
            type: "image/jpeg",
            lastModified: Date.now(),
          }
        );
      } catch (error) {
        console.error("Error converting HEIC to JPEG:", error);
        throw error;
      }
    } else if (file?.type === "image/webp") {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        return new Promise((resolve) => {
          canvas.toBlob((blob) => {
            const convertedFile = new File(
              [blob],
              file.name.replace(/\.webp$/i, ".jpg"),
              {
                type: "image/jpeg",
                lastModified: Date.now(),
              }
            );
            resolve(convertedFile);
          }, "image/jpeg");
        });
      } catch (error) {
        console.error("Error converting WebP to JPEG:", error);
        throw error;
      }
    }
    return file;
  }
}
export const handleConvertImages = async (files) => {
  // return files;
  const temp = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (typeof file === "string") {
      temp.push(file);
    } else {
      const image = await convertImageFile(file);
      temp.push(image);
    }
  }
  return temp;
};

export const quillValidateHandler = (
  params,
  toastMessage = "Please fill the home cms field!"
) => {
  let flag = true;
  for (let key in params) {
    const parsedHTML = new DOMParser().parseFromString(
      params[key],
      "text/html"
    );
    const plainText = parsedHTML.body.textContent || "";
    if (plainText?.trim() === "") {
      toast.error(toastMessage);
      flag = false;
      break;
    }
  }
  return flag;
};

export const cn = (...args) => classNames(...args);

export const validateDate = (date) => {
  if (!date) return null; // Return null if date is falsy

  // Check if date is a moment object and has a $d property
  if (date?.$d) {
    return moment(date.$d).format(); // Format if $d exists
  } else {
    return moment(date).format(); // Assume date is a valid input for moment
  }
};

export const validateUrl = (url) => {
  const urlRegex =
    /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return urlRegex.test(url);
};

export const camelCaseToLower = (str) => {
  return str.replace(formRegEx, formRegExReplacer).toLowerCase();
};

export const urlPattern =
  /^(https?:\/\/)(www\.)?([\w-]+\.)+[a-z]{2,6}(\/[\w-]*)*\/?$/;

export const getYearRange = () => {
  const years = [
    ...Array.from({ length: 5 }).map((_, i) => ({
      label: `${moment().subtract(i, "year").format("YYYY")}`,
      value: `${moment().subtract(i, "year").format("YYYY")}`,
    })),
  ];
  return years;
};

export const RenderToast = ({ type = "error", message = "" }) => {
  let toastId = "error-render-toast";

  if (!type || !message) return;

  toast[type](message, {
    id: toastId,
  });
};

/**
 * Validates if all days in all months are filled with band selections
 * @param {Array} calendarData - Array of month objects with days array
 * @param {string} customMessage - Custom error message (optional)
 * @returns {boolean} - Returns true if all days are filled, false otherwise
 */
export const validateAllDaysFilled = (calendarData, customMessage = null) => {
  if (!calendarData || !Array.isArray(calendarData)) {
    RenderToast({
      type: "error",
      message: customMessage || "Calendar data is required",
    });
    return false;
  }

  for (let monthIndex = 0; monthIndex < calendarData.length; monthIndex++) {
    const monthData = calendarData[monthIndex];

    if (!monthData || !monthData.days || !Array.isArray(monthData.days)) {
      RenderToast({
        type: "error",
        message:
          customMessage ||
          `Invalid data structure for month ${
            monthData?.month || monthIndex + 1
          }`,
      });
      return false;
    }

    for (let dayIndex = 0; dayIndex < monthData.days.length; dayIndex++) {
      const dayValue = monthData.days[dayIndex];

      // Check if the day is empty (no band selected)
      if (!dayValue || dayValue.trim() === "") {
        const monthName = monthData.month || `Month ${monthIndex + 1}`;
        const dayNumber = dayIndex + 1;

        RenderToast({
          type: "error",
          message:
            customMessage ||
            `Please select a band for ${monthName} - Day ${dayNumber}`,
        });
        return false;
      }
    }
  }

  return true;
};

export const validateNestedParams = (
  params,
  parentKey = "",
  options = { disallowEmptyArray: true }
) => {
  const formatKey = (rawKey) => {
    return rawKey
      .replace(/\[(\d+)\]/g, (_, i) => ` ${parseInt(i) + 1}`) // [0] => 1
      .split(".")
      .map(
        (part) =>
          part.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) // capitalize
      )
      .join(" → ");
  };

  if (Array.isArray(params)) {
    if (options.disallowEmptyArray && params.length === 0) {
      toast.error(`${formatKey(parentKey)} cannot be empty`);
      return false;
    }

    for (let i = 0; i < params.length; i++) {
      const key = `${parentKey}[${i}]`;
      if (!validateNestedParams(params[i], key, options)) return false;
    }
  } else if (typeof params === "object" && params !== null) {
    const keys = Object.keys(params);
    if (keys.length === 0 && parentKey) {
      toast.error(`${formatKey(parentKey)} cannot be empty`);
      return false;
    }

    for (const key of keys) {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (!validateNestedParams(params[key], fullKey, options)) return false;
    }
  } else {
    if (params === "" || params === null || params === undefined) {
      toast.error(`${formatKey(parentKey)} cannot be empty`);
      return false;
    }
  }

  return true;
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const CreateFormData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export function checkPermission(permissions, main, sub) {
  const permission = permissions?.find((item) => item?.main === main);
  if (permission) {
    return permission?.sub?.includes(sub);
  }
  return false;
}

export const getFirstRoute = (url) => {
  // Check if the URL is just "/"
  if (url === "/") {
    return "/";
  }

  // Split the URL by '/' and filter out empty values
  const routes = url.split("/").filter((route) => route);

  // Return the first route as '/route'
  return `/${routes?.[0]}`;
};

export const validateBands = (bands) => {
  if (!bands || bands.length === 0) {
    RenderToast({
      type: "error",
      message: "Bands are required",
    });
    return false;
  }

  if (bands && bands.length > 0) {
    for (let i = 0; i < bands.length; i++) {
      const band = bands[i];

      // Validate band name
      if (!band.name || band.name.trim() === "") {
        RenderToast({
          type: "error",
          message: `Band ${i + 1}: Name is required`,
        });
        return false;
      }

      // Validate band prices
      if (!band.price || band.price === 0) {
        RenderToast({
          type: "error",
          message: `Band "${band.name}": At least one day price is required`,
        });
        return false;
      }

      // Check for empty or invalid prices
      const invalidPrices = band.price.filter(
        (price) =>
          !price || price === "" || isNaN(Number(price)) || Number(price) <= 0
      );

      if (invalidPrices.length > 0) {
        RenderToast({
          type: "error",
          message: `Band "${band.name}": All prices must be valid numbers greater than 0`,
        });
        return false;
      }

      // Validate incremental settings if enabled
      if (band.incremental) {
        if (
          !band.incrementValue ||
          band.incrementValue === "" ||
          isNaN(Number(band.incrementValue)) ||
          Number(band.incrementValue) <= 0
        ) {
          RenderToast({
            type: "error",
            message: `Band "${band.name}": Increment value must be a valid number greater than 0`,
          });
          return false;
        }
      }
    }

    // Transform bands data for API - convert string prices to numbers
    const transformedBands = bands?.map((ele) => {
      return {
        name: ele?.name,
        price: ele?.prices?.map((ele) => Number(ele)),
        ...(ele?.incrementValue &&
          ele?.incremental && { increment: Number(ele?.incrementValue) }),
      };
    });

    return transformedBands;
  }
};

export const getID = (id) => (id ? id.slice(id.length - 7, id.length) : "");

export const getUserFullName = (user) => {
  if (!user) return "";
  if (user?.firstName && user?.lastName) {
    return `${user?.firstName} ${user?.lastName}`;
  }
  if (user?.firstName) {
    return user?.firstName;
  }
  if (user?.lastName) {
    return user?.lastName;
  }
  return "";
};

// Function to find the lowest valid price
export const getLowestPrice = (pricingArray, bandArray) => {
  // Filter bands that have their 'name' existing in pricing days
  const validBands = bandArray?.filter((band) => {
    return pricingArray?.some((pricing) => pricing?.days?.includes(band?.name));
  });

  // If no valid bands found, return null
  if (validBands?.length === 0) {
    return null;
  }

  // Find the minimum price from valid bands
  const lowestPrice = validBands?.reduce((min, band) => {
    const minPriceInBand = Math.min(...band?.price); // Get the lowest price from the band's price array
    return minPriceInBand < min ? minPriceInBand : min;
  }, Infinity);

  return lowestPrice;
};
export const handleGetPriceForBooking = (selectedDate, data) => {
  if (!selectedDate?.from || !selectedDate?.to) return;
  const month = moment(selectedDate?.from).format("MMM");
  const day = moment(selectedDate?.from).format("DD");
  const slot = data?.parking?.pricing?.find((slot) => slot.month === month);
  const foundBand = slot.days[parseInt(day) - 1];
  const band = data?.parking?.bands?.find((b) => b.name == foundBand);
  const totalDays =
    moment(selectedDate?.to).diff(moment(selectedDate?.from), "days") + 1;
  const priceFirstAttempt = band?.price[totalDays - 1];
  if (priceFirstAttempt) {
    return priceFirstAttempt;
  }
  const priceSecondAttempt = band?.price[band?.price?.length - 1];
  const increment = band?.increment;
  const totalPrice =
    priceSecondAttempt + increment * (totalDays - band?.price?.length);
  return totalPrice;
};

// handle get total price for booking
export const handleSummaryPrice = (
  data,
  selectedDate,
  promoCode,
  promoCodeOptios
) => {
  const price = handleGetPriceForBooking(selectedDate, data);
  let totalPrice = 0;
  for (let i = 0; i < data?.fees?.length; i++) {
    const fee = data?.fees[i];
    if (fee?.type === "percentage") {
      totalPrice = price + (price * fee?.amount) / 100;
    } else {
      totalPrice = price + fee?.amount;
    }
  }
  if (promoCode) {
    const discount = promoCodeOptios?.find(
      (option) => option?.code === promoCode
    );
    if (discount) {
      if (discount?.type === "percentage") {
        totalPrice = totalPrice - (totalPrice * discount?.discount) / 100;
      } else {
        totalPrice = totalPrice - discount?.discount;
      }
    } else {
      return totalPrice;
    }
  }
  return totalPrice;
};
export const getYearOptions = (previousYear = 1950) => {
  const yearOptions = Array.from(
    { length: new Date().getFullYear() - previousYear },
    (_, i) => previousYear + i
  );
  return yearOptions.map((year) => ({
    label: year,
    value: year,
  }));
};

export const handleArrivalTimeValidation = (
  newTime,
  minutes,
  setError = () => {},
  setArrivalTime = () => {}
) => {
  const selectedTime = new Date(newTime).getTime();
  const minAllowedTime = Date.now() + minutes * 60 * 1000;

  console.log(selectedTime, minAllowedTime);
  if (selectedTime < minAllowedTime) {
    setArrivalTime(newTime);
    setError(`Please select a time at least ${minutes} minutes from now.`);
    return false;
  }
  setArrivalTime(newTime);
  setError(""); // Clear error if valid
  return true;
};

export const getOptionValue = (options, value, key = "value") => {
  if (!options || options?.length === 0) return null;
  const foundOption = options?.find((option) => option?.[key] === value);
  if (foundOption) {
    return foundOption;
  }
  return options?.[0];
};

export const setQueryString = (params, url = "") => {
  const baseUrl = BaseURL(url);
  return baseUrl + "?" + new URLSearchParams(params).toString();
};
