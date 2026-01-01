export const CURRENCY = "$";
export var recordsLimit = 10;
export var recordsLimit50 = 50;
export const googleMapApiKey = "";

export const falsyArray = [
  null,
  undefined,
  "",
  0,
  false,
  NaN,
  "null",
  "undefined",
  "false",
  "0",
  "NaN",
];
export const fileTypesAllowed = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const videoFileTypes = ["mp4", "mpeg", "quicktime"];

export const allowedFileTypes = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "image/*": [".png", ".jpeg", ".jpg"],
};
export const allowedDocTypes = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};
export const allowedImageTypes = {
  "image/*": [".png", ".jpeg", ".jpg", ".jfif", ".webp"],
};

