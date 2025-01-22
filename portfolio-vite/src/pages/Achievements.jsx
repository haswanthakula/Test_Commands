import React from 'react';
import { Typography, Card, Space } from 'antd';
import { TrophyOutlined, CrownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const achievements = [
  {
    title: 'Hackathon Web Development',
    organization: 'Teks Academy',
    award: 'Bronze Medal',
    icon: <TrophyOutlined style={{ fontSize: '24px', color: '#cd7f32' }} />,
  },
  {
    title: "Programmers' Day Event",
    organization: "Programmers' Day by Technical Hub",
    award: 'Certificate of Active Participation',
    description: 'Received Certificate of Active Participation for engaging in activities and coding events.',
    icon: <CrownOutlined style={{ fontSize: '24px', color: '#ffd700' }} />,
  }
];

const Achievements = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Achievements</Title>
        
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card
              hoverable
              style={{ 
                background: 'linear-gradient(145deg, #ffffff 0%, #f0f2f5 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <Space align="start">
                {achievement.icon}
                <div>
                  <Title level={4} style={{ margin: 0 }}>{achievement.title}</Title>
                  <Text strong>{achievement.organization}</Text>
                  <br />
                  <Text type="success">{achievement.award}</Text>
                  {achievement.description && (
                    <>
                      <br />
                      <Text>{achievement.description}</Text>
                    </>
                  )}
                </div>
              </Space>
            </Card>
          </motion.div>
        ))}
      </Space>
    </motion.div>
  );
};

export default Achievements;
