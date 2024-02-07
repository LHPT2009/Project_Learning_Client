import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchForgot } from 'features/Client/clientSlice';
export default function ForgotPassword() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleOk = async (data) => {
    const dataForgot = {
      email: data.email,
    };

    try {
      dispatch(fetchForgot(dataForgot));
      message.success('Đã gửi!');
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
  return (
    <div style={customImageStyle}>
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
            Quên mật khẩu
          </h2>
        </div>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Vui lòng nhập email!' }}
          render={({ field }) => (
            <Form.Item
              label="Vui lòng nhập email"
              hasFeedback
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email && errors.email.message}
            >
              <Input {...field} />
            </Form.Item>
          )}
        />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
          >
            Đặt lại mật khẩu của bạn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
