// ================================= Shape ==================================

export class Shape {
  /**
   * Rounds a number to the nearest half
   * @param {number} num Number to be rounded
   * @returns {number} Number rounded to nearest half
   */
  static roundHalf = (num) => (Math.round(num * 2) / 2).toFixed(1);

  /**
   * Converts degrees to radians
   * @param {number} angle Angle in degrees
   * @returns {number} Angle in radians
   */
  static toRadians = (angle) => angle * (Math.PI / 180);

  /**
   *
   * @param {string} color
   */
  constructor(color) {
    this.color = color;
  }

  /**
   * Requires override
   */
  calcPosition() {
    throw new Error("Child class must override calcPosition() method");
  }

  /**
   * Creates the shape SVG element
   * @param {string} content Shape content string
   * @returns {string} Shape SVG element
   */
  shape() {}

  get svg() {
    this.calcPosition();
    return `<${this.content} fill="${this.fillColor}" />`;
  }
}

// ================================= Circle =================================

export class Circle extends Shape {
  calcPosition() {
    this.position = {
      x: this.canvasWidth / 2,
      y: this.canvasHeight / 2,
      r: this.canvasHeight / 4,
    };
  }

  shape() {
    return super.shape(
      `circle cx="${this.position.x}" cy="${this.position.y}" r="${this.position.r}"`
    );
  }
}

// ================================= Square =================================

export class Square extends Shape {
  /**
   *
   */
  get content() {
    return `rect x="${this.position.x}" y="${this.position.y}" width="${this.height}" height="${this.height}"`;
  }

  /**
   *
   */
  calcPosition() {
    this.position = {
      x: (this.canvasWidth - this.height) / 2,
      y: (this.canvasHeight - this.height) / 2,
    };
  }
}

// ================================= Triangle ================================

export class Triangle extends Shape {
  get sideLength() {
    return Shape.roundHalf(this.height / Math.sin(Shape.toRadians(60)));
  }

  get pointsString() {
    return this.position.points.map(({ x, y }) => `${x},${y}`).join(" ");
  }

  get content() {
    return `polygon points="${this.pointsString}"`;
  }

  /**
   * Calculate the position of the triangle's points
   */
  calcPosition() {
    let l = this.sideLength / 2;
    this.position.points = [
      { x: this.position.x, y: this.position.y },
      { x: this.position.x - l, y: this.position.y + this.height },
      { x: this.position.x + l, y: this.position.y + this.height },
    ];
  }
}
