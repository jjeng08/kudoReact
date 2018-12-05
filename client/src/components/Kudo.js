import React from 'react';
import { Button } from 'reactstrap';

const Kudo = (props) => (
	<div className="singleKudo">
			<h5>{props.title} </h5>
		<div className="kudoItemRow">
			<div className="kudoItemBox">
				<div className="label">Sender</div>
				<div>{props.sender}</div>
			</div>
			<div className="kudoItemBox">
				<div className="label">Receiver</div>
				<div>{props.receiver}</div>
			</div>
		</div>
		<div className="kudoItemBox"></div>
		<div className="label">Message</div>
		<div>{props.body}</div>
		{props.loggedIn ? (
			<Button value={props.kudoId} id={props.senderId} onClick={props.handleDelete}>Delete</Button>) : ('')}
	</div>
)

export default Kudo;