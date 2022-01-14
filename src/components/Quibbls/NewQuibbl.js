import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import { Form, Input, Grid, Button, Segment, Rail, Container, Divider, Header,  Message, List } from 'semantic-ui-react'

import { postQuibbl } from '../../api/quibbls'
import SignUp from '../auth/SignUp';

export default function NewQuibbl(props) {
    //<----------- STATES BELOW ------>// 
    const [value, setValue] = useState('')
    const [quibblTitle, setQuibblTitle] = useState('')
    const [tags, setTags] = useState([])
    const [quibblDuration, setQuibblDuration] = useState()


    //<----------- HELPER METHODS BELOW ------>// 

    // helper method for handling changes to tinyMCE editor
    const handleUpdate = (value) => {
        setValue(value)
    }

    // helper method to handle changes to assigned quibbl tags
    const handleTag = (tag) => {
        console.log('this is tag', tag._id)
        if (tags.length < 2 && tags.includes(tag._id) === false) {
            setTags([...tags, tag._id])
        } else if (tags.includes(tag._id)) {
            let filteredTags = tags.filter(id => id !== tag._id)
            setTags(filteredTags)
        }
    }

    // defining useNavigate so it can be called in helper
    const navigate = useNavigate()
    // helper method attached to button to create new quibbl
    const createNewQuibbl = () => {

        if (quibblTitle !== "" && value !== "" && tags.length == 2 && quibblDuration !== "") {
            // axios call to create the new Quibbl in the db
            postQuibbl(props.user, quibblTitle, value, tags, quibblDuration)
                // console.log('this is the current user id:', user._id)
                // console.log('this is the new Quibbl\n', newQuibbl)
                .then(() => {
                    props.refreshQuibbls()
                })
                .then(() => navigate('/quibbls'))
                .catch(err => {
                    console.error(err)
                })
        } else {
            return (
                <Message floating>Way to go!</Message>
            )
        }
    }

    // helper method for selecting quibbl duration
    const handleSelect = (e, quibblDuration) => {
        console.log('selection', quibblDuration)
        setQuibblDuration(quibblDuration.value)
    }

    const editorRef = useRef(null);

    // map through props.tags and return to display
    const allTags = props.tags.map((tag, key) => {
        return (
            <Form.Field
                id='form-button-control-public'
                control={Button}
                size="tiny"
                content={tag.description}
                onClick={() => handleTag(tag)}
                color={tags.includes(tag._id) ? tag.color : `${tag.color} basic`}
                key={tag.color}
            />
        )
    })

    // define the options that the dropdown will display
    const duration = [
        { key: 1, value: 1, text: 'quick-quibbl | 1 hour' },
        { key: 6, value: 6, text: 'qaurter-quibbl | 6 hours' },
        { key: 12, value: 12, text: 'half-quibbl | 12 hours' },
        { key: 24, value: 24, text: 'full-quibbl | 24 hours' },
        { key: 168, value: 168, text: 'mega-quibbl | 1 week' },
    ]


    return (
        (props.user ?
            <Container textAlign='left'>
                <Divider hidden />
                <Grid stackable columns={3}>
                    <Grid.Column width={2}>

                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Segment>
                            <Header as='h6'>Helpful Tips</Header>
                            <List>
                                Choose a topic to debate.
                                Be as clear as possible about the rules of the debate and describe exactly what you want to see in terms of arguments. As always, make sure to keep it civil and in good fun.
                            </List>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Grid left stackable columns={3}>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={10}>
                        <Segment>
                            <Form>
                                {/* //<----------- TITLE INPUT ------>// */}
                                <Form.Field
                                    id='form-input-control-title'
                                    control={Input}
                                    label='Title'
                                    placeholder='Title'
                                    value={quibblTitle || ''}
                                    onChange={e => setQuibblTitle(e.target.value)}
                                />
                                {/* //<----------- DROPDOWN MENU FOR DURATION ------>// */}
                                {/* // this is commented until end quibbl logic is sorted */}
                                {/* <Select
                                    placeholder='quibbl duration'
                                    options={duration}
                                    value={quibblDuration}
                                    onChange={handleSelect}

                                />
                                <Divider hidden /> */}
                                {/* //<----------- WYSIWYG EDITOR FOR DESCRIPTION ------>// */}
                                <Editor
                                    onEditorChange={handleUpdate}
                                    apiKey='irzgj1nh4gdtba8bmue61a2rc396j4xkurlck71s4piwwtqg'
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
                                <Divider hidden />
                                {/* //<----------- QUIBBL SUBMIT BUTTON ------>// */}
                                <Form.Field
                                    id='form-button-control-public'
                                    control={Button}
                                    content='Submit quibbl'
                                    onClick={() => createNewQuibbl()}
                                />
                            </Form>
                            {/* //<----------- TAG SELECTION ------>// */}
                            <Rail position='right'>
                                <Segment>
                                    <Header as="h5">pick 2 tags that describe your quibble</Header>
                                    <Divider />
                                    <Form>
                                        {allTags}
                                    </Form>
                                </Segment>
                            </Rail>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Divider hidden />
            </Container>
            : <SignUp />)

    )
}