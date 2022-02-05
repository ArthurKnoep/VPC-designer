import { CIDR } from './cidr';

let vpcManager: VpcManager | undefined = undefined;

export interface SubNet {
  name?: string,
  cidr: CIDR,
  startPosition: number,
  endPosition: number,
}

export class VpcManager {
  private vpcCidr?: CIDR;
  private name: string;
  private readonly subNets: SubNet[];

  private constructor() {
    this.name = '';
    this.subNets = [];
  }

  static getInstance(): VpcManager {
    if (vpcManager) return vpcManager;
    vpcManager = new VpcManager();
    return vpcManager;
  }

  setCIDR(cidr: CIDR) {
    this.vpcCidr = cidr;
  }

  setName(name: string) {
    this.name = name;
  }

  getCIDR(): CIDR {
    if (!this.vpcCidr) throw new Error('CIDR not yet set');
    return this.vpcCidr;
  }

  getName(): string {
    return this.name;
  }

  getSubNets(): SubNet[] {
    return this.subNets;
  }

  usagePercent(): number {
    if (!this.vpcCidr) throw new Error('CIDR not yet set');
    const totalIPCount = this.vpcCidr.addressCount;
    const subNetsIPCountSum = this.subNets.reduce((acc, subNet) => acc + subNet.cidr.addressCount, 0);
    return (subNetsIPCountSum / totalIPCount) ?? 0;
  }

  private checkSubNetOverlap(cidr: CIDR, startPosition: number, endPosition: number) {
    for (let i = 0; this.subNets[i]; i++) {
      if (startPosition >= this.subNets[i].startPosition && endPosition <= this.subNets[i].endPosition) {
        throw new Error(`${cidr.toString()} is a subnet of ${this.subNets[i].cidr.toString()}`);
      }
      if (startPosition >= this.subNets[i].startPosition && startPosition <= this.subNets[i].endPosition) {
        throw new Error(`${cidr.toString()} overlap with ${this.subNets[i].cidr.toString()}`);
      }
      if (endPosition >= this.subNets[i].startPosition && endPosition <= this.subNets[i].endPosition) {
        throw new Error(`${cidr.toString()} overlap with ${this.subNets[i].cidr.toString()}`);
      }
    }
  }

  addSubNet(cidr: CIDR, name?: string) {
    if (!this.vpcCidr) throw new Error('CIDR not yet set');
    if (!cidr.isASubNetOf(this.vpcCidr)) throw new Error(`${cidr.toString()} is not a valid subnet of ${this.vpcCidr.toString()}`)
    const startPosition = this.vpcCidr.ipPosition(cidr.firstAddress);
    const endPosition = this.vpcCidr.ipPosition(cidr.lastAddress);
    this.checkSubNetOverlap(cidr, startPosition, endPosition);

    this.subNets.push({
      cidr,
      name,
      startPosition,
      endPosition,
    });
  }
}
