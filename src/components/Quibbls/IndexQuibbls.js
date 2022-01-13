import { useState } from 'react'
import Quibbl from './Quibbl'
import { Card, Container, Grid, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default function IndexQuibbls(props) {

    const [currentQuibbl, setCurrentQuibbl] = useState({})

    const changeCurrent = quibll => {
        setCurrentQuibbl(quibll)
    }


    console.log("this is props.quibbls\n", props.quibbls)
    // sort through all problems
    const allQuibbls = props.quibbls.sort((a, b) => {
        // return all problems from newest to oldest
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }).reverse().map((q, i) => {
        return (
                <div onMouseEnter={() => changeCurrent(q)} key={i}>
                <Link to={`/quibbls/${currentQuibbl._id}`}>
                <Quibbl currentQuibbl={currentQuibbl} quibbl={q} key={i} />
                </Link>
                </div>
        )
    })
    return (
        <div>
                <Container textAlign='center'>
                    <Divider hidden />
                        <Grid center columns={3}>
                        <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={13}>
                            <h1>Join a Quibbl</h1>
                            <Link to={`/quibbls/new`}><h3>or start your own</h3></Link>
                   </Grid.Column>
                        </Grid>
                </Container>
                <Container textAlign='left'>
                    <Divider hidden />
                        <Grid center columns={3}>
                        <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={13}>
                            <Card.Group itemsPerRow={3}>
                            {allQuibbls}
                            </Card.Group>
                            </Grid.Column>
                        </Grid>
                </Container>
        </div>
    )
}