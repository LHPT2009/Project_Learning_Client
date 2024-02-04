import './style.css';
import React, { useState } from 'react';
import { Drawer, Menu, Image, Layout, Button, Select, Avatar, Row, Col, Flex, Input } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import LogoClinic from '../../asset/image/Logo.png';
import America from '../../asset/image/America.png';
import Vietnam from '../../asset/image/Vietnam.png';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const lngs = {
  vn: { nativeName: 'Vietnam', image: Vietnam },
  en: { nativeName: 'English', image: America },
};

const MenuComponent = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { Option } = Select;

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        height: '60px',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#0B111D',
          height: '60px',
          paddingRight: '12px',
          paddingTop: '10px',
          position: 'fixed',
          width: '100%',
          top: 0,
          textAlign: 'right',
        }}
        className="menuIcon"
      >
        <Link to={'/'}>
          <Image
            src={LogoClinic}
            height="44px"
            width="134px"
            alt="Logo Clinic"
            preview={false}
            style={{ position: 'relative', right: '150%', marginBottom: '20px' }}
          />
        </Link>
        <MenuOutlined
          style={{ color: 'white', fontSize: '30px', textAlign: 'right' }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <span className="headerMenu">
        <ListMenu />
      </span>
      <Drawer
        open={openMenu}
        placement="right"
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        bodyStyle={{
          backgroundColor: '#0B111D',
        }}
        width="100%"
        height="100vh"
      >
        <Row>
          <Col span={8} style={{ textAlign: 'start' }}>
            <Select
              defaultValue="vn"
              allowClear={false}
              size="large"
              style={{
                marginTop: '3px',
                width: '80px',
                backgroundColor: '#1E212D',
              }}
            >
              {Object.keys(lngs).map((lng) => (
                <Option key={lng} value={lng}>
                  <Avatar
                    shape="square"
                    style={{ marginRight: '35px', width: '38px', height: '30px' }}
                    src={lngs[lng].image}
                    alt="avatar"
                  />
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Link to={'/'} onClick={() => setOpenMenu(false)}>
              <Image
                src={LogoClinic}
                height="44px"
                width="134px"
                alt="Logo Clinic"
                preview={false}
              />
            </Link>
          </Col>
          <Col span={8} style={{ textAlign: 'end' }}>
            <Button
              type="text"
              onClick={() => {
                setOpenMenu(false);
              }}
              style={{ color: 'white' }}
            >
              X
            </Button>
          </Col>
        </Row>
        <ListMenuApp isInline />
      </Drawer>
    </div>
  );
};

const ListMenu = () => {
  return (
    <Header
      style={{
        backgroundColor: '#0B111D',
        padding: '0px 100px',
      }}
    >
      <Row>
        <Col span={8} style={{ textAlign: 'start' }}>
          <Link to={'/'}>
            <Image src={LogoClinic} height="44px" width="134px" alt="Logo Clinic" preview={false} />
          </Link>
        </Col>
        <Col span={8} style={{ textAlign: 'center', paddingTop: '2px' }}>
          <Input
            size="large"
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
            style={{ width: '80%' }}
          />
        </Col>
        <Col span={8} style={{ textAlign: 'end' }}>
          <Flex gap="large" justify="end" style={{ paddingTop: '12px' }}>
            <Select
              defaultValue="vn"
              allowClear={false}
              size="large"
              style={{ width: '80px', backgroundColor: '#1E212D' }}
            >
              {Object.keys(lngs).map((lng) => (
                <Option key={lng} value={lng}>
                  <Avatar
                    shape="square"
                    style={{ marginRight: '35px', width: '38px', height: '30px' }}
                    src={lngs[lng].image}
                    alt="avatar"
                  />
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: '#00ADB3', width: '120px' }}
            >
              Đặt lịch
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: '#00ADB3', width: '120px' }}
            >
              Đăng nhập
            </Button>
            <Button
              type="default"
              size="large"
              style={{
                border: '2px solid #00ADB3',
                backgroundColor: '#0B111D',
                color: '#00ADB3',
                width: '120px',
              }}
            >
              Đăng ký
            </Button>
          </Flex>
        </Col>
      </Row>
    </Header>
  );
};

const ListMenuApp = ({ isInline = false }) => {
  return (
    <Menu
      mode={isInline ? 'inline' : 'horizontal'}
      style={{
        backgroundColor: '#0B111D',
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginTop: isInline ? '30px' : '0px',
        height: '100vh',
      }}
      defaultActiveFirst={false}
      activeKey={null}
      defaultSelectedKeys={[]}
      selectedKeys={[]}
    >
      <Menu.Item
        style={{
          marginInline: '0px',
          paddingInline: '0px',
          margin: '0px 0px 20px 0px',
        }}
      >
        <Input
          size="large"
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          style={{ width: '100%' }}
        />
      </Menu.Item>
      <Menu.Item style={{ marginInline: '0px', paddingInline: '0px', margin: '0px 0px 20px 0px' }}>
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: '#00ADB3',
            width: isInline ? '100%' : '120px',
          }}
        >
          Đặt lịch
        </Button>
      </Menu.Item>
      <Menu.Item style={{ marginInline: '0px', paddingInline: '0px', margin: '0px 0px 20px 0px' }}>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: '#00ADB3', width: isInline ? '100%' : '120px' }}
        >
          Đăng nhập
        </Button>
      </Menu.Item>
      <Menu.Item style={{ marginInline: '0px', paddingInline: '0px', margin: '0px 0px 20px 0px' }}>
        <Button
          type="primary"
          size="large"
          style={{
            border: '2px solid #00ADB3',
            backgroundColor: '#0B111D',
            color: '#00ADB3',
            width: '100%',
            padding: '2px',
            height: '35px',
            marginBottom: '5px',
          }}
        >
          Đăng ký
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;
