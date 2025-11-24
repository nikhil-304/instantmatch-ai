import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Row, Col, message } from 'antd';
import { ThunderboltOutlined, ReloadOutlined } from '@ant-design/icons';
import { JobInput } from './JobInput';
import { ResumeUpload } from './ResumeUpload';
import { ResultsList } from './ResultsList';
import { ApiKeyModal } from './ApiKeyModal';
import { analyzeResumes } from '../api/client';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const Dashboard: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setIsModalOpen(false);
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      setIsModalOpen(true);
      return;
    }
    if (!jobTitle) {
      message.error("Please enter a job title.");
      return;
    }
    if (files.length === 0) {
      message.error("Please upload at least one resume.");
      return;
    }

    setIsLoading(true);
    setResults([]);

    try {
      const data = await analyzeResumes(jobTitle, keywords, files, apiKey);
      setResults(data.candidates);
      message.success("Analysis complete!");
    } catch (err) {
      console.error(err);
      message.error("Failed to analyze resumes. Please check your API Key and connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
        <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <ThunderboltOutlined /> InstantMatch
        </div>
        <Button
          icon={<ReloadOutlined />}
          onClick={() => window.location.reload()}
        >
          New Search
        </Button>
      </Header>

      <Content className="max-w-7xl mx-auto w-full p-8">
        <div className="mb-8">
          <Title level={2} style={{ margin: 0 }}>New Recruitment Drive</Title>
          <Typography.Text type="secondary">Define your role and upload resumes to find the best match.</Typography.Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={14}>
            <JobInput
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              keywords={keywords}
              setKeywords={setKeywords}
            />
          </Col>
          <Col xs={24} lg={10}>
            <ResumeUpload
              files={files}
              setFiles={setFiles}
            />
          </Col>
        </Row>

        <div className="mt-8 flex justify-center">
          <Button
            type="primary"
            size="large"
            onClick={handleAnalyze}
            loading={isLoading}
            disabled={files.length === 0 || !jobTitle}
            style={{ height: '50px', padding: '0 48px', fontSize: '18px' }}
          >
            {isLoading ? 'Analyzing Candidates...' : 'Analyze Candidates'}
          </Button>
        </div>

        <ResultsList results={results} isLoading={isLoading} />
      </Content>

      <Footer className="text-center text-gray-400 bg-gray-50">
        InstantMatch AI ©2025 Created by Nikhil Shrivastava
      </Footer>

      <ApiKeyModal
        isOpen={isModalOpen}
        onSave={handleSaveApiKey}
      />
    </Layout>
  );
};
