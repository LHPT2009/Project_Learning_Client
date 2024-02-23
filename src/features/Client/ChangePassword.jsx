import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, message } from 'antd';
import Logo from '../../asset/image/logo_clinic.png';
import bgform from '../../asset/image/Background_Form.png';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { changePassword } from './clientSlice';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../constants';
import { MESSAGE } from '../../constants';
import { VALIDATE } from '../../constants';

export default function ChangePassword() {
  // Constants
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const schema = yup
    .object({
      oldPass: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.CHANGEPASSWORD.OLDPASS.REQUIRED}`))
        .min(8, t(`${VALIDATE.CHANGEPASSWORD.OLDPASS.MIN}`))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t(`${VALIDATE.OLDPASS.MATCHES}`)
        ),
      password: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.CHANGEPASSWORD.PASSWORD.REQUIRED}`))
        .min(8, t(`${VALIDATE.CHANGEPASSWORD.PASSWORD.MIN}`))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t(`${VALIDATE.CHANGEPASSWORD.PASSWORD.MATCHES}`)
        ),
      repassword: yup
        .string()
        .trim()
        .required(t(`${VALIDATE.CHANGEPASSWORD.PASSWORD.REQUIRED}`))
        .min(8, t(`${VALIDATE.CHANGEPASSWORD.PASSWORD.MIN}`))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t(`${VALIDATE.CHANGEPASSWORD.PASSWORD.MATCHES}`)
        ),
    })
    .required();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;
  const password = watch('password', '');
  const rePassword = watch('repassword', '');
  const passwordsMatch = password === rePassword;

  // Redux State
  const checkuser = useSelector((state) => state.client.client);

  // Local State
  const [spinning, setSpinning] = useState(true);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  // useEffect for loading data

  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (checkuser === null) {
      navigate('/error');
    }
  }, []);
  setTimeout(() => {
    setSpinning(false);
  }, 500);
  useEffect(() => {
    if (!passwordsMatch) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [password, rePassword, passwordsMatch]);

  // Event Handlers
  const onSubmit = async (data) => {
    const dataChangePass = {
      oldPass: data.oldPass,
      password: data.password,
    };
    try {
      dispatch(changePassword(dataChangePass)).then((response) => {
        console.log(response);
        if (response.payload.statusCode === 200 && response.payload.data !== null) {
          message.success({
            style: { marginTop: '7vh' },
            content: t(`${MESSAGE.CHANGEPASSWORD.SUCCESS}`),
          });
          navigate('/userdetail/:id');
        } else if (
          response.payload &&
          response.payload.data.message === 'ERR_INVALID_CURRENT_PASSWORD'
        )
          message.error({
            style: { marginTop: '7vh' },
            content: t(`${MESSAGE.CHANGEPASSWORD.ERROR}`),
          });
      });
    } catch (error) {
      console.error('Error while submitting form:', error);
    }
  };

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
            {t(`${TRANSLATIONS.CHANGEPASSWORD.TITLE}`)}
          </h2>
        </div>
        <Form.Item
          label={
            <>
              {t(`${TRANSLATIONS.CHANGEPASSWORD.OLDPASS}`)}{' '}
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
                placeholder={t(`${TRANSLATIONS.CHANGEPASSWORD.OLDPASS}`)}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              {t(`${TRANSLATIONS.CHANGEPASSWORD.NEWPASS}`)}{' '}
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
                placeholder={t(`${TRANSLATIONS.CHANGEPASSWORD.INPUTNEWPASS}`)}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label={
            <>
              {t(`${TRANSLATIONS.CHANGEPASSWORD.CONFIRMPASS}`)}{' '}
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
                placeholder={t(`${TRANSLATIONS.CHANGEPASSWORD.INPUTCONFIRMPASS}`)}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          {!passwordsMatch && (
            <span style={{ color: 'red' }}>
              {t(`${TRANSLATIONS.CHANGEPASSWORD.PASSWORDSMATCH}`)}
            </span>
          )}
          <>
            <Button
              type="primary"
              htmlType="submit"
              style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
              disabled={isSubmitDisabled}
            >
              {t(`${TRANSLATIONS.CHANGEPASSWORD.SUBMIT}`)}
            </Button>
          </>
        </Form.Item>
      </Form>
    </div>
  );
}
