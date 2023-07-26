class Shape {
  constructor(text, textColor, color, width = 300, height = 200) {
    this.text = text;
    this.textColor = textColor;
    this.color = color;
  }

  shape(content) {
    return `<${content} fill="${this.color}" />`;
  }

  get svg() {
    return `
<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${this.shape()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${
    this.textColor
  }">${this.text}</text>
</svg>`;
  }
}

export class Circle extends Shape {
  shape() {
    return super.shape('circle cx="150" cy="100" r="80"');
  }
}

export class Square extends Shape {
  shape() {
    return super.shape('rect x="50" y="100" width="100" height="100"');
  }
}

export class Triangle extends Shape {
  shape() {
    return super.shape('polygon points="150,50 92.25,150 207.75,150"');
  }
}
