import styled from 'styled-components';
import ContainerRow from 'styled/container.row';

const Text = styled.div`
	color: white;
	letter-spacing: 8px;
	text-indent: 8px;
	font-size: 18px;
	align-self: flex-end;
	text-align: center;
`;

function Title() {
	return (
		<ContainerRow>
			<Text>WE'RE LAUNCHING SOON</Text>
		</ContainerRow>
	);
}

export default Title;
