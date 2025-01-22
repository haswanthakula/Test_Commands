import React from 'react';
import { Layout, Menu, ConfigProvider, Button } from 'antd';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeOutlined,
  ExperimentOutlined,
  TrophyOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  ContactsOutlined,
  ToolOutlined,
  ProjectOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useTheme } from './context/ThemeContext';

import Home from './pages/Home';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import Skills from './pages/Skills';

const { Header, Content } = Layout;

const App = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme, theme } = useTheme();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/skills',
      icon: <ToolOutlined />,
      label: <Link to="/skills">Skills</Link>,
    },
    {
      key: '/experience',
      icon: <ExperimentOutlined />,
      label: <Link to="/experience">Experience</Link>,
    },
    {
      key: '/education',
      icon: <BookOutlined />,
      label: <Link to="/education">Education</Link>,
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: <Link to="/projects">Projects</Link>,
    },
    {
      key: '/achievements',
      icon: <TrophyOutlined />,
      label: <Link to="/achievements">Achievements</Link>,
    },
    {
      key: '/certifications',
      icon: <SafetyCertificateOutlined />,
      label: <Link to="/certifications">Certifications</Link>,
    },
    {
      key: '/contact',
      icon: <ContactsOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ 
        minHeight: '100vh',
        background: isDarkMode ? '#1f1f1f' : '#f5f5f5'
      }}>
        <Header 
          style={{ 
            padding: '0 16px', 
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: isDarkMode ? '#1f1f1f' : '#ffffff',
            borderBottom: `1px solid ${isDarkMode ? '#303030' : '#e8e8e8'}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ 
              flex: 1,
              minWidth: 0,
              justifyContent: 'center',
              border: 'none',
              background: 'transparent'
            }}
            theme={isDarkMode ? 'dark' : 'light'}
          />
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={toggleTheme}
            style={{ 
              fontSize: '18px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.token.colorText
            }}
          />
        </Header>
        <Content 
          style={{ 
            padding: '24px',
            background: isDarkMode ? '#1f1f1f' : '#f5f5f5',
            minHeight: 'calc(100vh - 64px)',
            '@media screen and (max-width: 768px)': {
              padding: '16px'
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              style={{
                background: isDarkMode ? '#1f1f1f' : '#f5f5f5',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
