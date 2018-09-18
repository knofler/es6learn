const A = Object.create({});
A.init = function () {
    console.log("this is initial A function execution")
    console.log("Color before any change", this.checkColor());
    this.callMe();
}
A.callMe = function () {
    this.colorWindow("blue", "thin")
    this.process();
}
const B = Object.assign(Object.create(A), {
    tool: {
        color: 'red',
        pen: 'pencil'
    },
    ink: "Dark",
    shape: "bold",
    checkColor() {
        console.log("This is B Object funtion of changeColor, changing Color in context of", this,
            "and new color is", this.tool.color, "and new ink is :", this.ink)
    },
    colorWindow(color, ink) {
        this.tool.color = color;
        this.ink = ink
        console.log("Good to see new color:", this.tool.color, "and ink: ", this.ink)
    }
})
const C = Object.assign(Object.create(B), {
    makeImage() {
        this.checkColor(this.tool.color);
        this.draw()
    }
})
C.draw = function () {
    console.log("This is C drawing method, accessed ink is: ", this.ink, "Shape is :", this.shape)
}
const D = Object.assign(Object.create(C), {
    process() {
        this.makeImage()
    }
})
const e = D.init();