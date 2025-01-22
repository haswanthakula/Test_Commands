import React from 'react';
import { Typography, Card, Row, Col, Image } from 'antd';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const certifications = [
  {
    title: 'AWS Academy Cloud Foundations',
    description: 'Learned core AWS cloud concepts, services, and best practices, preparing for roles in cloud operations and solutions architecture.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/awsc.jpg'
  },
  {
    title: 'MTA Introduction to Programming Using Python',
    description: 'Mastered the basics of Python programming, including syntax, problem-solving, and algorithm design, to build beginner-level software applications.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/pyc.png'
  },
  {
    title: 'Oracle Java Certificate',
    description: 'Acquired in-depth knowledge of Java programming, covering object-oriented concepts, data structures, and application development for real-world scenarios.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/jac.jpg'
  },
  {
    title: 'NDG Linux-certificate',
    description: 'Developed foundational Linux skills, including system management, shell scripting, and command-line operations, essential for IT and DevOps roles.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/lic.jpg'
  },
  {
    title: 'Epam Systems Cloud & DevOps',
    description: 'Gained hands-on expertise in cloud infrastructure management and DevOps practices, focusing on modern tools and methodologies to streamline software delivery.',
    image: 'https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/epc.jpg'
  }
];

const Certifications = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '24px' }}
    >
      <Title level={2} style={{ marginBottom: '32px' }}>Certifications</Title>
      
      <Row gutter={[24, 24]}>
        {certifications.map((cert, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hoverable
                style={{
                  height: '100%',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f0f2f5 100%)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
                cover={
                  <div style={{ 
                    height: '200px',
                    overflow: 'hidden',
                    background: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px'
                  }}>
                    <Image
                      alt={cert.title}
                      src={cert.image}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain'
                      }}
                      preview={{
                        mask: <div style={{ fontSize: '16px' }}>View Certificate</div>
                      }}
                    />
                  </div>
                }
              >
                <Title level={4} style={{ marginBottom: '12px' }}>{cert.title}</Title>
                <Text type="secondary">{cert.description}</Text>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </motion.div>
  );
};

export default Certifications;
