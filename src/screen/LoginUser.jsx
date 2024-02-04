import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import clientApi from 'api/clientApi';
import Cookies from 'js-cookie';
import { loginClient } from '../features/Client/clientSlice';

const schema = yup
  .object({
    username: yup.string().required('Mời bạn nhập tên tài khoản!'),
    password: yup.string().required('Mời bạn nhập mật khẩu!'),
  })
  .required();

export default function LoginUser() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await clientApi.login(data);

      if (response.data.token) {
        dispatch(loginClient(response.data));

        Cookies.set('accessToken', response.data.token, { expires: 1 });
        Cookies.set('refreshToken', response.data.refreshToken, { expires: 1 });

        if (response.data.roles.includes('ROLE_USER')) {
          navigate('/');
        } else {
          alert('Bạn không có quyền truy cập!');
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
        }
      }
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error calling login API:', error);
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

  return (
    <div style={customImageStyle}>
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
            Đăng nhập
          </h2>
        </div>
        <Form.Item
          label={
            <>
              Tên tài khoản <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
            </>
          }
          name="username"
          help={errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => <Input key="username" {...field} placeholder="Nhập tài khoản" />}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              Mật khẩu <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
            </>
          }
          name="password"
          help={errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password key="password" {...field} placeholder="Nhập mật khẩu" />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
