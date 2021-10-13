import React, { useRef, RefObject, LegacyRef, MutableRefObject, useEffect, useCallback } from "react";
import { uploadType } from "./interface";

export const uploadNodeRef = new Map<uploadType, any>();
export const upload: { change: undefined | ((...args: any) => void) } = { change: undefined }

export function useUploadChange(func: any, deps: any[] = []) {
  useEffect(() => {
    upload.change = func;
    return () => void (upload.change = undefined);
  }, deps)
}

export function useMountUploadElement() {

  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
  const fileListRef = useRef() as MutableRefObject<HTMLInputElement>;
  const directoryRef = useRef() as MutableRefObject<HTMLInputElement>;

  const fileRefFunc = useCallback(() => fileRef.current?.click(), [fileRef.current])
  const fileListRefFunc = useCallback(() => (fileListRef.current)?.click(), [fileListRef.current])
  const directoryRefFunc = useCallback(() => (directoryRef.current)?.click(), [directoryRef.current])
  const fileNodeClick = useCallback((...args: any) => upload.change?.(...args), [])

  useEffect(() => {
    directoryRef.current.setAttribute("webkitdirectory", "")
    uploadNodeRef.set(uploadType.folder, directoryRefFunc)
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
    <div style={{ display: 'none' }}>
      <input type="file" ref={fileRef} onChange={fileNodeClick} />
      <input type="file" multiple ref={fileListRef} placeholder="aa" />
      <input type="file" multiple ref={directoryRef} />
    </div>
  )
}