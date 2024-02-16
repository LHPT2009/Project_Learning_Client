import React, { useState, useEffect } from 'react';
import { Input, Typography, Button, Flex, Avatar, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { fetchDoctors } from '../features/Doctor/doctorSlice';
import { fetchSpecialists } from '../features/Specialist/specialistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitals } from 'features/Hospital/hospitalsSlice';
import { useTranslation } from 'react-i18next';
const { Text, Title } = Typography;

const { Content } = Layout;

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  const { Text, Title } = Typography;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHospitals(5));
    dispatch(fetchDoctors(5));
    dispatch(fetchSpecialists(5));
    // dispatch(fetchHospitals(5));
  }, []);

  const isValidURL = (url, imageDefault) => {
    try {
      const urlObject = new URL(url);

      // Kiểm tra nếu URL sử dụng giao thức http hoặc https
      if (urlObject.protocol !== 'http:' && urlObject.protocol !== 'https:') {
        return imageDefault;
      }

      // Kiểm tra nếu URL không chứa khoảng trắng
      if (url.includes(' ')) {
        return imageDefault;
      }

      // Các kiểm tra khác tùy thuộc vào yêu cầu cụ thể của bạn

      return url;
    } catch (error) {
      return imageDefault;
    }
  };

  const doctors = useSelector((state) => state.doctor.doctors);
  const specialists = useSelector((state) => state.specialist.specialists);
  const hospitals = useSelector((state) => state.hospital.hospitals);

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
        placeholder={t('description.columncontent.search.input')}
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
        {t('description.columncontent.search.specialist')}
      </Title>
      {specialists.map((item, index) => (
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
            src={isValidURL(item.thumbnail)}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <Text>{item.name}</Text>
        </Button>
      ))}
      <Title
        level={5}
        style={{
          color: '#005761',
          fontWeight: 'bold',
        }}
      >
        {t('description.columncontent.search.hospital')}
      </Title>
      {hospitals.map((item, index) => (
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
            src={isValidURL(item.listUrl[0])}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          <Text>{item.name}</Text>
        </Button>
      ))}
      <Title
        level={5}
        style={{
          color: '#005761',
          fontWeight: 'bold',
        }}
      >
        {t('description.columncontent.search.doctor')}
      </Title>
      {doctors.map((item, index) => (
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
            src={isValidURL(item.image)}
            style={{ width: '50px', height: '50px', marginRight: '10px', marginTop: '-30px' }}
          />
          <Text>
            {item.fullNameDoctor}
            <br />
            {item.specialityId[0].name}
          </Text>
        </Button>
      ))}
    </Content>
  );
};

export default Search;
