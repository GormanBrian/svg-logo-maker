import { SVG, SVGParent } from "./svg.js";

describe("SVG", () => {
  let svg = new SVG();
  it("should throw an error when getting the position", () => {
    expect(() => svg.position).toThrowError();
  });

  it("should throw an error when calling the render method", () => {
    expect(() => svg.render()).toThrowError();
  });
});

describe("SVGParent", () => {
  let svgParent = new SVGParent();

  it("should throw contain a child element when I call the addChild method", () => {
    svgParent.addChild(new SVGParent());
    expect(svgParent.children.length).toBe(1);
  });
});
