import React, { useEffect, useState } from 'react';
import { Button, Form, Input, DatePicker, Radio, Row, Col, Spin, message } from 'antd';
import Logo from '../asset/image/logo_clinic.png';
import bgform from '../asset/image/Background_Form.png';
import { fetchregister } from 'features/Client/clientSlice';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const schema = yup
    .object({
      username: yup
        .string()
        .required(t('description.columncontent.register.inputusername'))
        .trim()
        .matches(/^\S*$/, t('description.columncontent.register.conusername'))
        .min(8, t('description.columncontent.register.conusername1'))
        .max(20, t('description.columncontent.register.conusername2')),
      password: yup
        .string()
        .trim()
        .required(t('description.columncontent.register.inputpassword'))
        .min(8, t('description.columncontent.register.conpass1'))
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])\S{8,}$/,
          t('description.columncontent.register.conpass2')
        ),
      fullname: yup.string()
        .trim()
        .required(t('description.columncontent.register.inputfullname')),
      gender: yup.string().required(t('description.columncontent.register.inputgender')),
      dateOfBirth: yup
        .date()
        .required(t('description.columncontent.register.inputdateOfBirth'))
        .max(new Date(), t('description.columncontent.register.condateOfBirth')),
      phone: yup
        .string()
        .trim()
        .required(t('description.columncontent.register.inputphone'))
        .matches(/^\d{10}$/, t('description.columncontent.register.conphone')),
      email: yup
        .string()
        .required(t('description.columncontent.register.inputemail'))
        .trim()
        .email(t('description.columncontent.register.conemail1'))
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, t('description.columncontent.register.conemail1')),
      address: yup.string().required(t('description.columncontent.register.inputaddress')),
    })
    .required();

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
      // username: 'user2',
      // password: 'user2',
      // fullname: 'tung le',
      // // gender: 'Nam',
      // // dateOfBirth: '2001-12-15',
      // phone: '12345675',
      // email: 'user2@gmail.com',
      // address: 'Q8 HCM',
    },
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeNameErr = (item) => {
    if (item == 'ERR_USERNAME_EXISTED') {
      setError('username', {
        type: 'manual',
        message: t('description.columncontent.register.existusername'),
      });
      return t('description.columncontent.register.existusername');
    }
    if (item == 'ERR_EMAIL_EXISTED') {
      setError('email', {
        type: 'manual',
        message: t('description.columncontent.register.existemail'),
      });
      return t('description.columncontent.register.existemail');
    }
    if (item == 'ERR_PHONE_EXISTED') {
      setError('phone', {
        type: 'manual',
        message: t('description.columncontent.register.existphone'),
      });
      return t('description.columncontent.register.existphone');
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
    try {
      await dispatch(fetchregister(dataRegister)).then((item) => {
        const checkStatus = item.payload ? item.payload.status || item.payload.statusCode : '';
        if (checkStatus == 200) {
          message.success({
            style: { marginTop: '7vh' },
            content: t('description.columncontent.register.success'),
          });
          navigate('/login');
        }
        if (checkStatus == 400) {
          message.error({
            style: { marginTop: '7vh' },
            content: `${changeNameErr(item.payload.data.message)}`,
          });
        }
      });
    } catch(error) {
      console.error('Error while submitting form:', error);
    }

  };

  const handleFailed = () => {
    message.error({
      style: { marginTop: '7vh' },
      content: t('description.columncontent.register.error'),
    });
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
          width: '800px',
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
            {t('description.columncontent.register.title')}
          </h2>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}>
            <Form.Item
              label={
                <>
                  {t('description.columncontent.register.username')}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>


              }

              hasFeedback
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username && errors.username.message}
            >
              <Controller
                name="username"
                control={control}
                //rules={{ required: 'Vui lòng nhập tên tài khoản!' }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
            <Form.Item
              label={
                <>
                  {t('description.columncontent.register.password')}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password && errors.password.message}
            >
              <Controller
                name="password"
                control={control}
                // rules={{ required: 'Vui lòng nhập Mật khẩu!' }}
                render={({ field }) => <Input.Password {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  {t('description.columncontent.register.fullname')}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>

              }
              hasFeedback
              validateStatus={errors.fullname ? 'error' : ''}
              help={errors.fullname && errors.fullname.message}
            >
              <Controller
                name="fullname"
                control={control}
                //rules={{ required: 'Vui lòng nhập Họ và tên!' }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  {t('description.columncontent.register.gender')}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
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
                      {t('description.columncontent.register.male')}{' '}
                    </Radio>
                    <Radio {...field} value="Nữ">
                      {' '}
                      {t('description.columncontent.register.female')}{' '}
                    </Radio>
                  </Radio.Group>
                )}
                control={control}
                name="gender"
              />
            </Form.Item>
          </Col>
          <Col xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={12}>

            <Form.Item
              label={
                <>

                  {t('description.columncontent.register.dateOfBirth')}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
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
              label={
                <>
                  {t('description.columncontent.register.phone')}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>
              }
              hasFeedback
              validateStatus={errors.phone ? 'error' : ''}
              help={errors.phone && errors.phone.message}
            >
              <Controller
                name="phone"
                control={control}
                //rules={{ required: 'Vui lòng nhập số điện thoại!' }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  Email
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>

              }

              hasFeedback
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email && errors.email.message}
            >
              <Controller
                name="email"
                control={control}
                // rules={{ required: 'Vui lòng nhập email!' }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item
              label={
                <>
                  {t('description.columncontent.register.address')}
                  <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
                </>

              }
              hasFeedback
              validateStatus={errors.address ? 'error' : ''}
              help={errors.address && errors.address.message}
            >
              <Controller
                name="address"
                control={control}
                //rules={{ required: 'Vui lòng nhập địa chỉ!' }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
        </Row>



        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: '#00adb3', width: '100%', marginTop: '30px' }}
          >
            {t('description.columncontent.register.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
