import React, { useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function History() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (listBooking == null) {
      navigate('/error');
    }
  }, []);

  const listBooking = useSelector((state) => state.booking.listBooking);
  const filteredArray = listBooking.filter((item) => item.id == id);

  const data = filteredArray[0];

  const bookingInfo = {
    name: data ? data.fullNameUser : '',
    phone: data ? data.phoneUser : '',
    gender: data ? data.fullNameUser : '',
    dob: data ? data.fullNameUser : '',
    address: data ? data.fullNameUser : '',
    disease: data ? data.fullNameUser : '',
    paymentMethod: data ? data.fullNameUser : '',
    total: '550000',
  };
  const doctorInfo = {
    name: data ? data.fullNameDoctor : '',
    disease: data ? data.namePackage : '',
    hospital: data ? data.nameHospital : '',
  };
  const detailBooking = {
    time: `${data ? data.bookingTimeStart : ''} - ${data ? data.bookingTimeEnd : ''}`,
    date: data ? data.bookingDate : '',
    location: data ? data.addressHospital : '',
  };
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
      <Form
        name="basic"
        style={{
          width: '1700px',
          background: 'white',
          borderRadius: '10px',
          padding: '50px',
          margin: '50px 0px',
        }}
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="horizontal"
      >
        <Row gutter={[16, 16]} align="middle">
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
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#005761' }}>
              Lịch hẹn đã đặt
            </h2>
          </div>
        </Row>

        <Row
          gutter={[16, 16]}
          align="middle"
          style={{ display: '', justifyContent: 'space-between' }}
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={12}
            style={{
              borderRight: '1px solid #ddd',
              ...(window.innerWidth <= 767 && { borderRight: 'none' }),
            }}
          >
            <Row gutter={[16, 16]} align="middle">
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#005761' }}>
                  Thông tin khách hàng
                </h2>
              </div>
            </Row>
            <Row gutter={[16, 16]} align="middle">
              <Col span={12}>
                <div>
                  <h5 style={{ fontSize: '15px' }}>Tên khách hàng:</h5>
                  <h5 style={{ fontSize: '15px' }}>Số điện thoại:</h5>
                  <h5 style={{ fontSize: '15px' }}>Giới tính:</h5>
                  <h5 style={{ fontSize: '15px' }}>Ngày sinh:</h5>
                  <h5 style={{ fontSize: '15px' }}>Địa chỉ:</h5>
                  <h5 style={{ fontSize: '15px' }}>Lý do khám:</h5>
                  <h5 style={{ fontSize: '15px' }}>Phương thức thanh toán:</h5>
                  <h5 style={{ fontSize: '15px' }}>Chi phí khám:</h5>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  {Object.values(bookingInfo).map((value, index) => (
                    <h5 key={index} style={{ fontSize: '15px' }}>
                      {value}
                    </h5>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} style={{ padding: '50px' }}>
            <Row gutter={[16, 16]} align="middle">
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#005761' }}>
                  Thông tin bác sĩ
                </h2>
              </div>
            </Row>
            <Row gutter={[16, 16]} align="middle">
              <Col span={12}>
                <div>
                  <h5 style={{ fontSize: '15px' }}>Tên bác sĩ:</h5>
                  <h5 style={{ fontSize: '15px' }}>Chuyên khoa:</h5>
                  <h5 style={{ fontSize: '15px' }}>Bệnh viện:</h5>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  {Object.values(doctorInfo).map((value, index) => (
                    <h5 key={index} style={{ fontSize: '15px' }}>
                      {value}
                    </h5>
                  ))}
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]} align="middle">
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#005761' }}>
                  Thông tin chi tiết lịch hẹn
                </h2>
              </div>
            </Row>
            <Row gutter={[16, 16]} align="middle">
              <Col span={12}>
                <div>
                  <h5 style={{ fontSize: '15px' }}>Khung giờ khám:</h5>
                  <h5 style={{ fontSize: '15px' }}>Ngày khám:</h5>
                  <h5 style={{ fontSize: '15px' }}>Địa chỉ :</h5>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  {Object.values(detailBooking).map((value, index) => (
                    <h5 key={index} style={{ fontSize: '15px' }}>
                      {value}
                    </h5>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
