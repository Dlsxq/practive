import React, { FC } from 'react';
import "./index.style.less"
import { useUploadFile } from "../../hooks/upload"

interface IProps {

}

const Upload: FC<IProps> = (
  {

  }
) => {


  const { fileChange, uploadNode } = useUploadFile()





  return (
    <section>
      {uploadNode}

      <div style={{ padding: 50 }}>
        <button onClick={fileChange}>点击上传</button>

      </div>
    </section>
  )
}

export default Upload;