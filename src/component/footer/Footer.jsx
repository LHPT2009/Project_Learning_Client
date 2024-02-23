import React from 'react';
import { Layout, Button, Image, Input, Col, Row, Space, Typography } from 'antd';
import bgfooter from '../../asset/image/Background_Footer.png';
import LogoClinic from '../../asset/image/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../constants';

const { Footer } = Layout;

const FooterLayout = () => {
  // Constants
  const { Text, Title } = Typography;
  const { t } = useTranslation();

  // Redux State

  // Local State

  // useEffect for loading data

  // useEffect for user-related operations

  // Event Handlers

  //Style CSS
  const customFooterStyle = {
    backgroundImage: `url(${bgfooter})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <Footer style={{ backgroundColor: '#005761', color: '#fff', padding: '0' }}>
      <div style={customFooterStyle}>
        <div style={{ padding: '50px 100px' }}>
          <Row
            style={{
              height: '120px',
              width: '80%',
              position: 'relative',
              left: '50%',
              transform: 'translateX( -50%)',
              marginBottom: '30px',
            }}
          >
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#116069',
                padding: '5px',
              }}
            >
              <Image
                src={LogoClinic}
                height="44px"
                width="134px"
                alt="Logo Clinic"
                preview={false}
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#116069',
                padding: '5px',
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ fontSize: '28px', marginRight: '10px' }}
              />
              <Text style={{ color: '#fff' }}>
                {t(`${TRANSLATIONS.FOOTERPAGE.EMAIL}`)}: contact@website.com
              </Text>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#116069',
                padding: '5px',
              }}
            >
              <FontAwesomeIcon icon={faPhone} style={{ fontSize: '28px', marginRight: '10px' }} />
              <Text style={{ color: '#fff' }}>
                {t(`${TRANSLATIONS.FOOTERPAGE.PHONE}`)}: 0123456789
              </Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={6}
              style={{
                color: '#fff',
                paddingRight: '50px',
              }}
            >
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.about')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.ABOUT.TITLE}`)}
                </Title>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.aboutcontent')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.ABOUT.CONTENT}`)}
                </Text>
              </Space>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={6}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.service')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.SERVICE.TITLE}`)}
                </Title>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.package')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.SERVICE.CONTENT.PACKAGE}`)}
                </Text>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.specialist')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.SERVICE.CONTENT.SPECIALIST}`)}
                </Text>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.generalmedicine')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.SERVICE.CONTENT.GENERALMEDICINE}`)}v
                </Text>
              </Space>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={6}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.link')}{' '} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.LINKS.TITLE}`)}
                </Title>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.homepage')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.LINKS.CONTENT.HOMEPAGE}`)}
                </Text>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.doctor')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.LINKS.CONTENT.DOCTOR}`)}
                </Text>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.service')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.LINKS.CONTENT.SERVICE}`)}
                </Text>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.contact')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.LINKS.CONTENT.CONTACT}`)}
                </Text>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6}>
              <Space direction="vertical">
                <Title level={3} style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.newsletter')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.NEWSLETTER.TITLE}`)}
                </Title>
                <Text style={{ color: '#fff' }}>
                  {/* <Input size="large" placeholder={t('description.columncontent.footer.email')} /> */}
                  <Input
                    size="large"
                    placeholder={t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.NEWSLETTER.CONTENT.EMAIL}`)}
                  />
                </Text>
                <Text style={{ color: '#fff' }}>
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: '100%', backgroundColor: '#00ADB3' }}
                  >
                    {/* {t('description.columncontent.footer.register')} */}
                    {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.NEWSLETTER.CONTENT.REGISTER}`)}
                  </Button>
                </Text>
                <Text style={{ color: '#fff' }}>
                  {/* {t('description.columncontent.footer.description')} */}
                  {t(`${TRANSLATIONS.FOOTERPAGE.COLUMN.NEWSLETTER.CONTENT.DESCRIPTION}`)}
                </Text>
              </Space>
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            © HealthCare 2023 | All Rights Reserved by BU1
          </Row>
        </div>
      </div>
    </Footer>
  );
};

export default FooterLayout;
