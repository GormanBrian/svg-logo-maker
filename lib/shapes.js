import { SVGParent, SVG } from "./svg.js";

// ================================= Shape ==================================

export class Shape extends SVGParent {
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
   * Creates a shape
   * @param {string} type Type of shape (circle, square, or triangle)
   * @param {string} color Color of the shape
   */
  static createShape(
    type,
    color,
    size = 150,
    position = SVG.PositionState.center
  ) {
    let ShapeType = Shape;
    switch (type.toLocaleLowerCase()) {
      case "circle":
        ShapeType = Circle;
        break;
      case "square":
        ShapeType = Square;
        break;
      case "triangle":
        ShapeType = Triangle;
        break;
      default:
        throw new Error("Invalid shape type");
    }
    return new ShapeType(color, size, position);
  }

  /**
   * @constructor Creates a `Shape` object
   * @param {string} color Fill color of the shape
   * @param {number} [size=150] Size of the shape
   */
  constructor(color, size = 150, position = SVG.PositionState.center) {
    super({ width: size, height: size }, position);
    this.fillColor = color;
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
    let pos = this.position;
    return `circle cx="${pos.cx}" cy="${pos.cy}" r="${pos.r}"`;
  }

  /**
   * Gets the position of the circle based on it's parent canvas and position state
   */
  get position() {
    let r = this.size.height / 2;
    /**
     * If there is no canvas sets the position to be as close to the origin as
     *  possible without clipping
     */
    if (!this.getParent) {
      return {
        x: 0,
        y: 0,
        cx: this.size.height / 2,
        cy: this.size.height / 2,
        r,
      };
    }

    let canvas = this.getParent();
    switch (this.positionState) {
      case SVG.PositionState.center:
        return {
          x: canvas.size.width / 2 - r,
          y: canvas.size.height / 2 - r,
          cx: canvas.position.x + canvas.size.width / 2,
          cy: canvas.position.y + canvas.size.height / 2,
          r,
        };
    }
  }
}

// ================================= Square =================================

export class Square extends Shape {
  /**
   * Creates the XML square content
   */
  get content() {
    let pos = this.position;
    return `rect x="${pos.x}" y="${pos.y}" width="${this.size.width}" height="${this.size.height}"`;
  }

  /**
   * Gets the position of the square based on it's parent canvas and position state
   */
  get position() {
    if (!this.getParent) {
      return { x: 0, y: 0 };
    }

    let canvas = this.getParent();
    switch (this.positionState) {
      case SVG.PositionState.center:
        return {
          x: canvas.position.x + (canvas.size.width - this.size.width) / 2,
          y: canvas.position.y + (canvas.size.height - this.size.height) / 2,
        };
    }
  }
}

// ================================= Triangle ================================

export class Triangle extends Shape {
  /**
   * Calculates the side length of an equilateral triangle
   */
  get sideLength() {
    return Shape.roundHalf(this.size.height / Math.sin(Shape.toRadians(60)));
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
   * Calculates an equilateral triangles points based on the first point
   * @param {Object} point
   * @param {number} point.x
   * @param {number} point.y
   */
  calculatePointsFromPoint(point) {
    let halfL = this.sideLength / 2;
    return [
      point,
      { x: point.x - halfL, y: point.y + this.size.height },
      { x: point.x + halfL, y: point.y + this.size.height },
    ];
  }

  /**
   * Gets the position of the triangle based on it's parent canvas and position state
   */
  get position() {
    let l = this.sideLength;

    /**
     * If there is no canvas set the inverted triangle position to be as close
     *  to the origin as possible without clipping
     */
    if (!this.getParent) {
      return {
        points: this.calculatePointsFromPoint({ x: l / 2, y: 0 }),
      };
    }

    let canvas = this.getParent();
    switch (this.positionState) {
      case SVG.PositionState.center:
        return {
          points: this.calculatePointsFromPoint({
            x: canvas.position.x + canvas.size.width / 2,
            y: canvas.position.y + (canvas.size.height - this.size.height) / 2,
          }),
        };
    }
  }
}
