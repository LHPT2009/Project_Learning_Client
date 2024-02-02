import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Col, Row, Image, Button, Layout, Space, Typography, Flex } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import bglist from '../asset/image/Background_List.png';
import { fetchDoctorsBySpecialty } from '../features/Doctor/doctorSlice';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/vi';

dayjs.extend(timezone);
dayjs.locale('vi'); // Đặt ngôn ngữ mặc định là tiếng Việt

const { Content, Header } = Layout;
const { Text, Title, Link } = Typography;
const ListDotor = () => {
  const { Option } = Select;

  // const [selectDay, setSelectDay] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const specialists = searchParams.get('specialists');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorsBySpecialty(specialists));
  }, []);

  const arrdoctorsbyspecialty = useSelector((state) => state.doctor.doctorsspecialty);

  // const [arrDate, setArrDate] = useState([]);

  // const CalDate = () => {
  //   dayjs.tz.setDefault('Asia/Ho_Chi_Minh'); // Set múi giờ cho Việt Nam
  //   const currentDate = dayjs().add(1, 'day');
  //   const newDates = [];

  //   for (let i = 0; i < 7; i++) {
  //     const date = currentDate.add(i, 'day');
  //     const formattedDate = date.format('DD/MM/YYYY'); // Định dạng thời gian
  //     const dayOfWeek = date.format('dddd');

  //     newDates.push({ date: formattedDate, day: dayOfWeek });
  //   }

  //   setArrDate(newDates);
  // };

  // // useEffect để gọi hàm CalDate khi component được render
  // useEffect(() => {
  //   CalDate();
  // }, []);

  // const handleChange = (day) => {
  //   console.log('Ngày bạn chọn: ', day);
  //   setSelectDay(day);
  // };

  const customStyle = {
    backgroundImage: `url(${bglist})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 'auto',
    paddingBottom: '30px',
    marginBottom: '50px',
    lineHeight: '0px',
  };
  return (
    <Layout>
      <Header style={customStyle}>
        <Content style={{ padding: '0px 50px' }}>
          <Space direction="vertical" size="middle">
            <Title level={2} style={{ lineHeight: '15px' }}>
              Cơ Xương Khớp
            </Title>
            <Title level={3} style={{ lineHeight: '25px' }}>
              Bác sĩ xương khớp giỏi
            </Title>
            <Title level={4} style={{ lineHeight: '20px' }}>
              Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:
            </Title>
            <Text style={{ lineHeight: '15px' }}>
              - Các chuyên gia có quá trình đào tạo bài bản, nhiều kinh nghiệm
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              - Các giáo sư, phó giáo sư đang trực tiếp nghiên cứu và giảng dạy tại Đại học Y khoa
              Hà Nội
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              - Các bác sĩ đã, đang công tác tại các bệnh viện hàng đầu Khoa Cơ Xương Khớp - Bệnh
              viện Bạch Mai, Bệnh viện Hữu nghị Việt Đức,Bệnh Viện E.
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              - Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hiệp hội Cơ Xương Khớp, Hội
              Thấp khớp học,...{' '}
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              - Được nhà nước công nhận các danh hiệu Thầy thuốc Nhân dân, Thầy thuốc Ưu tú, Bác sĩ
              Cao cấp,...
            </Text>
          </Space>
        </Content>
      </Header>
      <Content style={{ padding: '0px 50px' }}>
        {/* {arrdoctorsbyspecialty.map((item) => (
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
                  <Image src={item.avatar ? item.avatar : imageDefault} width={150} height={150} />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={18}>
                  <Space direction="vertical">
                    <Title
                      level={4}
                      style={{ lineHeight: '20px', color: '#005761', fontWeight: 'bold' }}
                    >
                      Bác sĩ {item.fullName}
                    </Title>
                    <Text style={{ lineHeight: '20px' }}>{item.description} asdasdas</Text>
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
                <Select placeholder="Chọn ngày" style={{ width: 250 }} onChange={handleChange}>
                  {arrDate.map((item) => (
                    <Select.Option key={item.id} value={`${item.day}`}>
                      {item.day} - {item.date}
                    </Select.Option>
                  ))}
                </Select>
                <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>
                  <CalendarOutlined style={{ marginRight: '5px', color: '#005761' }} />
                  LỊCH KHÁM
                </Text>
                <Flex wrap="wrap" gap="small">
                  {item.schedules !== null && item.schedules.length !== 0 ? (
                    item.schedules
                      .filter(
                        (itemSche) =>
                          itemSche.schedulesDate.toLowerCase() === selectDay.toLowerCase()
                      )
                      .map((itemSche) => {
                        if (itemSche.status === 'ACTIVE') {
                          return (
                            <Button
                              style={{ marginLeft: '10px', width: '150px' }}
                              block
                              key={itemSche.id}
                            >
                              {itemSche.startTime} - {itemSche.endTime}
                            </Button>
                          );
                        } else {
                          return (
                            <Button
                              type="default"
                              style={{ marginLeft: '10px', width: '200px' }}
                              disabled
                            >
                              Xxxxxx
                            </Button>
                          );
                        }
                      })
                  ) : (
                    <Button type="default" style={{ marginLeft: '10px', width: '200px' }} disabled>
                      Không có khung giờ nào
                    </Button>
                  )}
                </Flex>
                <Text style={{ lineHeight: '20px' }}>Chọn và đặt lịch (chi phí 0đ)</Text>
                <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>ĐỊA CHỈ KHÁM</Text>
                <Text style={{ lineHeight: '10px' }}>{item.nameHospital}</Text>
                <Text style={{ lineHeight: '10px' }}>{item.addressHospital}</Text>
                <Text style={{ lineHeight: '20px', fontWeight: 'bold' }}>GIÁ KHÁM:</Text>
                <Select
                  defaultValue="Thứ 6 - 19/1"
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={[{ value: 'Thứ 6 - 19/1', label: 'Thứ 6 - 19/1' }]}
                />
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
              </Space>
            </Col>
          </Row>
        ))} */}
      </Content>
    </Layout>
  );
};
export default ListDotor;
