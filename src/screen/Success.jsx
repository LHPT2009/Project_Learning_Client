import React, { useEffect, useState } from 'react';
import { Button, Image, Space, Typography } from 'antd';
import SuccessImage from '../asset/image/Success.png';
import DeleteImage from '../asset/image/Delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionCallback } from '../features/Transaction/transactionSlice';

const { Title } = Typography;

export default function Success() {
  const [checkVnp, setCheckVnp] = useState();
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);

  const requestData = useSelector((state) => state.booking.tempBooking);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadVNP = () => {
    const vnp = params.get('vnp_ResponseCode');
    setCheckVnp(vnp);
    dispatch(fetchTransactionCallback({ vnp: vnp, data: requestData }));
  };

  useEffect(() => {
    loadVNP();
  }, []);

  if (checkVnp == '00') {
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
  } else {
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
            src={DeleteImage}
            style={{ width: '237px', height: '237px' }}
          />
          <Title level={2} style={{ lineHeight: '15px' }}>
            Đặt lịch không thành công!
          </Title>
          <Button type="primary" size="large" style={{ backgroundColor: '#00ADB3' }}>
            Trở lại trang chủ
          </Button>
        </Space>
      </div>
    );
  }
}
