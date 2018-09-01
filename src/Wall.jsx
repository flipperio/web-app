import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators } from './store/ducks.js';
import Post from './Post.jsx';
import CreatePostModal from './CreatePostModal.jsx';

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
				<div className='post-wall__controls'>
					<button className='btn btn-primary btn-larger' onClick={this.props.openCreateModal}>
						<i className='fa fa-bullhorn' /> {'Make a post'}
					</button>
				</div>
				<div>
					{postElements}
				</div>

				{ this.props.open && <CreatePostModal /> }
			</div>
		);
	}
}

const mapStateToProps = state => ({
	wall: state.wall,
	open: state.createModal.open
});

const mapDispatchToProps = {
	fetchWallPosts: () => actionCreators.fetchWallPosts(),
	openCreateModal: () => actionCreators.openCreateModal()
};

Wall.propTypes = {
	wall: PropTypes.shape({
		posts: PropTypes.arrayOf(PropTypes.object).isRequired
	}).isRequired,
	open: PropTypes.bool.isRequired,
	fetchWallPosts: PropTypes.func.isRequired,
	openCreateModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
