


export type FileFilter<F = File> = {

  /**
   * hardType 强制类型
   */
  hardType?: boolean

  /**
   * type 文件类型
   */
  type?: any[]

  /**
   * size 文件大小
   */
  size?: number

  /**
   * onFileterHandler 自定义校验
   */
  onFileterHandler: (file?: F) => boolean
}

export interface RootUpload<F> {

  /**
   * moreFileter 强制过滤
   */
  hardFilter?: boolean

  /**
   * filter 文件校验
   */
  filter?: FileFilter<F>

  /**
   * onFileterBefor 校验前
   */
  onFileterBefor?: () => any

  /**
   * onFilterAfter 校验后
   */
  onFilterAfter?: (success?: boolean) => void | boolean

  /**
   * onTransformation 自定义转换
   */
  onTransformation?: (file: F) => F
}

export interface UploadFile extends RootUpload<File> {

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