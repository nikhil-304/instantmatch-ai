import React from "react";
import { Upload, Card, message, Typography } from "antd";
import {
  InboxOutlined,
  FilePdfOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

const { Dragger } = Upload;
const { Text } = Typography;

interface ResumeUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  files,
  setFiles,
}) => {
  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    showUploadList: false, // We'll render our own list or rely on Antd's if we pass fileList
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error(`${file.name} is not a PDF file`);
        return Upload.LIST_IGNORE;
      }

      if (files.length >= 5) {
        message.warning("You can only upload a maximum of 5 files");
        return Upload.LIST_IGNORE;
      }

      setFiles([...files, file]);
      return false; // Prevent auto upload
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <Card
      className="shadow-sm border-gray-200 h-full"
      title={
        <>
          <InboxOutlined className="mr-2 text-blue-600" /> Upload Resumes
        </>
      }
    >
      <div className="mb-6">
        <Dragger
          {...uploadProps}
          style={{
            padding: "32px 0",
            background: "#fafafa",
            border: "1px dashed #d9d9d9",
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ color: "#1677ff" }} />
          </p>
          <p className="ant-upload-text">
            Click or drag PDF resumes to this area
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <Text
            type="secondary"
            className="uppercase text-xs font-semibold tracking-wider"
          >
            Selected Files ({files.length}/5)
          </Text>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <FilePdfOutlined className="text-red-500 text-lg" />
                <span className="text-gray-700 font-medium truncate max-w-[200px]">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <DeleteOutlined />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
