import React from 'react';
import { Form, Row, Col } from 'antd';

export default function History() {
  const bookingInfo = {
    name: 'Nguyễn Văn A',
    phone: '09876554333',
    gender: 'Nam',
    dob: '12/12/2002',
    address: 'Quận Tân Bình, Thành phố Hồ Chí Minh',
    disease: 'Bệnh xương khớp',
    paymentMethod: 'Tiền mặt',
    amount: '500.000đ',
    fee: '50.000đ',
    total: '550.000đ',
  };
  const doctorInfo = {
    name: 'Nguyễn Văn Hòn',
    disease: 'Cơ xương khớp',
    hospital: 'Bệnh viện Đa khoa Trung Ương',
  };
  const detailBooking = {
    time: '07:00 - 08:00',
    date: 'Thứ 2 - 22/01/2024',
    location: 'Quận Tân Bình, Thành phố Hồ Chí Minh',
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
                  <h5 style={{ fontSize: '15px' }}>Phí đặt lịch:</h5>
                  <h5 style={{ fontSize: '15px' }}>Tổng cộng:</h5>
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
            <Row gutter={[16, 16]} align="middle" style={{ marginTop: '95px' }}>
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
