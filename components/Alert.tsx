import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	display?: 'block' | 'none';
}

const Alert = ({ children, display }: Props) => {
	return (
		<div className={ "alert alert-danger d-" + display }>{ children }</div>
	)
}

export default Alert
 