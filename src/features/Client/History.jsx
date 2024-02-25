import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Image, Space, Button, Typography, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NoImage from '../../asset/image/NoImage.png';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchGetBookingByUserId } from '../Booking/bookingSlice';
import { LoadingOutlined } from '@ant-design/icons';
import { TRANSLATIONS, PLACEHOLDER } from '../../constants';
import { useTranslation } from 'react-i18next';
 
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const formattedTime = `${hours}h${minutes}`;
  return formattedTime;
}
 
const formatDate = (originalDate) => {
  const [year, month, day] = originalDate.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
 
const formatDateBOD = (originalDate) => {
  const dateObject = new Date(originalDate);
 
  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
 
  return `${day}/${month}/${year}`;
};
 
export default function History() {
  // Constants
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { Text } = Typography;
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;
 
  // Redux State
  const idUser = useSelector((state) => (state.client.client ? state.client.client.id : ''));
  const userInfo = useSelector((state) => state.client.userinfo[0]);
  const listBooking = useSelector((state) => state.booking.listBooking);
 
  // Get Data Redux State
  const filteredArray = listBooking.filter((item) => item.id ===  parseInt(id));
  const data = filteredArray[0];
  const bookingInfo = {
    name: userInfo ? userInfo.fullName : '',
    phone: userInfo ? userInfo.phone : '',
    gender: userInfo ? userInfo.gender : '',
    dob: formatDateBOD(userInfo ? userInfo.dateOfBirth : ''),
    dob: userInfo ? userInfo.dateOfBirth : '',
    address: userInfo ? userInfo.address : '',
    disease: data && data.description ? data.description : t(`${TRANSLATIONS.HISTORY.DISEASE}`),
    paymentMethod: data ? data.paymentMethod : '',
    total: formatter.format(data ? data.pricePackage : ''),
    statusTransaction: data ? data.statusTransaction : '',
  };
  console.log(bookingInfo)
  
  const doctorInfo = {
    name: data ? data.fullNameDoctor : '',
    disease: data ? data.specialistName : '',
    hospital: data ? data.nameHospital : '',
  };
  const detailBooking = {
    code: data ? data.code : '',
    time: `${formatTime(data ? data.bookingTimeStart : '')} - ${formatTime(
      data ? data.bookingTimeEnd : ''
    )}`,
    date: formatDate(data ? data.bookingDate : ''),
    location: data ? data.addressHospital : '',
    status: data ? data.status : '',
  };
 
  // Local State
  const [spinning, setSpinning] = useState(true);
 
  // useEffect for loading data
 
  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  useEffect(() => {
    if (listBooking === null) {
      navigate('/error');
    }
  }, []);
 
  useEffect(() => {
    dispatch(fetchGetBookingByUserId(idUser)).then((item) => {
      setTimeout(() => {
        setSpinning(false);
      }, 500);
    });
  }, []);
 
  // Event Handlers
 
  return (
    <div
      className="login-container"
      style={{
        background: `#ECF3F4`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Form
        name="basic"
        style={{
          width: '1300px',
          background: 'white',
          borderRadius: '10px',
          padding: '50px 50px',
          margin: '50px 0',
        }}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="horizontal"
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Button
                type="primary"
                size="large"
                style={{ backgroundColor: '#00ADB3' }}
                onClick={() => navigate('/userdetail/2')}
                icon={<ArrowLeftOutlined />}
              >
                {t(`${TRANSLATIONS.HISTORY.BUTTON}`)}
              </Button>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: '28px', fontWeight: '700', color: '#005761' }}>
                {t(`${TRANSLATIONS.HISTORY.TITLE}`)}
              </Text>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            ></div>
          </Col>
        </Row>
 
        <Row gutter={[16, 16]} style={{ justifyContent: 'space-between' }}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Row gutter={[16, 16]}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#005761' }}>
                  {t(`${TRANSLATIONS.HISTORY.CUSTOMER.INFO}`)}
                </h2>
              </div>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div>
                  <h5 style={{ fontSize: '15px' }}>{t(`${TRANSLATIONS.HISTORY.CUSTOMER.NAME}`)}</h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.PHONE}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.GENDER}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.BIRTHDAY}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.ADDRESS}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.REASION}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.PAYMETHOD}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px' }}>{t(`${TRANSLATIONS.HISTORY.CUSTOMER.PAY}`)}</h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.STATUSPAY}`)}
                  </h5>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  {Object.values(bookingInfo).map((value, index) =>
                    value !== 'SUCCESS' && value !== 'PENDING' && value !== 'CANCELED' ? (
                      <h5 key={index} style={{ fontSize: '15px' }}>
                        {value}
                      </h5>
                    ) : (
                      <Button
                        key={index}
                        type="primary"
                        size="small"
                        style={{
                          backgroundColor:
                            value === 'SUCCESS'
                              ? '#00ADB3'
                              : value === 'PENDING'
                              ? '#E7DE0D'
                              : value === 'CANCELED'
                              ? '#E7515A'
                              : '',
                          color: '#fff',
                        }}
                        disabled
                      >
                        {value === 'SUCCESS'
                          ? t(`${TRANSLATIONS.HISTORY.CUSTOMER.STATUSPAY1}`)
                          : value === 'PENDING'
                          ? t(`${TRANSLATIONS.HISTORY.CUSTOMER.STATUSPAY2}`)
                          : value === 'CANCELED'
                          ? t(`${TRANSLATIONS.HISTORY.CUSTOMER.STATUSPAY3}`)
                          : ''}
                      </Button>
                    )
                  )}
                </div>
              </Col>
            </Row>
          </Col>
 
          <Col xs={24} sm={24} md={24} lg={12}>
            <Row>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#005761' }}>
                  {t(`${TRANSLATIONS.HISTORY.DOCTOR.INFO}`)}
                </h2>
              </div>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div>
                  <h5 style={{ fontSize: '15px' }}>{t(`${TRANSLATIONS.HISTORY.DOCTOR.NAME}`)}</h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.DOCTOR.SPECIALIST}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.DOCTOR.HOSPITAL}`)}
                  </h5>
                </div>
              </Col>
              <Col span={8}>
                {Object.values(doctorInfo).map((value, index) => (
                  <h5 key={index} style={{ fontSize: '15px' }}>
                    {value}
                  </h5>
                ))}
              </Col>
            </Row>
            <Row>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#005761' }}>
                  {t(`${TRANSLATIONS.HISTORY.BOOKING.DETAIL}`)}
                </h2>
              </div>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div>
                  <h5 style={{ fontSize: '15px' }}>{t(`${TRANSLATIONS.HISTORY.BOOKING.CODE}`)}</h5>
                  <h5 style={{ fontSize: '15px' }}>{t(`${TRANSLATIONS.HISTORY.BOOKING.TIME}`)}</h5>
                  <h5 style={{ fontSize: '15px' }}>{t(`${TRANSLATIONS.HISTORY.BOOKING.DATE}`)}</h5>
                  <h5 style={{ fontSize: '15px' }}>
                    {t(`${TRANSLATIONS.HISTORY.CUSTOMER.ADDRESS}`)}
                  </h5>
                  <h5 style={{ fontSize: '15px', marginTop: '50px' }}>
                    {t(`${TRANSLATIONS.HISTORY.BOOKING.STATUS}`)}
                  </h5>
                </div>
              </Col>
              <Col span={8}>
                {Object.values(detailBooking).map((value, index) =>
                  value !== 'BOOKED' && value !== 'FINISHED' && value !== 'CANCELED' ? (
                    <h5 key={index} style={{ fontSize: '15px' }}>
                      {value}
                    </h5>
                  ) : (
                    <Button
                      key={index}
                      type="primary"
                      size="small"
                      style={{
                        backgroundColor:
                          value === 'BOOKED'
                            ? '#B0EEA6'
                            : value === 'FINISHED'
                            ? '#E7DE0D'
                            : value === 'CANCELED'
                            ? '#E7515A'
                            : '#000',
                        color: '#fff',
                      }}
                      disabled
                    >
                      {value === 'BOOKED'
                        ? t(`${TRANSLATIONS.HISTORY.BOOKING.STATUS1}`)
                        : value === 'FINISHED'
                        ? t(`${TRANSLATIONS.HISTORY.BOOKING.STATUS2}`)
                        : value === 'CANCELED'
                        ? t(`${TRANSLATIONS.HISTORY.BOOKING.STATUS3}`)
                        : ''}
                    </Button>
                  )
                )}
              </Col>
              <Col span={8}>
                <h5 style={{ fontSize: '15px', margin: '0px' }}>
                  {t(`${TRANSLATIONS.HISTORY.RESULT}`)}
                </h5>
                {data && data.urlNameImage !== null ? (
                  <Image
                    src={`${data.urlNameImage}`}
                    alt= {t(`${PLACEHOLDER.ALT}`)}
                    width={'140px'}
                    height={'140px'}
                    style={{
                      border: '5px dotted #ECF3F4',
                      padding: '5px',
                      backgroundColor: '#fff',
                      padding: '0px',
                      margin: '0px',
                    }}
                  />
                ) : (
                  <Image
                    src={NoImage}
                    alt= {t(`${PLACEHOLDER.ALT}`)}
                    width={'120px'}
                    height={'140px'}
                    style={{
                      border: '5px dotted #ECF3F4',
                      padding: '5px',
                      backgroundColor: '#fff',
                      padding: '0px',
                      margin: '0px',
                    }}
                    preview={false}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}