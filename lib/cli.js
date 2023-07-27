import inquirer from "inquirer";
import fs from "fs";
import tinycolor from "tinycolor2";
import SVG from "./svg.js";

export default class CLI {
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
   *
   * @param {string} color
   * @returns {boolean}
   */
  static validateColor = (color) => {
    let format = tinycolor(color).getFormat();
    return format === "name" || format === "hex";
  };

  /**
   *
   * @param {string} text
   * @returns {boolean}
   */
  static validateLength = (text) => text.length <= 3 && text.length >= 0;

  run = () =>
    inquirer
      .prompt(CLI.questions)
      .then(({ type, text, textColor, color }) => {
        let svg = fs.writeFile(
          "examples/shape.svg",
          new ClassType(text, textColor, color).svg,
          (error) => (error ? console.error(error) : console.log("Success"))
        );
      })
      .catch((error) => console.error(error));
}
