import { CIDR } from './cidr';

let vpcManager: VpcManager | undefined = undefined;

export class VpcManager {
  private cidr?: CIDR;
  private name: string;

  private constructor() {
    this.name = '';
  }

  static getInstance(): VpcManager {
    if (vpcManager) return vpcManager;
    vpcManager = new VpcManager();
    return vpcManager;
  }

  setCIDR(cidr: CIDR) {
    this.cidr = cidr;
  }

  setName(name: string) {
    this.name = name;
  }

  getCIDR(): CIDR {
    if (!this.cidr) throw new Error('CIDR not yet set');
    return this.cidr;
  }

  getName(): string {
    return this.name;
  }
}
