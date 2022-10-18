import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

type WrapperProps = {
	$animate?: boolean;
	$animationDurationMs: number;
};

type FlipTimerProps = {
	size: number;
	className?: string;
	value?: number;
	clockValue?: number;
};

const flip = keyframes`
  from {
    transform: rotateX(0deg);
  }
  to {
    transform: rotateX(-180deg);
  }
`;

export const Wrapper = styled.div<{ $size: number }>`
	position: relative;
	width: ${({ $size }) => $size * 2}px;
	height: ${({ $size }) => $size}px;
	perspective: 1000px;
	user-select: none;
`;

export const Inner = styled.div<WrapperProps>`
	width: 100%;
	height: 100%;
	text-align: center;
	transform-style: preserve-3d;
	/* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
	transform-origin: bottom;
	bottom: 0px;
	left: 0px;
	animation: ${({ $animate, $animationDurationMs }) =>
		$animate
			? css`
					${flip} ${$animationDurationMs}ms ease-in
			  `
			: 'none'};
	user-select: none;
	border-radius: 10px;
`;

const TextContainer = styled.div<{ $size: number }>`
	font-size: ${({ $size }) => $size * 2 - (($size * 2) / 100) * 45}px;
	line-height: ${({ $size }) => $size * 2}px;
	border-radius: 10px;
`;

const Face = styled(TextContainer)`
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 10px;
`;

export const Front = styled(Face)`
	overflow: hidden;
`;

export const Back = styled(Face)`
	transform: rotateX(180deg);
	line-height: 0px;
	overflow: hidden;
`;

export const BottomPlaceholder = styled(TextContainer)`
	width: ${({ $size }) => $size * 2}px;
	height: ${({ $size }) => $size}px;
	line-height: 0px;
	overflow: hidden;
	text-align: center;
	box-shadow: 0 8px 0px 0 rgba(15, 15, 15, 0.3);

	::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.15;
		z-index: 5;
		border-radius: 10px;
	}
`;

export const UpperPlaceholder = styled(TextContainer)`
	width: ${({ $size }) => $size * 2}px;
	height: ${({ $size }) => $size}px;
	position: absolute;
	bottom: 0px;
	left: 0px;
	overflow: hidden;
	text-align: center;
`;

const FlipCounter = ({ className, size, value }: FlipTimerProps) => {
	const animationDurationMs = 500;
	const [displayValue, setDisplayValue] = useState<number>(0);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		triggerFlip();
	}, [value]);

	const updateDisplayValue = () => setDisplayValue(value!);

	const triggerFlip = () => {
		setIsAnimating(true);
	};

	return (
		<Wrapper $size={size} className={className}>
			<UpperPlaceholder $size={size}>
				{displayValue + (value! - displayValue)}
			</UpperPlaceholder>
			<Inner
				$animationDurationMs={animationDurationMs}
				$animate={isAnimating}
				onAnimationStart={() => {
					setTimeout(() => {
						setIsAnimating(false);
						updateDisplayValue();
					}, animationDurationMs - 25);
				}}
			>
				<Front $size={size}>{displayValue}</Front>
				<Back $size={size}>{displayValue + (value! - displayValue)}</Back>
			</Inner>
			<BottomPlaceholder $size={size}>{displayValue}</BottomPlaceholder>
		</Wrapper>
	);
};

export default FlipCounter;
