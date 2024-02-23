import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import Logo from '../../asset/image/logo_clinic.png';
import bgform from '../../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import clientApi from 'api/clientApi';
import { updateAuthorizationHeader } from 'api/axiosClient';
import Cookies from 'js-cookie';
import { loginClient, fetchGetUserById } from './clientSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS, PLACEHOLDER, MESSAGE, VALIDATE } from '../../constants';
export default function LoginUser() {
  // Constants
  const { t } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  //Validate Yup
  const schema = yup
    .object({
      username: yup
        .string()
        .required(t(`${VALIDATE.LOGIN.INPUTUSERNAME}`))
        .trim()
        .matches(/^\S*$/, t(`${VALIDATE.LOGIN.CONUSERNAME}`)),
      password: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.LOGIN.CONPASS1}`))
        .min(8, t(`${VALIDATE.LOGIN.CONPASS2}`))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t(`${VALIDATE.LOGIN.CONPASS2}`)
        ),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Redux State
  const checkUser = useSelector((state) => state.client.client);

  // Local State
  const [spinning, setSpinning] = useState(true);

  // useEffect for loading data

  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  // Event Handlers
  const checkLogin = () => {
    if (checkUser === null) {
      setTimeout(() => {
        setSpinning(false);
      }, 500);
    } else {
      navigate('/');
    }
  };

  const onSubmit = async (data) => {
    message.destroy();
    try {
      const response = await clientApi.login(data);
      const checkgoback = params.get('goBack');
      if (response && response.data.token) {
        if (response.data.roles.includes('ROLE_USER')) {
          await dispatch(loginClient(response.data));
          Cookies.set('accessToken', response.data.token, { expires: 1 });
          Cookies.set('refreshToken', response.data.refreshToken, { expires: 1 });
          updateAuthorizationHeader();
          dispatch(fetchGetUserById(response.data.id));
          if (checkgoback === null) {
            message.success({
              style: { marginTop: '7vh' },
              content: t(`${MESSAGE.LOGIN.WELCOME}`),
            });
            navigate('/');
          } else {
            message.success({
              style: { marginTop: '7vh' },
              content: t(`${MESSAGE.LOGIN.SUCCESS}`),
            });
            navigate(-1);
          }
        } else {
          message.error({
            style: { marginTop: '7vh' },
            content: t(`${MESSAGE.LOGIN.ROLE}`),
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message === 'ERR_INVALID_USERNAME_OR_PASSWORD') {
        message.error({
          style: { marginTop: '7vh' },
          content: t(`${MESSAGE.LOGIN.ERROR}`),
        });
      } else {
        message.error({
          style: { marginTop: '7vh' },
          content: t(`${MESSAGE.LOGIN.ERRORSERVER}`),
        });
      }
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

  return (
    <div style={customImageStyle}>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Form
        name="basic"
        style={{
          width: '450px',
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
            {t(`${TRANSLATIONS.LOGIN.TITLE}`)}
          </h2>
        </div>
        <Form.Item
          label={
            <>
              {t(`${TRANSLATIONS.LOGIN.COLUMN.USERNAME}`)}{' '}
              <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
            </>
          }
          name="username"
          help={errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input key="username" {...field} placeholder={t(`${PLACEHOLDER.LOGIN.USERNAME}`)} />
            )}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              {t(`${TRANSLATIONS.LOGIN.COLUMN.PASSWORD}`)}{' '}
              <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
              <div style={{ position: 'relative', left: '170px' }}>
                <a className="login-form-forgot" href="/forgot">
                  {t(`${TRANSLATIONS.LOGIN.COLUMN.FORGOTPASS}`)}
                </a>
              </div>
            </>
          }
          name="password"
          help={errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                key="password"
                {...field}
                placeholder={t(`${PLACEHOLDER.LOGIN.PASSWORD}`)}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
          >
            {t(`${TRANSLATIONS.LOGIN.COLUMN.SUBMIT}`)}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
