import { Shape, Circle, Square, Triangle } from "./shapes.js";

describe("Shape", () => {
  it("should throw an error when I make an invalid shape", () => {
    expect(() => Shape.createShape("invalid", "red")).toThrowError();
  });

  // ================================= Circle =================================
  describe("Circle", () => {
    let circle = new Circle("green", 200).render();

    it("should create a green circle", () => {
      expect(circle).toMatch(
        `<circle cx="100" cy="100" r="100" fill="green" />`
      );
    });

    it("should create a circle with a radius of 100", () => {
      expect(circle).toContain('r="100"');
    });
  });

  // ================================= Square =================================

  describe("Square", () => {
    let square = new Square("red");

    it("should create a red square", () => {
      expect(square.render()).toMatch(
        '<rect x="0" y="0" width="150" height="150" fill="red" />'
      );
    });

    it("should create a square with a height of 150 and a width of 150", () => {
      expect(square.size).toStrictEqual({ width: 150, height: 150 });
    });
  });

  // ================================= Triangle ================================

  describe("Triangle", () => {
    let triangle = new Triangle("blue");

    it("should create a blue triangle", () => {
      expect(triangle.render()).toMatch(
        '<polygon points="86.5,0 0,150 173,150" fill="blue" />'
      );
    });

    it("should calculate three points", () => {
      expect(triangle.position.points.length).toEqual(3);
    });
  });
});
