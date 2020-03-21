import "./index.scss";

class Animal {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const dog = new Animal("dog");

console.log(dog);
