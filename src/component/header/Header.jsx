import './Style.css';
import React, { useState } from 'react';
import {
  Drawer,
  Menu,
  Image,
  Layout,
  Button,
  Select,
  Avatar,
  Row,
  Col,
  Dropdown,
  message,
} from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';
import LogoClinic from '../../asset/image/Logo.png';
import America from '../../asset/image/America.png';
import Vietnam from '../../asset/image/Vietnam.png';
import LogoAdmin from '../../asset/image/LogoAdmin.png';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'features/Client/clientSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchGetUserById, fetchClientLogout } from '../../features/Client/clientSlice';
import { fetchGetBookingByUserId } from '../../features/Booking/bookingSlice';
import { fetchAllSpecialists } from '../../features/Specialist/specialistSlice';
import Cookies from 'js-cookie';
import { TRANSLATIONS, MESSAGE } from '../../constants';

const { Header } = Layout;

const listLanguage = {
  vn: { nativeName: 'Vietnam', image: Vietnam },
  en: { nativeName: 'English', image: America },
};

const MenuComponent = () => {
  // Constants
  const { t, i18n } = useTranslation();
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const User = useSelector((state) => state.client.client);

  // Local State
  const [openMenu, setOpenMenu] = useState(false);

  // useEffect for loading data

  // useEffect for user-related operations

  // Event Handlers
  const logoutAccount = () => {
    message.success({
      style: { marginTop: '7vh' },
      content: t(`${MESSAGE.LOGOUT.CONTENTLOGOUT}`),
    });
    setOpenMenu(false);
    dispatch(logout());
    dispatch(fetchClientLogout());
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('tokenExpirationMs');
    Cookies.remove('refreshTokenExpirationMs');
    navigate('/login');
  };

  const routeLogin = () => {
    setOpenMenu(false);
    navigate('/login');
  };

  const routeRegister = () => {
    setOpenMenu(false);
    navigate('/register');
  };

  const loadDataBeforeRoute = async () => {
    setOpenMenu(false);
    await dispatch(fetchGetBookingByUserId(User.id));
    await dispatch(fetchGetUserById(User.id));
    navigate('/userdetail/1');
  };

  const loadDataListSpecialists = async () => {
    setOpenMenu(false);
    await dispatch(fetchAllSpecialists());
    navigate('/specialists');
  };

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
      <div className="menuIcon" style={{ width: '100%' }}>
        <div
          style={{
            backgroundColor: '#0B111D',
            height: '60px',
            paddingRight: '12px',
            paddingTop: '10px',
            top: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to={'/'}>
            <Image
              src={LogoClinic}
              height="44px"
              width="134px"
              alt="Logo Clinic"
              preview={false}
              style={{ marginBottom: '40px', marginLeft: '40px' }}
            />
          </Link>
          <MenuOutlined
            style={{
              marginBottom: '5px',
              color: 'white',
              fontSize: '30px',
              marginRight: '40px',
            }}
            onClick={() => {
              setOpenMenu(true);
            }}
          />
        </div>
      </div>
      <span className="headerMenu">
        <Header
          style={{
            backgroundColor: '#0B111D',
            padding: '0px 100px',
          }}
        >
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col span={12}>
              <Link to={'/'} style={{ alignItems: 'start', justifyContent: 'flex-start' }}>
                <Image
                  src={LogoClinic}
                  height="44px"
                  width="134px"
                  alt="Logo Clinic"
                  preview={false}
                />
              </Link>
            </Col>
            <Col span={12}>
              <Menu
                mode="horizontal"
                style={{
                  maxWidth: '100%',
                  width: '100%',
                  color: '#fff',
                  alignItems: 'end',
                  justifyContent: 'flex-end',
                  marginTop: '2px',
                  border: 'none',
                }}
                theme="#0B111D"
              >
                <Menu.Item>
                  <Select
                    defaultValue="vn"
                    allowClear={false}
                    size="large"
                    style={{ width: '80px', backgroundColor: '#1E212D' }}
                    onChange={(value) => {
                      i18n.changeLanguage(value);
                    }}
                  >
                    {Object.keys(listLanguage).map((lng) => (
                      <Option key={lng} value={lng}>
                        <Avatar
                          shape="square"
                          style={{ marginRight: '35px', width: '38px', height: '30px' }}
                          src={listLanguage[lng].image}
                          alt="avatar"
                        />
                      </Option>
                    ))}
                  </Select>
                </Menu.Item>
                {User !== null ? (
                  <>
                    <Menu.Item>
                      <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#00ADB3', width: '120px' }}
                        onClick={() => loadDataListSpecialists()}
                      >
                        {t(`${TRANSLATIONS.HEADERPAGE.BUTTONBOOKING}`)}
                      </Button>
                    </Menu.Item>
                    <Menu.Item>
                      <Dropdown
                        trigger={['click']}
                        overlay={
                          <Menu>
                            <Menu.Item key="1" onClick={loadDataBeforeRoute}>
                              {t(`${TRANSLATIONS.HEADERPAGE.BUTTONINFO}`)}
                            </Menu.Item>
                            <Menu.Item key="2" onClick={logoutAccount}>
                              {t(`${TRANSLATIONS.HEADERPAGE.BUTTONLOGOUT}`)}
                            </Menu.Item>
                          </Menu>
                        }
                        placement="bottom"
                      >
                        <Button type="link" style={{ color: '#fff', height: '45px' }}>
                          {`${t(`${TRANSLATIONS.HOMEPAGE.PANNER.WELCOME}`)} ${
                            User ? User.fullName : ''
                          }`}
                          <DownOutlined />
                          <Avatar
                            style={{
                              width: '38px',
                              height: '38px',
                            }}
                            src={<img src={LogoAdmin} alt="avatar" />}
                          />
                        </Button>
                      </Dropdown>
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item>
                      <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#00ADB3', width: '120px' }}
                        onClick={() => loadDataListSpecialists()}
                      >
                        {t(`${TRANSLATIONS.HEADERPAGE.BUTTONBOOKING}`)}
                      </Button>
                    </Menu.Item>
                    <Menu.Item>
                      <Button
                        type="primary"
                        size="large"
                        style={{ backgroundColor: '#00ADB3', width: '120px' }}
                        onClick={routeLogin}
                      >
                        {t(`${TRANSLATIONS.HEADERPAGE.BUTTONLOGIN}`)}
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
                        onClick={routeRegister}
                      >
                        {t(`${TRANSLATIONS.HEADERPAGE.BUTTONREGISTER}`)}
                      </Button>
                    </Menu.Item>
                  </>
                )}
              </Menu>
            </Col>
          </Row>
        </Header>
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
              onChange={(value) => {
                i18n.changeLanguage(value);
                localStorage.setItem('i18nextLng', value);
              }}
            >
              {Object.keys(listLanguage).map((lng) => (
                <Option key={lng} value={lng}>
                  <Avatar
                    shape="square"
                    style={{ marginRight: '35px', width: '38px', height: '30px' }}
                    src={listLanguage[lng].image}
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
        <Menu
          mode={openMenu ? 'inline' : 'horizontal'}
          style={{
            backgroundColor: '#0B111D',
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            marginTop: openMenu ? '30px' : '0px',
            height: '100vh',
          }}
          defaultActiveFirst={false}
          activeKey={null}
          defaultSelectedKeys={[]}
          selectedKeys={[]}
        >
          <Menu.Item
            style={{ marginInline: '0px', paddingInline: '0px', margin: '0px 0px 20px 0px' }}
          >
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: '#00ADB3',
                width: openMenu ? '100%' : '120px',
              }}
              onClick={() => loadDataListSpecialists()}
            >
              {`${t(TRANSLATIONS.HEADERPAGE.BUTTONBOOKING)}`}
            </Button>
          </Menu.Item>
          {User !== null ? (
            <>
              <Menu.Item
                style={{ marginInline: '0px', paddingInline: '0px', margin: '0px 0px 20px 0px' }}
              >
                <Dropdown
                  trigger={['click']}
                  overlay={
                    <Menu>
                      <Menu.Item key="1" onClick={loadDataBeforeRoute}>
                        {`${t(TRANSLATIONS.HEADERPAGE.BUTTONINFO)}`}
                      </Menu.Item>
                      <Menu.Item key="2" onClick={logoutAccount}>
                        {`${t(TRANSLATIONS.HEADERPAGE.BUTTONLOGOUT)}`}
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottom"
                >
                  <Button
                    type="link"
                    style={{
                      color: '#fff',
                      height: '45px',
                      backgroundColor: '#00ADB3',
                      width: openMenu ? '100%' : '120px',
                    }}
                  >
                    {`${t(`${TRANSLATIONS.HOMEPAGE.PANNER.WELCOME}`)} ${User ? User.fullName : ''}`}
                    <DownOutlined />
                    <Avatar
                      style={{
                        width: '38px',
                        height: '38px',
                      }}
                      src={<img src={LogoAdmin} alt="avatar" />}
                    />
                  </Button>
                </Dropdown>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item
                style={{ marginInline: '0px', paddingInline: '0px', margin: '0px 0px 20px 0px' }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: '#00ADB3', width: openMenu ? '100%' : '120px' }}
                  onClick={routeLogin}
                >
                  {`${t(TRANSLATIONS.HEADERPAGE.BUTTONLOGIN)}`}
                </Button>
              </Menu.Item>
              <Menu.Item
                style={{ marginInline: '0px', paddingInline: '0px', margin: '0px 0px 20px 0px' }}
              >
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
                  onClick={routeRegister}
                >
                  {`${t(TRANSLATIONS.HEADERPAGE.BUTTONREGISTER)}`}
                </Button>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Drawer>
    </div>
  );
};

export default MenuComponent;
