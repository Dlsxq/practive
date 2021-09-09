import React from "react"



export enum mediaType {
  mp4 = "video/mp4",
  jpg = "image/jpeg",
  jpeg = "image/jpeg",
  png = "png",
  txt = "text/plain"
}

export type media = (mediaType | string)[]

type Func<Args, Ret = void> = (args: Args) => Ret
export type FileFilter<F = File> = {

  /**
   * hardType 强制类型， 暂不支持
   */
  hardType?: boolean

  /**
   * type 文件类型
   */
  type?: media

  /**
   * size 文件大小
   */
  size?: number

  /**
   * onFileterHandler 自定义校验
   */
  onFileterHandler?: (file: F, defaultFileterFunc: Func<F, boolean>[]) => boolean

  /**
   * all 是否单个
   */
  all?: boolean
}

export interface RootUpload<F> {
  /**
   * filter 文件校验
   */
  filter?: FileFilter<F>

  /**
   * onSuccess 校验成功后
   */
  onSuccess?: () => any
  /**
   * onFaill 校验失败后
   */
  onFaill?: () => any

  /**
   * onTransformation 自定义转换
   */
  onTransformation?: (file: F) => F

}



export interface UploadFileProps extends RootUpload<File> {

}


export interface MultipleFile extends RootUpload<FileList> {

}

export interface FolderProps {

}


export enum uploadType {
  file = "file",
  fileList = "fileList",
  folder = "folder"
}

export enum fileterErrorMessage {
  type = "type",
  size = "size"
}




export interface ReturnInterface<F = File> {
  uploadState: {
    success: boolean
    file: null | F
    error: fileterErrorMessage[]
  }
  fileChange: (args?: any) => any
  uploadNode: React.ReactNode
}