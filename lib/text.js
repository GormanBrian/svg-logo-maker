import { SVG } from "./svg.js";

export default class Text extends SVG {
  /**
   * @constructor Creates a `Text` object
   * @param {string} value Text value
   * @param {string} color Fill color
   * @param {string} position Position state
   * @param {number} scale Font scale
   */
  constructor(
    value,
    color,
    position = SVG.PositionState.center,
    scale = SVG.fontScale
  ) {
    if (value.length > 3)
      throw new Error("Text value cannot be greater than 3 characters");

    super(position);
    this.value = value;
    this.fillColor = color;
    this.scale = scale;
  }

  /**
   * Gets the position of the text based on it's parent canvas and position state
   */
  get position() {
    // If there is no canvas sets the text position to the origin
    if (!this.getParent) {
      return { x: 0, y: 0 };
    }

    let canvas = this.getParent();
    switch (this.positionState) {
      case SVG.PositionState.center:
        return {
          x: canvas.position.x + canvas.size.width / 2,
          y: canvas.position.y + canvas.size.height / 2 + 5,
          anchor: "middle",
          dominantBaseline: "middle",
        };
    }
  }

  /**
   * Calculates the font size based on it's parent
   */
  get fontSize() {
    return "40";
    let modifier = 1;
    if (this.text.content.length === 1) modifier = 2;
    else if (this.text.content.length === 2) modifier = 1.5;
    return SVG.fontScale * this.size.height * modifier;
  }

  /**
   * Renders the SVG text string
   * @returns {string} SVG text string
   */
  render() {
    let pos = this.position;
    return `<text x="${pos.x}" y="${pos.y}" font-size="${this.fontSize}" dominant-baseline="${pos.dominantBaseline}" text-anchor="${pos.anchor}" fill="${this.fillColor}">${this.value}</text>`;
  }
}
