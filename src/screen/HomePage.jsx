import React, { useEffect, useState } from 'react';
import {
  Layout,
  Carousel,
  Row,
  Col,
  Typography,
  Space,
  Image,
  Button,
  Rate,
  Avatar,
  Result,
  Spin,
} from 'antd';
import bgposter from '../asset/image/Background_Poster.png';
import itposter from '../asset/image/Item_Poster.png';

import IconOne from '../asset/image/Icon_One.png';
import IconTwo from '../asset/image/Icon_Two.png';
import IconThree from '../asset/image/Icon_Three.png';
import IconFour from '../asset/image/Icon_Four.png';
import IconFive from '../asset/image/Icon_Five.png';
import IconAvatar from '../asset/image/Icon_Avatar.png';

import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../features/Doctor/doctorSlice';
import { fetchSpecialists } from '../features/Specialist/specialistSlice';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;

const customImageStyle = {
  backgroundImage: `url(${bgposter})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#005761',
  height: 'auto',
  padding: '50px 0px',
};

const customItemImageStyle = {
  backgroundImage: `url(${itposter})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '30vw',
  width: '50%',
};

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [spinning, setSpinning] = useState(true);

  const { Text, Title } = Typography;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors(8));
    dispatch(fetchSpecialists(8));
  }, []);

  const isValidURL = (url, imageDefault) => {
    try {
      const urlObject = new URL(url);

      if (urlObject.protocol !== 'http:' && urlObject.protocol !== 'https:') {
        return imageDefault;
      }

      if (url.includes(' ')) {
        return imageDefault;
      }

      return url;
    } catch (error) {
      return imageDefault;
    }
  };

  const doctors = useSelector((state) => state.doctor.doctors);
  const specialists = useSelector((state) => state.specialist.specialists);

  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, [doctors, specialists]);

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  return (
    <Layout style={{ height: 'auto' }}>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Content>
        <Carousel autoplay>
          <div>
            <Row style={customImageStyle}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={10}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: '50px',
                }}
              >
                <Space direction="vertical">
                  <Title level={4} style={{ color: '#fff', lineHeight: '20px' }}>
                    Chào mừng bạn đến với HealthCare
                  </Title>
                  <Title level={2} style={{ color: '#fff', fontWeight: 'bold', lineHeight: '0px' }}>
                    Dịch vụ chăm sóc{' '}
                  </Title>
                  <Title level={2} style={{ color: '#fff', fontWeight: 'bold', lineHeight: '0px' }}>
                    Sức khỏe toàn diện{' '}
                  </Title>
                </Space>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={14}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={customItemImageStyle}></div>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={customImageStyle}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={10}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: '50px',
                }}
              >
                <Space direction="vertical">
                  <Title level={4} style={{ color: '#fff', lineHeight: '20px' }}>
                    Chào mừng bạn đến với HealthCare
                  </Title>
                  <Title level={2} style={{ color: '#fff', fontWeight: 'bold', lineHeight: '0px' }}>
                    Dịch vụ chăm sóc{' '}
                  </Title>
                  <Title level={2} style={{ color: '#fff', fontWeight: 'bold', lineHeight: '0px' }}>
                    Sức khỏe toàn diện{' '}
                  </Title>
                </Space>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={14}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={customItemImageStyle}></div>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={customImageStyle}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={10}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: '50px',
                }}
              >
                <Space direction="vertical">
                  <Title level={4} style={{ color: '#fff', lineHeight: '20px' }}>
                    Chào mừng bạn đến với HealthCare
                  </Title>
                  <Title level={2} style={{ color: '#fff', fontWeight: 'bold', lineHeight: '0px' }}>
                    Dịch vụ chăm sóc{' '}
                  </Title>
                  <Title level={2} style={{ color: '#fff', fontWeight: 'bold', lineHeight: '0px' }}>
                    Sức khỏe toàn diện{' '}
                  </Title>
                </Space>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={14}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={customItemImageStyle}></div>
              </Col>
            </Row>
          </div>
        </Carousel>
        <Row
          style={{
            margin: '20px 100px',
            borderRadius: '5px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Col xs={24} sm={24} md={24} lg={6}>
            <Button type="text" style={{ width: '100%', height: '150px' }}>
              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 0px',
                }}
              >
                <Image
                  preview={false}
                  key="custom-image"
                  alt="Custom Image"
                  src={IconOne}
                  style={{ width: '71px', height: '66px' }}
                />
                <Title level={4} style={{ color: '#005761', lineHeight: '20px' }}>
                  Khám chuyên khoa{' '}
                </Title>
              </Space>
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6}>
            <Button type="text" style={{ width: '100%', height: '150px' }}>
              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 0px',
                }}
              >
                <Image
                  preview={false}
                  key="custom-image"
                  alt="Custom Image"
                  src={IconTwo}
                  style={{ width: '71px', height: '66px' }}
                />
                <Title level={4} style={{ color: '#005761', lineHeight: '20px' }}>
                  Gói khám chất lượng{' '}
                </Title>
              </Space>
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6}>
            <Button type="text" style={{ width: '100%', height: '150px' }}>
              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 0px',
                }}
              >
                <Image
                  preview={false}
                  key="custom-image"
                  alt="Custom Image"
                  src={IconThree}
                  style={{ width: '71px', height: '66px' }}
                />
                <Title level={4} style={{ color: '#005761', lineHeight: '10px' }}>
                  Cơ sở y tế uy tín{' '}
                </Title>
              </Space>
            </Button>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6}>
            <Button type="text" style={{ width: '100%', height: '150px' }}>
              <Space
                direction="vertical"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 0px',
                }}
              >
                <Image
                  preview={false}
                  key="custom-image"
                  alt="Custom Image"
                  src={IconFour}
                  style={{ width: '71px', height: '66px' }}
                />
                <Title level={4} style={{ color: '#005761', lineHeight: '20px' }}>
                  Sống khỏe suốt đời{' '}
                </Title>
              </Space>
            </Button>
          </Col>
        </Row>
        <Row
          style={{
            backgroundColor: '#ECF3F4',
          }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Title level={4} style={{ color: '#005761', lineHeight: '20px' }}>
              Cơ sở y tế uy tín{' '}
            </Title>
          </Col>
          {specialists ? (
            <>
              {specialists.map((item) => (
                <Col
                  key={item.id}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  style={{
                    padding: '0px 20px',
                    margin: '20px 0px',
                  }}
                >
                  <Link to={`/list?specialists=${item.id}`}>
                    <Button
                      type="text"
                      style={{ width: '100%', height: '90px', border: '1px solid #00ADB3' }}
                    >
                      <Space direction="horizontal">
                        <Image
                          preview={false}
                          key="custom-image"
                          alt="Custom Image"
                          src={isValidURL(item.thumbnail, IconFive)}
                          style={{ width: '71px', height: '66px' }}
                        />
                        <Title level={4} style={{ paddingBottom: '15px' }}>
                          {item.name}
                        </Title>
                      </Space>
                    </Button>
                  </Link>
                </Col>
              ))}
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <Button
                  type="default"
                  size="large"
                  style={{
                    border: '2px solid #00ADB3',
                    backgroundColor: '#ECF3F4',
                    color: '#005761',
                    width: '120px',
                  }}
                >
                  Xem thêm
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Result
                status="info"
                title="Đang trong quá trình cập nhật..."
                style={{
                  width: '100%',
                  height: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              />
            </>
          )}
        </Row>

        <Row>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Title level={4} style={{ color: '#005761', lineHeight: '20px' }}>
              Bác sĩ nổi bật
            </Title>
          </Col>
          {doctors ? (
            <>
              {doctors.map((item) => (
                <Col
                  key={item.id}
                  xs={24}
                  sm={24}
                  md={24}
                  lg={6}
                  style={{
                    padding: '0px 20px',
                    margin: '20px 0px',
                  }}
                >
                  <Button
                    type="text"
                    style={{ width: '100%', height: '330px', border: '1px solid #00ADB3' }}
                  >
                    <Space direction="vertical" style={{ padding: '20px' }}>
                      <Avatar
                        preview={false}
                        key="custom-image"
                        alt="Custom Image"
                        src={isValidURL(item.image, IconAvatar)}
                        style={{ width: '163px', height: '163px' }}
                      />
                      <Title level={4} style={{ color: '#005761', lineHeight: '20px' }}>
                        {item.fullNameDoctor}
                      </Title>
                      <Text>{item.specialityId[0].name}</Text>
                      <Rate disabled defaultValue={5} />
                    </Space>
                  </Button>
                </Col>
              ))}
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <Button
                  type="default"
                  size="large"
                  style={{
                    border: '2px solid #00ADB3',
                    backgroundColor: '#ECF3F4',
                    color: '#005761',
                    width: '120px',
                  }}
                >
                  Xem thêm
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Result
                status="info"
                title="Đang trong quá trình cập nhật..."
                style={{
                  width: '100%',
                  height: '300px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              />
            </>
          )}
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
