import TextEditor from "./TextEditor"


const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const change = () => {
		console.log("changes")
	}

	return (
		<>
			<h2>Home Page</h2>
			<container>
				<TextEditor onChange={change()}/>
			</container>
		</>
	)
}

export default Home
