import {Form} from "./form";
import {InputField} from "./field";




const form = new Form();


let name = new InputField(
  "name",
  "name",
  "无情铁手"
);

form.append(name);



form.renderSubmit();

form.render();