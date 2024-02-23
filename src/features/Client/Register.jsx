import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Radio, Row, Col, Spin, message } from 'antd';
import Logo from '../../asset/image/logo_clinic.png';
import bgform from '../../asset/image/Background_Form.png';
import { fetchregister } from 'features/Client/clientSlice';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS, PLACEHOLDER, VALIDATE, MESSAGE } from '../../constants';
export default function Register() {
  // Constants
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  //Validate Yup
  const schema = yup
    .object({
      username: yup
        .string()
        .required(t(`${VALIDATE.REGISTER.USERNAME.INPUTUSERNAME}`))
        .trim()
        .matches(/^\S*$/, t(`${VALIDATE.REGISTER.USERNAME.CONUSERNAME}`))
        .min(8, t(`${VALIDATE.REGISTER.USERNAME.CONUSERNAME1}`))
        .max(20,t(`${VALIDATE.REGISTER.USERNAME.CONUSERNAME2}`)),
      password: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.REGISTER.PASSWORD.INPUTPASSWORD}`))
        .min(8, t(`${VALIDATE.REGISTER.PASSWORD.CONPASS1}`))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t(`${VALIDATE.REGISTER.PASSWORD.CONPASS2}`)
        ),
      fullname: yup.string().trim().required(t(`${VALIDATE.REGISTER.FULLNAME}`)),
      gender: yup.string().required(t(`${VALIDATE.REGISTER.GENDER}`)),
      dateOfBirth: yup
        .date()
        .required(t(`${VALIDATE.REGISTER.DATEOFBIRTH.INPUT}`))
        .max(new Date(), t(`${VALIDATE.REGISTER.DATEOFBIRTH.CONDITION}`)),
      phone: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.REGISTER.PHONE.INPUT}`))
        .matches(/^\d{10}$/, t(`${VALIDATE.REGISTER.PHONE.CONDITION}`)),
      email: yup
        .string()
        .required(t(`${VALIDATE.REGISTER.EMAIL.INPUT}`))
        .trim()
        .email(t(`${VALIDATE.REGISTER.EMAIL.CONDITION1}`))
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          t(`${VALIDATE.REGISTER.EMAIL.CONDITION1}`)
        ),
      address: yup.string().required(t(`${VALIDATE.REGISTER.ADDRESS}`)),
    })
    .required();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Redux State

  // Local State
  const [spinning, setSpinning] = useState(true);

  // useEffect for loading data
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, []);

  // useEffect for user-related operations

  // Event Handlers
  function formatDate(inputDateString) {
    const originalDate = new Date(inputDateString);

    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const day = originalDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const changeNameErr = (item) => {
    if (item === 'ERR_USERNAME_EXISTED') {
      setError('username', {
        type: 'manual',
        message: t(`${MESSAGE.REGISTER.USERNAME}`),
      });
      return t(`${MESSAGE.REGISTER.USERNAME}`);
    }
    if (item === 'ERR_EMAIL_EXISTED') {
      setError('email', {
        type: 'manual',
        message: t(`${MESSAGE.REGISTER.EMAIL}`),
      });
      return t(`${MESSAGE.REGISTER.EMAIL}`);
    }
    if (item === 'ERR_PHONE_EXISTED') {
      setError('phone', {
        type: 'manual',
        message: t(`${MESSAGE.REGISTER.PHONE}`),
      });
      return t(`${MESSAGE.REGISTER.PHONE}`);
    }
  };

  const handleOk = async (data) => {
    const dataRegister = {
      username: data.username,
      password: data.password,
      fullname: data.fullname,
      gender: data.gender,
      dateOfBirth: formatDate(data.dateOfBirth),
      phone: data.phone,
      email: data.email,
      address: data.address,
      roles: ['ROLE_USER'],
    };
    try {
      await dispatch(fetchregister(dataRegister)).then((item) => {
        const checkStatus = item.payload ? item.payload.status || item.payload.statusCode : '';
        if (checkStatus === 200) {
          message.success({
            style: { marginTop: '7vh' },
            content: t(`${MESSAGE.REGISTER.SUCCESS}`),
          });
          navigate('/login');
        }
        if (checkStatus === 400) {
          message.error({
            style: { marginTop: '7vh' },
            content: `${changeNameErr(item.payload.data.message)}`,
          });
        }
      });
    } catch (error) {
      console.error('Error while submitting form:', error);
    }
  };

  const handleFailed = () => {
    message.error({
      style: { marginTop: '7vh' },
      content: t(`${MESSAGE.REGISTER.ERROR}`),
    });
  };

  //Style CSS
  const customImageStyle = {
    backgroundImage: `url(${bgform})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#005761',
    height: 'auto',
    padding: '50px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={customImageStyle}>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Form
        onFinish={handleSubmit(handleOk)}
        onFinishFailed={handleFailed}
        name="basic"
        style={{
          width: '800px',
          height: 'auto',
          background: '#ecf3f4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '10px',
          padding: '50px',
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        layout="vertical"
        requiredMark={false}
      >
        <div
          className=""
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: '70px', height: '77px' }} />
          <h2
            style={{
              fontSize: '40px',
              fontWeight: '700',
              color: '#00adb3',
            }}
          >
            {t(`${TRANSLATIONS.REGISTER.TITLE}`)}
          </h2>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label={
                <>
                  {t(`${TRANSLATIONS.REGISTER.COLUMN.USERNAME}`)}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username && errors.username.message}
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
            <Form.Item
              label={
                <>
                   {t(`${TRANSLATIONS.REGISTER.COLUMN.PASSWORD}`)}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password && errors.password.message}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input.Password {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  {t(`${TRANSLATIONS.REGISTER.COLUMN.FULLNAME}`)}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.fullname ? 'error' : ''}
              help={errors.fullname && errors.fullname.message}
            >
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  {t(`${TRANSLATIONS.REGISTER.COLUMN.GENDER.TITLE}`)}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              name="gender"
              hasFeedback
              validateStatus={errors.gender ? 'error' : ''}
              help={errors.gender && errors.gender.message}
            >
              <Controller
                render={({ field }) => (
                  <Radio.Group>
                    <Radio {...field} value="Nam">
                      {' '}
                      {t(`${TRANSLATIONS.REGISTER.COLUMN.GENDER.MALE}`)}{' '}
                    </Radio>
                    <Radio {...field} value="Nữ">
                      {' '}
                      {t(`${TRANSLATIONS.REGISTER.COLUMN.GENDER.FEMALE}`)}{' '}
                    </Radio>
                  </Radio.Group>
                )}
                control={control}
                name="gender"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label={
                <>
                   {t(`${TRANSLATIONS.REGISTER.COLUMN.DATEOFBIRTH}`)}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              name="dateOfBirth"
              hasFeedback
              validateStatus={errors.dateOfBirth ? 'error' : ''}
              help={errors.dateOfBirth && errors.dateOfBirth.message}
            >
              <Controller
                render={({ field }) => (
                  <DatePicker {...field} placeholder={t(`${PLACEHOLDER.REGISTER.DATEOFBIRTH}`)} style={{ width: '100%' }} />
                )}
                control={control}
                name="dateOfBirth"
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  {t(`${TRANSLATIONS.REGISTER.COLUMN.PHONE}`)}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.phone ? 'error' : ''}
              help={errors.phone && errors.phone.message}
            >
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  Email
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email && errors.email.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  {t(`${TRANSLATIONS.REGISTER.COLUMN.ADDRESS}`)}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.address ? 'error' : ''}
              help={errors.address && errors.address.message}
            >
              <Controller
                name="address"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
          >
            {t(`${TRANSLATIONS.REGISTER.COLUMN.BUTTON}`)}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
