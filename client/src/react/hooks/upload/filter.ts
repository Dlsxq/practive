import { mediaType, FileFilter, fileterErrorMessage, media } from "./interface"


function binding(func: (...args: any) => any, ...args: any) {
  return (...funcArgs: any) => func(...args, ...funcArgs)
}


export const fileterMessages = [fileterErrorMessage.type, fileterErrorMessage.size]

export function fileterFileType(fileType: media, file: File): void | fileterErrorMessage {
  if (!fileType.includes(file.type as mediaType)) {
    return fileterErrorMessage.type
  }
}


export function filterFileSize(fileSize: number, file: File): void | fileterErrorMessage {
  if (file.size / 1024 / 1024 > fileSize) {
    return fileterErrorMessage.size
  }
}




export function createFilter(fileters: FileFilter = {}) {
  let fns: ((file: File) => void | fileterErrorMessage)[] = [], all = fileters.all ?? false;
  if (fileters.type instanceof Array) {
    fns.push(binding(fileterFileType, fileters.type))
  }
  if (fileters.size !== undefined) {
    fns.push(binding(filterFileSize, fileters.size))
  }

  return (file: File): [boolean, fileterErrorMessage[]] => {
    let errors = [] as fileterErrorMessage[]

    for (let i = 0; i < fns.length; i++) {
      let res = fns[i](file)
      if (typeof res === "string") {
        errors.push(res)
        if (!all) {
          return [false, errors]
        }
      }
    }

    return [errors.length === 0, errors]
  }
}