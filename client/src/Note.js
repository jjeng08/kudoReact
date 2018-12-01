import React from 'react';

const Note = (props) => (
	<div>
		<div>Name: {props.content}</div>
		<button value={props.id} onClick={props.handleDelete}>Delete</button>
		<button value={props.id} onClick={props.update}>Update</button>
	</div>
)

export default Note;