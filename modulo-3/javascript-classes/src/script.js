class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} está latindo...`)
    }
}

class Dog extends Animal {
    constructor(name, type) {
        super(name)
        this.type = type;
    }

    speak() {
        console.log(`${this.name} (${this.type}) está latindo...`)
    }
}

class Cat extends Animal {
    constructor(name, type) {
        super(name)
        this.type = type;
    }

    speak() {
        console.log(`${this.name} (${this.type}) está miando...`)
    }
}

const animal = new Animal('Cachorro');
animal.speak()
const dog = new Dog('Snow', 'Vira-lata')
dog.speak();
const cat = new Cat('Inyuasha', 'Yokai');
cat.speak()