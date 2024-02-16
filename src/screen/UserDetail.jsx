import React, { useEffect, useState } from 'react';
import { Radio, Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetBookingByUserId } from 'features/Booking/bookingSlice';

const UserDetail = () => {
  const [mode, setMode] = useState('left');
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.client.client);

  // useEffect(() => {
    dispatch(fetchGetBookingByUserId(infoUser.id));
  // }, []);

  const listBooking = useSelector((state) => state.booking.listBooking);
  return (
    <div>
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
                    {/* <td style={{ width: '65%' }}>Họ và tên: {infoUser ? infoUser.fullname : ''}</td> */}
                    {/* <td style={{ width: '50%' }}>Giới tính: {infoUser.gender}</td> */}
                  </tr>
                  <tr>
                    {/* <td style={{ width: '65%' }}>Địa chỉ: {infoUser.address}</td> */}
                    {/* <td style={{ width: '50%' }}>Số điện thoại: {infoUser.phone}</td> */}
                  </tr>
                  <tr>
                    {/* <td style={{ width: '65%' }}>Ngày sinh: {infoUser.dateOfBirth}</td> */}
                    {/* <td style={{ width: '50%' }}>Email: {infoUser.email}</td> */}
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
                              {/* <p>Bác sĩ: {item.fullNameDoctor}</p> */}
                              {/* Thêm các thông tin khác cần hiển thị */}
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>Loading...</p> // Hiển thị thông báo khi đang tải danh sách
                      )}
                    </td>
                    {/* <td style={{ width: '50%' }}>Giới tính: {infoUser.gender}</td> */}
                  </tr>
                </tbody>
              </table>
            ),
          },
          // Add more tabs here if needed
        ]}
      />
    </div>
  );
};
export default UserDetail;
