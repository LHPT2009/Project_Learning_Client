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
} from 'antd';
import bglist from '../asset/image/Background_List.png';
import IconFive from '../asset/image/Icon_Five.png';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllSpecialists } from '../features/Specialist/specialistSlice';
import { useNavigate } from 'react-router-dom';

const { Content, Header } = Layout;
const { Text, Title } = Typography;

const customStyle = {
  backgroundImage: `url(${bglist})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: 'auto',
  paddingBottom: '30px',
  lineHeight: '0px',
};

const ListSpecialists = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(fetchAllSpecialists());
  }, []);
  const navigate = useNavigate();

  const list = useSelector((state) => state.specialist.specialistsall);

  const filtered = list.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));

  const pageSize = 12; // Number of items per page
  const totalItems = filtered.length; // Total number of items in your data set
  const [currentPage, setCurrentPage] = useState(1);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filtered.slice(startIndex, endIndex);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div
    // style={{ height: '100vh' }}
    >
      <Header style={customStyle}>
        <Content style={{ padding: '0px 50px' }}>
          <Space direction="vertical" size="middle">
            <Title level={2} style={{ lineHeight: '15px' }}>
              {t('description.columncontent.listdoctor.title1')}
            </Title>
            <Title level={3} style={{ lineHeight: '25px' }}>
              {t('description.columncontent.listdoctor.title2')}
            </Title>
            <Title level={4} style={{ lineHeight: '20px' }}>
              {t('description.columncontent.listdoctor.title3')}
            </Title>
            <Text style={{ lineHeight: '15px' }}>
              {t('description.columncontent.listdoctor.title4')}
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              {t('description.columncontent.listdoctor.title5')}
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              {t('description.columncontent.listdoctor.title6')}
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              {t('description.columncontent.listdoctor.title7')}{' '}
            </Text>
            <Text style={{ lineHeight: '15px' }}>
              {t('description.columncontent.listdoctor.title8')}
            </Text>
          </Space>
        </Content>
      </Header>
      <Content style={{ padding: '20px 100px', height: 'auto' }}>
        <Row style={{ marginBottom: '20px' }}>
          <Breadcrumb
            items={[
              {
                title: 'Trang chủ',
              },
              {
                title: 'Danh sách chuyên khoa',
              },
            ]}
          />
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Input
            width={'100%'}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập tên chuyên khoa bạn muốn tìm..."
            size="large"
          />
        </Row>
        <Row gutter={[16, 16]} style={{ height: 'auto' }}>
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
