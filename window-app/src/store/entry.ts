import { ioStroage } from "~/utils";



const loadSymbol = "laodsymol";
export function intoIsLoad() {
  return ioStroage.get(loadSymbol) === null;
}

export function setLogin() {
  return ioStroage.set(loadSymbol, true);
}