import Text from "./text.js";

describe("Text", () => {
  it("should throw an error when I make a text element with greater than 3 characters", () => {
    expect(() => new Text("TEST", "red")).toThrowError();
  });
});
