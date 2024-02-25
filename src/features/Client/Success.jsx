import React, { useEffect, useState } from 'react';
import { Button, Image, Space, Typography, Spin, Result } from 'antd';
import SuccessImage from '../../asset/image/Success.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTransactionCallback,
  fetchUpdateScheduleStatus,
} from '../Transaction/transactionSlice';
import { clearInfoBooking, clearTempBooking } from '../Booking/bookingSlice';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../constants';
const { Title } = Typography;

export default function Success() {
  // Constants
  const { t } = useTranslation();
  const { statusPayment } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const vnp = params.get('vnp_ResponseCode');
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  // Redux State
  const requestData = useSelector((state) => state.booking.tempBooking);

  // Local State
  const [spinning, setSpinning] = useState(true);

  // useEffect for loading data

  // useEffect for user-related operations
  useEffect(() => {   
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, []);
  useEffect(() => {
    if (spinning === false) {
      loadVNP();
    }
  });
  // Event Handlers
  const loadVNP = async () => {
    if (statusPayment === 'cash') {
      dispatch(clearInfoBooking());
      dispatch(clearTempBooking());
    } else if (statusPayment === 'vnpay' && vnp !== null) {
      if (vnp === '00') {
        dispatch(fetchTransactionCallback({ vnp: vnp, data: requestData }));
        dispatch(clearInfoBooking());
        dispatch(clearTempBooking());
      } else {
        dispatch(fetchUpdateScheduleStatus(requestData));
      }
    }
  };

  if (statusPayment === 'cash') {
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
              {t(`${TRANSLATIONS.SUCCESS.TITLE}`)}
            </Title>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/')}
              style={{ backgroundColor: '#00ADB3' }}
            >
              {t(`${TRANSLATIONS.SUCCESS.BUTTON}`)}
            </Button>
          </Space>
        </div>
      </div>
    );
  }
   else if (statusPayment === 'vnpay') {
    if (vnp === '24') {
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
            status="error"
            title={t(`${TRANSLATIONS.SUCCESS.TITLECANCLE}`)}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => navigate('/booking')}
                style={{ backgroundColor: '#00ADB3' }}
              >
                {t(`${TRANSLATIONS.SUCCESS.BUTTONRESULT}`)}
              </Button>
            }
          />
        </div>
      );
    } else if (vnp === '11') {
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
            status="error"
            title={t(`${TRANSLATIONS.SUCCESS.TITLEEXPIRES}`)}
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => navigate('/booking')}
                style={{ backgroundColor: '#00ADB3' }}
              >
                {t(`${TRANSLATIONS.SUCCESS.BUTTONRESULT}`)}
              </Button>
            }
          />
        </div>
      );
    } else if (vnp === "00") {
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
              {t(`${TRANSLATIONS.SUCCESS.TITLE}`)}
            </Title>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/')}
              style={{ backgroundColor: '#00ADB3' }}
            >
              {t(`${TRANSLATIONS.SUCCESS.BUTTON}`)}
            </Button>
          </Space>
        </div>
      </div>    
      );
    }else if (vnp === null) {
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
          <Result status="info" title={t(`${TRANSLATIONS.SUCCESS.TITLE2}`)} />
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
          <Result status="warning" title={t(`${TRANSLATIONS.SUCCESS.TITLENOTFOUND}`)} />
        </div>
      );
    }
  }
}
