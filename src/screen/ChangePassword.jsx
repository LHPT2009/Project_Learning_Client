import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, message } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { changePassword } from '../features/Client/clientSlice';
import { useTranslation } from 'react-i18next';

export default function ChangePassword() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (checkuser == null) {
      navigate('/error');
    }
  }, []);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkuser = useSelector((state) => state.client.client);

  const schema = yup
    .object({
      oldPass: yup
        .string()
        .required(t('description.columncontent.changepass.inputoldpass'))
        .min(8, t('description.columncontent.register.conpass1'))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t('description.columncontent.register.conpass2')
        ),
      password: yup
        .string()
        .required(t('description.columncontent.changepass.inputnewpass'))
        .min(8, t('description.columncontent.register.conpass1'))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t('description.columncontent.register.conpass2')
        ),
    })
    .required();

  const [spinning, setSpinning] = useState(true);
  setTimeout(() => {
    setSpinning(false);
  }, 500);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const dataChangePass = {
      oldPass: data.oldPass,
      password: data.password,
    };

    dispatch(changePassword(dataChangePass)).then((response) => {
      console.log(response);
      if (response.payload.statusCode === 200 && response.payload.data !== null) {
        // message.success(t('description.columncontent.changepass.success'));
        message.success({
          style: { marginTop: '7vh' },
          content: t('description.columncontent.changepass.success'),
        });
        // console.log('ĐỔI MẬT KHẨU THÀNH CÔNG');
        navigate('/userdetail');
      } else if (
        response.payload &&
        response.payload.data.message == 'ERR_INVALID_CURRENT_PASSWORD'
      )
        message.error({
          style: { marginTop: '7vh' },
          content: 'Mật khẩu cũ của bạn chưa đúng',
        });
      // message.error('Mật khẩu cũ của bạn chưa đúng');
      console.log('check pass thong tin', response.payload.statusCode);
    });
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
          width: '500px',
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
            {t('description.columncontent.changepass.title')}
          </h2>
        </div>
        <Form.Item
          label={
            <>
              {t('description.columncontent.changepass.oldpass')}{' '}
              <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
            </>
          }
          hasFeedback
          validateStatus={errors.oldPass ? 'error' : ''}
          help={errors.oldPass && <span style={{ color: 'red' }}>{errors.oldPass.message}</span>}
        >
          <Controller
            name="oldPass"
            control={control}
            render={({ field }) => (
              <Input.Password
                key="oldPass"
                {...field}
                placeholder={t('description.columncontent.changepass.inputoldpass')}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              {t('description.columncontent.changepass.newpass')}{' '}
              <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
            </>
          }
          hasFeedback
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                key="password"
                {...field}
                placeholder={t('description.columncontent.changepass.inputnewpass')}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          {/* {checkuser !== null ? ( */}
          <>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
            >
              {t('description.columncontent.changepass.submit')}
            </Button>
          </>
        </Form.Item>
      </Form>
    </div>
  );
}
