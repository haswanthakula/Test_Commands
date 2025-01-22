import React from 'react';
import { Typography, Card, Row, Col, Image } from 'antd';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const projects = [
  {
    title: 'Front-End Development Projects: HTML, CSS, JS',
    description: 'Developed a responsive calculator application, a two-player Tic Tac Toe game with reset functionality, and an interactive to-do list app for managing tasks.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/fro.webp'
  },
  {
    title: 'Market Basket Analysis Using Deep Learning Techniques',
    description: 'Predicted next-item purchases with 85% accuracy using a CNN-LSTM model, revealing customer behavior patterns, Using Apriori and FP-Growth algorithms.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/mar.webp'
  },
  {
    title: 'AWS Project: EC2, RDS, S3, VPC',
    description: 'The project involved using services like EC2 instances, VPC, RDS, AutoScallingGroups, and Load Balancers to connect to a MySQL Server.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/aws.webp'
  },
  {
    title: 'React Project',
    description: 'Developed a dynamic food ordering application using React.js, leveraging the Context API for efficient global state management and fetching data from a backend REST API.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/rea.png'
  }
];

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title level={2}>Projects</Title>
      
      <Row gutter={[16, 16]}>
        {projects.map((project, index) => (
          <Col xs={24} sm={12} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hoverable
                cover={
                  <Image
                    alt={project.title}
                    src={project.image}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
              >
                <Title level={4}>{project.title}</Title>
                <Text>{project.description}</Text>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

export default Projects;
