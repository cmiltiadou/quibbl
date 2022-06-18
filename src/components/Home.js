import { useState, useEffect } from 'react'
import Quibbl from './Quibbls/Quibbl'
import { getOfficialQuibbls } from '../api/quibbls'
import { Card, Container, Grid, Image, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Typewriter from 'typewriter-effect'



const Home = (props) => {
	const [currentQuibbl, setCurrentQuibbl] = useState({})
	const [officialQuibbls, setOffcialQuibbls] = useState([])

	useEffect(() => {
		// axios call to find all problems in the db posted by quibbl_official
		getOfficialQuibbls()
		.then((quibbls) => {
			console.log('these are all the problems in the db\n', quibbls.data.quibbls)
			// sets all problems in the db to state
			setOffcialQuibbls(quibbls.data.foundQuibbls)
		})
		.catch(err => console.error(err))
	}, [])

	const changeCurrent = quibll => {
		setCurrentQuibbl(quibll)
	}

	let allOfficialQuibbls
	
	if(officialQuibbls){
		allOfficialQuibbls = officialQuibbls.sort((a, b) => {
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
		
	}

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

	const change = () => {
		console.log("changes")
	}
	if(officialQuibbls){
	return (
		<Container textAlign='left'>
		<Grid divided='vertically' stackable padded>
			<Grid.Row columns={1} id="home-row">
				<Grid.Column textAlign='center' id="typewriter-div">
				<Typewriter
				options={{
					strings: "Welcome to Quibbl, where arguments go to be settled",
					autoStart: true,
					loop: false,
					delay: 150,
					pauseFor: 1500
				}}
			/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row columns={2}>
				<Grid.Column >
						<Header
							as='h2'
							content='Official Quibbls'
							subheader='these Quibbls come direct from team Quibbl'
							textAlign='centered'
						/>
					<Card.Group centered  itemsPerRow={1}>
                            {allOfficialQuibbls.slice(0,3)}
                            </Card.Group>
				</Grid.Column>
				<Grid.Column >
				<Header
							as='h2'
							content='Community Quibbls'
							subheader='Quibbls submitted by users just like you'
							textAlign='centered'
						/>
					<Card.Group centered itemsPerRow={1}>
                            {allQuibbls.slice(0,3)}
                            </Card.Group>
				</Grid.Column>
			</Grid.Row>
		</Grid>
		</Container>

	)}
}

export default Home
