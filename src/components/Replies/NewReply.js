import { useState } from 'react'
import { postReply } from '../../api/replies'
import { Button, Form } from 'semantic-ui-react'

export default function NewReply(props) {

    const [newReply, setNewReply] = useState('')

    const handleChange = (e) => {
        setNewReply(e.target.value )
    }

    const createReply = () => {
        // axios call to create a new reply in db
        postReply(props.user, props.currentQuibbl._id, newReply)
            .then(() => {
                props.refreshReplies()
                setNewReply('')
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div>
                <Form reply>
                    <Form.TextArea
                        rows={5} placeholder='Convince us...'
                        onChange={handleChange}
                        reply={newReply || ''}
                        value={newReply}
                    />
                    <Button content='Have your say'
                        labelPosition='right' icon='edit'
                        floated="right"
                        primary
                        onClick={() => createReply()}
                    />
                </Form>
            
        </div>
    )
}









