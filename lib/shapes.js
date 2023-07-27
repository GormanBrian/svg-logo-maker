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
   * @constructor Constructor for Shape class
   * @param {string} color Fill color of the shape
   * @param {number} [size=100] Size of the shape
   */
  constructor(color, size = 100, position = "center") {
    this.color = color;
    this.size = size;
    this.position = position;
  }

  get position() {
    return this.#position.state;
  }

  /**
   * Adds the shape to a canvas
   * @param {Object} size Size of the canvas
   * @param {number} [width=300] Width of the canvas
   * @param {number} [height=200] Height of the canvas
   * @param {Object} position Position of the canvas
   * @param {number} [position.x=0] x-coordinate of the canvas
   * @param {number} [position.y=0] y-coordinate of the canvas
   */
  addToCanvas(size = { width: 300, height: 200 }, position = { x: 0, y: 0 }) {
    this.canvas = {
      height: size.height,
      width: size.width,
      x: position.x,
      y: position.y,
    };
  }

  /**
   * Creates the SVG string
   */
  render() {
    return `<${this.content} fill="${this.fillColor}" />`;
  }
}

// ================================= Circle =================================

export class Circle extends Shape {
  /**
   * Creates the XML circle content
   */
  get content() {
    return `circle cx="${this.#position.x}" cy="${this.#position.y}" r="${
      this.#position.r
    }"`;
  }

  /**
   * @param {string} state
   */
  set position(state) {
    if (!this.canvas) {
      this.#position = {
        x: this.size / 2,
        y: this.size / 2,
        r: this.size / 2,
      };
      return;
    }

    switch (state) {
      case "center":
        this.#position = {
          x: this.canvas.x + this.canvas.width / 2,
          y: this.canvas.y + this.canvas.height / 2,
          r: this.size / 2,
        };
        return;
    }
  }
}

// ================================= Square =================================

export class Square extends Shape {
  /**
   * Creates the XML square content
   */
  get content() {
    return `rect x="${this.position.x}" y="${this.position.y}" width="${this.size}" height="${this.size}"`;
  }

  /**
   * @param {string} state
   */
  set position(state) {
    if (!this.canvas) {
      this.#position = { x: 0, y: 0 };
      return;
    }

    switch (state) {
      case "center":
        this.#position = {
          x: this.canvas.x + (this.canvas.width - this.size) / 2,
          y: this.canvas.y + (this.canvas.height - this.size) / 2,
        };
        return;
    }
  }
}

// ================================= Triangle ================================

export class Triangle extends Shape {
  /**
   * Calculates the side length of an equilateral triangle
   */
  get sideLength() {
    return Shape.roundHalf(this.size / Math.sin(Shape.toRadians(60)));
  }

  /**
   * Creates the XML usable points string
   */
  get pointsString() {
    return this.position.points.map(({ x, y }) => `${x},${y}`).join(" ");
  }

  /**
   * Creates the XML triangle content
   */
  get content() {
    return `polygon points="${this.pointsString}"`;
  }

  /**
   *
   * @param {Object} point
   * @param {number} point.x
   * @param {number} point.y
   */
  calculatePointsFromPoint(point) {
    let halfL = this.sideLength / 2;
    return [
      point,
      { x: point.x - halfL, y: point.y + this.size },
      { x: point.x + halfL, y: point.y + this.size },
    ];
  }

  /**
   * @param {string} state
   */
  set position(state) {
    let l = this.sideLength;
    if (!this.canvas) {
      this.#position.points = this.calculatePointsFromPoint({ x: l / 2, y: 0 });
    }

    switch (state) {
      case "center":
        this.#position.points = this.calculatePointsFromPoint({
          x: this.canvas.x + this.canvas.width / 2,
          y: this.canvas.y + (this.canvas.height - this.size) / 2,
        });
    }
  }
}
