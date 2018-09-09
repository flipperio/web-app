import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
		let localDate = moment(post.createdOn);

		if (localDate.isValid() === false) {
			localDate = 'Invalid Date';
		}
		else {
			localDate = localDate.format('MMM DD, YYYY');
		}

		return (
			<section className='post'>
				<header className='post__header'>
					<h3 className='post__title'>{post.title}</h3>
					<p className='post__date'>{localDate}</p>
				</header>
				<div className='post__body'>
					<p>{post.body}</p>
				</div>
				<div className='post__footer'>
					<button className='btn' onClick={this.likePost}>
						<i className='fa fa-star' />
						{post.likes + (this.state.postLiked * 1)}
					</button>
					{ errorMessage && <div className='alert-danger'><i>{errorMessage}</i></div> }
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
