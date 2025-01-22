import React from 'react';
import { Typography, Timeline, Card } from 'antd';
import { 
  CodeOutlined,
  CloudOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const experiences = [
  {
    title: 'Java Full Stack Developer Intern',
    company: 'Ennea Solutions Company',
    location: 'Jubilee Hills, Hyderabad',
    period: 'Nov 2024 - Present',
    description: 'Contributing as an intern to developing responsive web interfaces using HTML, CSS, and JavaScript while building and deploying interactive web applications. Currently learning and working on back-end technologies like Java, Spring, Hibernate, and relational databases.',
    icon: <CodeOutlined style={{ fontSize: '24px' }} />,
  },
  {
    title: 'AWS Cloud Intern',
    company: 'F13 Technologies',
    location: 'Remote',
    period: 'May 2023 – Aug 2023',
    description: 'Worked as an intern to develop and deploy a machine learning-powered movie recommendation system using Amazon Personalize. Gained experience in configuring EC2 instances, VPCs, subnets, and load balancers while collaborating with and guiding a team of four interns.',
    icon: <CloudOutlined style={{ fontSize: '24px' }} />,
  },
  {
    title: 'AWS & DevOps Trainee',
    company: 'Technical Hub',
    location: 'Surampalem',
    period: 'Jun 2023 - Jul 2023',
    description: 'Trained in AWS cloud services and DevOps tools, gaining hands-on experience with EC2, VPC, and containerization technologies.',
    icon: <ToolOutlined style={{ fontSize: '24px' }} />,
  }
];

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title level={2}>Professional Experience</Title>
      
      <Timeline
        mode="alternate"
        items={experiences.map((exp, index) => ({
          children: (
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <Title level={4}>{exp.title}</Title>
                <Text strong>{exp.company}</Text>
                <br />
                <Text type="secondary">{exp.location}</Text>
                <br />
                <Text type="secondary">{exp.period}</Text>
                <p>{exp.description}</p>
              </Card>
            </motion.div>
          ),
          dot: exp.icon,
        }))}
      />
    </motion.div>
  );
};

export default Experience;
