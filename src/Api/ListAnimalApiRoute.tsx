const listAnimalApiRoute = {
  get Base() {
    return "/listanimal";
  },
  get getAnimals() {
    return this.Base;
  },
  get create() {
    return this.Base.concat("/create");
  },
  get update() {
    return this.Base.concat("/update");
  },
  get delete() {
    return this.Base.concat("/delete");
  },
};

export default listAnimalApiRoute;
