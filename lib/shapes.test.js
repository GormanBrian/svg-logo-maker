import { Circle, Square, Triangle } from "./shapes.js";

describle("Shape", () => {
  // ================================= Circle =================================
  describe("Circle", () => {
    let circle = new Circle("SVG", "red", "green");
    let circleSvg = circle.svg;

    it("should create a green circle with red text that says 'SVG'", () => {
      let svg = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="100" r="50" fill="green" />
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="red">SVG</text>
  </svg>`;

      expect(circleSvg).toMatch(svg);
    });

    it("should create a red circle", () => {
      let circleElement = '<circle cx="150" cy="100" r="50" fill="green" />';
      expect(circleSvg).toContain(circleElement);
    });

    it("should create a text element with a value of 'SVG'", () => {
      let circleText =
        '<text x="150" y="125" font-size="60" text-anchor="middle" fill="red">SVG</text>';
    });
  });

  // ================================= Square =================================

  describe("Square", () => {
    it("should create a ", () => {
      //
    });
  });

  // ================================= Triangle ================================

  describe("Triangle", () => {
    it("should create a ", () => {
      //
    });
  });
});
