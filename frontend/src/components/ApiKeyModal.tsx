import React, { useState } from 'react';
import { Modal, Input, Button, Typography, message } from 'antd';
import { KeyOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Text, Link, Paragraph } = Typography;

interface ApiKeyModalProps {
  isOpen: boolean;
  onSave: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onSave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (!apiKey.trim()) {
      message.error('Please enter a valid API Key');
      return;
    }
    onSave(apiKey.trim());
    message.success('API Key saved securely!');
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-blue-600">
          <KeyOutlined /> Enter Google Gemini API Key
        </div>
      }
      open={isOpen}
      footer={null}
      closable={false}
      maskClosable={false}
      centered
    >
      <div className="space-y-4 py-4">
        <Paragraph>
          To use InstantMatch AI, you need to provide your own Google Gemini API Key.
          This key allows the application to access Google's AI models for resume analysis.
        </Paragraph>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <Text strong className="block mb-2">How to get a key:</Text>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Go to <Link href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</Link></li>
            <li>Click "Create API key"</li>
            <li>Copy the key and paste it below</li>
          </ol>
        </div>

        <div>
          <Text strong>API Key</Text>
          <Input.Password
            placeholder="Paste your API Key here..."
            size="large"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            iconRender={(visible) => (visible ? <KeyOutlined /> : <KeyOutlined />)}
            className="mt-1"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <SafetyCertificateOutlined className="text-green-600" />
          <span>Your key is stored locally in your browser and sent directly to Google. We do not store it on our servers.</span>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={handleSave}
          disabled={!apiKey}
        >
          Save & Continue
        </Button>
      </div>
    </Modal>
  );
};
