import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function App() {
  const editorRef = useRef(null);
  
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey='irzgj1nh4gdtba8bmue61a2rc396j4xkurlck71s4piwwtqg'
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          height: 400,
          width: 800,
          menubar: false,
          skins: 'oxide-dark',
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code '
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'insertdateime',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:13px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
