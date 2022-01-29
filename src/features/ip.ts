export class IP {
  private ip: number[];

  constructor(a: number = 0, b: number = 0, c: number = 0, d:number = 0) {
    this.ip = [a, b, c, d];
    if (this.ip.some((val) => Number.isNaN(val) || val < 0 || val > 255)) throw new Error(`Invalid IP provided: ${this.ip.toString()}`);
  }

  static fromString(ipString: string): IP {
    const ip = ipString.trim().split('.').map((val) => parseInt(val, 10));
    if (ip.length !== 4) throw new Error(`Invalid IP provided: ${ipString}`);
    return new IP(ip[0], ip[1], ip[2], ip[3]);
  }

  toString(): string {
    return this.ip.join('.');
  }
}
