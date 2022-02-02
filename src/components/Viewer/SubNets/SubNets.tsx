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
        const startPercentage = vpcManager.getCIDR().ipPosition(subNet.cidr.firstAddress);
        const endPercentage = vpcManager.getCIDR().ipPosition(subNet.cidr.lastAddress);
        return (
          <div
            key={subNet.cidr.toString()}
            className={styles.subNet}
            style={{
              left: `${startPercentage * 100}%`,
              width: `${(endPercentage - startPercentage) * 100}%`,
            }}
          >
            {subNet.cidr.toString()}
          </div>
        );
      })}
    </div>
  );
}
