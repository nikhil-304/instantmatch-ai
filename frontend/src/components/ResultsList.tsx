import React from "react";
import { Card, Progress, Tag, Typography, Button, Row, Col } from "antd";
import { MailOutlined, PhoneOutlined, TrophyOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

interface Candidate {
  name: string;
  email?: string;
  phone?: string;
  skills: string[];
  match_score: number;
  summary?: string;
}

interface ResultsListProps {
  results: Candidate[];
  isLoading: boolean;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  results,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="py-12 text-center">
        {/* You could use a Lottie loader here too */}
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <Title level={4} style={{ color: "#1677ff" }}>
          Analyzing Resumes...
        </Title>
        <Text type="secondary">
          Our AI is reading and ranking your candidates.
        </Text>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  // Sort candidates by match score (descending)
  const sortedResults = [...results].sort(
    (a, b) => b.match_score - a.match_score
  );

  return (
    <div className="mt-12">
      <Title level={3} className="mb-6">
        Analysis Results
      </Title>

      <Row gutter={[24, 24]}>
        {sortedResults.map((candidate, index) => (
          <Col xs={24} key={index}>
            <Card
              hoverable
              className="border-gray-200 shadow-sm"
              bodyStyle={{ padding: "24px" }}
            >
              <Row gutter={24} align="middle">
                {/* Score Section */}
                <Col
                  xs={24}
                  md={4}
                  className="flex flex-col items-center justify-center border-r border-gray-100"
                >
                  <Progress
                    type="circle"
                    percent={candidate.match_score}
                    strokeColor={
                      candidate.match_score >= 80
                        ? "#52c41a"
                        : candidate.match_score >= 60
                        ? "#faad14"
                        : "#ff4d4f"
                    }
                    size={80}
                  />
                  <Text
                    type="secondary"
                    className="mt-2 text-xs uppercase tracking-wide"
                  >
                    Match Score
                  </Text>
                </Col>

                {/* Details Section */}
                <Col xs={24} md={20}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Title level={4} style={{ margin: 0 }}>
                        {candidate.name}
                      </Title>
                      <div className="flex gap-4 mt-1 text-gray-500 text-sm">
                        {candidate.email && (
                          <span>
                            <MailOutlined /> {candidate.email}
                          </span>
                        )}
                        {candidate.phone && (
                          <span>
                            <PhoneOutlined /> {candidate.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button type="default">View Profile</Button>
                  </div>

                  <Paragraph className="text-gray-600 my-4 bg-gray-50 p-3 rounded border border-gray-100 italic">
                    <TrophyOutlined className="mr-2 text-yellow-500" />
                    {candidate.summary || "No summary available."}
                  </Paragraph>

                  <div>
                    <Text
                      strong
                      className="text-xs uppercase text-gray-400 mr-2"
                    >
                      Detected Skills:
                    </Text>
                    {candidate.skills.map((skill, i) => (
                      <Tag key={i} color="blue" className="mb-1">
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
