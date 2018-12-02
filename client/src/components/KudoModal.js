import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputForm from './InputForm';

class KudoModal extends React.Component {
	state = {
		users: [],
		modal: false,
		sender: '',
		senderID: '',
		receiver: '',
		title: '',
		body: '',
		alert: {
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
				console.log(this.state.users)
			})
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.nativeEvent.target.value
		})
		console.log(event.target)
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
			}
		})
	}

	postKudo = (event) => {
		event.preventDefault();
		const senderID = this.state.senderID;

		let kudo = {
			sender: this.state.sender,
			receiver: this.state.receiver,
			title: this.state.title,
			body: this.state.body,
		}

		console.log(kudo);
		console.log(senderID)

		if (this.validation(kudo)) {
			axios.post('/api/kudos')
				.then(() => {
					this.toggleModal();

					//QUESTION: HOW IS PROPS GETTING CALLED WHEN WE DON'T HAVE IT HERE? IS IT ALWAYS THERE BY DEFAULT EVEN IT IT'S NOT NAMED?
					this.props.getKudos();
				})
		} else {
			this.setState({
				alert: {
					type: 'warning',
					warning: "Yo, how's about you try filling in all the stuff, ya?"
				}
			})
		}

	}

	render() {
		return (
			<div>
				<Button onClick={this.toggleModal}>Kudo!</Button>

				<Modal isOpen={this.state.modal} toggle={this.state.toggleModal}>
					<ModalHeader>Say It With Feeling!</ModalHeader>
					<ModalBody>
						<InputForm onChange={this.onChange} users={this.state.users} />
					</ModalBody>
					<ModalFooter>
						<Button onClick={this.toggleModal}>Never Mind</Button>
						<Button onClick={this.postKudo}>Kudo Time</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

export default KudoModal;

