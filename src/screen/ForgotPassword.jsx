import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchForgot } from 'features/Client/clientSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
export default function ForgotPassword() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [spinning, setSpinning] = useState(true);
  setTimeout(() => {
    setSpinning(false);
  }, 500);
  const schema = yup
    .object({
      email: yup.string().required(t('description.columncontent.forgotpass.email'))
        .trim()
        .email(t('description.columncontent.register.conemail1'))
        .matches(/^[^\s@]+@gmail\.com$/, t('description.columncontent.register.conemail1')),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOk = async (data) => {
    const dataForgot = {
      email: data.email,
    };
    try {
      dispatch(fetchForgot(dataForgot));
      message.success(t('description.columncontent.forgotpass.success'));
      navigate('/forgot');
    } catch (error) {
      console.error('Error while submitting form:', error);
    }
  };
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
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  return (
    <div style={customImageStyle}>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />

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
            {t('description.columncontent.forgotpass.title')}
          </h2>
        </div>
        <Form.Item
          label={
            <>
              {t('description.columncontent.forgotpass.email')} <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
            </>
          }
          hasFeedback
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email && errors.email.message}
        >
          <Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: '#00adb3',
              width: '100%',
              // , marginTop: '10px'
            }}
          >
            {t('description.columncontent.forgotpass.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
