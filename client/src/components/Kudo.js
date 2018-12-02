import React from 'react';

const Kudo = (props) => (
	<div className="singleKudo">
		<div>Title: {props.title} </div>
		<div>Sender: {props.sender} </div>
		<div>Receiver: {props.receiver} </div>
		<div>Message: {props.body} </div>
	</div>
)

export default Kudo;