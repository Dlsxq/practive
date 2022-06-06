// import { FormItem } from "./formItem";
import { FormField } from "./field";


export class Form {
  private form: HTMLFormElement;

  private formItems: Record<string, FormField> = {};
  private submitNode: HTMLButtonElement = null;

  constructor(
    public container: HTMLElement = document.body
  ) {
    let form = this.form = document.createElement("form");

    form.addEventListener("submit",this.onFormFinish.bind(this));
  }

  private onFormFinish(e:SubmitEvent) {
    e.preventDefault();
    console.log(this.getForms());
  }

  setValue(name: string, value: any) {
    this.formItems[name].set(value);
    return this;
  }
  getValue(name: string) {
    return this.formItems[name].get();
  }

  private each(fn: (el: FormField) => void) {
    let keys = Object.keys(this.formItems);
    while (keys.length > 0) {
      fn(this.formItems[keys.shift()]);
    }
  }

  private remove(node: FormField) {
    node.del();
    delete this.formItems[node.name];
  }

  append(formItem: FormField) {
    this.formItems[formItem.name] = formItem;
    return this;
  }

  removeByName(name: string) {
    this.each(this.remove.bind(this));
    return this;
  }

  private getForms() {
    let val = {};
    this.each(el => {
      val[el.name] = el.get();
    });
    return val;
  }

  save(): Record<string, any> {
    return this.getForms();
  }

  render(containr?: HTMLElement) {
    containr ??= this.container;

    let fir = document.createDocumentFragment();

    this.each(el => {
      fir.append(el.getField());
    });

    fir.append(this.submitNode);
    this.form.append(fir);
    containr.append(this.form);
  }

  getElement() {
    return this.form;
  }


  restore(objects?: Record<string, any>) {
    this.each(el => {
      el.restore(objects);
    });
    return this;
  }

  renderSubmit(fn?: Function) {

    let button = document.createElement("button");

    button.textContent = "Submit!!!";
    button.style.padding = "8px";
    button.type = "submit";
    this.submitNode = button;
  }

}