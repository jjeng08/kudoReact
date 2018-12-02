import React from 'react';
import { Form, Input, FormGroup } from 'reactstrap';

const LoginForm = (props) => (
	<div>
		<Form>
			<FormGroup>
				{/* UserName */}
				<div>User Name</div>
				<Input type="text" name="adminName" onChange={props.onChange} />
				{/* Password */}
				<div>Kudo</div>
				<Input type="textare" name="adminPassword" onChange={props.onChange} />
			</FormGroup>
		</Form>
	</div>
)

export default LoginForm;