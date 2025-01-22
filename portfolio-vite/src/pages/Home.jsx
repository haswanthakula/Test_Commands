import React from 'react';
import { Typography, Space, Card, Row, Col, Image, Button } from 'antd';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  GithubOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useTheme } from '../context/ThemeContext';

const { Title, Text, Paragraph } = Typography;

const Home = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Header Section */}
        <Row justify="center" align="middle" style={{ minHeight: '40vh' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Image
                src="https://raw.githubusercontent.com/haswanthakula/Haswanth_Portfolio/main/src/assets/h.jpeg"
                alt="Haswanth"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `4px solid ${theme.token.colorBorder}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  marginBottom: '24px'
                }}
              />
            </motion.div>
            
            <Title level={1} style={{ marginBottom: 8, color: theme.token.colorText }}>
              <TypeAnimation
                sequence={[
                  'Hi, I\'m Haswanth',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={1}
              />
            </Title>
            
            <Title level={3} style={{ marginTop: 0, color: theme.token.colorPrimary }}>
              <TypeAnimation
                sequence={[
                  500,
                  'Java Full-Stack Developer',
                  1000,
                  'AWS Cloud Developer',
                  1000,
                  'DevOps Engineer',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ display: 'inline-block' }}
                repeat={Infinity}
              />
            </Title>

            {/* Social Links */}
            <Space size="large" style={{ marginTop: '24px' }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  type="text" 
                  icon={<GithubOutlined style={{ fontSize: '24px', color: theme.token.colorText }} />}
                  href="https://github.com/haswanthakula"
                  target="_blank"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  type="text" 
                  icon={<LinkedinOutlined style={{ fontSize: '24px', color: theme.token.colorText }} />}
                  href="#"
                  target="_blank"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  type="text" 
                  icon={<WhatsAppOutlined style={{ fontSize: '24px', color: theme.token.colorText }} />}
                  href="https://wa.me/+917207009566"
                  target="_blank"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  type="text" 
                  icon={<PhoneOutlined style={{ fontSize: '24px', color: theme.token.colorText }} />}
                  href="tel:+917207009566"
                />
              </motion.div>
            </Space>
          </Col>
        </Row>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card 
            style={{ 
              maxWidth: 800, 
              margin: '0 auto', 
              textAlign: 'left',
              background: theme.token.colorBgContainer,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: `1px solid ${theme.token.colorBorder}`
            }}
          >
            <Paragraph style={{ color: theme.token.colorText }}>
              Hi, I'm Haswanth, a 2024 B.Tech IT graduate with experience as an AWS Cloud Intern, gaining expertise in services like EC2 and VPC.
              Currently, I'm enhancing my skills in Java Full Stack development at Ennea Solutions Private Limited, focusing on frontend (HTML, CSS, JavaScript) and backend technologies. 
              I'm passionate about creating efficient and scalable solutions that make a difference. From working on frontend development to exploring cloud services and DevOps practices, 
              I've embraced every opportunity to grow and improve my skills.
            </Paragraph>
            <Space>
              <Text strong style={{ color: theme.token.colorText }}>Email:</Text>
              <Text style={{ color: theme.token.colorText }}>haswanthakula5@gmail.com</Text>
            </Space>
            <br />
            <Space>
              <Text strong style={{ color: theme.token.colorText }}>Phone:</Text>
              <Text style={{ color: theme.token.colorText }}>+91 7207009566</Text>
            </Space>
          </Card>
        </motion.div>
      </Space>
    </motion.div>
  );
};

export default Home;
