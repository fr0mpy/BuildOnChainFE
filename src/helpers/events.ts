import { WindowListener } from "../enums/events";
import { EventType } from "../Theme/events";
import { throttle } from 'lodash'

export const handleThrottledEventListener = (
	listenerState: WindowListener,
	listener: EventType,
	func: () => void,
	timeout: number
) => {
	return listenerState === WindowListener.Add
		? window.addEventListener(listener, throttle(func, timeout))
		: window.removeEventListener(listener, throttle(func, timeout));
}