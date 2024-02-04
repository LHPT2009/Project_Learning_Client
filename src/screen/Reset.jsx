import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import clientApi from 'api/clientApi';
// import Cookies from 'js-cookie';
// import { loginClient } from '../features/Client/clientSlice';

const schema = yup
  .object({
    password: yup.string().required('Mời bạn nhập mật khẩu!'),
    repassword: yup.string().required('Mời bạn nhập xác nhận mật khẩu!'),
  })
  .required();

export default function Reset() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(`${data.password} -- ${data.repassword}`);
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
            Mật khẩu mới
          </h2>
        </div>
        <Form.Item
          label={
            <>
              Mật khẩu mới <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
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
        <Form.Item
          label={
            <>
              Xác nhận mật khẩu <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
            </>
          }
          name="repassword"
          help={
            errors.repassword && <span style={{ color: 'red' }}>{errors.repassword.message}</span>
          }
        >
          <Controller
            name="repassword"
            control={control}
            render={({ field }) => (
              <Input.Password key="repassword" {...field} placeholder="Nhập xác nhận mật khẩu" />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
          >
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
