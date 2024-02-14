import React, { useEffect, useState } from 'react';
import { Button, Image, Space, Typography, Spin, Result } from 'antd';
import SuccessImage from '../asset/image/Success.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionCallback } from '../features/Transaction/transactionSlice';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function Success() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const requestData = useSelector((state) => state.booking.tempBooking);

  const checkStatus = params.get('status');
  const checkPayment = params.get('payment');

  const loadVNP = () => {
    if (checkStatus == 'Success' && checkPayment == 'Cash') {
      console.log('thanh toan tien mat');
    } else if (checkStatus == 'Success' && checkPayment == 'Vnpay') {
      const vnp = params.get('vnp_ResponseCode');
      dispatch(fetchTransactionCallback({ vnp: vnp, data: requestData }));
    }
  };

  useEffect(() => {
    loadVNP();
    showLoader();
  }, []);

  const [spinning, setSpinning] = useState(true);

  const showLoader = () => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  if (checkStatus == 'Success' && checkPayment) {
    return (
      <div>
        <Spin
          spinning={spinning}
          indicator={antIcon}
          fullscreen
          style={{ background: '#ECF3F4' }}
        />
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
              preview={false}
            />
            <Title level={2} style={{ lineHeight: '15px' }}>
              Bạn đã đặt lịch thành công!
            </Title>
            <Button type="primary" size="large" style={{ backgroundColor: '#00ADB3' }}>
              Trở lại trang chủ
            </Button>
          </Space>
        </div>
      </div>
    );
  } else if (checkStatus == 'Processing') {
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
        <Spin
          spinning={spinning}
          indicator={antIcon}
          fullscreen
          style={{ background: '#ECF3F4' }}
        />
        <Result status="info" title="Mời bạn chờ đến bước thanh toán tiếp theo..." />
      </div>
    );
  } else {
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
        <Spin
          spinning={spinning}
          indicator={antIcon}
          fullscreen
          style={{ background: '#ECF3F4' }}
        />
        <Result
          status="warning"
          title="Bạn vẫn chưa thông tin đặt"
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
}
