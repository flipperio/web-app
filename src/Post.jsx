import React from 'react';
import PropTypes from 'prop-types';
import api from './utils/api.js';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.mounted = false;
		this.state = {
			postLiked: false,
			errorMessage: ''
		};

		this.likePost = this.likePost.bind(this);
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	likePost() {
		if (this.state.postLiked === true) {
			this.setState({ errorMessage: 'You can only like a post once' });
			return;
		}

		api.likePost(this.props.post._id).then(
			() => {
				if (this.mounted === false) {
					return;
				}
				this.setState({
					postLiked: true
				});
			},
			() => {
				if (this.mounted === false) {
					return;
				}
				this.setState({
					errorMessage: 'Something went wrong. Try again later'
				});
			}
		);
	}


	render() {
		const post = this.props.post;
		const errorMessage = this.state.errorMessage;

		return (
			<section className='post'>
				<header className='post__header'>
					<h6>{post.title}</h6>
					<p>{post.createdOn}</p>
				</header>
				<div className='post__body'>
					<p>{post.body}</p>
				</div>
				<div className='post__footer'>
					<button onClick={this.likePost}>{post.likes}</button>
					<p className='error'>{errorMessage}</p>
				</div>
			</section>
		);
	}
}

Post.propTypes = {
	post: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		createdOn: PropTypes.string.isRequired
	}).isRequired
};

export default Post;
