import { Descriptions, Popover } from 'antd';
import { SubNet, VpcManager } from '../../../features';
import styles from './SubNets.module.scss';

const vpcManager = VpcManager.getInstance();

interface Props {
  subNets: SubNet[];
}

export function SubNets({ subNets }: Props) {
  return (
    <div className={styles.container}>
      {subNets.map((subNet) => {
        const popover = (
          <Descriptions>
            <Descriptions.Item label="First address">{subNet.cidr.firstAddress.toString()}</Descriptions.Item>
            <Descriptions.Item label="Last address">{subNet.cidr.lastAddress.toString()}</Descriptions.Item>
            <Descriptions.Item label="Usable address">{subNet.cidr.addressCount}</Descriptions.Item>
          </Descriptions>
        );
        return (
          <Popover
            key={subNet.cidr.toString()}
            placement="bottom"
            content={popover}
            title={subNet.name ?? subNet.cidr.toString()}
            trigger="click"
          >
            <div
              className={styles.subNet}
              style={{
                left: `${subNet.startPosition * 100}%`,
                width: `${(subNet.endPosition - subNet.startPosition) * 100}%`,
              }}
            >
              {subNet.cidr.toString()}
            </div>
          </Popover>
        );
      })}
    </div>
  );
}
