import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators } from './store/ducks.js';
import Post from './Post.jsx';

class Wall extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchWallPosts();
	}

	render() {
		const postElements = this.props.wall.posts.map(post => <Post post={post} key={post._id} />);
		return (
			<div className='site-container site-container--small post-wall'>
				<div>
					{postElements}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { wall: state.wall };
}

const mapDispatchToProps = {
	fetchWallPosts: () => actionCreators.fetchWallPosts()
};

Wall.propTypes = {
	wall: PropTypes.shape({
		posts: PropTypes.arrayOf(PropTypes.object).isRequired
	}).isRequired,
	fetchWallPosts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
