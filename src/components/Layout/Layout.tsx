import { useState } from 'react';
import { Layout as LayoutD, Row, Col } from 'antd';
import { CIDR, VpcManager } from '../../features';
import { VPCConfig } from '../VPCConfig';
import { Footer } from './Footer';

import styles from './Layout.module.scss';

const { Content } = LayoutD;

const vpcManager = new VpcManager();

export function Layout() {
  const [vpcReady, setVpcReady] = useState(false);

  const handleVpcChange = (cidr: CIDR, name: string) => {
    vpcManager.setCIDR(cidr);
    vpcManager.setName(name);
    setVpcReady(true);
  }

  return (
    <LayoutD className={styles.layout}>
      <Content className={styles.content}>
        <Row className={styles.configRow} justify="center" align="middle">
          <Col span={24}><VPCConfig onChange={handleVpcChange} readOnly={vpcReady} /></Col>
        </Row>
      </Content>
      <Footer />
    </LayoutD>
  )
}
