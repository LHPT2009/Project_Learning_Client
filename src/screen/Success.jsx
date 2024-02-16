import React, { useEffect, useState } from 'react';
import { Button, Image, Space, Typography, Spin, Result } from 'antd';
import SuccessImage from '../asset/image/Success.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionCallback } from '../features/Transaction/transactionSlice';
import { clearInfoBooking, clearTempBooking } from '../features/Booking/bookingSlice';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;

export default function Success() {
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (spinning == false) {
      loadVNP();
    }
  });
  const { t } = useTranslation();
  const [spinning, setSpinning] = useState(true);

  const { statuspayment } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const requestData = useSelector((state) => state.booking.tempBooking);

  const vnp = params.get('vnp_ResponseCode');

  const loadVNP = async () => {
    if (statuspayment == 'cash' && requestData !== null) {
      console.log('Cash đang làm việc!');
      dispatch(clearInfoBooking());
      dispatch(clearTempBooking());
    } else if (statuspayment == 'vnpay' && vnp !== null && requestData !== null) {
      if (vnp !== '24') {
        console.log('Vnpay đang làm việc!');
        dispatch(fetchTransactionCallback({ vnp: vnp, data: requestData }));
        dispatch(clearInfoBooking());
        dispatch(clearTempBooking());
      } else {
        console.log('Vào Vnpay nhưng ko làm việc!');
      }
    } else {
      console.log('dữ liệu gửi đi bị rổng!');
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  if (statuspayment == 'cash') {
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
            {t('description.columncontent.success.title')}
            </Title>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/')}
              style={{ backgroundColor: '#00ADB3' }}
            >
              {t('description.columncontent.success.buttonback')}
            </Button>
          </Space>
        </div>
      </div>
    );
  } else if (statuspayment == 'vnpay') {
    if (vnp !== '24' && vnp !== null) {
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
              {t('description.columncontent.success.title')}
              </Title>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate('/')}
                style={{ backgroundColor: '#00ADB3' }}
              >
                 {t('description.columncontent.success.buttonback')}
              </Button>
            </Space>
          </div>
        </div>
      );
    } else if (vnp == '24' && vnp !== null) {
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
          {/* <Spin
            spinning={spinning}
            indicator={antIcon}
            fullscreen
            style={{ background: '#ECF3F4' }}
          /> */}
          <Result
            status="error"
            title="Thanh toán đã bị hủy!"
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => navigate('/booking')}
                style={{ backgroundColor: '#00ADB3' }}
              >
                {t('description.columncontent.success.buttonbackbooking')}
              </Button>
            }
          />
        </div>
      );
    } else if (vnp == null) {
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
          {/* <Spin
            spinning={spinning}
            indicator={antIcon}
            fullscreen
            style={{ background: '#ECF3F4' }}
          /> */}
          <Result status="info" title="Mời bạn chờ đến bước thanh toán tiếp theo..." />
        </div>
      );
    }
  }
}
