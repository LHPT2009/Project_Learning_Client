import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import clientApi from 'api/clientApi';
import { updateAuthorizationHeader } from 'api/axiosClient';
import Cookies from 'js-cookie';
import { loginClient, fetchGetUserById } from '../features/Client/clientSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const key = 'updatable';

export default function LoginUser() {
  // Translation
  const { t } = useTranslation();
  const schema = yup
    .object({
      username: yup
        .string()
        .required(t('description.columncontent.login.inputusername'))
        .trim()
        .matches(/^\S*$/, t('description.columncontent.register.conusername')),
      password: yup
        .string()
        .trim()
        .required(t('description.columncontent.login.inputpassword'))
        .min(8, t('description.columncontent.register.conpass1'))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t('description.columncontent.register.conpass2')
        ),
    })
    .required();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [spinning, setSpinning] = useState(true);
  const checkUser = useSelector((state) => state.client.client);
  useEffect(() => {
    checklogin();
  }, []);

  const checklogin = () => {
    if (checkUser === null) {
      setTimeout(() => {
        setSpinning(false);
      }, 500);
    } else {
      navigate('/');
    }
  };
  const params = new URLSearchParams(window.location.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
              content: t('description.columncontent.login.welcome'),
            });
            navigate('/');
          } else {
            message.success({
              style: { marginTop: '7vh' },
              content: t('description.columncontent.login.success'),
            });
            navigate(-1);
          }
        } else {
          message.error({
            style: { marginTop: '7vh' },
            content: t('description.columncontent.login.role'),
          });
        }
      }
    } catch (error) {
      if (error.response.data.message === 'ERR_INVALID_USERNAME_OR_PASSWORD') {
        message.error({
          style: { marginTop: '7vh' },
          content: t('description.columncontent.login.error'),
        });
      } else {
        message.error({
          style: { marginTop: '7vh' },
          content: 'Lỗi Server',
        });
      }
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
            {t('description.headercontent.login')}
          </h2>
        </div>
        <Form.Item
          label={
            <>
              {t('description.columncontent.login.username')}{' '}
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
              <Input
                key="username"
                {...field}
                placeholder={t('description.columncontent.login.inputusername')}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              {t('description.columncontent.login.password')}{' '}
              <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
              <div style={{ position: 'relative', left: '170px' }}>
                <a className="login-form-forgot" href="/forgot">
                  {t('description.columncontent.login.forgotpass')}
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
                placeholder={t('description.columncontent.login.inputpassword')}
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
            {t('description.columncontent.login.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
