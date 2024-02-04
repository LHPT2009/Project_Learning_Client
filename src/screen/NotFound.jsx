import React, { useEffect } from 'react';
import { Result } from 'antd';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, những chúng tôi không tìm thấy trang của bạn."
      />
    </div>
  );
}
