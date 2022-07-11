interface ICallbacks {
  onStart(totalDuration: number): void;
  onTick(time: number): void;
  onComplete(): void;
}

export class Timer {
  onStart?: (totalDuration: number) => void;
  onTick?: (time: number) => void;
  onComplete?: () => void;
  interval?: number;
  constructor(
    private durationInput: HTMLInputElement,
    private startButton: HTMLButtonElement,
    private pauseButton: HTMLButtonElement,
    callbacks: ICallbacks
  ) {
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    this.onStart?.(this.timeRemaining);

    this.tick();
    this.interval = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();

      this.onComplete?.();
    } else {
      this.timeRemaining -= 0.02;
      this.onTick?.(this.timeRemaining);
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time: number) {
    this.durationInput.value = time.toFixed(2).toString();
  }
}
