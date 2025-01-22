import React, { useRef } from 'react';
import { Typography, Input, Button, Card, message } from 'antd';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm('service_w0brudi', 'template_u3iatzi', form.current, {
        publicKey: 'RwjP2wZEUkFove_K9',
      })
      .then(
        () => {
          message.success('Message sent successfully!');
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          message.error('Failed to send message. Please try again.');
        },
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Title level={2}>Contact Me</Title>
      
      <Card style={{ marginTop: 24 }}>
        <Text style={{ marginBottom: 24, display: 'block' }}>
          Feel free to reach out! I'll get back to you as soon as possible.
        </Text>

        <form ref={form} onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <Text strong>Name</Text>
            <Input
              name="user_name"
              size="large"
              placeholder="Your name"
              required
              style={{ marginTop: 8 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <Text strong>Email</Text>
            <Input
              name="user_email"
              type="email"
              size="large"
              placeholder="Your email"
              required
              style={{ marginTop: 8 }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Text strong>Message</Text>
            <TextArea
              name="message"
              rows={4}
              placeholder="Your message"
              required
              style={{ marginTop: 8, resize: 'none' }}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            Send Message
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default Contact;
