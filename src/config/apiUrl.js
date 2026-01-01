export const apiUrl = "";

export const s3Url = "";
// live url 2
export const imageUrl = (url) => `${s3Url}/${url}`;
export const mediaUrl = (url) => `${s3Url}/${url}`;

export const BaseURL = (link) => {
  return `${apiUrl}/api/v1/${link}`;
};
