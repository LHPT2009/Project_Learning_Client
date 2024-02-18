import React, { useEffect, useState } from 'react';
import {
  Radio,
  Tabs,
  Spin,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Avatar,
  Form,
  Input,
  message,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, AntDesignOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import IconAvatar from '../asset/image/Icon_Avatar.png';

const schema = yup.object().shape({
  fullname: yup.string().required('Vui lòng nhập tên bệnh viện'),
  gender: yup.string().required('Vui lòng nhập tên bệnh viện'),
  address: yup.string().required('Vui lòng nhập tên bệnh viện'),
  dateOfBirth: yup.string().required('Vui lòng nhập tên bệnh viện'),
  email: yup.string().required('Vui lòng nhập tên bệnh viện'),
  phone: yup.string().required('Vui lòng nhập tên bệnh viện'),
});

const UserDetail = () => {
  const [mode, setMode] = useState('left');

  const navigate = useNavigate();
  const infoUser = useSelector((state) => (state.client.userinfo ? state.client.userinfo[0] : {}));
  const listBooking = useSelector((state) => state.booking.listBooking);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    if (infoUser === undefined || listBooking === undefined) {
      setTimeout(() => {
        setSpinning(false);
      }, 500);
      navigate('/error');
    } else {
      setTimeout(() => {
        setSpinning(false);
      }, 500);
    }
  }, [infoUser, listBooking, navigate]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: '',
      gender: '',
      address: '',
      dateOfBirth: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (infoUser) {
      reset({
        fullname: infoUser.fullname || '',
        gender: infoUser.gender || '',
        address: infoUser.address || '',
        dateOfBirth: infoUser.dateOfBirth || '',
        email: infoUser.email || '',
        phone: infoUser.phone || '',
      });
    }
  }, [infoUser, reset]);

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;
  const { Text } = Typography;

  const handleOk = (data) => {
    message.warning('Đang trong quá trình cập nhật!');
    console.log('Check data UserDetail', data);
  };
  return (
    <div style={{ height: '85vh' }}>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Radio.Group
        value={mode}
        style={{
          marginBottom: 8,
        }}
      ></Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{
          height: 220,
          padding: '20px',
        }}
        items={[
          {
            label: 'Thông Tin Cá Nhân',
            key: '1',
            children: (
              <Card title="Thông Tin Cá Nhân" style={{ height: '75vh' }}>
                <Row>
                  <Col flex={8}>
                    <Space
                      direction="vertical"
                      size="middle"
                      align="center"
                      style={{ display: 'flex' }}
                    >
                      <Avatar
                        style={{ marginTop: '50px' }}
                        size={{
                          xs: 24,
                          sm: 32,
                          md: 40,
                          lg: 64,
                          xl: 80,
                          xxl: 250,
                        }}
                        src={IconAvatar}
                      />
                      <Button disabled type="primary" size="large">
                        Cập nhật ảnh mới
                      </Button>
                    </Space>
                  </Col>
                  <Col flex={16}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                      <Form
                        onFinish={handleSubmit(handleOk)}
                        // onFinishFailed={handleFailed}
                        layout="vertical"
                        // requiredMark={customizeRequiredMark}
                      >
                        <Form.Item
                          label="Họ và Tên"
                          name="fullname"
                          help={<span style={{ color: 'red' }}>{errors.fullname?.message}</span>}
                        >
                          <Controller
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Nhập tên bệnh viện"
                                disabled
                                size="large"
                              />
                            )}
                            control={control}
                            name="fullname"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Giới Tính"
                          name="gender"
                          help={<span style={{ color: 'red' }}>{errors.gender?.message}</span>}
                        >
                          <Controller
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Chọn giới tính"
                                disabled
                                size="large"
                              />
                            )}
                            control={control}
                            name="gender"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Ngày sinh"
                          name="dateOfBirth"
                          help={<span style={{ color: 'red' }}>{errors.dateOfBirth?.message}</span>}
                        >
                          <Controller
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Nhập tên bệnh viện"
                                disabled
                                size="large"
                              />
                            )}
                            control={control}
                            name="dateOfBirth"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Số điện thoại"
                          name="phone"
                          help={<span style={{ color: 'red' }}>{errors.phone?.message}</span>}
                        >
                          <Controller
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Nhập số điện thoại"
                                disabled
                                size="large"
                              />
                            )}
                            control={control}
                            name="phone"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Email"
                          name="email"
                          help={<span style={{ color: 'red' }}>{errors.email?.message}</span>}
                        >
                          <Controller
                            render={({ field }) => (
                              <Input {...field} placeholder="Nhập Email" disabled size="large" />
                            )}
                            control={control}
                            name="email"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Địa chỉ"
                          name="address"
                          help={<span style={{ color: 'red' }}>{errors.address?.message}</span>}
                        >
                          <Controller
                            render={({ field }) => (
                              <Input {...field} placeholder="Nhập Địa chỉ" disabled size="large" />
                            )}
                            control={control}
                            name="address"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            size="large"
                            style={{ backgroundColor: '#00adb3', width: '100px' }}
                            htmlType="submit"
                          >
                            Lưu
                          </Button>
                        </Form.Item>
                      </Form>
                    </Space>
                  </Col>
                </Row>
              </Card>
            ),
          },
          {
            label: 'Lịch Sử Khám',
            key: '2',
            children: (
              <>
                {listBooking ? (
                  <Card title="Lịch Sử Khám" style={{ height: '75vh' }}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                      {listBooking.map((item) => (
                        <Card
                          type="inner"
                          title={`Hóa đơn đặt (#${item.id})`}
                          extra={
                            <Button
                              type="primary"
                              size="large"
                              style={{ backgroundColor: '#00ADB3', width: '100%' }}
                              onClick={() => navigate(`/history/${item.id}`)}
                            >
                              Chi tiết
                            </Button>
                          }
                        >
                          <Row>
                            <Col flex={12}>
                              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Text>{item.fullNameUser}</Text>
                                <Text>{item.phoneUser}</Text>
                                <Text>
                                  {item.bookingTimeStart} - {item.bookingTimeEnd} -
                                  {item.bookingDate}
                                </Text>
                              </Space>
                            </Col>
                            <Col flex={12}>
                              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Text>{item.fullNameDoctor}</Text>
                                <Text>{item.nameHospital}</Text>
                                <Button
                                  disabled
                                  type="primary"
                                  size="small"
                                  style={{
                                    backgroundColor:
                                      item.statusTransaction == 'PENDING' ? '#ffcc00' : '',
                                    color: '#fff',
                                    // width: '120px',
                                  }}
                                >
                                  {item.statusTransaction}
                                </Button>
                              </Space>
                            </Col>
                          </Row>
                        </Card>
                      ))}
                    </Space>
                  </Card>
                ) : (
                  <p>Loading...</p>
                )}

                {/* </td>
                    <td style={{ width: '50%' }}>Giới tính: {infoUser ? infoUser.gender : ''}</td>
                  </tr>
                </tbody>
              </table> */}
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
export default UserDetail;
