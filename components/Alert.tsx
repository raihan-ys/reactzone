import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	onClose: () => void;
}

const Alert = ({ children, color = 'primary', onClose }: Props) => {
	return (
		<div 
		className={"alert alert-dismissible alert-" + color}
		onClick={onClose}>
			{children}
		</div>
	)
}

export default Alert