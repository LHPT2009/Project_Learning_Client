import React from 'react';
import { Select, Col, Row, Image, Button, Layout, Space, Typography, Flex } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import bglist from '../asset/image/Background_List.png';

const { Content, Header } = Layout;
const { Text, Title, Link } = Typography;
const ListDotor = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

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
              - Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa
              Hà Nội
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              - Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh
              viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              - Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội
              Thấp khớp học,...{' '}
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              - Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ
              Cao cấp,...
            </Text>
          </Space>
        </Content>
      </Header>
      <Content style={{ padding: '0px 50px' }}>
        <Row
          gutter={[16, 16]}
          style={{
            backgroundColor: 'white',
            width: '100%',
            borderRadius: '10px',
            padding: '50px 0px',
            margin: '0px 0px 50px 0px',
          }}
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
          <Col xs={24} sm={12} md={12} lg={12} xl={8}>
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
              <Text style={{ lineHeight: '20px' }}>Chọn và đặt lịch (chi phí 0đ)</Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>ĐỊA CHỈ KHÁM</Text>
              <Text style={{ lineHeight: '10px' }}>Phòng khám Đa khoa Quốc tế Nhân Hậu</Text>
              <Text style={{ lineHeight: '10px' }}>
                522-524 Nguyễn Chí Thanh, Phường 7, Quận 10, Thành phố Hồ Chí Minh
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                GIÁ KHÁM:
                <Text style={{ lineHeight: '20px', fontWeight: 'lighter' }}>
                  120.000đ{' '}
                  <Link
                    href="https://ant.design"
                    target="_blank"
                    style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
                  >
                    Xem chi tiết.
                  </Link>
                </Text>
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                LOẠI BẢO HIỂM ÁP DỤNG.{' '}
                <Link
                  href="https://ant.design"
                  target="_blank"
                  style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
                >
                  Xem chi tiết.
                </Link>
              </Text>
            </Space>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          style={{
            backgroundColor: 'white',
            width: '100%',
            borderRadius: '10px',
            padding: '50px 0px',
            margin: '0px 0px 50px 0px',
          }}
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
          <Col xs={24} sm={12} md={12} lg={12} xl={8}>
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
              <Text style={{ lineHeight: '20px' }}>Chọn và đặt lịch (chi phí 0đ)</Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>ĐỊA CHỈ KHÁM</Text>
              <Text style={{ lineHeight: '10px' }}>Phòng khám Đa khoa Quốc tế Nhân Hậu</Text>
              <Text style={{ lineHeight: '10px' }}>
                522-524 Nguyễn Chí Thanh, Phường 7, Quận 10, Thành phố Hồ Chí Minh
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                GIÁ KHÁM:
                <Text style={{ lineHeight: '20px', fontWeight: 'lighter' }}>
                  120.000đ{' '}
                  <Link
                    href="https://ant.design"
                    target="_blank"
                    style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
                  >
                    Xem chi tiết.
                  </Link>
                </Text>
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                LOẠI BẢO HIỂM ÁP DỤNG.{' '}
                <Link
                  href="https://ant.design"
                  target="_blank"
                  style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
                >
                  Xem chi tiết.
                </Link>
              </Text>
            </Space>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          style={{
            backgroundColor: 'white',
            width: '100%',
            borderRadius: '10px',
            padding: '50px 0px',
            margin: '0px 0px 50px 0px',
          }}
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
          <Col xs={24} sm={12} md={12} lg={12} xl={8}>
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
              <Text style={{ lineHeight: '20px' }}>Chọn và đặt lịch (chi phí 0đ)</Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>ĐỊA CHỈ KHÁM</Text>
              <Text style={{ lineHeight: '10px' }}>Phòng khám Đa khoa Quốc tế Nhân Hậu</Text>
              <Text style={{ lineHeight: '10px' }}>
                522-524 Nguyễn Chí Thanh, Phường 7, Quận 10, Thành phố Hồ Chí Minh
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                GIÁ KHÁM:
                <Text style={{ lineHeight: '20px', fontWeight: 'lighter' }}>
                  120.000đ{' '}
                  <Link
                    href="https://ant.design"
                    target="_blank"
                    style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
                  >
                    Xem chi tiết.
                  </Link>
                </Text>
              </Text>
              <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                LOẠI BẢO HIỂM ÁP DỤNG.{' '}
                <Link
                  href="https://ant.design"
                  target="_blank"
                  style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
                >
                  Xem chi tiết.
                </Link>
              </Text>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default ListDotor;
