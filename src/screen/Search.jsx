import React, { useState, useEffect } from 'react';
import { Input, Typography, Button, Flex, Avatar, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
const { Content } = Layout;

const Search = () => {
  const specialityList = [
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/06/07/160505-bo-sung-icon-goi-khamom-sot.png',
      text: 'Cúm & Sốt',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/12/26/110200-huyen-icon-xet-nghiem.png',
      text: 'Sốt xuất huyết',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/06/07/160452-bo-sung-icon-goi-khamgan.png',
      text: 'Gan',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w1920/2023/06/07/180825-bo-sung-icon-goi-khamdi-ung-1.png',
      text: 'Dị ứng',
    },
  ];
  const hospitalList = [
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2020/06/03/114348-bv-viet-duc.jpg',
      text: 'Bệnh viện Hữu nghị Việt Đức',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2021/09/14/095119-benh-vien-cho-ray-h1.jpg',
      text: 'Bệnh viện Chợ Rẫy',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2020/05/29/112414-pk-dhyd1.jpg',
      text: 'Phòng khám Bệnh viện Đại học Y Dược 1',
    },
    {
      src: 'https://cdn.bookingcare.vn/fo/w640/2021/04/29/145224-bn-nam-hoc-va-hiem-muon-hn.jpg',
      text: 'Bệnh viện Nam học và Hiếm muộn Hà Nội',
    },
  ];
  const doctorList = [
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Thạc sĩ, Bác sĩ Nguyễn Văn Nghị ',
      speciality: 'Tiểu đường - Nội tiết - Ung bướu - Tuyến giáp',
    },
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Bác sĩ Chuyên khoa II Nguyễn Tuấn Minh',
      speciality: 'Sản Phụ khoa',
    },
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Giáo sư, Tiến sĩ Hà Văn Quyết',
      speciality: 'Tiêu hoá - Bệnh Viêm gan',
    },
    {
      src: 'https://i.ibb.co/ZWBPNyP/Capture.png',
      doctorName: 'Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An',
      speciality: 'Tai Mũi Họng - Nhi khoa',
    },
  ];

  //
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [window.innerWidth]);

  return (
    <Content style={{ padding: windowWidth > 600 ? '0px 100px' : '0px 20px' }}>
      <Input
        addonBefore={<SearchOutlined />}
        size="large"
        placeholder="Tìm kiếm"
        style={{
          margin: '20px 0',
          borderRadius: '6px',
        }}
        variant="outlined"
      />
      <Title
        level={5}
        style={{
          color: '#005761',
          fontWeight: 'bold',
        }}
      >
        Chuyên khoa
      </Title>
      {specialityList.map((item, index) => (
        <Button
          type="text"
          key={index}
          style={{
            color: '#000',
            height: '50px',
            margin: '10px 0',
            padding: '0',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <Avatar
            shape="square"
            preview={false}
            src={item.src}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <Text>{item.text}</Text>
        </Button>
      ))}
      <Title
        level={5}
        style={{
          color: '#005761',
          fontWeight: 'bold',
        }}
      >
        Bệnh viện
      </Title>
      {hospitalList.map((item, index) => (
        <Button
          type="text"
          key={index}
          style={{
            color: '#000',
            height: '50px',
            margin: '10px 0',
            padding: '0',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <Avatar
            shape="square"
            preview={false}
            src={item.src}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <Text>{item.text}</Text>
        </Button>
      ))}
      <Title
        level={5}
        style={{
          color: '#005761',
          fontWeight: 'bold',
        }}
      >
        Bác sĩ
      </Title>
      {doctorList.map((item, index) => (
        <Button
          type="text"
          key={index}
          style={{
            color: '#000',
            height: '60px',
            margin: '10px 0',
            padding: '0',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <Avatar
            shape="circle"
            preview={false}
            src={item.src}
            style={{ width: '50px', height: '50px', marginRight: '10px', marginTop: '-30px' }}
          />
          <Text>
            {item.doctorName}
            <br />
            {item.speciality}
          </Text>
        </Button>
      ))}
    </Content>
  );
};

export default Search;
