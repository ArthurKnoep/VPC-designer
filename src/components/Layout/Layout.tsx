import { useState } from 'react';
import { Layout as LayoutD, Row, Col } from 'antd';
import { CIDR, IP, VpcManager } from '../../features';
import { Viewer } from '../Viewer';
import { VPCConfig } from '../VPCConfig';
import { Footer } from './Footer';

import styles from './Layout.module.scss';

const { Content } = LayoutD;

export function Layout() {
  const [vpcReady, setVpcReady] = useState(false);

  const handleVpcChange = () => {
    setVpcReady(true);
  }

  return (
    <LayoutD className={styles.layout}>
      <Content className={styles.content}>
        <Row className={styles.configRow}>
          <Col span={24}><VPCConfig onChange={handleVpcChange} readOnly={vpcReady} /></Col>
        </Row>

        {(vpcReady) && (
          <Row className={styles.viewerRow}>
            <Col span={24}><Viewer /></Col>
          </Row>
        )}
      </Content>
      <Footer />
    </LayoutD>
  )
}
