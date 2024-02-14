import React, { useEffect, useState } from 'react';
import { Result, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    showLoader();
  }, []);

  const [spinning, setSpinning] = useState(true);

  const showLoader = () => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  return (
    <div
      style={{
        color: '#fff',
        height: '80vh',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, những chúng tôi không tìm thấy trang của bạn."
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => navigate('/')}
            style={{ backgroundColor: '#00ADB3' }}
          >
            Trở về trang chủ
          </Button>
        }
      />
    </div>
  );
}
