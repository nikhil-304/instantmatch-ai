import React from "react";
import { Input, Select, Card, Typography } from "antd";
import { FileTextOutlined, TagOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface JobInputProps {
  jobTitle: string;
  setJobTitle: (value: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
}

export const JobInput: React.FC<JobInputProps> = ({
  jobTitle,
  setJobTitle,
  keywords,
  setKeywords,
}) => {
  const handleKeywordsChange = (value: string[]) => {
    setKeywords(value.join(","));
  };

  // Convert comma-separated string back to array for the Select component
  const keywordList = keywords ? keywords.split(",").filter((k) => k) : [];

  return (
    <Card
      className="shadow-sm border-gray-200"
      title={
        <>
          <FileTextOutlined className="mr-2 text-blue-600" /> Define Position
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <Text strong className="block mb-2">
            Job Title <span className="text-red-500">*</span>
          </Text>
          <Input
            size="large"
            placeholder="e.g. Senior Frontend Developer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            prefix={<FileTextOutlined className="text-gray-400" />}
          />
        </div>

        <div>
          <Text strong className="block mb-2">
            Required Skills / Keywords
          </Text>
          <Select
            mode="tags"
            size="large"
            style={{ width: "100%" }}
            placeholder="Type and press enter to add skills (e.g. React, TypeScript)"
            value={keywordList}
            onChange={handleKeywordsChange}
            tokenSeparators={[","]}
            suffixIcon={<TagOutlined className="text-gray-400" />}
          />
          <Text type="secondary" className="text-xs mt-1 block">
            AI will automatically infer additional skills from the job title if
            left blank.
          </Text>
        </div>
      </div>
    </Card>
  );
};
