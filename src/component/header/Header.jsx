import './style.css';
import React, { useState } from 'react';
import { Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
const MenuComponent = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div
      style={{
        position: 'fixed', // Add this line
        width: '100%', // Add this line to make it full-width
        top: 0, // Add this line to position it at the top
        zIndex: 1000, // Add this line to make sure it's on top of other elements
      }}
    >
      <div
        style={{
          backgroundColor: 'darkorange',
          height: '60px',
          paddingLeft: '12px',
          paddingTop: '12px',
          position: 'fixed', // Add this line
          width: '100%', // Add this line to make it full-width
          top: 0, // Add this line to position it at the top
          zIndex: 1000, // Add this line to make sure it's on top of other elements
        }}
        className="menuIcon"
      >
        <MenuOutlined
          style={{ color: 'white', fontSize: '30px' }}
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
        placement="left"
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
        bodyStyle={{ backgroundColor: 'darkorange' }}
      >
        <ListMenu isInline />
      </Drawer>
    </div>
  );
};

const ListMenu = ({ isInline = false }) => {
  return (
    <Menu
      mode={isInline ? 'inline' : 'horizontal'}
      style={{
        backgroundColor: 'darkorange',
        color: 'white',
        fontSize: 24,
        border: 'none',
        height: '60px',
      }}
      items={[
        {
          label: 'Home',
          key: 'home',
        },
        {
          label: 'Contact Us',
          key: 'contact',
        },
        {
          label: 'About Us',
          key: 'about',
        },
        {
          label: 'Login',
          key: 'login',
        },
      ]}
    ></Menu>
  );
};

export default MenuComponent;
