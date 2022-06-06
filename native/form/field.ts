



export interface FormField {
  getJson(): Record<string, string>;
  getElement(): Node;
  getField(): HTMLLabelElement;
  restore(objects: Record<string, string>): void;
  del(): void;
  name: string;
  get: () => string;
  set: (newVal: string) => void;
}

export class InputField implements FormField {
  private input: HTMLInputElement;
  private label: HTMLLabelElement;

  constructor(
    public name: string,
    label: string,
    placeholader:string,
    type = "text",
    classList?: string[],
    id?: string
  ) {
    let input = this.input = document.createElement("input");

    input.type = type;
    input.name = name;
    input.placeholder = placeholader;

    let labelNode = document.createElement("span");
    labelNode.textContent = label + "  : ";

    let labelWrap = document.createElement("label");
    labelWrap.append(labelNode, input);

    this.label = labelWrap;
  }

  get() {
    return this.input.value;
  }

  set(val) {
    this.input.value = val;
  }

  
  // get value() {
  //   return this.input.value;
  // }

  // set value(newVal) {
  //   this.input.value = newVal;
  // }


  restore(forms: Record<string, string>) {
    this.input.value = forms[this.name];
  }

  getJson() {
    return { [this.name]: this.get() };
  }

  getElement() {
    return this.input;
  }

  getField() {
    return this.label;
  }

  del() {
    this.label.remove();
  }
}