import React from 'react';
import PropTypes from 'prop-types';

function Modal({ onBackgroundClick, children }) {
	const backgroundRef = React.createRef();

	function onBackgroundClickInternal(event) {
		if (event.target === backgroundRef.current) {
			onBackgroundClick();
		}
	}

	return (
		<div className='modal-container' onClick={onBackgroundClickInternal} ref={backgroundRef}>
			{children}
		</div>
	);
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	onBackgroundClick: PropTypes.func.isRequired
};

export default Modal;
