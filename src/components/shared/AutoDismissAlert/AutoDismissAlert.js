import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { Message } from 'semantic-ui-react'

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
			<Message
				// dismissible
				// show={this.state.show}
				onDismiss= {this.handleClose}
				header = {heading}
				content= {message}
				
			/>
		)
	}
}

export default AutoDismissAlert
