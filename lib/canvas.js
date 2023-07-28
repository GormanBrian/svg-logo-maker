import { SVGParent } from "./svg.js";

export default class Canvas extends SVGParent {
  /**
   * @constructor Constructor for SVG class
   * @param {string} [backgroundColor="white"] Background color of the canvas
   * @param {Object} size Size of the canvas
   * @param {number} [width=300] Width of the canvas
   * @param {number} [height=200] Height of the canvas
   */
  constructor(
    backgroundColor = "white",
    size = { width: 300, height: 200 },
    position = { x: 0, y: 0 }
  ) {
    super(size, position);
    this.backgroundColor = backgroundColor;
  }

  /**
   * Gets the position of the canvas
   */
  get position() {
    return { x: 0, y: 0 };
  }

  /**
   * Creates SVG string
   */
  render() {
    return `<svg version="1.1" style="background-color:${
      this.backgroundColor
    }" width="${this.size.width}" height="${
      this.size.height
    }" xmlns="http://www.w3.org/2000/svg">
${this.renderChildren()}
</svg>`;
  }
}
