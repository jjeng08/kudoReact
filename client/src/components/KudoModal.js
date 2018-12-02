import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert} from 'reactstrap';
import InputForm from './InputForm';

class KudoModal extends React.Component {
	state = {
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
		const index=event.target.selectedIndex;
		const element= event.target.childNodes[index];
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
			}
		})
	}

	postKudo = (event) => {
		event.preventDefault();

		console.log(this.state.senderId);

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
				}).then(

				)
		} else {
			this.setState({
				alert: {
					type: 'danger',
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
						<InputForm onChange={this.onChange} onClick={this.onClick} users={this.state.users} />
					</ModalBody>
					<Alert color={this.state.alert.type}>{this.state.alert.warning}</Alert>
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

