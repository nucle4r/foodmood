import { Platform } from "react-native";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/captionizr/upload";
const UPLOAD_PRESET = "eye6sbx4";

const getMimeType = (fileType) => {
  switch (fileType.toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "png":
      return `image/${fileType}`;
    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
    case "flv":
    case "wmv":
    case "m4v":
    case "webm":
      return `video/${fileType}`;
    default:
      return `application/octet-stream`; // Default for unsupported or unknown file types
  }
};

const uploadAsset = async (asset) => {
  const fileType = asset.uri.split(".").pop();
  const mimeType = getMimeType(fileType);
  const formData = new FormData();
  formData.append("file", {
    uri:
      Platform.OS === "android" ? asset.uri : asset.uri.replace("file://", ""),
    name: `upload.${fileType}`,
    type: mimeType,
  });
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = await response.json();
    return data.secure_url; // Return the URL directly from this function
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    throw err;
  }
};

const uploadAssets = async (assets) => {
  const uploadPromises = assets.map((asset) => uploadAsset(asset));
  const urls = await Promise.all(uploadPromises);
  return urls; // This will be an array of URLs
};

export default {
  uploadAssets,
};
