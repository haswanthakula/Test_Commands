import React from 'react';
import { Typography, Card, Timeline, Tag } from 'antd';
import { 
  BookOutlined,
  BuildOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const education = [
  {
    degree: 'B.Tech',
    school: 'Aditya College of Engineering & Technology, Surampalem, AP',
    cgpa: '7.59',
    year: '2020 - 2024',
    icon: <BookOutlined style={{ fontSize: '24px' }} />
  },
  {
    degree: 'Intermediate',
    school: 'Tirumala Junior Kalasala, Katheru, Rajamahendravaram, AP',
    cgpa: '9.44',
    year: '2018 - 2020',
    icon: <BuildOutlined style={{ fontSize: '24px' }} />
  },
  {
    degree: 'School',
    school: 'Tirumala Proactive (EM) High School, Katheru, Rajamahendravaram, AP',
    cgpa: '10.0',
    year: '2017 - 2018',
    icon: <ReadOutlined style={{ fontSize: '24px' }} />
  }
];

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title level={2}>Education</Title>
      
      <Timeline
        mode="alternate"
        items={education.map((edu, index) => ({
          children: (
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
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
                <Title level={4} style={{ margin: 0 }}>{edu.degree}</Title>
                <Text strong>{edu.school}</Text>
                <br />
                <Text type="secondary">{edu.year}</Text>
                <br />
                <Tag color="blue">CGPA: {edu.cgpa}</Tag>
              </Card>
            </motion.div>
          ),
          dot: edu.icon
        }))}
      />
    </motion.div>
  );
};

export default Education;
