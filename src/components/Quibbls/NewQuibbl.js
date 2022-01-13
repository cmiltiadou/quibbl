import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import { Form, Input, Grid, Button, Segment, Rail, Container, Divider, Header, Select  } from 'semantic-ui-react'


import { postQuibbl } from '../../api/quibbls'

export default function NewQuibbl(props) {
    // console.log('this is props\n', props)
    // console.log('here is the current user id:', props.user._id)

    const [value, setValue] = useState('')
    const [quibblTitle, setQuibblTitle] = useState('')
    const [tags, setTags] = useState([])
    const [quibblDuration, setQuibblDuration] = useState()



    const handleUpdate = (value, editor) => {
        const length = editor.getContent({ format: 'text' }).length

        setValue(value)
    }
    
    const handleTitleUpdate = (quibblTitle) => {
        setQuibblTitle(quibblTitle)
    }

    const navigate = useNavigate()

    // const handleChange = (e) => {
    //     setNewQuibbl({ ...newQuibbl, [e.target.name]: e.target.value })
    // }

    // helper method attached to button
    const createNewQuibbl = () => {
        // axios call to create the new Quibbl in the db
        postQuibbl(props.user, quibblTitle, value)
            // console.log('this is the current user id:', user._id)
            // console.log('this is the new Quibbl\n', newQuibbl)
            .then(() => {
                props.refreshQuibbls()
            })
            .then(() => navigate('/quibbls'))
            .catch(err => {
                console.error(err)
            })
    }

    const editorRef = useRef(null);





    const duration = [
        {key: 1, value: 1, text:'quick-quibbl | 1 hour'},
        {key: 6, value: 6, text:'qaurter-quibbl | 6 hours'},
        {key: 12, value: 12, text:'half-quibbl | 12 hours'},
        {key: 24, value: 24, text:'full-quibbl | 24 hours'},
        {key: 168, value: 168, text:'mega-quibbl - 1 week'},
        
    ]

    return (
        <div>

            <Container textAlign='left'>
                <Divider hidden />
                <Grid left columns={3}>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={9}>
                        <Segment>
                        <Form>

                <Form.Field
                    id='form-input-control-title'
                    control={Input}
                    label='Title'
                    placeholder='Title'
                    value = {quibblTitle || ''}
                    onChange = {e => setQuibblTitle(e.target.value)}
                />

                <Select 
                placeholder='quibbl duration' 
                options={duration} />
                <Divider hidden />
                <Editor
                    onEditorChange={handleUpdate}
                    apiKey='irzgj1nh4gdtba8bmue61a2rc396j4xkurlck71s4piwwtqg'
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                        height: 400,
                        menubar: true,
                        skins: 'oxide-dark',
                        plugins: [
                            'advlist autolink lists link image charmap preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table '
                        ],
                        toolbar:
                            'bold italic backcolor | bullist numlist outdent indent | ',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:13px }'
                    }}
                />


                <Form.Field
                    id='form-button-control-public'
                    control={Button}
                    content='Submit quibbl'
                    onClick={() => createNewQuibbl()}
                />
            </Form>
                            <Rail position='right'>
                                <Segment>
                                <Header as="h4">Pick 2 tags to describe your quibble</Header>
                                <Divider/>
                <Form.Group inline>
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size = "tiny"
                        content='just for fun'
                        onClick={() => createNewQuibbl()}
                        color='violet'
                        
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size = "tiny"
                        content='food'
                        onClick={() => createNewQuibbl()}
                        color='red'
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size = "tiny"
                        content='food'
                        onClick={() => createNewQuibbl()}
                        color='red'
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size = "tiny"
                        content='food'
                        onClick={() => createNewQuibbl()}
                        color='red'
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size = "tiny"
                        content='food'
                        onClick={() => createNewQuibbl()}
                        color='red'
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size = "tiny"
                        content='food'
                        onClick={() => createNewQuibbl()}
                        color='red'
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        size = "tiny"
                        content='food'
                        onClick={() => createNewQuibbl()}
                        color='red'
                    />
                    
                </Form.Group>
                </Segment>
                            </Rail>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Divider hidden />
            </Container>


            

        </div>
    )
}