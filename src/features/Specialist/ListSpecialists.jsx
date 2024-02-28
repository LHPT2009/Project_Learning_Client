import React, { useEffect, useState } from 'react';
import {
  Flex,
  Card,
  Space,
  Row,
  Col,
  Layout,
  Typography,
  Image,
  Breadcrumb,
  Input,
  Pagination,
  Spin,
  Result,
} from 'antd';
import bglist from '../../asset/image/Background_List.png';
import IconFive from '../../asset/image/Icon_Five.png';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSpecialists } from './specialistSlice';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants';
import { LoadingOutlined } from '@ant-design/icons';

const ListSpecialists = () => {
  // Constants
  const { Content, Header } = Layout;
  const { Text, Title } = Typography;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageSize = 12;

  // Redux State
  const list = useSelector((state) => state.specialist.specialistsall);

  // Local State
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFiltered] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [spinningLoading, setSpinningLoading] = useState(false);

  // useEffect for loading data
  useEffect(() => {
    dispatch(fetchAllSpecialists());
    setSpinningLoading(true);
  }, []);

  // useEffect for user-related operations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Event Handlers
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFiltered(filteredList);
      setTotalItems(filteredList.length);
      setSpinningLoading(false);
    }, 1000);

    return () => clearTimeout(delaySearch);
  }, [keyword, list]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filtered.slice(startIndex, endIndex);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  //Style CSS
  const customStyle = {
    backgroundImage: `url(${bglist})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 'auto',
    paddingBottom: '30px',
    lineHeight: '0px',
  };

  return (
    <div>
      <Header style={customStyle}>
        <Content style={{ padding: '0px 50px' }}>
          <Space direction="vertical" size="middle">
            <Title level={2} style={{ lineHeight: '15px' }}>
              {t(`${TRANSLATIONS.LISTDOCTOR.TITLE1}`)}
            </Title>
            <Title level={3} style={{ lineHeight: '25px' }}>
              {t(`${TRANSLATIONS.LISTDOCTOR.TITLE2}`)}
            </Title>
            <Title level={4} style={{ lineHeight: '20px' }}>
              {t(`${TRANSLATIONS.LISTDOCTOR.TITLE3}`)}
            </Title>
            <Text style={{ lineHeight: '15px' }}>{t(`${TRANSLATIONS.LISTDOCTOR.TITLE4}`)}</Text>
            <Text style={{ lineHeight: '15px' }}>{t(`${TRANSLATIONS.LISTDOCTOR.TITLE5}`)}</Text>
            <Text style={{ lineHeight: '15px' }}>{t(`${TRANSLATIONS.LISTDOCTOR.TITLE6}`)}</Text>
            <Text style={{ lineHeight: '15px' }}>{t(`${TRANSLATIONS.LISTDOCTOR.TITLE7}`)} </Text>
            <Text style={{ lineHeight: '15px' }}>{t(`${TRANSLATIONS.LISTDOCTOR.TITLE8}`)}</Text>
          </Space>
        </Content>
      </Header>
      <Content style={{ padding: '20px 100px', height: 'auto' }}>
        <Row style={{ marginBottom: '20px' }}>
          <Breadcrumb
            items={[
              {
                title: t(`${TRANSLATIONS.LISTSPECIALISTS.TITLE1}`),
              },
              {
                title: t(`${TRANSLATIONS.LISTSPECIALISTS.TITLE2}`),
              },
            ]}
          />
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Input
            width={'100%'}
            onChange={(e) => {
              setKeyword(e.target.value);
              setSpinningLoading(true);
            }}
            placeholder={t(`${TRANSLATIONS.LISTSPECIALISTS.SEARCH}`)}
            size="large"
          />
        </Row>
        <Spin
          spinning={spinningLoading}
          indicator={
            <LoadingOutlined
              style={{
                color: '#005761',
                fontSize: '70px',
                marginLeft: '-40px',
                marginTop: '15px',
              }}
              spin
            />
          }
          size="large"
        >
          {getCurrentPageData().length === 0 ? (
            <Row
              style={{
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Col>
                <Result title="No Data" />
              </Col>
            </Row>
          ) : (
            <Row gutter={[16, 16]}>
              {getCurrentPageData().map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: '10px',
                      width: '100%',
                    }}
                    hoverable
                    bordered={true}
                    cover={
                      <Image
                        preview={false}
                        alt="example"
                        src={IconFive}
                        style={{
                          height: '200px',
                          width: '100%',
                          padding: '30px',
                        }}
                      />
                    }
                    onClick={() => navigate(`/list?specialists=${item.id}`)}
                  >
                    <Text
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                      }}
                      strong
                    >
                      {item.name}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Spin>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30px',
          }}
        >
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handleChangePage}
            showSizeChanger={false}
            showQuickJumper={false}
          />
        </Row>
      </Content>
    </div>
  );
};

export default ListSpecialists;
