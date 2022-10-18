import { useReducer } from 'react';

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

type TimeValues = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

type TimeDispatchers = {
	days: React.Dispatch<DaysAction>;
	hours: React.Dispatch<HoursAction>;
	minutes: React.Dispatch<MinutesAction>;
	seconds: React.Dispatch<SecondsAction>;
};

export enum TimeActionKind {
	INCREASE = 'INCREASE',
	DECREASE = 'DECREASE',
}

type DaysAction = {
	type: TimeActionKind;
	payload: {};
};

type DaysState = {
	count: number;
};

type HoursAction = {
	type: TimeActionKind;
	payload: {
		dispatchDays: React.Dispatch<DaysAction>;
	};
};

type HoursState = {
	count: number;
};

type MinutesAction = {
	type: TimeActionKind;
	payload: {
		dispatchHours: React.Dispatch<HoursAction>;
		dispatchDays: React.Dispatch<DaysAction>;
	};
};

type MinutesState = {
	count: number;
};

type SecondsAction = {
	type: TimeActionKind;
	payload: {
		dispatchMinutes: React.Dispatch<MinutesAction>;
		dispatchHours: React.Dispatch<HoursAction>;
		dispatchDays: React.Dispatch<DaysAction>;
	};
};

type SecondsState = {
	count: number;
};

const clock = (v: number, limit: number) => (v < 0 ? limit : v > limit ? 0 : v);

const daysReducer = (state: DaysState, action: DaysAction): DaysState => {
	switch (action.type) {
		case TimeActionKind.DECREASE:
			let value = clock(state.count - 1, 23);
			return { count: value };

		default:
			throw new Error();
	}
};

const hoursReducer = (state: HoursState, action: HoursAction): HoursState => {
	switch (action.type) {
		case TimeActionKind.DECREASE:
			let value = clock(state.count - 1, 23);
			if (value === 23) {
				action.payload.dispatchDays({
					payload: {
						dispatchDays: action.payload.dispatchDays,
					},
					type: TimeActionKind.DECREASE,
				});
			}
			return { count: value };

		default:
			throw new Error();
	}
};

const minutesReducer = (state: MinutesState, action: MinutesAction): MinutesState => {
	switch (action.type) {
		case TimeActionKind.DECREASE:
			let value = clock(state.count - 1, 59);
			if (value === 59) {
				action.payload.dispatchHours({
					payload: {
						dispatchDays: action.payload.dispatchDays,
					},
					type: TimeActionKind.DECREASE,
				});
			}
			return { count: value };

		default:
			throw new Error();
	}
};

const secondsReducer = (state: SecondsState, action: SecondsAction): SecondsState => {
	switch (action.type) {
		case TimeActionKind.DECREASE:
			let value = clock(state.count - 1, 59);
			if (value === 59) {
				action.payload.dispatchMinutes({
					payload: {
						dispatchHours: action.payload.dispatchHours,
						dispatchDays: action.payload.dispatchDays,
					},
					type: TimeActionKind.DECREASE,
				});
			}
			return { count: value };

		default:
			throw new Error();
	}
};

const useTime = (): [TimeValues, TimeDispatchers] => {
	let { days: d, hours: h, minutes: m, seconds: s } = getRandomStartTime();
	const [days, dispatchDays] = useReducer(daysReducer, { count: Math.round(d) });
	const [hours, dispatchHours] = useReducer(hoursReducer, {
		count: Math.round(h),
	});
	const [minutes, dispatchMinutes] = useReducer(minutesReducer, {
		count: Math.round(m),
	});
	const [seconds, dispatchSeconds] = useReducer(secondsReducer, {
		count: Math.round(s),
	});

	return [
		{
			days: days.count,
			hours: hours.count,
			minutes: minutes.count,
			seconds: seconds.count,
		},
		{
			days: dispatchDays,
			hours: dispatchHours,
			minutes: dispatchMinutes,
			seconds: dispatchSeconds,
		},
	];
};

export default useTime;
