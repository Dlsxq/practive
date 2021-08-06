import React, { useRef, RefObject, LegacyRef, MutableRefObject, useEffect, useCallback } from "react";
import { uploadType } from "./interface";





export const uploadNodeRef = new Map<uploadType, any>();


export function useMountUploadElement() {

  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
  const fileListRef = useRef() as MutableRefObject<HTMLInputElement>;
  const directoryRef = useRef() as MutableRefObject<HTMLInputElement>;

  const fileRefFunc = useCallback(() => {
    fileRef.current?.click()
  }, [fileRef.current])
  const fileListRefFunc = useCallback(() => {
    (fileListRef.current)?.click()
  }, [fileListRef.current])

  useEffect(() => {
    directoryRef.current.setAttribute("webkitdirectory", "")
  }, [directoryRef.current])

  useEffect(
    () => {
      uploadNodeRef.set(uploadType.file, fileRefFunc)
      uploadNodeRef.set(uploadType.fileList, fileListRefFunc)
      return () => {
        uploadNodeRef.clear()
      }
    },
    [fileListRef.current, fileRef.current]
  )

  return (
    <div>

      {/* <input type="image" src="https://whale-edge.oss-cn-shanghai.aliyuncs.com/openplatform/facemosaic/1628169333_01.jpg" /> */}
      <input type="file" ref={fileRef} />
      <input type="file" multiple ref={fileListRef} placeholder="aa" />
      <input type="file" multiple ref={directoryRef} />
      {/* <input type="file"  /> */}
    </div>
  )
}