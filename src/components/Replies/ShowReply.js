import { Comment } from 'semantic-ui-react'

import moment from 'moment'


export default function ShowReply(props) {

    return (
        <Comment.Group>
        <Comment>
            <Comment.Content>
                <Comment.Author as='a'>{props.reply.owner.userName}</Comment.Author>
                <Comment.Metadata>
                    <div>{moment(props.reply.updatedAt).fromNow()}</div>
                </Comment.Metadata>
                <Comment.Text>{props.reply.reply}</Comment.Text>
            </Comment.Content>
        </Comment>
        </Comment.Group>
    )
}
