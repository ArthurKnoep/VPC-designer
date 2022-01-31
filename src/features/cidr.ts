import { IP } from './ip';

export const CIDRRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/igm;

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

  private maskToBitMask() {
    return (
      new Array(32).fill(0)
        .reduce((acc, _, idx) => (acc << 1) | ((idx < this.mask) ? 1 : 0), 0)
    ) >>> 0;
  }

  get addressCount(): number {
    return Math.pow(2, 32 - this.mask);
  }

  get firstAddress(): IP {
    return IP.fromBitValue(this.ip.getIP() & this.maskToBitMask());
  }

  get lastAddress(): IP {
    return IP.fromBitValue(this.ip.getIP() | ~this.maskToBitMask());
  }

  isASubNetOf(subNet: CIDR): boolean {
    if (subNet.mask >= this.mask) return false;
    const bitMask = subNet.maskToBitMask();
    return (this.ip.getIP() & bitMask) === (subNet.ip.getIP() & bitMask);
  }
}
