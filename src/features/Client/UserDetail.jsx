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
  Table,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import IconAvatar from '../../asset/image/Icon_Avatar.png';
import { fetchGetUserById } from './clientSlice';
import { fetchGetBookingByUserId } from '../Booking/bookingSlice';
import { TRANSLATIONS } from '../../constants';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
  fullname: yup.string().required('Vui lòng nhập tên bệnh viện'),
  gender: yup.string().required('Vui lòng nhập tên bệnh viện'),
  address: yup.string().required('Vui lòng nhập tên bệnh viện'),
  dateOfBirth: yup.string().required('Vui lòng nhập tên bệnh viện'),
  email: yup.string().required('Vui lòng nhập tên bệnh viện'),
  phone: yup.string().required('Vui lòng nhập tên bệnh viện'),
});

function formatISODateToDDMMYYYY(isoDateString) {
  const inputDate = new Date(isoDateString);

  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1; // Tháng bắt đầu từ 0
  const year = inputDate.getUTCFullYear();

  // Chuyển đổi thành chuỗi và thêm số 0 nếu cần thiết
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}

function formatDateTime(dateString) {
  const dateObject = new Date(dateString);

  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const formattedTime = `${hours}h${minutes}`;
  return formattedTime;
}

const formatDate = (originalDate) => {
  const [year, month, day] = originalDate.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const UserDetail = () => {
  // Constants
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;
  const { Text } = Typography;

  // Redux State
  const idUser = useSelector((state) => (state.client.client ? state.client.client.id : ''));
  const infoUser = useSelector((state) => (state.client.userinfo ? state.client.userinfo[0] : {}));
  const listBooking = useSelector((state) => state.booking.listBooking);

  // Yup
  const {
    control,
    handleSubmit,
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
        fullname: infoUser.fullName || '',
        gender: infoUser.gender || '',
        address: infoUser.address || '',
        dateOfBirth: formatISODateToDDMMYYYY(`${infoUser.dateOfBirth || ''}`),
        email: infoUser.email || '',
        phone: infoUser.phone || '',
      });
    }
  }, [infoUser, reset]);

  // Local State
  const [mode, setMode] = useState('left');
  const [spinning, setSpinning] = useState(true);

  // useEffect for loading data
  useEffect(() => {
    dispatch(fetchGetUserById(idUser));
    dispatch(fetchGetBookingByUserId(idUser));
  }, []);

  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  // Event Handlers
  const routeChangePass = () => {
    navigate('/changepass');
  };

  const handleOk = (data) => {
    message.warning({
      style: { marginTop: '7vh' },
      content: 'Đang trong quá trình cập nhật!',
    });
  };

  //Format Columns
  const columns = [
    {
      title: t(`${TRANSLATIONS.USERDETAIL.CODEBILL}`),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.CODE}`),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.DAYBOOKING}`),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => <Text>{formatDateTime(text)}</Text>,
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.DOCTOR}`),
      dataIndex: 'fullNameDoctor',
      key: 'fullNameDoctor',
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.START}`),
      dataIndex: 'bookingTimeStart',
      key: 'bookingTimeStart',
      render: (text, record) => <Text>{formatTime(text)}</Text>,
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.END}`),
      dataIndex: 'bookingTimeEnd',
      key: 'bookingTimeEnd',
      render: (text, record) => <Text>{formatTime(text)}</Text>,
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.DAYEXAMINATION}`),
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      render: (text, record) => <Text>{formatDate(text)}</Text>,
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.PAYSTATUS}`),
      dataIndex: 'statusTransaction',
      key: 'statusTransaction',
      render: (text, record) => {
        let buttonStyle = {};

        switch (text) {
          case 'SUCCESS':
            buttonStyle = { backgroundColor: '#B0EEA6', color: 'black' };
            text = t(`${TRANSLATIONS.USERDETAIL.PAYSTATUS1}`);
            break;
          case 'PENDING':
            buttonStyle = { backgroundColor: '#E7DE0D', color: 'black' };
            text = t(`${TRANSLATIONS.USERDETAIL.PAYSTATUS2}`);
            break;
          case 'CANCELED':
            buttonStyle = { backgroundColor: '#E7515A', color: 'black' };
            text = t(`${TRANSLATIONS.USERDETAIL.PAYSTATUS3}`);
            break;
          default:
            break;
        }

        return text ? (
          <Button size="small" style={buttonStyle} disabled>
            {text}
          </Button>
        ) : (
          <Button size="small" style={buttonStyle} disabled>
            {t(`${TRANSLATIONS.USERDETAIL.YETUPDATE}`)}
          </Button>
        );
      },
    },
    {
      title: t(`${TRANSLATIONS.USERDETAIL.BOOKINGSTATUS}`),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        let buttonStyle = {};

        switch (text) {
          case 'FINISHED':
            buttonStyle = { backgroundColor: '#b3efa9', color: 'black' };
            text = t(`${TRANSLATIONS.USERDETAIL.BOOKINGSTATUS1}`);
            break;
          case 'BOOKED':
            buttonStyle = { backgroundColor: '#f9f69f', color: 'black' };
            text = t(`${TRANSLATIONS.USERDETAIL.BOOKINGSTATUS2}`);
            break;
          case 'CANCELED':
            buttonStyle = { backgroundColor: '#f3a5aa', color: 'black' };
            text = t(`${TRANSLATIONS.USERDETAIL.BOOKINGSTATUS3}`);
            break;
          default:
            break;
        }

        return text ? (
          <Button size="small" style={buttonStyle} disabled>
            {text}
          </Button>
        ) : (
          <Button size="small" style={buttonStyle} disabled>
            {t(`${TRANSLATIONS.USERDETAIL.YETUPDATE}`)}
          </Button>
        );
      },
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <Button
            type="primary"
            size="middle"
            style={{ backgroundColor: '#00ADB3' }}
            onClick={() => navigate(`/history/${id}`)}
          >
            {t(`${TRANSLATIONS.USERDETAIL.DETAIL}`)}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Radio.Group
        value={mode}
        style={{
          marginBottom: 8,
        }}
      ></Radio.Group>
      <Tabs
        defaultActiveKey={id}
        tabPosition={mode}
        style={{
          height: 'auto',
          padding: '20px',
        }}
        items={[
          {
            label: t(`${TRANSLATIONS.USERDETAIL.INFO}`),
            key: '1',
            children: (
              <Card title={t(`${TRANSLATIONS.USERDETAIL.INFO}`)}>
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
                        {t(`${TRANSLATIONS.USERDETAIL.IMAGE}`)}
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
                          label={t(`${TRANSLATIONS.USERDETAIL.FULLNAME}`)}
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
                          label={t(`${TRANSLATIONS.USERDETAIL.GENDER}`)}
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
                          label={t(`${TRANSLATIONS.USERDETAIL.BIRTHDAY}`)}
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
                          label={t(`${TRANSLATIONS.USERDETAIL.PHONE}`)}
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
                          label={t(`${TRANSLATIONS.USERDETAIL.ADDRESS}`)}
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
                        <Row gutter={16}>
                          {/* <Col>
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
                          </Col> */}
                          <Col>
                            <Form.Item>
                              <Button
                                type="primary"
                                size="large"
                                style={{ backgroundColor: '#00adb3', width: '160px' }}
                                htmlType="submit"
                                onClick={routeChangePass}
                              >
                                {t(`${TRANSLATIONS.USERDETAIL.BUTTON}`)}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Space>
                  </Col>
                </Row>
              </Card>
            ),
          },
          {
            label: t(`${TRANSLATIONS.USERDETAIL.HISTORY}`),
            key: '2',
            children: (
              <>
                <Table
                  dataSource={listBooking}
                  columns={columns}
                  title={() => (
                    <Text style={{ fontSize: '24px' }}>
                      {t(`${TRANSLATIONS.USERDETAIL.HISTORY}`)}
                    </Text>
                  )}
                  bordered
                />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
export default UserDetail;
