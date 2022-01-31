import { SubNet, VpcManager } from '../../../features';

const vpcManager = VpcManager.getInstance();

interface Props {
  subNets: SubNet[];
}

export function SubNets({ subNets }: Props) {
  return (
    <>
      {subNets.map((subNet) => (
          <div key={subNet.cidr.toString()}>hello / {subNet.cidr.toString()} / {subNet.cidr.addressCount.toString()}</div>
      ))}
    </>
  );
}
