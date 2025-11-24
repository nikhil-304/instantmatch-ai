import React from 'react';
import { Button, Typography, Card, Row, Col, Space } from 'antd';
import { RocketOutlined, FileSearchOutlined, ThunderboltOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>
        {`
          @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .scanning-line {
            position: absolute;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, transparent, #1677ff, transparent);
            box-shadow: 0 0 10px #1677ff;
            animation: scan 3s linear infinite;
          }
          .floating-card {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
      {/* Navbar */}
      <div className="w-full px-8 py-6 flex justify-between items-center border-b border-gray-100">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <ThunderboltOutlined /> InstantMatch
        </div>
        <Button type="primary" size="large" onClick={onGetStarted}>
          Get Started
        </Button>
      </div>

      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center px-8 py-12">
        <Row gutter={[48, 48]} align="middle" className="max-w-7xl w-full">
          <Col xs={24} md={12}>
            <div className="space-y-6">
              <Title level={1} style={{ fontSize: '3.5rem', marginBottom: 0, lineHeight: 1.2 }}>
                Hire the Best, <br />
                <span className="text-blue-600">Instantly.</span>
              </Title>
              <Paragraph className="text-lg text-gray-500 max-w-lg">
                Stop sifting through hundreds of resumes. Our AI analyzes candidates against your job description and ranks them by relevance in seconds.
              </Paragraph>
              <div className="flex gap-4">
                <Button type="primary" size="large" icon={<RocketOutlined />} onClick={onGetStarted} style={{ height: '50px', padding: '0 32px', fontSize: '18px' }}>
                  Start Hiring Now
                </Button>
                <Button size="large" style={{ height: '50px', padding: '0 32px', fontSize: '18px' }}>
                  Learn More
                </Button>
              </div>

              <div className="pt-8 grid grid-cols-3 gap-8">
                <div>
                  <Title level={3} style={{ margin: 0, color: '#1677ff' }}>50%</Title>
                  <Paragraph type="secondary">Faster Hiring</Paragraph>
                </div>
                <div>
                  <Title level={3} style={{ margin: 0, color: '#1677ff' }}>99%</Title>
                  <Paragraph type="secondary">Accuracy</Paragraph>
                </div>
                <div>
                  <Title level={3} style={{ margin: 0, color: '#1677ff' }}>24/7</Title>
                  <Paragraph type="secondary">Availability</Paragraph>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} className="flex justify-center">
            <div className="relative w-80 h-96 floating-card">
               {/* Resume Card */}
               <div className="absolute inset-0 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4 z-10 overflow-hidden">
                  <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-px bg-gray-100 my-2"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-100 rounded"></div>
                    <div className="w-5/6 h-3 bg-gray-100 rounded"></div>
                    <div className="w-4/6 h-3 bg-gray-100 rounded"></div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="w-1/4 h-3 bg-blue-100 rounded"></div>
                    <div className="w-full h-3 bg-gray-100 rounded"></div>
                    <div className="w-full h-3 bg-gray-100 rounded"></div>
                  </div>
                  {/* Scanning Line */}
                  <div className="scanning-line"></div>
               </div>
               {/* Background Elements */}
               <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
               <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl"></div>

               {/* Match Badge */}
               <div className="absolute -right-8 top-12 bg-white p-3 rounded-lg shadow-lg z-20 animate-bounce">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <ThunderboltOutlined />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Match Score</div>
                      <div className="font-bold text-green-600">98%</div>
                    </div>
                  </div>
               </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Title level={2}>Why InstantMatch?</Title>
            <Paragraph className="text-lg text-gray-500">Everything you need to streamline your recruitment process.</Paragraph>
          </div>

          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl text-blue-600 mb-4"><FileSearchOutlined /></div>
                <Title level={4}>Smart Parsing</Title>
                <Paragraph type="secondary">
                  Automatically extract key details from PDF resumes including contact info and skills.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl text-blue-600 mb-4"><ThunderboltOutlined /></div>
                <Title level={4}>Instant Ranking</Title>
                <Paragraph type="secondary">
                  Get a sorted list of candidates based on how well they match your specific job requirements.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl text-blue-600 mb-4"><RocketOutlined /></div>
                <Title level={4}>AI-Powered</Title>
                <Paragraph type="secondary">
                  Leverage Google Gemini's advanced language models to understand context beyond just keywords.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-8 text-center border-t border-gray-100">
        <div className="mb-4">
          <Space size="large">
            <a href="https://x.com/NikhilShri304" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 text-2xl transition-colors">
              <TwitterOutlined />
            </a>
            <a href="https://linkedin.com/nikhil304" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-2xl transition-colors">
              <LinkedinOutlined />
            </a>
          </Space>
        </div>
        <Typography.Text type="secondary">
          InstantMatch ©2025 Created by <strong>Nikhil Shrivastava</strong>
        </Typography.Text>
      </div>
    </div>
  );
};
