import styled from 'styled-components';
import ContainerRow from 'styled/container.row';

const Container = styled(ContainerRow)`
	align-items: flex-end;
	gap: 30px;
	width: 100%;
`;

const IconButton = styled.a`
	width: 28px;
	height: 28px;
	border: none;
	background-color: hsl(237, 18%, 59%);

	&:hover {
		background-color: hsl(345, 95%, 68%);
		cursor: pointer;
	}
`;

const Facebook = styled(IconButton)`
	mask: url('./images/icon-facebook.svg') no-repeat;
`;

const Instagram = styled(IconButton)`
	mask: url('./images/icon-instagram.svg') no-repeat;
`;

const Pinterest = styled(IconButton)`
	mask: url('./images/icon-pinterest.svg') no-repeat;
`;

function Social() {
	return (
		<Container>
			<Facebook href='https://www.facebook.com/' target='blank' />
			<Instagram href='https://www.instagram.com/' target='blank' />
			<Pinterest href='https://www.pinterest.com/' target='blank' />
		</Container>
	);
}

export default Social;
