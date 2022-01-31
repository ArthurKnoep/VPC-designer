import { useCallback, useState } from 'react';
import { VpcManager, SubNet } from '../../features';
import { SubNets } from './SubNets';
import { VPC } from './VPC';

const vpcManager = VpcManager.getInstance();

export function Viewer() {
  const [subNets, setSubNets] = useState<SubNet[]>([]);

  const handleSubNetsCreation = useCallback(() => {
    setSubNets([...vpcManager.getSubNets()]);
  }, [setSubNets]);

  return (
    <div>
      <VPC onCreateSubNet={handleSubNetsCreation} />
      <SubNets subNets={subNets} />
    </div>
  );
}
