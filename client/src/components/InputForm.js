import React from 'react';
import {Form, Input, FormGroup } from 'reactstrap';

const KudoForm = (props) => (
	<div className="InputForm">
		<Form>
			<FormGroup>
				{/* SENDER */}
				<Input type="select" name="sender" onClick={props.onClick} onChange={props.onChange}>
					<option selected disabled value=''>From?</option>
					{props.users.map((user) => (
						<option value={user.username} data-id={user._id} key={user._id}>{user.username}</option>
					))}
				</Input>
				{/* RECEIVER */}
				<Input type="select" name="receiver" onChange={props.onChange}>
					<option selected disabled value=''>To?</option>
					{props.users.map((user) => (
						<option value={user.username} data-id={user._id} key={user._id}>{user.username}</option>
					))}
				</Input>

				{/* TITLE */}
				<div>Title</div>
				<Input type="text" name="title" onChange={props.onChange} />

				{/* MESSAGE */}
				<div>Kudo</div>
				<Input type="textare" name="body" onChange={props.onChange} />
			</FormGroup>
		</Form>
	</div>
)

export default KudoForm;