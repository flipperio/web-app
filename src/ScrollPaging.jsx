import React from 'react';
import PropTypes from 'prop-types';

class ScrollPaging extends React.Component {
	constructor(props) {
		super(props);

		this.container = React.createRef();
		this.onScroll = this.onScroll.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
	}

	onScroll() {
		if (!this.container.current) {
			return;
		}

		const { backOffset, onPage } = this.props;

		const containerBottom = (this.container.current.getBoundingClientRect().bottom) - backOffset;
		if (containerBottom <= window.innerHeight) {
			onPage();
		}
	}

	render() {
		return (
			<div ref={this.container}>
				{this.props.children}
			</div>
		);
	}
}

ScrollPaging.propTypes = {
	children: PropTypes.node.isRequired,
	onPage: PropTypes.func.isRequired,
	backOffset: PropTypes.number
};

ScrollPaging.defaultProps = {
	backOffset: 0
};

export default ScrollPaging;
