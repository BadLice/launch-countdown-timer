import FlipCounter from 'flip.counter';
import useTime, { TimeActionKind } from 'hooks/useTime';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ContainerRow from 'styled/container.row';

const Flipper = styled(FlipCounter)`
	& > div,
	& > div > div {
		background-color: hsl(236, 21%, 26%);
		color: hsl(345, 95%, 68%);
	}
`;

function Timer() {
	let size = 60;
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
		<ContainerRow>
			<Flipper value={time.days} size={size} label='days' />
			<Flipper value={time.hours} size={size} label='hours' />
			<Flipper value={time.minutes} size={size} label='minutes' />
			<Flipper value={time.seconds} size={size} label='seconds' />
		</ContainerRow>
	);
}

export default Timer;
