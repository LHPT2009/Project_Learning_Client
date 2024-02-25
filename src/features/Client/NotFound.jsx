import React, { useEffect, useState } from 'react';
import { Result, Spin, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../constants';

export default function NotFound() {
  // Constants
  const { t } = useTranslation();
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  // Redux State

  // Local State
  const [spinning, setSpinning] = useState(true);

  // useEffect for loading data
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, []);
  // useEffect for user-related operations

  // Event Handlers

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
        subTitle={t(`${TRANSLATIONS.NOTFOUND.SUBTITLE}`)}
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => navigate('/')}
            style={{ backgroundColor: '#00ADB3' }}
          >
            {t(`${TRANSLATIONS.NOTFOUND.BUTTON}`)}
          </Button>
        }
      />
    </div>
  );
}
