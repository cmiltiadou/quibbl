import { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Button, Modal } from 'semantic-ui-react'
import { updateQuibbl } from '../../api/quibbls'

export default function EditQuibbl(props) {
    {/* //<----------- STATES BELOW ------>// */ }
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false)


    {/* //<----------- HELPER METHODS BELOW ------>// */ }

    // helper method for handling changes to tinyMCE editor
    const handleUpdate = (value, editor) => {
        const length = editor.getContent({ format: 'text' }).length
      
        setValue(value)
    }

    const editorRef = useRef(null);

    const submitEdit = () => {
        // axios call to update the current problem in db
        updateQuibbl(props.user, props.quibbl._id, value)
            .then(() => {
                props.refreshQuibbl()
                setOpen(false)
                setValue(value)
            })
            .catch(err => console.log(err))
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Edit Quibbl</Button>}
        >
            <Modal.Header>Editing quibbl</Modal.Header>
            <Modal.Content>
                    <Editor
                        onEditorChange={handleUpdate}
                        apiKey='irzgj1nh4gdtba8bmue61a2rc396j4xkurlck71s4piwwtqg'
                        initialValue= {props.quibbl.description}
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 400,
                            menubar: false,
                            contextmenu: 'link | image | media',
                            skins: 'oxide-dark',
                            plugins: [
                                'advlist lists autolink link image charmap preview anchor',
                                'visualblocks code',
                                'insertdatetime media table emoticons '
                            ],
                            toolbar:
                                'bold italic backcolor | bullist numlist outdent indent | image media |emoticons ',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:13px }'
                        }}
                    />
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    cancel
                </Button>
                <Button
                    content="confirm"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={submitEdit}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}