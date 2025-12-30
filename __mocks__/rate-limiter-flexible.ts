export class RateLimiterMemory {
  points: number;
  duration: number;
  consumed = 0;

  constructor(options: { points: number; duration: number }) {
    this.points = options.points;
    this.duration = options.duration;
  }

  async consume(_key: string) {
    if (this.consumed >= this.points) {
      const err: any = new Error('Rate limit exceeded');
      err.remainingPoints = Math.max(0, this.points - this.consumed);
      throw err;
    }
    this.consumed += 1;
    return { remainingPoints: this.points - this.consumed, msBeforeNext: this.duration * 1000 };
  }
}
