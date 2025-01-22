import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import {
  CodeOutlined,
  CloudOutlined,
  ToolOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';

const { Title } = Typography;

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <LaptopOutlined />,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Ant Design', 'Responsive Design', 'TypeScript']
  },
  {
    title: 'Backend Development',
    icon: <ApiOutlined />,
    skills: ['Java', 'Python', 'Spring Boot', 'REST APIs', 'Microservices', 'Node.js']
  },
  {
    title: 'Database',
    icon: <DatabaseOutlined />,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 'Database Design', 'Redis']
  },
  {
    title: 'Cloud Services',
    icon: <CloudOutlined />,
    skills: ['AWS EC2', 'AWS VPC', 'AWS S3', 'Cloud Infrastructure', 'AWS Lambda', 'Docker']
  },
  {
    title: 'DevOps Tools',
    icon: <ToolOutlined />,
    skills: ['Git', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Linux']
  },
  {
    title: 'Programming Concepts',
    icon: <CodeOutlined />,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'System Design', 'Design Patterns', 'Clean Code']
  }
];

const Skills = () => {
  const { isDarkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="skills-container"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <Title level={2} style={{ 
        marginBottom: 32, 
        textAlign: 'center',
        color: isDarkMode ? '#ffffff' : '#000000'
      }}>
        Skills & Expertise
      </Title>
      
      <Row gutter={[24, 24]}>
        {skillCategories.map((category, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <motion.div variants={cardVariants}>
              <Card
                title={
                  <span style={{ 
                    color: '#1668dc', 
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {React.cloneElement(category.icon, { 
                      style: { fontSize: '18px' }
                    })}
                    {category.title}
                  </span>
                }
                style={{
                  height: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e8e8e8'}`
                }}
                bodyStyle={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={cardVariants}
                  >
                    <div
                      style={{
                        padding: '12px',
                        borderRadius: '4px',
                        background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5',
                        color: isDarkMode ? '#ffffff' : '#000000',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e8e8e8'}`
                      }}
                    >
                      {skill}
                    </div>
                  </motion.div>
                ))}
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

export default Skills;
