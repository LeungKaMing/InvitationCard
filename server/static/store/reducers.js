const initalState = {
	num: 0
}

export function counter(state = 0, action) {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...initalState, 
				num: initalState.num + 1,
				text: action.text
			};
		case 'REMOVE_TODO':
			return {
				...initalState, 
				num: initalState.num - 1,
				text: action.text
			};
		default:
			return initalState;
		}
}