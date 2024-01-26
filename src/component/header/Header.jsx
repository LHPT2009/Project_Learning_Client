import { Button, Avatar, Select, Menu, Image, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import LogoClinic from '../../asset/image/Logo.png';
import America from '../../asset/image/America.png';
import Vietnam from '../../asset/image/Vietnam.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const { Header } = Layout;

const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'Hồ sơ cá nhân',
  },
  {
    key: '2',
    icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
    label: 'Đăng xuất',
  },
];

const lngs = {
  vn: { nativeName: 'Vietnam', image: Vietnam },
  en: { nativeName: 'English', image: America },
};

const HeaderLayout = () => {
  const { Option } = Select;
  return (
    <Header
      style={{
        backgroundColor: '#0B111D',
        padding: '0px 100px',
      }}
    >
      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          backgroundColor: '#0B111D',
          color: '#fff',
          display: 'flex',
        }}
        defaultActiveFirst={false}
        activeKey={null}
        defaultSelectedKeys={[]}
        selectedKeys={[]}
      >
        <Menu.Item style={{ flex: 1 }}>
          <Image src={LogoClinic} height="44px" width="134px" alt="Logo Clinic" preview={false} />
        </Menu.Item>
        <Menu.Item>
          <Select
            defaultValue="vn"
            allowClear={false}
            size="large"
            style={{ marginTop: '3px', width: '80px', backgroundColor: '#1E212D' }}
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
        </Menu.Item>
        <Menu.Item>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: '#00ADB3', width: '120px' }}
          >
            Đặt lịch
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: '#00ADB3', width: '120px' }}
          >
            Đăng nhập
          </Button>
        </Menu.Item>
        <Menu.Item>
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
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderLayout;
