import React, { useEffect, useState } from 'react';
import { Select, Col, Row, Image, Button, Flex, Space, Typography, message, Tooltip } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUserById } from '../../features/Client/clientSlice';
import { addInfoBooking } from '../../features/Booking/bookingSlice';
import { fetchGetDoctorById } from '../../features/Doctor/doctorSlice';
import { fetchPayments } from '../../features/Payment/paymentSlice';
import { useTranslation } from 'react-i18next';
dayjs.extend(timezone);
dayjs.locale('en');

const { Text, Title } = Typography;

const DataItem = ({ dataItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const imageDefault =
    'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Free-Image.png';
  const [day, setDay] = useState();
  const [date, setDate] = useState();
  const [arrDate, setArrDate] = useState([]);

  const checkuser = useSelector((state) => state.client.client);

  const [idSchedules, setIdSchedules] = useState();
  const [timeSchedules, setTimeSchedules] = useState();
  const [isActive, setIsActive] = useState({});

  const [idPackage, setIdPackage] = useState();
  const [namePackage, setNamePackage] = useState();
  const [pricePakage, setPricePakage] = useState();

  const [arrFilterSchedules, setArrFilterSchedules] = useState([]);

  const dayMappingvn = {
    Monday: 'Thứ 2',
    Tuesday: 'Thứ 3',
    Wednesday: 'Thứ 4',
    Thursday: 'Thứ 5',
    Friday: 'Thứ 6',
    Saturday: 'Thứ 7',
    Sunday: 'Chủ nhật',
  };

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const formattedTime = `${hours}h${minutes}`;
    return formattedTime;
  }

  function filterUniqueDates(data) {
    const uniqueDates = {};
    const result = [];

    for (const item of data) {
      const { schedulesDate } = item;
      if (!uniqueDates[schedulesDate]) {
        result.push(item);
        uniqueDates[schedulesDate] = true;
      }
    }

    return result;
  }

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

    const filterDulicate = filterUniqueDates(dataItem.schedulesDetailSet);
    const filteredDates = newDates.filter((dateObj) =>
      filterDulicate.some((item) => item.schedulesDate === dateObj.day)
    );

    setArrDate(filteredDates);
  };

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  useEffect(() => {
    CalDate();
  }, []);

  const FilterSchedules = (selectDay) => {
    setArrFilterSchedules([]);
    if (dataItem.schedulesDetailSet === null) {
      setArrFilterSchedules([]);
    } else if (dataItem.schedulesDetailSet !== null) {
      dataItem.schedulesDetailSet.forEach((item) => {
        if (selectDay === item.schedulesDate && item !== null && item.status == 'INACTIVE') {
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
    namePackage: namePackage,
    pricePakage: pricePakage,
  };

  const addInfo = () => {
    if (idSchedules == null && timeSchedules == null) {
      message.error({
        style: { marginTop: '7vh' },
        content: 'Chọn thời gian của bạn!',
      });
    } else if (idPackage == null && pricePakage == null) {
      message.error({
        style: { marginTop: '7vh' },
        content: 'Chọn gói khám của bạn!',
      });
    } else if (checkuser == null) {
      message.error({
        style: { marginTop: '7vh' },
        content: 'Mời bạn đăng nhập!',
      });
      navigate('/login');
    } else {
      dispatch(fetchGetDoctorById(dataItem.id));
      dispatch(addInfoBooking(formatInfo));
      dispatch(fetchPayments());
      dispatch(fetchGetUserById(checkuser.id));
      navigate('/booking');
    }
  };

  const listPackage = dataItem.packagePrices;

  const sortArrFilterSchedules = arrFilterSchedules.sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.startTime}`);
    const timeB = new Date(`1970-01-01T${b.startTime}`);
    return timeA - timeB;
  });

  const getInfoPackage = (packageId) => {
    const selectedPackage = listPackage.find((item) => item.packageId === packageId);
    setIdPackage(selectedPackage.packageId);
    setNamePackage(selectedPackage.packageName);
    setPricePakage(selectedPackage.price);
  };

  const CustomDropdownContent = ({ item }) => (
    <div>
      <p>{item.packageName}</p>
      <p>{item.price}</p>
      {/* Thêm các phần tử khác tùy ý */}
    </div>
  );

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
                  {t('description.columncontent.item.doctor')} {dataItem.fullName}
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
              placeholder={t('description.columncontent.item.choiceday')}
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
                    {dayMappingvn[dataItem.day]} - {dataItem.showformatDate}
                  </Select.Option>
                );
              })}
            </Select>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
              <CalendarOutlined style={{ marginRight: '5px', color: '#005761' }} />
              {t('description.columncontent.item.calendar')}
            </Text>
            <Flex wrap="wrap" gap="small">
              {sortArrFilterSchedules.length !== 0 ? (
                <>
                  {sortArrFilterSchedules.map((item) => (
                    <Button
                      type={item.id == isActive.id ? 'primary' : 'default'}
                      style={
                        item.id == isActive.id
                          ? { width: '150px', backgroundColor: '#00ADB3' }
                          : { width: '150px' }
                      }
                      key={item.id}
                      onClick={() => {
                        setIdSchedules(item.id);
                        setTimeSchedules(`${item.startTime} - ${item.endTime}`);
                        setIsActive(item);
                      }}
                    >
                      {formatTime(item.startTime)} - {formatTime(item.endTime)}
                    </Button>
                  ))}
                </>
              ) : (
                <>
                  <Button type="default" style={{ width: '200px' }} disabled>
                    {t('description.columncontent.item.nocalendar')}
                  </Button>
                </>
              )}
            </Flex>
            <Text style={{ lineHeight: '20px' }}>{t('description.columncontent.item.choice')}</Text>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
              {t('description.columncontent.item.address')}
            </Text>
            <Text style={{ lineHeight: '10px' }}>{dataItem.nameHospital}</Text>
            <Text style={{ lineHeight: '10px' }}>{dataItem.addressHospital}</Text>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
              {t('description.columncontent.item.price')}
            </Text>
            <Select
              defaultValue={t('description.columncontent.item.choicepackage')}
              style={{ width: 250 }}
              onChange={(packageId) => {
                getInfoPackage(packageId);
              }}
            >
              {listPackage.map((item) => (
                <Select.Option key={item.packageId} value={item.packageId}>
                  <Tooltip
                    placement="bottom"
                    title={`${item.packageName} - ${formatter.format(item.price)}`}
                    style={{ width: '100%' }}
                  >
                    {item.packageName} - {formatter.format(item.price)}
                  </Tooltip>
                </Select.Option>
              ))}
            </Select>
            <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
              {t('description.columncontent.item.insurance')}{' '}
              <Link
                href="https://ant.design"
                target="_blank"
                style={{ lineHeight: '20px', fontWeight: 'lighter', color: '#00ADB3' }}
              >
                {t('description.columncontent.item.detail')}
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
                  {t('description.columncontent.item.booking')}
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
                    {t('description.columncontent.item.require')}
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
