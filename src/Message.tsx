// Function based component.
// PascalCasing (capitalize every word at the beginning) is used for naming components.
function Message() {
	// JSX (JavaScript XML) is used to write the component.
	

	if (name) {
		return <h1>Hello {name}!</h1>;
	} else {
		return <h1>Hello World!</h1>;
	}
}

// The component is exported as default module to be used in other files.
export default Message;
