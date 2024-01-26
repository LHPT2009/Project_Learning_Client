import React from 'react';
import HeaderLayout from '../../component/header/Header';
import FooterLayout from '../../component/footer/Footer';
import { Layout } from 'antd';

const { Content } = Layout;

export default function LayoutPro({ children }) {
  return (
    <Layout style={{ height: 'auto' }}>
      <HeaderLayout />
      <Content>{children}</Content>
      <FooterLayout />
    </Layout>
  );
}
