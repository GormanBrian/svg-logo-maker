import { Shape, Circle, Square, Triangle } from "./shapes.js";
import Text from "./text.js";

/**
 *  TODO:
 *  - Implement z-index for text and shapes
 *  - Implement SVG Text class
 */

export default class SVG {
  /**
   * Reduces excess whitespace in SVG string
   * @param {string} str SVG string
   * @returns Minimized SVG string
   */
  static minimize = (str) =>
    str.replace(/(<.*?>)|\s+/g, (_, $1) => ($1 ? $1 : " "));

  /**
   * Reduces content array to a single string
   * @param {Array<T>} contentArr Array of content data
   * @param {generateContent} generate Generates content
   * @param {string} intialValue Initial markdown value
   * @param {string} separator Separates each piece of content
   * @returns {string} Markdown content
   */
  static reduceContent = (
    contentArr,
    generate,
    intialValue = ``,
    separator = "\n"
  ) =>
    contentArr.reduce((prev, curr, index) => {
      let currValue = generate(curr);
      return currValue
        ? prev + currValue + (index !== contentArr.length - 1 ? separator : "")
        : prev;
    }, intialValue);

  /**
   * @constructor Constructor for SVG class
   * @param {string} [backgroundColor="white"] Background color of the canvas
   * @param {number} [width=300] Width of the canvas
   * @param {number} [height=200] Height of the canvas
   */
  constructor(backgroundColor = "white", width = 300, height = 200) {
    this.backgroundColor = backgroundColor;
    this.width = width;
    this.height = height;
    this.shapes = [];
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
   * @param {string} value Text to be placed in the SVG
   * @param {string} color Fill color of the SVG text
   */
  addText(value, color, position = "center", scale = SVG.fontScale) {
    this.children.push(new Text(value, color, position, scale));
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

  // ================================= Shape ==================================

  /**
   * Adds a shape to the SVG canvas
   * @param {string} type Type of shape (circle, square, or triangle)
   * @param {string} color Color of the shape
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
    this.children.push(new ShapeClass(color));
  }

  /**
   * Creates shapes string
   */
  get shapesString() {
    return SVG.reduceContent(this.shapes, (shape) => shape.svg);
  }

  // ================================= Render =================================

  renderChildren() {
    return SVG.reduceContent(this.children, (child) => child.render());
  }

  /**
   * Creates SVG string
   */
  get string() {
    return `<svg version="1.1" style="background-color:${
      this.backgroundColor
    }" width="${this.width}" height="${
      this.height
    }" xmlns="http://www.w3.org/2000/svg">
    ${this.renderChildren()}
</svg>`;
  }
}
