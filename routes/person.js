var express = require("express");
var router = express.Router();

function Person(body) {
  this.name = body.name;
  this.pets = body.pets;
  this.apples = 12;
}

Person.prototype.greet = function () {
  return "Hi " + this.name + ", how are you?";
};

Person.prototype.howManyApples = function () {
  return this.name + " has " + this.apples + " apples";
};

Person.prototype.greetPet = function (pet) {
  return "Hi " + pet + ", YOU'RE JUST SO FLUFFY! :O";
};

Person.prototype.greetPets = function () {
  var petGreeting = [];
  if (Array.isArray(this.pets)) {
    this.pets.forEach((pet) => {
      petGreeting.push(this.greetPet(pet));
    });
  } else {
    petGreeting.push(this.greetPet(this.pets));
  }
  return petGreeting.join(" ");
};

router.post("/", function (req, res, next) {
  var _person = new Person(req.body);
  res.json({
    greeting: _person.greet(),
    apples: _person.howManyApples(),
    greetPets: _person.greetPets(),
  });
});

module.exports = router;
