import pdfIcon from "../Assets/FilesIcon/pdf-file.svg";
import wordIcon from "../Assets/FilesIcon/word-file.svg";
import placeholder from "../Assets/FilesIcon/placeholder.svg";

// Add more mappings as needed
const fileTypeToIcon = {
  'application/pdf': pdfIcon,
  'application/msword': wordIcon,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': wordIcon,
};

export const getIconForFileType = (fileType) => {
  return fileTypeToIcon[fileType] || placeholder;
};
