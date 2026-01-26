import { ReactNode } from 'react'

interface Props {
	children: ReactNode;
	color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	onClick: () => void;
}

const Button = ({ children, color = 'secondary', onClick }: Props) => {
	return (
		<button 
			className={'btn btn-' + color + ' btn-lg'}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button