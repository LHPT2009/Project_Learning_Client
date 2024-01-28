import React from 'react';
import { Button, Image, Space, Typography } from 'antd';
import SuccessImage from '../asset/image/Success.png';

const { Title } = Typography;

export default function Success() {
  return (
    <div
      style={{
        background: '#ECF3F4',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Space
        direction="vertical"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          key="custom-image"
          alt="Custom Image"
          src={SuccessImage}
          style={{ width: '237px', height: '237px' }}
        />
        <Title level={2} style={{ lineHeight: '15px' }}>
          Bạn đã đặt lịch thành công!
        </Title>
        <Button type="primary" size="large" style={{ backgroundColor: '#00ADB3' }}>
          Trở lại trang chủ
        </Button>
      </Space>
    </div>
  );
}
