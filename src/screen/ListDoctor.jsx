import React from 'react';
import { Select, Col, Row, Image, Button, Layout, Space, Typography, Flex } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import bglist from '../asset/image/Background_List.png';

const { Content, Header } = Layout;
const { Text, Title } = Typography;
const ListDotor = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const customStyle = {
    backgroundImage: `url(${bglist})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '300px',
    marginBottom: '50px',
    lineHeight: '0px',
  };
  return (
    <Layout>
      <Header style={customStyle}>
        <Content style={{ padding: '0px 50px' }}>
          <Space direction="vertical">
            <Title level={3} style={{ lineHeight: '5px' }}>
              Cơ Xương Khớp
            </Title>
            <Title level={4} style={{ lineHeight: '5px' }}>
              Bác sĩ xương khớp giỏi
            </Title>
            <Title level={5} style={{ lineHeight: '5px' }}>
              Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:
            </Title>
            <Text style={{ lineHeight: '10px' }}>
              - Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm
            </Text>
            <Text style={{ lineHeight: '10px' }}>
              - Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa
              Hà Nội
            </Text>
            <Text style={{ lineHeight: '10px' }}>
              - Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh
              viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.
            </Text>
            <Text style={{ lineHeight: '10px' }}>
              - Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội
              Thấp khớp học,...{' '}
            </Text>
            <Text style={{ lineHeight: '10px' }}>
              - Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ
              Cao cấp,...
            </Text>
          </Space>
        </Content>
      </Header>
      <Content style={{ padding: '0px 100px' }}>
        <Row
          gutter={[16, 16]}
          style={{ backgroundColor: 'white', height: '40%', width: '100%', borderRadius: '10px' }}
        >
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Row>
              <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                <Image
                  src={
                    'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png'
                  }
                  width={150}
                  height={150}
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={18}>
                <Flex wrap="wrap" gap="small">
                  <Title
                    level={4}
                    style={{ lineHeight: '20px', color: '#005761', fontWeight: 'bold' }}
                  >
                    Bác sĩ Hoàng Thị Bích
                  </Title>
                  <Text style={{ lineHeight: '20px' }}>
                    Gần 20 năm kinh nghiệm trong lĩnh vực xương khớp Hiện công tác tại bệnh viện Lão
                    Khoa Trung Ương Bác sĩ nhận bệnh từ 18 tuổi trở lên
                  </Text>
                  <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                    <EnvironmentOutlined style={{ marginRight: '5px', color: '#005761' }} />
                    Hà Nội
                  </Text>
                </Flex>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Space direction="vertical">
              <Select
                defaultValue="Thứ 6 - 19/1"
                style={{ width: 150 }}
                onChange={handleChange}
                options={[{ value: 'Thứ 6 - 19/1', label: 'Thứ 6 - 19/1' }]}
              />
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                <CalendarOutlined style={{ marginRight: '5px', color: '#005761' }} />
                LỊCH KHÁM
              </Text>
              <Flex wrap="wrap" gap="small">
                <Button style={{ marginLeft: '10px', width: 100 }} block>
                  07:00-08:00
                </Button>
                <Button style={{ marginLeft: '10px', width: 100 }} block>
                  07:00-08:00
                </Button>
                <Button style={{ marginLeft: '10px', width: 100 }} block>
                  07:00-08:00
                </Button>
                <Button style={{ marginLeft: '10px', width: 100 }} block>
                  07:00-08:00
                </Button>
                <Button style={{ marginLeft: '10px', width: 100 }} block>
                  07:00-08:00
                </Button>
                <Button style={{ marginLeft: '10px', width: 100 }} block>
                  07:00-08:00
                </Button>
              </Flex>
              <Text style={{ lineHeight: '20px' }}>
                Gần 20 năm kinh nghiệm trong lĩnh vực xương
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>LỊCH KHÁM</Text>
              <Text style={{ lineHeight: '20px' }}>
                Gần 20 năm kinh nghiệm trong lĩnh vực xương
              </Text>
              <Text style={{ lineHeight: '20px' }}>
                Gần 20 năm kinh nghiệm trong lĩnh vực xương
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                LỊCH KHÁM:{' '}
                <Text style={{ lineHeight: '20px', fontWeight: 'lighter' }}>
                  Gần 20 năm kinh nghiệm trong lĩnh vực xương
                </Text>
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>LỊCH KHÁM: </Text>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default ListDotor;
