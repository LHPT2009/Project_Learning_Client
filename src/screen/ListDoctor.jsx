import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Space, Typography, Spin, Result } from 'antd';
import { useLocation } from 'react-router-dom';
import ListItemArr from 'component/doctor/ListItem';

import bglist from '../asset/image/Background_List.png';
import { fetchDoctorsBySpecialty } from '../features/Doctor/doctorSlice';
import { LoadingOutlined } from '@ant-design/icons';

const { Content, Header } = Layout;
const { Text, Title, Link } = Typography;
const ListDotor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                  Cơ Xương Khớp
                </Title>
                <Title level={3} style={{ lineHeight: '25px' }}>
                  Bác sĩ xương khớp giỏi
                </Title>
                <Title level={4} style={{ lineHeight: '20px' }}>
                  Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:
                </Title>
                <Text style={{ lineHeight: '15px' }}>
                  - Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                  - Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y
                  khoa Hà Nội
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                  - Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp -
                  Bệnh viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                  - Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp,
                  Hội Thấp khớp học,...{' '}
                </Text>
                <Text style={{ lineHeight: '15px' }}>
                  - Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác
                  sĩ Cao cấp,...
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
