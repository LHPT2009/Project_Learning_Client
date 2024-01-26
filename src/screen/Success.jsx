import React from 'react';
import { Button, Result } from 'antd';
export default function Success() {
  return (
    <div
      style={{
        background: '#ECF3F4',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ borderRadius: '20px', background: '#FFF', width: '600px' }}>
        <Result
          status="success"
          title="Successfully Booking"
          subTitle="Transaction number: 2017182818828182881 "
          extra={[
            <Button key="console" style={{ background: '#00ADB3', color: 'white' }}>
              Xem lịch sử đặt lịch
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}
