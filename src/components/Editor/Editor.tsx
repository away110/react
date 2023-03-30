import React from 'react';
import { Button } from 'antd'
import { Editor } from '@tinymce/tinymce-react';
import { message} from 'antd';
interface Props {}

function Edit(props:Props) {
    const [messageApi, contextHolder] = message.useMessage();
    var editorRef:any = null;

    var getcontent = ()=>{
        //通过编辑器实例的getContent方法, 获取编辑器的内容
        console.log( editorRef.getContent() );
        messageApi.open({
            type: 'success',
            content: `${editorRef.getContent()}`,
          });
    }
    return (
        <div className='editor'>
               {contextHolder}
            <Editor
                // onInit  在Editor组件初始化完成时执行, 获取Editor组件的实例
                onInit={(evt, editor) => editorRef = editor}
                init={{
                height: 500,
                menubar: false,
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <div className="btns">
                <Button onClick={getcontent}>发布</Button>
            </div>
        </div>
    );
}

export default Edit;