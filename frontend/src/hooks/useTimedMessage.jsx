import { useEffect, useState } from 'react';

const useTimedMessage = (timer = 5000, animationTime = 0) => {
	const [active, setActive] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (!active && message !== '') {
			setMessage(message);
			setActive(true);
			setTimeout(() => {
				setActive(false);
				if (animationTime === 0) setMessage('');
			}, timer);
			if (animationTime > 0)
				setTimeout(() => {
					setMessage('');
				}, animationTime + timer);
		}
	}, [message]);
	return [message, active, setMessage];
};

export default useTimedMessage;
