import Social from 'social';
import styled, { createGlobalStyle } from 'styled-components';
import Timer from 'timer';
import Title from 'title';

const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		font-family: 'Red Hat Text', sans-serif;
	}

	html, body {
		height: 100%;
		width: 100%;
		margin: 0px;
		background-color:  hsl(234, 17%, 12%);
	}
	
	body {
		background: url('images/bg-stars.svg'),url('images/pattern-hills.svg')  bottom no-repeat;
		  background-size: 100%;

	}
`;

const ContainerColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
	align-items: center;
	gap: 3%;
	height: 100vh;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<ContainerColumn>
				<Title />
				<Timer />
				<Social />
			</ContainerColumn>
		</>
	);
}

export default App;
