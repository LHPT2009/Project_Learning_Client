import React, { useEffect, useState } from 'react';
import {
  Layout,
  theme,
  Button,
  Input,
  Select,
  Avatar,
  Col,
  Row,
  Typography,
  Space,
  Form,
  DatePicker,
  Radio,
  message,
} from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Content } = Layout;

export default function Booking() {
  // const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { Text, Title } = Typography;

  const infoBooking = useSelector((state) => state.booking.infoBooking);
  const infoUser = useSelector((state) => state.client.client);

  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState('1');

  // const checkBookingPage = () => {
  //   if (infoBooking == null) {
  //     message.error('Hãy chọn thông tin trước khi đặt phòng!');

  //     navigate('/list');
  //   } else if (infoUser == null) {
  //     message.error('Hãy đăng nhập!');
  //     navigate('/login');
  //   } else {
  //     message.success('Hãy kiểm tra thông tin trước khi đặt!');
  //   }
  // };

  // useEffect(() => {
  //   checkBookingPage();
  // }, [infoBooking, infoUser]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const radioStyle = {
    display: 'block',
  };
  const RadioGroup = Radio.Group;
  const { TextArea } = Input;

  const listPayment = [
    {
      id: 1,
      name: 'Thanh toán bằng tiền mặt',
    },
    {
      id: 2,
      name: 'Thanh toán bằng VNPAY',
    },
  ];

  const formatSendBooking = {
    code: 'xxxx',
    idUser: infoUser.id,
    description: description,
    bookingDate: infoBooking.bookingDate,
    idPackage: infoBooking.idPackage,
    idDoctor: infoBooking.idDoctor,
    idScheduleDetail: infoBooking.idScheduleDetail,
    idPayment: payment,
  };

  const sendBooking = () => {
    console.log('Gửi thông tin đặt lịch', formatSendBooking);
  };

  return (
    <>
      <Layout
        style={{
          padding: '0 24px',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          height: 'auto',
          margin: '40px 0',
          width: '50%',
          position: 'relative',
          left: '50%',
          transform: 'translateX( -50%)',
        }}
      >
        <Title
          level={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#005761',
          }}
        >
          Đặt lịch khám
        </Title>
        <Content
          style={{
            height: 'auto',
          }}
        >
          <Title level={3} style={{ color: '#005761' }}>
            Thông tin bác sĩ
          </Title>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={6}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Avatar size={150} icon={<UserOutlined />} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={18}>
              <Space direction="vertical">
                <Title level={3} style={{ color: '#005761' }}>
                  Bác sĩ chuyên khoa I Nguyễn Văn A
                </Title>
                <Text>Cơ xương khớp</Text>
                <Text>Bệnh viện Đa khoa trung ương</Text>
                <Text>Ngày: Thứ hai - 15/1/2024</Text>
              </Space>
            </Col>
          </Row>
          <Title level={3} style={{ color: '#005761' }}>
            Thông tin khách hàng
          </Title>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form labelCol={{ span: 2 }} wrapperCol={{ span: 24 }} layout="vertical">
                <Form.Item label="Tên khách hàng" labelCol={{ span: 24 }}>
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Số điện thoại" labelCol={{ span: 24 }}>
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Giới tính" labelCol={{ span: 24 }}>
                  <Select disabled>
                    <Select.Option value="demo" labelCol={{ span: 24 }}>
                      Demo
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Ngày sinh" labelCol={{ span: 24 }}>
                  <DatePicker style={{ width: '100%' }} disabled />
                </Form.Item>
                {/* <Form.Item label="Chọn tỉnh/thành phố" labelCol={{ span: 24 }}>
                  <Select>
                    <Select.Option value="demo" labelCol={{ span: 24 }}>
                      Demo
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Chọn quận/huyện" labelCol={{ span: 24 }}>
                  <Select>
                    <Select.Option value="demo" labelCol={{ span: 24 }}>
                      Demo
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Chọn phường/xã" labelCol={{ span: 24 }}>
                  <Select>
                    <Select.Option value="demo" labelCol={{ span: 24 }}>
                      Demo
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Địa chỉ chi tiết (Đường, Tổ, Khu, Thôn, Xóm)"
                  labelCol={{ span: 24 }}
                >
                  <Input />
                </Form.Item> */}
                <Form.Item label="Địa chỉ" labelCol={{ span: 24 }}>
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Lí do khám" labelCol={{ span: 24 }}>
                  <Input onClick={(e) => setDescription(e.target.value)} />
                </Form.Item>
                <Form.Item label="Phương thức thanh toán" labelCol={{ span: 24 }}>
                  <RadioGroup>
                    {listPayment.map((item) => (
                      <Radio
                        style={radioStyle}
                        value={item.id}
                        onClick={(e) => setPayment(e.target.value)}
                      >
                        {item.name}
                      </Radio>
                    ))}
                  </RadioGroup>
                </Form.Item>
                <Form.Item label="Chi phí khám" labelCol={{ span: 24 }}>
                  <Row>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Space direction="vertical">
                        <Text>Giá khám</Text>
                        <Text>Phí đặt lịch</Text>
                        <Text>Tổng cộng</Text>
                      </Space>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={12}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        textAlign: 'right',
                      }}
                    >
                      <Space direction="vertical">
                        <Text>500.000đ</Text>
                        <Text>50.000đ</Text>
                        <Text style={{ color: 'red' }}>550.000đ</Text>
                      </Space>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    style={{ backgroundColor: '#00ADB3', width: '100%' }}
                    onClick={() => sendBooking()}
                  >
                    Xác nhận đặt lịch khám
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}
