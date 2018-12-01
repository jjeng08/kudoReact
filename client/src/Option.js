import React from 'react';

const Option = (props) => (
	<option value={props._id}>Name: {props.content}</option>
)

export default Option;