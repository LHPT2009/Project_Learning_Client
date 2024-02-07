import React, { useEffect } from 'react';
import { Button, Form, Input, DatePicker, Radio, Row, Col, Typography, message } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { fetchregister } from 'features/Client/clientSlice';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { Text } = Typography;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOk = async (data) => {
    const dataRegister = {
      username: data.username,
      password: data.password,
      fullname: data.fullname,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth.format('YYYY-MM-DD'),
      phone: data.phone,
      email: data.email,
      address: data.address,
      roles: ['ROLE_USER'],
    };

    try {
      dispatch(fetchregister(dataRegister));
      message.success('Đã lưu!');
      navigate('/login');
    } catch (error) {
      console.error('Error while submitting form:', error);
    }
  };

  const handleFailed = () => {
    message.error('Vui lòng điền đầy đủ thông tin!');
  };
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
      <Form
        onFinish={handleSubmit(handleOk)}
        onFinishFailed={handleFailed}
        name="basic"
        style={{
          width: '600px',
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
            Đăng ký
          </h2>
        </div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Vui lòng nhập tên tài khoản!' }}
              render={({ field }) => (
                <Form.Item
                  label="Tên tài khoản"
                  hasFeedback
                  validateStatus={errors.username ? 'error' : ''}
                  help={errors.username && errors.username.message}
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Vui lòng nhập Mật khẩu!' }}
              render={({ field }) => (
                <Form.Item
                  label="Mật khẩu"
                  hasFeedback
                  validateStatus={errors.password ? 'error' : ''}
                  help={errors.password && errors.password.message}
                >
                  <Input.Password {...field} />
                </Form.Item>
              )}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Controller
              name="fullname"
              control={control}
              rules={{ required: 'Vui lòng nhập Họ và tên!' }}
              render={({ field }) => (
                <Form.Item
                  label="Họ và tên"
                  hasFeedback
                  validateStatus={errors.fullname ? 'error' : ''}
                  help={errors.fullname && errors.fullname.message}
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Giới tính" name="gender">
              <Controller
                render={({ field }) => (
                  <Radio.Group>
                    <Radio {...field} value="Nam">
                      {' '}
                      Nam{' '}
                    </Radio>
                    <Radio {...field} value="Nữ">
                      {' '}
                      Nữ{' '}
                    </Radio>
                  </Radio.Group>
                )}
                control={control}
                name="gender"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Ngày sinh" name="date_of_birth">
              <Controller
                render={({ field }) => (
                  <DatePicker {...field} placeholder="Chọn ngày sinh" style={{ width: '100%' }} />
                )}
                control={control}
                name="dateOfBirth"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Vui lòng nhập số điện thoại!' }}
              render={({ field }) => (
                <Form.Item
                  label="Số điện thoại"
                  hasFeedback
                  validateStatus={errors.phone ? 'error' : ''}
                  help={errors.phone && errors.phone.message}
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Vui lòng nhập email!' }}
              render={({ field }) => (
                <Form.Item
                  label="Email"
                  hasFeedback
                  validateStatus={errors.email ? 'error' : ''}
                  help={errors.email && errors.email.message}
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Controller
              name="address"
              control={control}
              rules={{ required: 'Vui lòng nhập địa chỉ!' }}
              render={({ field }) => (
                <Form.Item
                  label="Địa chỉ"
                  hasFeedback
                  validateStatus={errors.address ? 'error' : ''}
                  help={errors.address && errors.address.message}
                >
                  <Input {...field} />
                </Form.Item>
              )}
            />
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
