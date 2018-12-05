import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Input} from 'reactstrap';

class UserModal extends React.Component {
	state = {
		modal: false,
		username: '',
		alert: {
			color: '',
			message: ''
		}
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			username: '',
			alert: {
				color: '',
				warning: ''
			},
		})
	}

	postUser = () => {
		const newUser = {
			username: this.state.username,
			kudos: []
		}

		if (this.state.username = '') {
			this.setState({
				alert: {
					color: 'danger',
					warning: "You need a name. That's literally the whole point of this."
				}
			})
		} else {
			axios.post('/api/users', newUser)
				.then(() => {
					this.toggleModal();
					//QUESTION: HOW IS PROPS GETTING CALLED WHEN WE DON'T HAVE IT HERE? IS IT ALWAYS THERE BY DEFAULT EVEN IT IT'S NOT NAMED?
					this.setState({
						username: ''
					})
				})
		}
	}

	render() {
		return (
			<div>
				<Button color="primary" onClick={this.toggleModal}>Create User</Button>
				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>
					<ModalHeader>Join the Club!</ModalHeader>
					<ModalBody>
						<Input name='username' type='text' onChange={this.onChange}></Input>
					</ModalBody>
					<Alert color={this.state.alert.color}>{this.state.alert.message}</Alert>
					<ModalFooter>
						<Button onClick={this.toggleModal}>Nope</Button>
						<Button onClick={this.postUser}>LEROY</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

export default UserModal;