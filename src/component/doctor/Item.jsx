import React, { useEffect, useState } from 'react';
import { Select, Col, Row, Image, Button, Flex, Space, Typography, message } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addInfoBooking } from '../../features/Booking/bookingSlice';

dayjs.extend(timezone);
dayjs.locale('vi');
const { Text, Title } = Typography;

const DataItem = ({ dataItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const imageDefault =
    'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png';
  const [day, setDay] = useState();
  const [arrDate, setArrDate] = useState([]);

  const [idSchedules, setIdSchedules] = useState();
  const [timeSchedules, setTimeSchedules] = useState();

  const [idPackage, setIdPackage] = useState();
  const [pricePakage, setPricePakage] = useState();

  const [arrFilterSchedules, setArrFilterSchedules] = useState([]);

  const dayMapping = {
    'thứ hai': 'Thứ 2',
    'thứ ba': 'Thứ 3',
    'thứ tư': 'Thứ 4',
    'thứ năm': 'Thứ 5',
    'thứ sáu': 'Thứ 6',
    'thứ bảy': 'Thứ 7',
    'chủ nhật': 'Chủ Nhật',
  };

  const CalDate = () => {
    dayjs.tz.setDefault('Asia/Ho_Chi_Minh');
    const currentDate = dayjs().add(1, 'day');
    const newDates = [];

    for (let i = 0; i < 7; i++) {
      const date = currentDate.add(i, 'day');
      const formattedDate = date.format('DD/MM/YYYY');
      const dayOfWeek = date.format('dddd');

      newDates.push({ date: formattedDate, day: dayOfWeek });
    }

    setArrDate(newDates);
  };

  useEffect(() => {
    CalDate();
  }, []);

  const FilterSchedules = (selectDay) => {
    setArrFilterSchedules([]);

    dataItem.schedules.forEach((item) => {
      if (
        dayMapping[selectDay.toLowerCase()] === item.schedulesDate &&
        item.status === 'INACTIVE'
      ) {
        setArrFilterSchedules((prevArr) => [...prevArr, item]);
      }
    });
  };

  const formatInfo = {
    idDoctor: dataItem.id,
    bookingDate: day,
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
    } else {
      dispatch(addInfoBooking(formatInfo));
      navigate('/booking');
    }
  };

  const listPackage = [
    { id: 1, name: 'Gói 1', price: 10000 },
    { id: 2, name: 'Gói 2', price: 20000 },
    { id: 3, name: 'Gói 3', price: 30000 },
  ];

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
                <Text style={{ lineHeight: '20px' }}>{dataItem.description} asdasdas</Text>
                <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                  <EnvironmentOutlined style={{ marginRight: '5px', color: '#005761' }} />
                  asdasd
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
                  setDay(option.value);
                  FilterSchedules(option.value);
                }
              }}
            >
              {arrDate.map((dataItem) => (
                <Select.Option key={dataItem.id} value={dataItem.day}>
                  {dataItem.day} - {dataItem.date}
                </Select.Option>
              ))}
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
              style={{ width: 150 }}
              onChange={(value, option) => {
                if (option) {
                  setIdPackage(option.key);
                  setPricePakage(option.value);
                }
              }}
            >
              {listPackage.map((item) => (
                <Select.Option key={item.id} value={item.price}>
                  {item.name} - {item.price}
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
            <Button
              type="primary"
              size="middle"
              style={{ width: 250, backgroundColor: '#00ADB3' }}
              onClick={() => addInfo()}
            >
              Đặt phòng
            </Button>
            <Link to={'/login'}>
              <Button
                type="primary"
                size="middle"
                style={{ width: 250, backgroundColor: '#00ADB3' }}
              >
                Hãy đăng nhập trước khi đặt phòng
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default DataItem;
