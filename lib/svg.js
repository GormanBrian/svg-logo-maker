import { v4 as uuidv4 } from "uuid";

/**
 *  TODO:
 *  - Implement z-index for text and shapes
 */

export class SVG {
  /**
   * Standard font scale
   */
  static fontScale = 0.4;

  /**
   * Position states
   */
  static PositionState = {
    center: "center",
  };

  /**
   * Reduces excess whitespace in SVG string
   * @param {string} str SVG string
   * @returns Minimized SVG string
   */
  static minimize = (str) =>
    str.replace(/(<.*?>)|\s+/g, (_, $1) => ($1 ? $1 : " "));

  /**
   * @constructor Constructor for SVG class
   * @param {number} [width=300] Width of the SVG
   * @param {number} [height=200] Height of the SVG
   */
  constructor(position) {
    this.id = uuidv4();
    this.children = [];
    this.setPosition(position);
  }

  /**
   * Sets the position state of the shape
   * @param {string} state Position state
   */
  setPosition(state) {
    this.positionState = state;
  }

  /**
   * Must be overridden
   */
  get position() {
    throw new Error("Position getter must be overridden");
  }

  // ================================= Render =================================

  /**
   * Must be overridden
   */
  render() {
    throw new Error("Render method must be overridden");
  }
}

// ================================ SVG Parent ================================

export class SVGParent extends SVG {
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
   * @constructor
   * @param {Object} size
   * @param {string} position
   */
  constructor(size, position = SVG.PositionState.center) {
    super(position);
    this.size = size;
  }

  /**
   * Calculates the center of an SVG
   */
  get center() {
    return {
      x: this.size.width / 2,
      y: this.size.height / 2,
    };
  }

  // ============================== Parent/Child ==============================

  /**
   * Adds an SVG child
   * @param {SVG} child Child element
   */
  addChild(child) {
    this.children.push(child);
    child.getParent = () => {
      return {
        size: this.size,
        position: this.position,
      };
    };
  }

  /**
   * Removes an SVG child
   * @param {SVG} child Child element
   */
  removeChild(child) {
    this.children = this.children.filter((e) => e.id !== child.id);
    child.getParent = undefined;
  }

  // ================================= Render =================================

  /**
   * Renders child elements
   * @returns {string} SVG string
   */
  renderChildren() {
    return SVGParent.reduceContent(
      this.children,
      (child) => "   " + child.render()
    );
  }
}
