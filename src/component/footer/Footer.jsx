import React from 'react';
import { Layout, Button, Image, Input, Col, Row, Space, Typography } from 'antd';
import bgfooter from '../../asset/image/Background_Footer.png';
import LogoClinic from '../../asset/image/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const { Footer } = Layout;

const FooterLayout = () => {
  const { Text, Title } = Typography;

  const customFooterStyle = {
    backgroundImage: `url(${bgfooter})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <Footer style={{ backgroundColor: '#005761', color: '#fff', padding: '0' }}>
      <div style={customFooterStyle}>
        <div style={{ padding: '50px 100px' }}>
          <Row
            style={{
              height: '120px',
              width: '80%',
              position: 'relative',
              left: '50%',
              transform: 'translateX( -50%)',
              marginBottom: '30px',
            }}
          >
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#116069',
                padding: '5px',
              }}
            >
              <Image
                src={LogoClinic}
                height="44px"
                width="134px"
                alt="Logo Clinic"
                preview={false}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#116069',
                padding: '5px',
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ fontSize: '28px', marginRight: '10px' }}
              />
              <Text style={{ color: '#fff' }}>Địa chỉ email: contact@website.com</Text>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#116069',
                padding: '5px',
              }}
            >
              <FontAwesomeIcon icon={faPhone} style={{ fontSize: '28px', marginRight: '10px' }} />
              <Text style={{ color: '#fff' }}>Số điện thoại: 0123456789</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={6}
              style={{
                color: '#fff',
                paddingRight: '50px',
              }}
            >
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  Về chúng tôi
                </Title>
                <Text style={{ color: '#fff' }}>
                  HealthCare là một trang web hiện đại và tiện ích, cho phép người dùng dễ dàng tìm
                  kiếm và đặt lịch hẹn với các chuyên gia y tế, bác sĩ, hoặc các cơ sở y tế khác
                  nhau.
                </Text>
              </Space>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={6}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  Dịch vụ
                </Title>
                <Text style={{ color: '#fff' }}>Gói sức khỏe</Text>
                <Text style={{ color: '#fff' }}>Chuyên khoa</Text>
                <Text style={{ color: '#fff' }}>Đa khoa</Text>
              </Space>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={6}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  Liên kết hữu ích{' '}
                </Title>
                <Text style={{ color: '#fff' }}>Trang chủ</Text>
                <Text style={{ color: '#fff' }}>Bác sĩ</Text>
                <Text style={{ color: '#fff' }}>Dịch vụ</Text>
                <Text style={{ color: '#fff' }}>Liên hệ</Text>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  Đăng ký bản tin
                </Title>
                <Text style={{ color: '#fff' }}>
                  <Input size="large" placeholder="Địa chỉ email" />
                </Text>
                <Text style={{ color: '#fff' }}>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: '100%', backgroundColor: '#00ADB3' }}
                  >
                    Đăng ký
                  </Button>
                </Text>
                <Text style={{ color: '#fff' }}>
                  Nhận các bản cập nhật mới nhất qua email. Bạn có thể hủy đăng ký bất cứ lúc nào.
                </Text>
              </Space>
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            © HealthCare 2023 | All Rights Reserved by BU1
          </Row>
        </div>
      </div>
    </Footer>
  );
};

export default FooterLayout;
