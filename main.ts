

interface Composite {
  add(child: Child): void;
  remove(child: Child): void;
  getChild(i: number): Child;
}

interface FormItem {
  save();
}

interface FormControl extends FormItem {
  getElement();
}

type Child = Composite & FormItem & FormControl;

class CompositeForm implements Composite, FormItem {
  form: HTMLFormElement;
  formComponents: Child[] = [];

  constructor() {
    let form = this.form = document.createElement('form');
    form.id = 'composite';


  }

  add(child: Child) {
    this.formComponents.push(child);
    this.form.append(child.getElement());
  }
  remove(child: Child) {
    this.formComponents.splice(this.formComponents.indexOf(child), 1);
  }
  getChild(i: number) {
    return this.formComponents[i];
  }

  save() {
    this.formComponents.forEach(child => child.save());
  }

  getElement() {
    return this.form;
  }
}


class Field implements Composite, FormItem {
  constructor() {

  }
  add(child: Child): void {
    throw new Error("Method not implemented.");
  }
  remove(child: Child): void {
    throw new Error("Method not implemented.");
  }
  getChild(i: number): Child {
    throw new Error("Method not implemented.");
  }
  save() {
    throw new Error("Method not implemented.");
  }
}

interface FieldProps {
  className?: string;
  placeholder?: string;
  id?: string;
  defaultValue?: string;
  label?: string;

  name?: string;
}

class InputField extends Field implements Composite, FormItem {
  input = document.createElement("input");

  label = document.createElement("label");
  labelText = document.createElement("span");

  constructor(props: FieldProps) {
    super();

    this.labelText.textContent = "name" + ":";

    let input = this.input;

    Object.keys(props).filter(key => key !== "className").forEach(key => {
      let v = props[key];
      if (v != null) {
        input[key] = v;
      }
    });

    this.label.append(this.labelText);
    this.label.append(this.input);
  }

  val(nextVal: any) {
    if (nextVal === undefined) {
      return this.input.value;
    }
    this.input.value = nextVal;
    return nextVal;
  }

  getElement() {
    return this.label;
  }

}


const formControl = new CompositeForm();

formControl.add(new InputField({ name: "name" }));
formControl.add(new InputField({ name: "age" }));

document.body.append(formControl.getElement());
