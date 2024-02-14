import React, { useEffect, useState } from 'react';
import {
  Layout,
  theme,
  Button,
  Input,
  Avatar,
  Col,
  Row,
  Typography,
  Space,
  Form,
  Result,
  Radio,
  message,
  Spin,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addTempBooking } from '../features/Booking/bookingSlice';
import { fetchPayments } from '../features/Payment/paymentSlice';
import { fetchCreateTransaction } from '../features/Transaction/transactionSlice';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;

const generateRandomNumbers = () => {
  const characters = '0123456789';
  let randomString = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

function formatDate(inputDateString) {
  const originalDate = new Date(inputDateString);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default function Booking() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(true);
  const dispatch = useDispatch();

  const infoBooking = useSelector((state) => state.booking.infoBooking);
  const infoUser = useSelector((state) => state.client.client);
  const listPayment = useSelector((state) => state.payment.payments);
  const loadFullDataUser = useSelector((state) => state.client.userinfo[0]);
  const infoDoctor = useSelector((state) => state.doctor.doctorsbyid);

  useEffect(() => {
    dispatch(fetchPayments());
  }, []);

  const schema = yup
    .object({
      // fullname: yup.string().required('Hãy ghi họ và tên!'),
      // phone: yup.string().required('Hãy ghi số điện thoại!'),
      // gender: yup.string().required('chọn giới!'),
      // dateOfBirth: yup.string().required('chọn ngày sinh!'),
      // address: yup.string().required('Hãy ghi địa chỉ!'),
      // description: yup.string().required('Hãy ghi lý do đến khám!'),
      idPaymentMethod: yup.string().required('Chọn phương thức thanh toán!'),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: loadFullDataUser ? loadFullDataUser.fullname : '',
      phone: loadFullDataUser ? loadFullDataUser.phone : '',
      gender: loadFullDataUser ? loadFullDataUser.gender : '',
      dateOfBirth: formatDate(loadFullDataUser ? loadFullDataUser.dateOfBirth : ''),
      address: loadFullDataUser ? loadFullDataUser.address : '',
      description: '',
    },
  });

  const { Text, Title } = Typography;

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const radioStyle = {
    display: 'block',
  };
  const RadioGroup = Radio.Group;

  const sendBooking = (data) => {
    const formatsending = {
      code: `${generateRandomNumbers()}`,
      idUser: infoUser.id,
      bookingDate: infoBooking.bookingDate,
      idPackage: infoBooking.idPackage,
      idDoctor: infoBooking.idDoctor,
      idScheduleDetail: infoBooking.idScheduleDetail,
      ...data,
    };

    if (formatsending.idPaymentMethod === '1') {
      dispatch(fetchCreateTransaction(formatsending))
        .then((item) => {
          message.success('Đã đặt lịch thành công!');
          navigate('/success?status=Success&payment=Cash');
        })
        .catch((err) => {
          message.error('Đã xảy ra lỗi: ', err);
        });
    }

    if (formatsending.idPaymentMethod === '2') {
      dispatch(addTempBooking(formatsending));
      dispatch(fetchCreateTransaction(formatsending))
        .then((item) => {
          message.loading('Đang xử lý đặt lịch!');
          navigate('/success?status=Processing');
          // navigate('/success?status=Success&payment=Vnpay');
          window.open(`${item.payload}`, '_blank');
        })
        .catch((err) => {
          message.error('Đã xảy ra lỗi: ', err);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, [infoBooking]);

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  if (infoBooking !== null) {
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
          <Spin
            spinning={spinning}
            indicator={antIcon}
            fullscreen
            style={{ background: '#ECF3F4' }}
          />
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
                <Avatar size={150} icon={<UserOutlined />} src={infoDoctor?.image} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={18}>
                <Space direction="vertical">
                  <Title level={3} style={{ color: '#005761' }}>
                    Bác sĩ chuyên khoa I {infoDoctor.fullNameDoctor}
                  </Title>
                  <Text>{infoDoctor.hospitalsName}</Text>
                  <Text>{infoDoctor.hospitalsName}</Text>
                  <Text>
                    Ngày: {infoBooking.timeScheduleDetail} - {infoBooking.bookingDay} -{' '}
                    {infoBooking.bookingDate}
                  </Text>
                </Space>
              </Col>
            </Row>
            <Title level={3} style={{ color: '#005761' }}>
              Thông tin khách hàng
            </Title>
            <Row>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form
                  labelCol={{ span: 2 }}
                  wrapperCol={{ span: 24 }}
                  layout="vertical"
                  onFinish={handleSubmit(sendBooking)}
                >
                  <Form.Item
                    label="Tên khách hàng"
                    labelCol={{ span: 24 }}
                    help={
                      errors.fullname && (
                        <span style={{ color: 'red' }}>{errors.fullname.message}</span>
                      )
                    }
                  >
                    <Controller
                      name="fullname"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại"
                    labelCol={{ span: 24 }}
                    help={
                      errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>
                    }
                  >
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Giới tính"
                    labelCol={{ span: 24 }}
                    help={
                      errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>
                    }
                  >
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ngày sinh"
                    labelCol={{ span: 24 }}
                    help={
                      errors.dateOfBirth && (
                        <span style={{ color: 'red' }}>{errors.dateOfBirth.message}</span>
                      )
                    }
                  >
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Địa chỉ"
                    labelCol={{ span: 24 }}
                    help={
                      errors.address && (
                        <span style={{ color: 'red' }}>{errors.address.message}</span>
                      )
                    }
                  >
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lí do khám"
                    labelCol={{ span: 24 }}
                    help={
                      errors.description && (
                        <span style={{ color: 'red' }}>{errors.description.message}</span>
                      )
                    }
                  >
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Input.TextArea
                          name="description"
                          {...field}
                          placeholder="Nhập mô tả tình trạng"
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Phương thức thanh toán"
                    labelCol={{ span: 24 }}
                    help={
                      errors.idPaymentMethod && (
                        <span style={{ color: 'red' }}>{errors.idPaymentMethod.message}</span>
                      )
                    }
                  >
                    <Controller
                      name="idPaymentMethod"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup key="idPaymentMethod" {...field}>
                          {listPayment.map((item) => (
                            <Radio style={radioStyle} value={item.id}>
                              {item.name}
                            </Radio>
                          ))}
                        </RadioGroup>
                      )}
                    />
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
                          <Text>{formatter.format(infoBooking.pricePakage)}</Text>
                          <Text>{formatter.format(50000)}</Text>
                          <Text style={{ color: 'red' }}>
                            {formatter.format(infoBooking.pricePakage + 50000)}
                          </Text>
                        </Space>
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      style={{ backgroundColor: '#00ADB3', width: '100%' }}
                      // onClick={() => sendBooking()}
                      htmlType="submit"
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
  } else {
    return (
      <div
        style={{
          color: '#fff',
          height: '80vh',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin
          spinning={spinning}
          indicator={antIcon}
          fullscreen
          style={{ background: '#ECF3F4' }}
        />
        <Result
          status="warning"
          title="Bạn vẫn chưa thông tin đặt"
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/')}
              style={{ backgroundColor: '#00ADB3' }}
            >
              Trở về trang chủ
            </Button>
          }
        />
      </div>
    );
  }
}
