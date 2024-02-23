import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, Result, message } from 'antd';
import Logo from '../../asset/image/logo_clinic.png';
import bgform from '../../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { updateNewPass } from './clientSlice';
import { useTranslation } from 'react-i18next';
import { VALIDATE, TRANSLATIONS } from 'constants';
import { MESSAGE } from 'constants';

export default function Reset() {
  // Constants
  const { t } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  // Validate Yup
  const schema = yup
    .object({
      password: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.RESET.PASSWORD.REQUIRED}`))
        .min(8, t(`${VALIDATE.RESET.PASSWORD.MIN}`))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t(`${VALIDATE.RESET.PASSWORD.MATCHES}`)
        ),
      repassword: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.RESET.REPASSWORD.REQUIRED}`))
        .min(8, t(`${VALIDATE.RESET.REPASSWORD.MIN}`))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t(`${VALIDATE.RESET.REPASSWORD.MATCHES}`)
        ),
    })
    .required();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const password = watch('password', '');
  const rePassword = watch('repassword', '');

  const passwordsMatch = password === rePassword;

  // Redux State

  // Local State
  const [spinning, setSpinning] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  // useEffect for loading data
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  }, []);
  useEffect(() => {
    if (!passwordsMatch) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [password, rePassword, passwordsMatch]);

  // useEffect for user-related operations

  // Event Handlers
  const onSubmit = (data) => {
    const dataNewPassWord = {
      code: code,
      password: data.password,
    };
    try {
      dispatch(updateNewPass(dataNewPassWord)).then((item) => {
        console.log(item);
      });
      message.success({
        style: { marginTop: '7vh' },
        content: t(`${MESSAGE.RESET.SUCCESS}`),
      });
      navigate('/login');
    } catch (error) {
      console.error('Error while submitting form:', error);
    }
  };

  //Style CSS
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

  if (code) {
    return (
      <div style={customImageStyle}>
        <Spin
          spinning={spinning}
          indicator={antIcon}
          fullscreen
          style={{ background: '#ECF3F4' }}
        />

        <Form
          name="basic"
          style={{
            width: '470px',
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
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit(onSubmit)}
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
              {t(`${TRANSLATIONS.RESET.TITLE}`)}
            </h2>
          </div>
          <Form.Item
            label={
              <>
                {t(`${TRANSLATIONS.RESET.NEWPASS}`)}{' '}
                <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
              </>
            }
            hasFeedback
            validateStatus={errors.password ? 'error' : ''}
            help={
              errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>
            }
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  key="password"
                  {...field}
                  placeholder={t(`${TRANSLATIONS.RESET.INPUTNEWPASS}`)}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label={
              <>
                {t(`${TRANSLATIONS.RESET.CONFIRMPASS}`)}{' '}
                <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
              </>
            }
            hasFeedback
            validateStatus={errors.repassword ? 'error' : ''}
            help={
              errors.repassword && <span style={{ color: 'red' }}>{errors.repassword.message}</span>
            }
          >
            <Controller
              name="repassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  key="repassword"
                  {...field}
                  placeholder={t(`${TRANSLATIONS.RESET.INPUTCONFIRMPASS}`)}
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            {!passwordsMatch && (
              <span style={{ color: 'red' }}>{t(`${TRANSLATIONS.RESET.PASSWORDSMATCH}`)}</span>
            )}
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
              disabled={isSubmitDisabled}
            >
              {t(`${TRANSLATIONS.RESET.SUBMIT}`)}
            </Button>
          </Form.Item>
        </Form>
      </div>
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
          title={t(`${TRANSLATIONS.RESET.OTHERTITLE}`)}
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/')}
              style={{ backgroundColor: '#00ADB3' }}
            >
              {t(`${TRANSLATIONS.RESET.BUTTONBACK}`)}
            </Button>
          }
        />
      </div>
    );
  }
}
