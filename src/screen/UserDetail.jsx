import React, { useEffect, useState } from 'react';
import { Radio, Tabs, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const UserDetail = () => {
  const [mode, setMode] = useState('left');

  const navigate = useNavigate();
  const infoUser = useSelector((state) => (state.client.userinfo ? state.client.userinfo[0] : {}));
  const listBooking = useSelector((state) => state.booking.listBooking);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    if (infoUser === undefined || listBooking === undefined) {
      setTimeout(() => {
        setSpinning(false);
      }, 500);
      navigate('/error');
    } else {
      setTimeout(() => {
        setSpinning(false);
      }, 500);
    }
  }, [infoUser, listBooking, navigate]);

  const antIcon = <LoadingOutlined style={{ fontSize: 70, color: '#005761' }} spin />;

  return (
    <div>
      <Spin spinning={spinning} indicator={antIcon} fullscreen style={{ background: '#ECF3F4' }} />
      <Radio.Group
        value={mode}
        style={{
          marginBottom: 8,
        }}
      ></Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{
          height: 220,
        }}
        items={[
          {
            label: 'Thông Tin Cá Nhân',
            key: '1',
            children: (
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '65%' }}>Họ và tên: {infoUser ? infoUser.fullname : ''}</td>
                    <td style={{ width: '50%' }}>Giới tính: {infoUser ? infoUser.gender : ''}</td>
                  </tr>
                  <tr>
                    <td style={{ width: '65%' }}>Địa chỉ: {infoUser ? infoUser.address : ''}</td>
                    <td style={{ width: '50%' }}>
                      Số điện thoại: {infoUser ? infoUser.phone : ''}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: '65%' }}>
                      Ngày sinh: {infoUser ? infoUser.dateOfBirth : ''}
                    </td>
                    <td style={{ width: '50%' }}>Email: {infoUser ? infoUser.email : ''}</td>
                  </tr>
                </tbody>
              </table>
            ),
          },
          {
            label: 'Lịch Sử Khám',
            key: '2',
            children: (
              <table>
                <tbody>
                  <tr>
                    <td style={{ width: '65%' }}>
                      {listBooking ? (
                        <>
                          {listBooking.map((item) => (
                            <div key={item.infoUser.id}>
                              <p>Họ và tên: {item.fullNameUser}</p>
                              <p>Số điện thoại: {item.phoneUser}</p>
                              <p>Bác sĩ: {item.fullNameDoctor}</p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </td>
                    <td style={{ width: '50%' }}>Giới tính: {infoUser ? infoUser.gender : ''}</td>
                  </tr>
                </tbody>
              </table>
            ),
          },
        ]}
      />
    </div>
  );
};
export default UserDetail;
