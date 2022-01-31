class StopWatch {
  constructor(id, element, afterStop) {
    this.paused = true
    this.id = id;
    this.offset = 0;
    this.time = "";
    this.element = element
    this.afterStop = afterStop
  }

  start() {
    if (this.paused) {
      this.paused = false;
      this.offset -= Date.now();
      StopWatch.render(this);
    }
  }

  stop() {
    if (!this.paused) {
      this.paused = true;
      this.offset += Date.now();
      this.afterStop && this.afterStop(this.element);
    }
  }

  reset(start) {
    // if (this.paused) {
    //   this.offset = 0;
    //    StopWatch.render(this);
    // } else {
    //   this.offset = -Date.now();
    // }
    if (!this.paused) {
      this.paused = true;
    }
    this.offset = 0
    StopWatch.render(this)

    if (this.element) {
      this.element.style.fontWeight = '';
      this.element.textContent = '00:00:000'
      this.element.style.setProperty('--sortbox__time_display', 'none')
    }

    start && this.start()
  }

  static format(value, scale, modulo, padding) {
    value = Math.floor(value / scale) % modulo;
    return value.toString().padStart(padding, 0);
  }

  static render(instance) {
    if (instance.paused) return;
    const value = Date.now() + instance.offset;
    instance.time = (
      StopWatch.format(value, 60000, 60, 2) + ':' +
      StopWatch.format(value, 1000, 60, 2) + ':' +
      StopWatch.format(value, 1, 1000, 3)
    )
    if (instance.element)
      instance.element.textContent = instance.time;

    //console.log(instance.id, instance.time)

    if (!instance.paused) {
      requestAnimationFrame(() => StopWatch.render(instance))
    }
  }
}

// stopwatch = new StopWatch();
// stopwatch.start();
// new StopWatch("CDE").start()
