import FlipCounter from 'flip.counter';
import useTime, { TimeActionKind } from 'hooks/useTime';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 3%;
	height: 100vh;
	margin-top: -1.9%;
`;

const Flipper = styled(FlipCounter)`
	& > *,
	& > * > * {
		background-color: hsl(236, 21%, 26%);
		color: hsl(345, 95%, 68%);
	}
`;

function Timer() {
	let size = 70;
	const [time, dispatch] = useTime();
	const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);

	const updateTimer = useCallback(() => {
		dispatch.seconds({
			type: TimeActionKind.DECREASE,
			payload: {
				dispatchMinutes: dispatch.minutes,
				dispatchHours: dispatch.hours,
				dispatchDays: dispatch.days,
			},
		});
	}, [dispatch]);

	useEffect(() => {
		if (!timerInterval) {
			setTimerInterval(setInterval(() => updateTimer(), 1000));
			return () => {
				clearInterval(Number(timerInterval!));
			};
		}
	}, [timerInterval, updateTimer]);

	return (
		<Container>
			<Flipper value={time.days} size={size} />
			<Flipper value={time.hours} size={size} />
			<Flipper value={time.minutes} size={size} />
			<Flipper value={time.seconds} size={size} />
		</Container>
	);
}

export default Timer;
