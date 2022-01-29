import { IP } from './ip';

export class CIDR {
  private ip: IP;
  private mask: number;

  constructor(ip: IP, mask: number) {
    this.ip = ip;
    this.mask = mask;
    if (!CIDR.validMask(mask)) throw new Error(`Invalid CIDR provided: ${this.toString()}`)
  }

  private static validMask(mask: number) {
    return !Number.isNaN(mask) && mask >= 0 && mask <= 32;
  }

  setMask(mask: number) {
    if (!CIDR.validMask(mask)) throw new Error(`Invalid mask provided: ${this.ip.toString()}/${mask}`);
    this.mask = mask;
  }

  static fromString(cidrStr: string): CIDR {
    const [ipStr, maskStr, ...rest] = cidrStr.split('/');
    if (rest.length) throw new Error(`Invalid CIDR provided: ${cidrStr}`);
    return new CIDR(IP.fromString(ipStr), parseInt(maskStr, 10));
  }

  toString(): string {
    return `${this.ip.toString()}/${this.mask}`;
  }
}
