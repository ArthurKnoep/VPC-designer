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
        return (
          <div
            key={subNet.cidr.toString()}
            className={styles.subNet}
            style={{
              left: `${subNet.startPosition * 100}%`,
              width: `${(subNet.endPosition - subNet.startPosition) * 100}%`,
            }}
          >
            {subNet.cidr.toString()}
          </div>
        );
      })}
    </div>
  );
}
