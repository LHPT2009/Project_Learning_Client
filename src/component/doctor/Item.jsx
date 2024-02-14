import React, { useEffect, useState } from 'react';
import { Select, Col, Row, Image, Button, Flex, Space, Typography, message } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addInfoBooking } from '../../features/Booking/bookingSlice';
import { fetchGetDoctorById } from '../../features/Doctor/doctorSlice';

dayjs.extend(timezone);
dayjs.locale('vi');
const { Text, Title } = Typography;

const DataItem = ({ dataItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageDefault =
    'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png';
  const [day, setDay] = useState();
  const [date, setDate] = useState();
  const [arrDate, setArrDate] = useState([]);

  const checkuser = useSelector((state) => state.client.client);

  const [idSchedules, setIdSchedules] = useState();
  const [timeSchedules, setTimeSchedules] = useState();

  const [idPackage, setIdPackage] = useState();
  const [pricePakage, setPricePakage] = useState();

  const [arrFilterSchedules, setArrFilterSchedules] = useState([]);

  const dayMapping = {
    'thứ hai': 'Monday',
    'thứ ba': 'Tuesday',
    'thứ tư': 'Wednesday',
    'thứ năm': 'Thursday',
    'thứ sáu': 'Friday',
    'thứ bảy': 'Saturday',
    'chủ nhật': 'Sunday',
  };

  const CalDate = () => {
    dayjs.tz.setDefault('Asia/Ho_Chi_Minh');
    const currentDate = dayjs().add(1, 'day');
    const newDates = [];

    for (let i = 0; i < 7; i++) {
      const date = currentDate.add(i, 'day');
      const formattedDate = date.format('YYYY-MM-DD');
      const dayOfWeek = date.format('dddd');
      const showformatDate = date.format('DD/MM/YYYY');

      newDates.push({ date: formattedDate, day: dayOfWeek, showformatDate: showformatDate });
    }

    setArrDate(newDates);
  };

  useEffect(() => {
    CalDate();
  }, []);

  const FilterSchedules = (selectDay) => {
    setArrFilterSchedules([]);
    if (dataItem.schedulesDetailSet === null) {
      setArrFilterSchedules([]);
    } else if (dataItem.schedulesDetailSet !== null) {
      dataItem.schedulesDetailSet.forEach((item) => {
        if (dayMapping[selectDay] === item.schedulesDate && item !== null) {
          setArrFilterSchedules((prevArr) => [...prevArr, item]);
        }
      });
    }
  };

  const formatInfo = {
    idDoctor: dataItem.id,
    bookingDay: day,
    bookingDate: date,
    idScheduleDetail: idSchedules,
    timeScheduleDetail: timeSchedules,
    idPackage: idPackage,
    pricePakage: pricePakage,
  };

  const addInfo = () => {
    if (idSchedules == null && timeSchedules == null) {
      message.error('Chọn thời gian của bạn!');
    } else if (idPackage == null && pricePakage == null) {
      message.error('Chọn gói khám của bạn!');
    } else if (checkuser == null) {
      message.error('Chọn mời bạn đăng nhập!');
      navigate('/login');
    } else {
      dispatch(fetchGetDoctorById(dataItem.id));
      dispatch(addInfoBooking(formatInfo));
      navigate('/booking');
    }
  };

  const listPackage = dataItem.packagePrices;

  return (
    <>
      <Row
        gutter={[16, 16]}
        style={{
          backgroundColor: 'white',
          width: '100%',
          borderRadius: '10px',
          padding: '50px 0px',
          margin: '0px 0px 50px 0px',
        }}
      >
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Row>
            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
              <Image
                src={dataItem.avatar ? dataItem.avatar : imageDefault}
                width={150}
                height={150}
              />
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={18}>
              <Space direction="vertical">
                <Title
                  level={4}
                  style={{ lineHeight: '20px', color: '#005761', fontWeight: 'bold' }}
                >
                  Bác sĩ {dataItem.fullName}
                </Title>
                <Text style={{ lineHeight: '20px' }}>{dataItem.description}</Text>
                <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                  <EnvironmentOutlined style={{ marginRight: '5px', color: '#005761' }} />
                  {dataItem.nameHospital}
                </Text>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={8}>
          <Space direction="vertical">
            <Select
              placeholder="Chọn ngày"
              style={{ width: 250 }}
              onChange={(value, option) => {
                if (option) {
                  const [selectedDay, selectedDate] = option.value.split(' - ');

                  setDay(selectedDay);
                  setDate(selectedDate);
                  FilterSchedules(selectedDay);
                }
              }}
            >
              {arrDate.map((dataItem) => {
                return (
                  <Select.Option key={dataItem.id} value={`${dataItem.day} - ${dataItem.date}`}>
                    {dataItem.day} - {dataItem.showformatDate}
                  </Select.Option>
                );
              })}
            </Select>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
              <CalendarOutlined style={{ marginRight: '5px', color: '#005761' }} />
              LỊCH KHÁM
            </Text>
            <Flex wrap="wrap" gap="small">
              {arrFilterSchedules.length !== 0 ? (
                <>
                  {arrFilterSchedules.map((item) => (
                    <Button
                      style={{ width: '150px' }}
                      key={item.id}
                      onClick={() => {
                        setIdSchedules(item.id);
                        setTimeSchedules(`${item.startTime} - ${item.endTime}`);
                      }}
                    >
                      {item.startTime} - {item.endTime}
                    </Button>
                  ))}
                </>
              ) : (
                <>
                  <Button type="default" style={{ width: '200px' }} disabled>
                    Không có khung giờ nào
                  </Button>
                </>
              )}
            </Flex>
            <Text style={{ lineHeight: '20px' }}>Chọn và đặt lịch (chi phí 0đ)</Text>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>ĐỊA CHỈ KHÁM</Text>
            <Text style={{ lineHeight: '10px' }}>{dataItem.nameHospital}</Text>
            <Text style={{ lineHeight: '10px' }}>{dataItem.addressHospital}</Text>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>GIÁ KHÁM:</Text>
            <Select
              defaultValue="Chọn gói khám"
              style={{ width: 250 }}
              onChange={(value, option) => {
                if (option) {
                  setIdPackage(option.key);
                  setPricePakage(option.value);
                }
              }}
            >
              {listPackage.map((item) => (
                <Select.Option key={item.packageId} value={item.price}>
                  {item.packageName} - {item.price}
                </Select.Option>
              ))}
            </Select>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
              LOẠI BẢO HIỂM ÁP DỤNG.{' '}
              <Link
                href="https://ant.design"
                target="_blank"
                style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
              >
                Xem chi tiết.
              </Link>
            </Text>
            {checkuser !== null ? (
              <>
                <Button
                  type="primary"
                  size="middle"
                  style={{ width: 250, backgroundColor: '#00ADB3' }}
                  onClick={() => addInfo()}
                >
                  Đặt phòng
                </Button>
              </>
            ) : (
              <>
                <Link to={'/login?goBack=true'}>
                  <Button
                    type="primary"
                    size="middle"
                    style={{ width: 250, backgroundColor: '#00ADB3' }}
                  >
                    Hãy đăng nhập trước khi đặt phòng
                  </Button>
                </Link>
              </>
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default DataItem;
