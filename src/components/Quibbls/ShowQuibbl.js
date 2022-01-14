import { useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Label, Container, Header, Divider, Grid, Rail, Segment, Icon } from 'semantic-ui-react'

import moment from 'moment'
import parse from "html-react-parser"
// import { destroyQuibbl } from '../../api/quibbls'
import { getQuibblReplies, upvoteReply } from '../../api/replies'


import NewReply from '../Replies/NewReply'
import ShowReply from '../Replies/ShowReply'
import EditQuibbl from './EditQuibbl'
// import EditQuibbl from './EditQuibbl'

export default function ShowQuibbl(props) {

    const [quibblReplies, setQuibblReplies] = useState([])

    const { pathname } = useLocation()
    const quibblId = pathname.split('/')[2]
    // console.log('this is the problem id:', problemId)
    let currentQuibbl = props.quibbls && props.quibbls.find(x => x._id === quibblId)

    // delete is currently disabled, since deletes are only handled on an admin level
    // // helper method attached to delete button
    // const deleteQuibbl = () => {
    //     // axios call to delete problem from db
    //     destroyQuibbl(props.user, currentQuibbl._id)
    //         // console.log('THIS IS:', `${apiUrl}/problems/${itemId}`)
    //         .then(() => {
    //             props.refreshQuibbls()
    //             navigate('/quibbls')
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         })
    // }

    useEffect(() => {
        // axios call to find all replies connected to current quibbl id
        getQuibblReplies(currentQuibbl._id)
            .then(replies => {

                // set the found replies in db to state
                setQuibblReplies(replies.data.foundReplies || [])
                console.log(quibblReplies)
            })
            .catch(err => console.error(err))
    }, [])

    // refresh answers to include posted and updated answers
    const refreshReplies = () => {
        getQuibblReplies(currentQuibbl._id)
            .then(replies => {
                setQuibblReplies(replies.data.foundReplies)
            })
            .catch(err => console.error(err))
    }


    const handleVote = (e) => {
        console.log('this is the clicked reply', e)

        let replyId = e._id
        let user = props.user._id

        console.log('this is user id', user)

        upvoteReply(replyId, user)
            .then(() => {
                refreshReplies()
            })
            .catch(err => {
                console.error(err)
            })

    }


    // display them from newest to oldest
    const getAllReplies = quibblReplies.map((reply, i) => {
        const upVote = <div>
            {reply.bestAnswer ? <Icon color="teal" name='trophy' size="large" /> : ""}
            <Label as='a'
                basic
                color='pink'
                onClick={props.user ? () => handleVote(reply) : ""}
            >
                <Icon
                    right
                    name={props.user && reply.votes.includes(props.user._id) ? 'handshake' : 'handshake outline'}
                    size="large"
                />
                Votes: {reply.votes.length}
            </Label>
        </div>

        return (
            <Segment>
                <ShowReply
                    reply={reply}
                    key={i}
                    currentQuibblId={currentQuibbl._id}
                    refreshReplies={refreshReplies}
                    currentUser={props.user}
                />
                {upVote}
            </Segment>
        )
    })

    const options = {
        replace: (domNode) => {
            if (domNode.attribs && domNode.attribs.class === "remove") {
                return <></>;
            }
        }
    }

    return (
        <>
            {!currentQuibbl ? <h1>Loading...</h1> : (
                <div>
                    <Container textAlign='left'>
                        <Divider hidden />
                        <Grid left stackable columns={3}>
                            <Grid.Column width={3}></Grid.Column>
                            <Grid.Column width={9}>
                                <Segment>
                                    <Header as='h3'>{currentQuibbl.title}</Header>
                                    <Divider />
                                    <div>
                                        {parse(currentQuibbl.description, options)}
                                    </div>
                                    {/* // this bit of logic will make sure that only the quibbl owner can access the edit page. */}
                                    {props.user && props.user.userName === currentQuibbl.owner.userName ?
                                        <EditQuibbl
                                            quibbl={currentQuibbl}
                                            user={props.user}
                                            refreshQuibbl={props.refreshQuibbls}
                                        /> : ""}
                                    <Rail position='right'>
                                        <Label>
                                            {currentQuibbl.owner.userName}
                                            <Label.Detail>{moment(currentQuibbl.createdAt).fromNow()}</Label.Detail>
                                        </Label>
                                    </Rail>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <Divider hidden />
                    </Container>
                    {/* <----- NEW ANSWER -----> */}
                    <Container>
                        <Grid left columns={3}>
                            <Grid.Column width={3}></Grid.Column>
                            <Grid.Column width={9}>
                                <NewReply
                                    user={props.user}
                                    currentQuibbl={currentQuibbl}
                                    refreshReplies={refreshReplies}
                                />
                                <Divider hidden />
                                <Divider hidden />
                                <Divider hidden />
                                {getAllReplies}
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
            )}
        </>
    )
}
