import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Spin, Typography, Space } from 'antd';
import Logo from '../../asset/image/logo_clinic.png';
import bgform from '../../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchForgot } from 'features/Client/clientSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from 'constants';
import { VALIDATE } from 'constants';
import { MESSAGE } from 'constants';
export default function ForgotPassword() {
  // Constants
  const { Text } = Typography;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  //Validate Yub
  const schema = yup
    .object({
      email: yup
        .string()
        .required(t(`${VALIDATE.FORGOTPASSWORD.EMAIL}`))
        .trim()
        .email(t(`${VALIDATE.FORGOTPASSWORD.CONEMAIL}`))
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          t(`${VALIDATE.FORGOTPASSWORD.CONEMAIL}`)
        ),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const customImageStyle = {
    backgroundImage: `url(${bgform})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#005761',
    height: '100vh',
    padding: '50px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Redux State

  // Local State
  const [spinning, setSpinning] = useState(true);
  const [statusPage, setStatusPage] = useState(true);

  // useEffect for loading data

  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  setTimeout(() => {
    setSpinning(false);
  }, 500);

  // Event Handlers
  const handleOk = async (data) => {
    setStatusPage(false);
    const dataForgot = {
      email: data.email,
    };
    try {
      dispatch(fetchForgot(dataForgot)).then((response) => {
        console.log(response);
        if (response.payload && response.payload.email === 'SUCCESS') {
          message.success({
            style: { marginTop: '7vh' },
            content: t(`${MESSAGE.FORGOTPASSWORD.SUCCESS}`),
          });
          navigate('/forgot');
        } else if (response.payload && response.payload.data === 'ERR_EMAIL_NOT_EXISTED')
          message.error({
            style: { marginTop: '7vh' },
            content: t(`${MESSAGE.FORGOTPASSWORD.ERROR}`),
          });
      });
    } catch (error) {
      console.error('Error while submitting form:', error);
    }
  };

  const backpage = () => {
    setStatusPage(true);
  };

  return (
    <div style={customImageStyle}>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      {statusPage ? (
        <Form
          onFinish={handleSubmit(handleOk)}
          name="basic"
          style={{
            width: 'auto',
            height: 'auto',
            background: '#ecf3f4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '10px',
            padding: '50px 40px',
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
              {t(`${TRANSLATIONS.FORGOTPASSWORD.TITLE}`)}
            </h2>
          </div>
          <Form.Item
            label={
              <>
                {t(`${TRANSLATIONS.FORGOTPASSWORD.EMAIL}`)}{' '}
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                background: '#00adb3',
                width: '100%',
              }}
            >
              {t(`${TRANSLATIONS.FORGOTPASSWORD.SUBMIT}`)}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          style={{
            width: 'auto',
            height: 'auto',
            background: '#ecf3f4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '10px',
            padding: '50px 40px',
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
              {t(`${TRANSLATIONS.FORGOTPASSWORD.TITLE}`)}
            </h2>
          </div>
          <Form.Item>
            <Space direction="vertical" size="middle" align="center">
              <Text>{t(`${TRANSLATIONS.FORGOTPASSWORD.TEXT1}`)}</Text>
              <Text>
                {t(`${TRANSLATIONS.FORGOTPASSWORD.TEXT2}`)}{' '}
                <Text strong style={{ color: 'red' }}>
                  {t(`${TRANSLATIONS.FORGOTPASSWORD.BACK}`)}
                </Text>{' '}
                {t(`${TRANSLATIONS.FORGOTPASSWORD.TEXT3}`)}
              </Text>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{
                background: '#00adb3',
                width: '100%',
              }}
              onClick={handleSubmit(backpage)}
            >
              {t(`${TRANSLATIONS.FORGOTPASSWORD.BACK}`)}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
