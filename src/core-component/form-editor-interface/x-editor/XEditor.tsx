import React, { FC, memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import BraftEditor, { ControlType } from 'braft-editor';
import axios from 'axios';
import ex from 'umi/dist';


const controls = [
  {
    key: 'bold',
    text: <b>加粗</b>,
  },
  'undo',
  'redo',
  'emoji',
  'list-ul',
  'list-ol',
  'blockquote',
  'text-align',
  'font-size',
  'line-height',
  'letter-spacing',
  'text-color',
  'italic',
  'underline',
  'link',
  'media',
];

const XEditor:FC<any> = (props) => {

  const {value,onChange} = props;
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(value));

  useEffect(() => {
    const htmlContent = value || '';
    setEditorState(BraftEditor.createEditorState(htmlContent));
  }, []);

  const myUploadFn = (param: any) => {
    const fd = new FormData();
    fd.append('file', param.file);
    axios
      .post('xxxx', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function(event) {
          // 上传进度发生变化时调用param.progress
          console.log((event.loaded / event.total) * 100);
          param.progress((event.loaded / event.total) * 100);
        },
      })
      .then((res: any) => {
        // 上传成功后调用param.success并传入上传后的文件地址
        param.success({
          url: res.url,
          meta: {
            id: Date.now(),
            title: res.filename,
            alt: '趣谈前端',
          },
        });
      })
      .catch(err => {
        param.error({
          msg: '上传失败.',
        });
      });
  }

  const submitContent = () => {
    const htmlContent = editorState.toHTML();
    onChange && onChange(htmlContent);
  };

  const handleEditorChange = (e: any) => {
    setEditorState(e);
    if (onChange) {
      const htmlContent = e.toHTML();
      onChange(htmlContent);
    }
  };

  return (
    <BraftEditor
      value={editorState}
      controls={controls as ControlType[]}
      onChange={handleEditorChange}
      onSave={submitContent}
      media={{ uploadFn: myUploadFn }}
    />
  )
}

export default memo(XEditor);
