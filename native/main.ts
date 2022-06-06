
class FormField {
  public name: string;

  constructor(
    private fieldInstce: HTMLInputElement | HTMLSelectElement,
    private initValue: string | number | boolean = ""
  ) {

    if (fieldInstce instanceof HTMLInputElement) {

      this.name = fieldInstce.name;
      fieldInstce.value = initValue.toString();
    }
  }


  get value() {
    return this.fieldInstce.value;
  }

  set value(nextValue) {

  }

  build() {

  }

}

class FormController {

  private fieldMap = new Map<string, FormField>();

  constructor(
    private fromInstce: HTMLFormElement,
    formField?: FormField[],
    rules?: any[]
  ) {
    formField?.forEach(el => this.fieldMap.set(el.name, el));
  }

  build<T = Record<string, unknown>>(): T {
    let ans = {} as T;
    this.fieldMap.forEach((instce, name) => ans[name] = instce.value)
    return ans;
  }

  set() {

  }

  get() {

  }

  onSubmit() {

  }

  private listenerOfFormSubmit(e) {

  }

  static form() {

  }

}


// const form = document.querySelector<HTMLFormElement>(".form");


// const formFields = form.querySelectorAll<HTMLInputElement>("input[name]");

// let fi = [];

// for (let i of formFields.values()) {
//   fi.push(new FormField(i, "1123"));
// }

// let formController = new FormController(
//   form,
//   fi
// );


// console.log(formController.build());