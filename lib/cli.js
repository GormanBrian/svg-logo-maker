import inquirer from "inquirer";
import fs from "fs";
import { join } from "path";
import tinycolor from "tinycolor2";
import SVG from "./svg.js";

export default class CLI {
  /**
   * Shape generation questions
   */
  static questions = [
    {
      type: "list",
      message: "Enter the shape:",
      name: "type",
      choices: ["Circle", "Triangle", "Square"],
    },
    {
      type: "input",
      message: "Enter the text:",
      name: "text",
      validate: (text) =>
        CLI.validateLength(text) ||
        "Please enter a string between 0 and 3 characters",
      default: "SVG",
    },
    {
      type: "input",
      message: "Enter the text color:",
      name: "textColor",
      validate: (textColor) =>
        CLI.validateColor(textColor) || "Please enter a valid text color",
      default: "tomato",
    },
    {
      type: "input",
      message: "Enter the fill color:",
      name: "color",
      validate: (color) =>
        CLI.validateColor(color) || "Please enter a valid fill color",
      default: "gray",
    },
  ];

  /**
   * Determines if a color string is a valid HTML color name or hex color value
   * @param {string} color Color string to validate
   * @returns {boolean} True if color is valid
   */
  static validateColor = (color) => {
    let format = tinycolor(color).getFormat();
    return format === "name" || format === "hex";
  };

  /**
   * Validates string length
   * @param {string} text String to validate
   * @returns {boolean} True if string is valid
   */
  static validateLength = (text, lower = 0, upper = 3) =>
    text.length <= upper && text.length >= lower;

  /**
   * @constructor Creates CLI object
   * @param {string} path Path where files should be saved
   * @param {string} fileName Name that files should be saved as
   */
  constructor(path = "examples", fileName = "logo.svg") {
    this.path = path;
    this.fileName = fileName;
  }

  /**
   * Runs the CLI
   * @returns {Promise} Inquirer promise
   */
  run = () =>
    inquirer
      .prompt(CLI.questions)
      .then(({ type, text, textColor, color }) => {
        let svg = new SVG();
        svg.addShape(type, color);
        svg.addText(text, textColor);

        fs.writeFile(
          join(__dirname, "..", this.path, this.fileName),
          svg.string,
          (error) =>
            error
              ? console.error(error)
              : console.log(`Generated ${this.fileName}`)
        );
      })
      .catch((error) => console.error(error));
}
