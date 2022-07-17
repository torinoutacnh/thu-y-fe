const FormApiRoute = {
  get formBase() {
    return "/form";
  },
  get getform() {
    return this.formBase;
  },
  get getRecoment() {
    return this.formBase.concat("/recomment-attribute");
  },
};

export default FormApiRoute;
