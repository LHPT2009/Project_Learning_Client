import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Space, Typography, Spin, Result, Pagination } from 'antd';
import { useLocation } from 'react-router-dom';
import ListItemArr from 'component/doctor/ListItem';

import bglist from '../../asset/image/Background_List.png';
import { fetchDoctorsBySpecialty } from './doctorSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Footer } from 'antd/es/layout/layout';
import { PLACEHOLDER, TRANSLATIONS } from '../../constants';
const ListDotor = () => {
  // Constants
  const { Content, Header } = Layout;
  const { Text, Title } = Typography;
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const specialists = searchParams.get('specialists');
  const dispatch = useDispatch();
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;
  const pageSize = 2;

  // Redux State
  const arrDoctorsBySpecialty = useSelector((state) => state.doctor.doctorsspecialty);
  const totalItems = arrDoctorsBySpecialty.length;

  // Local State
  const [spinning, setSpinning] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect for loading data
  useEffect(() => {
    dispatch(fetchDoctorsBySpecialty(specialists)).then((item) => {
      setSpinning(false);
    });
  }, []);

  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Event Handlers
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return arrDoctorsBySpecialty.slice(startIndex, endIndex);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  //Style CSS
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

  return (
    <Layout>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      {arrDoctorsBySpecialty ? (
        <>
          <Header style={customStyle}>
            <Content style={{ padding: '0px 50px' }}>
              <Space direction="vertical" size="middle">
                <Title level={2} style={{ lineHeight: '15px' }}>
                  {t(`${TRANSLATIONS.LISTDOCTOR.TITLE1}`)}
                </Title>
                <Title level={3} style={{ lineHeight: '25px' }}>
                {t(`${TRANSLATIONS.LISTDOCTOR.TITLE2}`)}
                </Title>
                <Title level={4} style={{ lineHeight: '20px' }}>
                {t(`${TRANSLATIONS.LISTDOCTOR.TITLE3}`)}
                </Title>
                <Text style={{ lineHeight: '15px' }}>
                {t(`${TRANSLATIONS.LISTDOCTOR.TITLE4}`)}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t(`${TRANSLATIONS.LISTDOCTOR.TITLE5}`)}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t(`${TRANSLATIONS.LISTDOCTOR.TITLE6}`)}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t(`${TRANSLATIONS.LISTDOCTOR.TITLE7}`)}{' '}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                {t(`${TRANSLATIONS.LISTDOCTOR.TITLE8}`)}
                </Text>
              </Space>
            </Content>
          </Header>
          <Content style={{ padding: '0px 50px', height: 'auto' }}>
            <ListItemArr arrDoctors={getCurrentPageData()} />
          </Content>
          <Footer
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={handleChangePage}
              showSizeChanger={false}
              showQuickJumper={false}
            />
          </Footer>
        </>
      ) : (
        <>
          <Result
            status="warning"
            title={`${t(PLACEHOLDER.ALT)}`}
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
