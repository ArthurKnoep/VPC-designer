export class IP {
  private readonly ip: number;

  constructor(a: number = 0, b: number = 0, c: number = 0, d: number = 0) {
    const valArray = [a, b, c, d];
    if (valArray.some((val) => Number.isNaN(val) || val < 0 || val > 255)) throw new Error(`Invalid IP provided: ${valArray.join('.')}`);
    this.ip = ((a << 24) | (b << 16) | (c << 8) | d) >>> 0;
  }

  static fromString(ipString: string): IP {
    const ip = ipString.trim().split('.').map((val) => parseInt(val, 10));
    if (ip.length !== 4) throw new Error(`Invalid IP provided: ${ipString}`);
    return new IP(ip[0], ip[1], ip[2], ip[3]);
  }

  static fromBitValue(value: number) {
    function createByteMask(position: number) {
      return (
        new Array(32).fill(0).reduce((acc, _, idx) => (
          (acc << 1) | ((Math.floor(idx / 8) === position) ? 1 : 0)
        ), 0)
      ) >>> 0;
    }
    return new IP((value & createByteMask(0)) >> 24, (value & createByteMask(1)) >> 16, (value & createByteMask(2)) >> 8, value & createByteMask(3));
  }

  toString(): string {
    const ipToStr = [
      (this.ip & (0xff << 24)) >>> 24,
      (this.ip & (0xff << 16)) >>> 16,
      (this.ip & (0xff << 8)) >>> 8,
      this.ip & 0xff,
    ];
    return ipToStr.join('.');
  }

  getIP(): number {
    return this.ip;
  }
}
