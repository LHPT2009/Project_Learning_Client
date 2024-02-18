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
import Cookies from 'js-cookie';
import { loginClient, logout } from '../features/Client/clientSlice';
// import { fetchGetUserById } from '../features/Client/clientSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const schema = yup
  .object({
    username: yup.string().required('Mời bạn nhập tên tài khoản!'),
    password: yup.string().required('Mời bạn nhập mật khẩu!'),
  })
  .required();

const key = 'updatable';

export default function LoginUser() {
  // Translation
  const { i18n, t } = useTranslation();

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
    try {
      setSpinning(true);
      const response = await clientApi.login(data);
      const checkgoback = params.get('goBack');

      if (response.data && response.data.token) {
        await dispatch(loginClient(response.data));
        if (response.data.roles.includes('ROLE_USER')) {
          if (checkgoback === null) {
            Cookies.set('accessToken', response.data.token, { expires: 1 });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: 1 });
            navigate('/');
          } else {
            navigate(-1);
            message.success('Mời bạn tiếp tục');
          }
        } else {
          dispatch(logout());
          alert('Bạn không có quyền truy cập!');
        }
      }
    } catch (error) {
      message.error('Tại khoản hoặc mật khẩu của bạn hiện đang không đúng!');
      console.error('Error calling login API:', error);
    } finally {
      setSpinning(false);
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
