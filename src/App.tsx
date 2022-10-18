import FlipCounter from 'flip.counter';
import { useCallback, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
  background-image: url('images/bg-stars.svg');
}
`;

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

const getRandomStartTime = () => {
	const randomDate = (start: Date, end: Date) => {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	};
	const today = new Date();
	const future = new Date();
	future.setDate(future.getDate() + 99);
	const result = randomDate(today, future);
	let delta = Math.abs(result.getTime() - today.getTime()) / 1000;
	const days = Math.floor(delta / 86400);
	delta -= days * 86400;
	const hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;
	const minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;
	const seconds = delta % 60;

	return {
		days,
		hours,
		minutes,
		seconds,
	};
};

const clock = (v: number, limit: number) => (v < 0 ? limit : v > limit ? 0 : v);

function App() {
	let { days: d, hours: h, minutes: m, seconds: s } = getRandomStartTime();

	const [days, setDays] = useState<number>(Math.round(d));
	const [hours, setHours] = useState<number>(Math.round(h));
	const [minutes, setMinutes] = useState<number>(Math.round(m));
	const [seconds, setSeconds] = useState<number>(Math.round(s));

	let size = 70;
	const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);

	const updateTimer = useCallback(() => {
		setSeconds((s) => {
			let sc = clock(s - 1, 59);
			if (sc === 59) {
				setMinutes((m) => {
					let mc = clock(m - 1, 59);
					if (mc === 59) {
						setHours((h) => {
							let hc = clock(h - 1, 23);
							if (mc === 23) {
								setDays((d) => {
									let dc = d - 1;
									return dc;
								});
							}
							return hc;
						});
					}
					return mc;
				});
			}
			return sc;
		});
	}, []);

	useEffect(() => {
		if (!timerInterval) {
			setTimerInterval(setInterval(() => updateTimer(), 1000));
			return () => {
				clearInterval(Number(timerInterval!));
			};
		}
	}, [timerInterval, updateTimer]);

	return (
		<>
			<GlobalStyles />
			<Container>
				<Flipper value={days} size={size} />
				<Flipper value={hours} size={size} />
				<Flipper value={minutes} size={size} />
				<Flipper value={seconds} size={size} />
			</Container>
		</>
	);
}

export default App;
