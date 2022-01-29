import { CIDR } from './cidr';

export class VpcManager {
  private cidr?: CIDR;
  private name: string;

  constructor() {
    this.name = '';
  }

  setCIDR(cidr: CIDR) {
    this.cidr = cidr;
  }

  setName(name: string) {
    this.name = name;
  }


}
