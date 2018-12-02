import React from 'react';
import { Form, Input, FormGroup, Row, Col } from 'reactstrap';

const InputForm = (props) => (
	<div>
		<Form>
			<FormGroup>

				<Row>
					<Col>
						{/* SENDER */}
						<Input type="select" name="sender" onClick={props.onClick} onChange={props.onChange}>
							<option selected disabled value=''>From?</option>
							{props.users.map((user) => (
								<option value={user.username} data-id={user._id} key={user._id}>{user.username}</option>
							))}
						</Input>
					</Col>
					<Col>
						{/* RECEIVER */}
						<Input type="select" name="receiver" onChange={props.onChange}>
							<option selected disabled value=''>To?</option>
							{props.users.map((user) => (
								<option value={user.username} data-id={user._id} key={user._id}>{user.username}</option>
							))}
						</Input>
					</Col>
				</Row>
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

export default InputForm;