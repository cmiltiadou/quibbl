import React from 'react'
import { Message, Container } from 'semantic-ui-react'

// import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: true,
		}
		this.timeoutId = null
	}

	componentDidMount() {
		this.timeoutId = setTimeout(this.handleClose, 5000)
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId)
	}

	handleClose = () => this.setState({ show: false })

	render() {
		const {  heading, message, deleteAlert, id } = this.props

		// Delete this alert after the fade animation time (300 ms by default)
		if (!this.state.show) {
			setTimeout(() => {
				deleteAlert(id)
			}, 300)
		}

		return (
			<Container>
				<Message
					size="small"
					compact
					onDismiss= {this.handleClose}
					header = {heading}
					content= {message}
					floating
				/>
			</Container>
		)
	}
}

export default AutoDismissAlert
