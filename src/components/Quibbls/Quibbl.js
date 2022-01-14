import moment from 'moment'
import { Card, Divider, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Quibbl(props) {

    let userName = props.quibbl.owner.userName
    let tag1 = props.quibbl.tags[0].description
    let tag2 = props.quibbl.tags[1].description
    let tag1Color = props.quibbl.tags[0].color
    let tag2Color = props.quibbl.tags[1].color


    const tags = 
        <div>
            <div>
            <Label as='a' ribbon color={tag1Color}>
                {tag1}
            </Label>
            </div>
            <div>
            <Label as='a' ribbon color={tag2Color}>
                {tag2}
            </Label>
            </div>
        </div>

    return (
        <>
                        
                <Divider hidden/>
                <Card
                    raised
                    color={props.quibbl.owner.userName.includes('quibbl_official') ? 'red' :'teal'}
                    header={props.quibbl.title}
                    meta={moment(props.quibbl.createdAt).fromNow()} 
                    description={`user: ${userName}`}
                    extra={tags}
                />
        </>
    )
}