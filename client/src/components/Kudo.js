import React from 'react';
import {Button} from 'reactstrap';

const Kudo = (props) => (
	<div className="singleKudo">
		<div>Title: {props.title} </div>
		<div>Sender: {props.sender} </div>
		<div>Receiver: {props.receiver} </div>
		<div>Message: {props.body} </div>
		{props.loggedIn ? (
		<Button value={props.id} id={props.senderId} onClick={props.handleDelete}>Delete</Button> ) : ('')}
	</div>
)

export default Kudo;