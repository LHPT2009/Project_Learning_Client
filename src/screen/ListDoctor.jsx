import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Space, Typography, Spin, Result } from 'antd';
import { useLocation } from 'react-router-dom';
import ListItemArr from 'component/doctor/ListItem';

import bglist from '../asset/image/Background_List.png';
import { fetchDoctorsBySpecialty } from '../features/Doctor/doctorSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
const { Content, Header } = Layout;
const { Text, Title, Link } = Typography;
const ListDotor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const specialists = searchParams.get('specialists');
  const dispatch = useDispatch();
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    dispatch(fetchDoctorsBySpecialty(specialists));
  }, []);

  const arrdoctorsbyspecialty = useSelector((state) => state.doctor.doctorsspecialty);

  const customStyle = {
    backgroundImage: `url(${bglist})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 'auto',
    paddingBottom: '30px',
    marginBottom: '50px',
    lineHeight: '0px',
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, [arrdoctorsbyspecialty]);

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  return (
    <Layout>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      {arrdoctorsbyspecialty ? (
        <>
          <Header style={customStyle}>
            <Content style={{ padding: '0px 50px' }}>
              <Space direction="vertical" size="middle">
                <Title level={2} style={{ lineHeight: '15px' }}>
                  {t('description.columncontent.listdoctor.title1')}
                </Title>
                <Title level={3} style={{ lineHeight: '25px' }}>
                {t('description.columncontent.listdoctor.title2')}
                </Title>
                <Title level={4} style={{ lineHeight: '20px' }}>
                {t('description.columncontent.listdoctor.title3')}
                </Title>
                <Text style={{ lineHeight: '15px' }}>
                {t('description.columncontent.listdoctor.title4')}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t('description.columncontent.listdoctor.title5')}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t('description.columncontent.listdoctor.title6')}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t('description.columncontent.listdoctor.title7')}{' '}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t('description.columncontent.listdoctor.title8')}
                </Text>
              </Space>
            </Content>
          </Header>
          <Content style={{ padding: '0px 50px' }}>
            <ListItemArr arrdoctors={arrdoctorsbyspecialty} />
          </Content>
        </>
      ) : (
        <>
          <Result
            status="warning"
            title="Đang trong quá trình xử lý..."
            style={{
              width: '100%',
              height: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          />
        </>
      )}
    </Layout>
  );
};
export default ListDotor;
