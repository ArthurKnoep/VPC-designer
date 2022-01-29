import { VpcManager } from '../../features';
import { VPC } from './VPC';

const vpcManager = VpcManager.getInstance();

export function Viewer() {
  return (
    <div>
      <VPC />
    </div>
  );
}
