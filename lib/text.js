export default class Text {
  /**
   * Standard font scale
   */
  static fontScale = 0.4;

  #position;

  /**
   * @constructor
   * @param {string} value
   * @param {string} color
   * @param {string} position
   * @param {number} scale
   */
  constructor(value, color, position = "center", scale = Text.fontScale) {
    this.value = value;
    this.color = color;
    this.position = position;
    this.scale = scale;
  }

  addToCanvas(size, position = { x: 0, y: 0 }) {
    this.canvas = {
      x: position.x,
      y: position.y,
      height: size.height,
      width: size.width,
    };
  }

  get position() {
    return this.#position.state;
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
          x: this.canvas.x + this.canvas.height / 2,
          y: this.canvas.y + this.canvas.height / 2,
          anchor: "middle",
          dominantBaseline: "middle",
          state,
        };
    }
  }

  get fontSize() {
    return "40";
  }

  render() {
    return `<text x="${this.#position.x}" y="${this.#position.y}" font-size="${
      this.fontSize
    }" dominant-baseline="${this.#position.dominantBaseline}" text-anchor="${
      this.#position.anchor
    }" fill="${this.color}">${this.value}</text>`;
  }
}
