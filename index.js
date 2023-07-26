import fs from "fs";
import { Circle, Triangle } from "./lib/shapes.js";

let circle = new Circle("SVG", "red", "white").svg;

let triangle = new Triangle("SVG", "white", "red").svg;

fs.writeFile("test.svg", triangle, () => {});
