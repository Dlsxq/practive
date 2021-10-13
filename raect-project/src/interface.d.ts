import { FC, FunctionComponent, ClassicComponent } from "react"

export namespace RouterTypes {
  interface Listener {
    result: boolean
    message?: string
  }

  interface RoutePage {
    component: any
    path: string
    isProform?:boolean

  }
}