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
import { addTempBooking, fetchSendMail } from './bookingSlice';
import { fetchCreateTransaction } from '../Transaction/transactionSlice';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { fetchPayments } from '../../features/Payment/paymentSlice';
import { TRANSLATIONS } from '../../constants';

export default function Booking() {
  // Constants
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { Text, Title } = Typography;
  const { Content } = Layout;
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
  const dayMappingvn = {
    Monday: 'Thứ 2',
    Tuesday: 'Thứ 3',
    Wednesday: 'Thứ 4',
    Thursday: 'Thứ 5',
    Friday: 'Thứ 6',
    Saturday: 'Thứ 7',
    Sunday: 'Chủ nhật',
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  // Local State
  const [spinning, setSpinning] = useState(true);
  const [changeWidth, setChangeWidth] = useState(window.innerWidth);

  // Redux State
  const infoBooking = useSelector((state) => state.booking.infoBooking);
  const infoUser = useSelector((state) => state.client.client);
  const listPayment = useSelector((state) => state.payment.payments);
  const loadFullDataUser = useSelector((state) => state.client.userinfo[0]);

  const schema = yup
    .object({
      idPaymentMethod: yup.string().required(t(`${TRANSLATIONS.BOOKING.REQUIREPAY}`)),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: loadFullDataUser ? loadFullDataUser.fullName : '',
      phone: loadFullDataUser ? loadFullDataUser.phone : '',
      gender: loadFullDataUser ? loadFullDataUser.gender : '',
      dateOfBirth: formatISODateToDDMMYYYY(loadFullDataUser ? loadFullDataUser.dateOfBirth : ''),
      address: loadFullDataUser ? loadFullDataUser.address : '',
      description: '',
    },
  });

  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPayments());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, [infoBooking]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Event Handlers
  const isURL = (str) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(str);
  };

  const formatTimeRange = (inputTime) => {
    var times = inputTime.split(' - ');
    var formattedTimes = times.map(function (time) {
      var parts = time.split(':');
      var hours = parts[0];
      var minutes = parts[1];

      return hours + 'h' + minutes;
    });

    var formattedRange = formattedTimes.join(' - ');

    return formattedRange;
  };

  function formatISODateToDDMMYYYY(isoDateString) {
    const inputDate = new Date(isoDateString);

    const day = inputDate.getUTCDate();
    const month = inputDate.getUTCMonth() + 1; // Tháng bắt đầu từ 0
    const year = inputDate.getUTCFullYear();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDate;
  }

  const formatDateShow = (inputDateString) => {
    const originalDate = new Date(inputDateString);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const day = originalDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  function generateString() {
    const firstTwoChars =
      String.fromCharCode(Math.floor(Math.random() * 26) + 65) +
      String.fromCharCode(Math.floor(Math.random() * 26) + 65);

    const remainingChars = Math.random().toString().slice(2, 8);

    const resultString = firstTwoChars + remainingChars;

    return resultString;
  }

  const handleResize = () => {
    setChangeWidth(window.innerWidth);
  };

  const sendBooking = (data) => {
    message.destroy();
    setSpinning(true);
    const formatsending = {
      idUser: infoUser.id,
      bookingDate: infoBooking.bookingDate,
      idPackage: infoBooking.idPackage,
      idDoctor: infoBooking.idDoctor,
      idScheduleDetail: infoBooking.idScheduleDetail,
      idPaymentMethod: data.idPaymentMethod,
      description: data.description,
      code: generateString(),
    };

    if (formatsending.idPaymentMethod === '1') {
      dispatch(fetchCreateTransaction(formatsending))
        .then((item) => {
          if (item.payload && item.payload === 'Transaction created successfully') {
            message.success({
              style: { marginTop: '7vh' },
              content: t(`${TRANSLATIONS.BOOKING.SUCCESS}`),
            });
            navigate('/success/cash');
            setSpinning(false);
            dispatch(fetchSendMail(formatsending));
          } else if (
            item.payload &&
            item.payload.data.message === 'ERR_SCHEDULES_DETAIL_ALREADY_EXIST'
          ) {
            message.error({
              style: { marginTop: '7vh' },
              content: t(`${TRANSLATIONS.BOOKING.ERROR}`),
            });
            setSpinning(false);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error({
            style: { marginTop: '7vh' },
            content: `Đã xảy ra lỗi: ${err}`,
          });
          setSpinning(false);
        });
    }

    if (formatsending.idPaymentMethod === '2') {
      dispatch(addTempBooking(formatsending));
      dispatch(fetchCreateTransaction(formatsending))
        .then((item) => {
          const checkUrl = isURL(item.payload);
          if (checkUrl) {
            message.loading({
              style: { marginTop: '7vh' },
              content: t(`${TRANSLATIONS.BOOKING.LOADING}`),
            });
            navigate('/success/vnpay');
            window.open(`${item.payload}`, '_blank');
            setSpinning(false);
          } else {
            message.error({
              style: { marginTop: '7vh' },
              content: t(`${TRANSLATIONS.BOOKING.ERROR}`),
            });
            setSpinning(false);
          }
        })
        .catch((err) => {
          message.error({
            style: { marginTop: '7vh' },
            content: `Đã xảy ra lỗi: ${err}`,
          });
          setSpinning(false);
        });
    }
  };

  if (infoBooking && infoUser && listPayment && listPayment.length > 0) {
    return (
      <>
        <Spin
          spinning={spinning}
          indicator={antIcon}
          fullscreen
          style={{ background: '#ECF3F4' }}
        />
        <Layout
          style={
            changeWidth > 750
              ? {
                  padding: '24px',
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  height: 'auto',
                  margin: '20px',
                  width: '700px',
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }
              : {
                  padding: '24px',
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                  height: 'auto',
                  margin: '20px',
                  width: 'auto',
                }
          }
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
            {t(`${TRANSLATIONS.BOOKING.TITLE}`)}
          </Title>
          <Content
            style={{
              height: 'auto',
            }}
          >
            <Title level={3} style={{ color: '#005761' }}>
              {t(`${TRANSLATIONS.BOOKING.DOCTOR}`)}
            </Title>
            <Row>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={6}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Avatar size={150} icon={<UserOutlined />} src={infoBooking?.avatarDoctor} />
              </Col>
              <Col xs={24} sm={24} md={24} lg={18}>
                <Space direction="vertical">
                  <Title level={3} style={{ color: '#005761' }}>
                    {t(`${TRANSLATIONS.BOOKING.SPECIALIST}`)} {infoBooking.fullNameDoctor}
                  </Title>
                  <Text>
                    {t(`${TRANSLATIONS.BOOKING.NAMEHOSPITAL}`)}: {infoBooking.hospitalsName}
                  </Text>
                  <Text>
                    {t(`${TRANSLATIONS.BOOKING.PACKAGE}`)}: {infoBooking.namePackage}
                  </Text>
                  <Text>
                    {t(`${TRANSLATIONS.BOOKING.TIME}`)}:{' '}
                    {formatTimeRange(infoBooking.timeScheduleDetail)}
                  </Text>
                  <Text>
                    {t(`${TRANSLATIONS.BOOKING.DAY}`)} {dayMappingvn[infoBooking.bookingDay]} -{' '}
                    {formatDateShow(infoBooking.bookingDate)}
                  </Text>
                </Space>
              </Col>
            </Row>
            <Title level={3} style={{ color: '#005761' }}>
              {t(`${TRANSLATIONS.BOOKING.CUSTOMER.TITLE}`)}
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
                    label={t('description.columncontent.booking.fullname')}
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
                      render={({ field }) => <Input {...field} disabled />}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('description.columncontent.booking.phone')}
                    labelCol={{ span: 24 }}
                    help={
                      errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>
                    }
                  >
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => <Input {...field} disabled />}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('description.columncontent.booking.gender')}
                    labelCol={{ span: 24 }}
                    help={
                      errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>
                    }
                  >
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => <Input {...field} disabled />}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('description.columncontent.booking.dateOfBirth')}
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
                      render={({ field }) => <Input {...field} disabled />}
                    />
                  </Form.Item>

                  <Form.Item
                    label={t('description.columncontent.booking.address')}
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
                      render={({ field }) => <Input {...field} disabled />}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('description.columncontent.booking.description')}
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
                          placeholder={t('description.columncontent.booking.inputdescription')}
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('description.columncontent.booking.method')}
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
                  <Form.Item
                    label={t('description.columncontent.booking.cost')}
                    labelCol={{ span: 24 }}
                  >
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
                          <Text>{t('description.columncontent.booking.price')}</Text>
                          <Text>{t('description.columncontent.booking.total')}</Text>
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
                          <Text style={{ color: 'red' }}>
                            {formatter.format(infoBooking.pricePakage)}
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
                      htmlType="submit"
                    >
                      {t('description.columncontent.booking.confirm')}
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
          title={t(`${TRANSLATIONS.BOOKING.TITLERESULT}`)}
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/')}
              style={{ backgroundColor: '#00ADB3' }}
            >
              {t(`${TRANSLATIONS.BOOKING.BACK}`)}
            </Button>
          }
        />
      </div>
    );
  }
}
