import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, } from 'reactstrap';
import InputForm from './InputForm';
import LoginForm from './LoginForm';

class KudoModal extends React.Component {
	state = {
		adminName: '',
		adminPassword: '',
		users: [],
		modal: false,
		sender: '',
		senderId: '',
		receiver: '',
		title: '',
		body: '',
		alert: {
			type: '',
			warning: ''
		},
		barrier: {
			type: '',
			warning: ''
		}
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers = () => {
		axios.get('/api/users')
			.then((result) => {
				this.setState({ users: result.data });
			})
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onClick = (event) => {
		const index = event.target.selectedIndex;
		const element = event.target.childNodes[index];
		const option = element.getAttribute('data-id');

		this.setState({
			senderId: option
		})

	}

	validation = (form) => {
		for (let input in form) {
			if (form[input] === '')
				return false;
		}
		return true;
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			sender: '',
			receiver: '',
			title: '',
			body: '',
			alert: {
				type: '',
				warning: ''
			},
			barrier: {
				type: '',
				warning: ''
			}
		})
	}

	postKudo = (event) => {
		event.preventDefault();

		let kudo = {
			senderId: this.state.senderId,
			sender: this.state.sender,
			receiver: this.state.receiver,
			title: this.state.title,
			body: this.state.body,
		}

		if (this.validation(kudo)) {
			axios.post('/api/kudos', kudo)
				.then(() => {
					this.toggleModal();
					//QUESTION: HOW IS PROPS GETTING CALLED WHEN WE DON'T HAVE IT HERE? IS IT ALWAYS THERE BY DEFAULT EVEN IT IT'S NOT NAMED?
					this.props.getKudos();
				})
		} else {
			this.setState({
				alert: {
					type: 'danger',
					warning: "Yo, how's about you try filling in all the stuff, ya?"
				}
			})
		}
	}

	loginAdmin = (event) => {
		event.preventDefault();

		if (this.state.adminName === "Newton" && this.state.adminPassword === "gravity") {
			this.props.logIn();
			this.toggleModal();
		} else {
			this.setState({
				barrier: {
					type: 'danger',
					warning: "Whoa there, hoss. Who do you think you are, hah?"
				}
			})
		}


	}
	//QUESTION: WHY IS THE TERNARY BELOW FUNCTIONING LIKE THIS?
	render() {
		return (
			<div>
				<Button color="primary" onClick={this.toggleModal}>{this.props.changeText}</Button>

				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>
					{this.props.modalType === "input" ? (
						<div>
							<ModalHeader>Say It With Feeling!</ModalHeader>
							<ModalBody>
								<InputForm onChange={this.onChange} onClick={this.onClick} users={this.state.users} />

							</ModalBody>
							<Alert color={this.state.alert.type}>{this.state.alert.warning}</Alert>
							<ModalFooter>
								<Button onClick={this.toggleModal}>Never Mind</Button>
								<Button onClick={this.postKudo}>Kudo Time</Button>
							</ModalFooter>
						</div>) : (
							<div>
								<ModalHeader>Who The Hay Are You?</ModalHeader>
								<ModalBody>
									<LoginForm onChange={this.onChange} />
								</ModalBody>
								<Alert color={this.state.barrier.type}>{this.state.barrier.warning}</Alert>
								<ModalFooter>
									<Button onClick={this.toggleModal}>Run Away!</Button>
									<Button onClick={this.loginAdmin}>Open Sesame!</Button>
								</ModalFooter>
							</div>)}

				</Modal>
			</div>
		)
	}
}

export default KudoModal;

