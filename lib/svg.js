import { Shape, Circle, Square, Triangle } from "./shapes.js";

export default class SVG {
  /**
   * Reduces excess whitespace in SVG string
   * @param {string} str SVG string
   * @returns Minimized SVG string
   */
  static minimize = (str) =>
    str.replace(/(<.*?>)|\s+/g, (_, $1) => ($1 ? $1 : " "));

  /**
   * Standard font scale
   */
  static fontScale = 0.4;

  /**
   * @constructor Constructor for Shape class
   * @param {string} [backgroundColor="white"] Fill color of the SVG shape
   * @param {number} [width=300] Width of the SVG canvas
   * @param {number} [height=200] Height of the SVG canvas
   */
  constructor(backgroundColor = "white", width = 300, height = 200) {
    this.backgroundColor = backgroundColor;
    this.width = width;
    this.height = height;
  }

  /**
   * Calculates the center of the canvas
   */
  get center() {
    return {
      x: this.width / 2,
      y: this.height / 2,
    };
  }

  // ================================= Text =================================

  /**
   * Add text to the canvas
   * @param {string} text Text to be placed in the SVG
   * @param {string} textColor Fill color of the SVG text
   */
  addText(text, color, position = "center") {
    this.text = {
      content: text,
      color,
    };
    this.setTextPosition(position);
  }

  /**
   *
   * @param {string} state
   */
  setTextPosition(state) {
    switch (state) {
      case "center":
        this.text.position = {
          x: this.position.x + this.height / 2,
          y: this.position.y + this.height / 2,
        };
        this.text.anchor = "middle";
        this.text.dominantBaseline = "middle";
        break;
    }
  }

  /**
   * Calculates the font size
   */
  get fontSize() {
    let modifier = 1;
    if (this.text.content.length === 1) modifier = 2;
    else if (this.text.content.length === 2) modifier = 1.5;
    return SVG.fontScale * this.height * modifier;
  }

  /**
   * Creates the text element
   */
  get textElement() {
    return this.text.content
      ? `<text x="${this.text.position.x}" y="${this.text.position.y}" font-size="${this.fontSize}" dominant-baseline="${this.text.dominantBaseline}" text-anchor="${this.text.anchor}" fill="${this.text.color}">${this.text.content}</text>`
      : null;
  }

  // ================================= Shape ==================================

  /**
   *
   * @param {string} type
   * @param {string} color
   */
  addShape(type, color) {
    let ShapeClass = Shape;
    switch (type.toLocaleLowerCase()) {
      case "circle":
        ShapeClass = Circle;
        break;
      case "square":
        ShapeClass = Square;
        break;
      case "triangle":
        ShapeClass = Triangle;
        break;
      default:
        throw new Error("Invalid shape type");
    }
    this.shape = new ShapeClass(color);
  }

  /**
   * Creates the shape element
   */
  get shapeElement() {
    return this.shape ? `` : null;
  }

  // ================================== SVG ===================================

  /**
   *
   * @returns {string} SVG template
   */
  render() {
    return `<svg version="1.1" style="background-color:${this.backgroundColor}" width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">
  ${this.shapeElement}
  ${this.textElement}
</svg>`;
  }
}
