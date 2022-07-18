const AnimalApiRoute = {
  get Base() {
    return "/animal";
  },
  get getanimals() {
    return this.Base;
  },
  get create() {
    return this.Base.concat("/create-animal");
  },
  get update() {
    return this.Base.concat("/update-animal");
  },
  get delete() {
    return this.Base.concat("/delete-animal");
  },
};

export default AnimalApiRoute;
