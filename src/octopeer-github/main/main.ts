class Derp {

    public height: number;
    public width: number;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
    
    public getHeight() {
        return this.height;
    }
}

var lolDerp = new Derp(42, 41);
console.log(lolDerp.width * 5);

console.log("Started Octopeer");
