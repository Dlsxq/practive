import { useCallback, useState } from "react";
import { useUploadChange, uploadNodeRef } from ".";
import { ReturnInterface, uploadType, UploadFileProps } from "./interface";
import { createFilter } from ".";
import React from "react";

export function useUploadFile(uploadProps?: UploadFileProps): ReturnInterface<File> {
  const { filter, onSuccess, } = uploadProps ?? {};
  const [res, setState] = useState<ReturnInterface<File>["uploadState"]>({
    success: false,
    file: null,
    error: []
  })
  const fileterFunc = useCallback(createFilter(filter), [])

  useUploadChange(
    (evl: any) => {
      let file = evl.target.files[0]
      if (file === undefined) return;

      let [success, error] = fileterFunc(file)

      success && onSuccess?.()

      setState({
        success, file, error
      })
    },
    [res]
  )

  const fileChange = useCallback(() => {
    let change = uploadNodeRef.get(uploadType.file)
    change()
  }, [])

  return {
    uploadState: res,
    fileChange,
    uploadNode: (
      <div className="upload-main upload-main-active" onClick={fileChange} >
        +
      </div>
    )
  }

}