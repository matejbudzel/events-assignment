import React from 'react';

import './message-overlay.scss';

export type MessageOverlayProps = {
	emoji: string;
	message?: string;
	action?: JSX.Element;
};

const MessageOverlay = ({emoji, message, action}: MessageOverlayProps) => {
	return (
		<div className="message-overlay">
			<span className="emoji">{emoji}</span>
			{message && <span className="message">{message}</span>}
			{action && <span className="action">{action}</span>}
		</div>
	);
};

export default MessageOverlay;
