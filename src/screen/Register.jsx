import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Radio, Row, Col, Spin, message } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { fetchregister, clearMessageError } from 'features/Client/clientSlice';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';

const schema = yup
  .object({
    username: yup.string().required('Mời bạn nhập tên tài khoản!'),
    password: yup.string().required('Mời bạn nhập mật khẩu!'),
    fullname: yup.string().required('Mời bạn nhập họ và tên!'),
    gender: yup.string().required('Mời bạn chọn giới tính!'),
    dateOfBirth: yup.string().required('Mời bạn chọn ngày sinh!'),
    phone: yup.string().required('Mời bạn nhập số điện thoại!'),
    email: yup.string().required('Mời bạn nhập mail!'),
    address: yup.string().required('Mời bạn nhập địa chỉ!'),
  })
  .required();

function formatDate(inputDateString) {
  const originalDate = new Date(inputDateString);

  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [spinning, setSpinning] = useState(true);
  setTimeout(() => {
    setSpinning(false);
  }, 500);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: 'user2',
      password: 'user2',
      fullname: 'tung le',
      // gender: 'Nam',
      // dateOfBirth: '2001-12-15',
      phone: '12345675',
      email: 'user2@gmail.com',
      address: 'Q8 HCM',
    },
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeNameErr = (item) => {
    if (item == 'ERR_USERNAME_EXISTED') {
      setError('username', {
        type: 'manual',
        message: 'Tên tài khoản đã tồn tại!',
      });
      return 'Tên tài khoản đã tồn tại!';
    }
    if (item == 'ERR_EMAIL_EXISTED') {
      setError('email', {
        type: 'manual',
        message: 'Email đã tồn tại!',
      });
      return 'Email đẵ tồn tại!';
    }
    if (item == 'ERR_PHONE_EXISTED') {
      setError('phone', {
        type: 'manual',
        message: 'Số điện thoại đã tồn tại!',
      });
      return 'Số điện thoại đã tồn tại!';
    }
  };

  const handleOk = async (data) => {
    const dataRegister = {
      username: data.username,
      password: data.password,
      fullname: data.fullname,
      gender: data.gender,
      dateOfBirth: formatDate(data.dateOfBirth),
      phone: data.phone,
      email: data.email,
      address: data.address,
      roles: ['ROLE_USER'],
    };

    await dispatch(fetchregister(dataRegister)).then((item) => {
      const checkStatus = item.payload ? item.payload.status || item.payload.statusCode : '';
      if (checkStatus == 200) {
        message.success('Đăng ký thành công!');
        navigate('/login');
      }
      if (checkStatus == 400) {
        message.error(`${changeNameErr(item.payload.data.message)}`);
      }
    });
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

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  return (
    <div style={customImageStyle}>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
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
        <Form.Item
          label="Tên tài khoản"
          hasFeedback
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username && errors.username.message}
        >
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Vui lòng nhập tên tài khoản!' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          hasFeedback
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password && errors.password.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Vui lòng nhập Mật khẩu!' }}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          hasFeedback
          validateStatus={errors.fullname ? 'error' : ''}
          help={errors.fullname && errors.fullname.message}
        >
          <Controller
            name="fullname"
            control={control}
            rules={{ required: 'Vui lòng nhập Họ và tên!' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          hasFeedback
          validateStatus={errors.gender ? 'error' : ''}
          help={errors.gender && errors.gender.message}
        >
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

        <Form.Item
          label="Ngày sinh"
          name="dateOfBirth"
          hasFeedback
          validateStatus={errors.dateOfBirth ? 'error' : ''}
          help={errors.dateOfBirth && errors.dateOfBirth.message}
        >
          <Controller
            render={({ field }) => (
              <DatePicker {...field} placeholder="Chọn ngày sinh" style={{ width: '100%' }} />
            )}
            control={control}
            name="dateOfBirth"
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          hasFeedback
          validateStatus={errors.phone ? 'error' : ''}
          help={errors.phone && errors.phone.message}
        >
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'Vui lòng nhập số điện thoại!' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          hasFeedback
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email && errors.email.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Vui lòng nhập email!' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          hasFeedback
          validateStatus={errors.address ? 'error' : ''}
          help={errors.address && errors.address.message}
        >
          <Controller
            name="address"
            control={control}
            rules={{ required: 'Vui lòng nhập địa chỉ!' }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

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
