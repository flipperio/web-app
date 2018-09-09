/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators } from './store/ducks';
import config from './config/index.js';
import api from './utils/api.js';
import Modal from './Modal.jsx';

class CreatePostModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			titleError: '',
			bodyError: '',
			apiError: '',
			loading: false,
			success: false
		};

		this.onClose = this.onClose.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onClose() {
		this.props.closeCreateModal();
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	onSubmit(event) {
		event.preventDefault();
		const validTitle = this.validateTitle(this.state.title);
		const validBody = this.validateBody(this.state.body);

		if(validTitle === false || validBody === false) {
			return;
		}

		this.setState({ loading: true, apiError: '' });
		api.createPost({ title: this.state.title, body: this.state.body })
		.then(
			() => {
				if(this.mounted === false) {
					return;
				}

				this.props.fetchWallPosts();
				this.setState({ success: true, loading: false });
			},
			() => {
				if(this.mounted === false) {
					return;
				}

				this.setState({ apiError: 'Something went wrong. Try again later', loading: false });
			}
		)
	}

	onChange(event) {
		const value = event.target.value;

		if(event.target.name === 'title') {
			this.validateTitle(value);
			this.setState({ title: value });
		}
		else if(event.target.name === 'body') {
			this.validateBody(value);
			this.setState({ body: value })
		}
	}

	validateTitle(value) {
		const limits = config.postInput.title;
		if(value.length < limits.min) {
			this.setState({ titleError: `Title must be at least ${limits.min} characters long` });
			return false;
		}
		else if(value.length > limits.max) {
			this.setState({ titleError: `Title must be less than ${limits.max} characters long` });
			return false;
		}

		this.setState({ titleError: '' });
		return true;
	}

	validateBody(value) {
		const limits = config.postInput.body;
		if(value.length < limits.min) {
			this.setState({ bodyError: `Body must be at least ${limits.min} characters long` });
			return false;
		}
		else if(value.length > limits.max) {
			this.setState({ bodyError: `Body must be less than ${limits.max} characters long` });
			return false;
		}

		this.setState({ bodyError: '' });
		return true;
	}

	render() {
		const { title, body, titleError, bodyError, apiError, success, loading } = this.state;
		const disabled = loading;
		let toRender;
		let submitButtonCss;

		if(loading === true) {
			submitButtonCss = 'fa fa-spin fa-spinner';
		}
		else {
			submitButtonCss = 'fa fa-bullhorn';
		}

		if(success === true) {
			toRender = (
				<div className='create-modal text-center'>
					<button className='btn btn-icon-no-margin btn-primary-inverted create-modal__exit-btn' onClick={this.onClose}>
						<i className='fa fa-window-close' />
					</button>
					<h2>
						Success
						<br/>
						Your post has been made
					</h2>
					<button className='btn btn-larger btn-primary' onClick={this.onClose}>
						<i className='fa fa-arrow-left' />
						Return
					</button>
				</div>
			);
		}
		else {
			toRender = (
				<div className='create-modal'>
					<button className='btn btn-icon-no-margin btn-primary-inverted create-modal__exit-btn' onClick={this.onClose}>
						<i className='fa fa-window-close' />
					</button>

					<form className='create-modal__form' onSubmit={this.onSubmit}>
						<div className='create-modal__form__field'>
							<label htmlFor='create_post_title'>Title</label>
							{ titleError && <sub className='create-modal__form__field__error'>{titleError}</sub> }
							<input id='create_post_title' type='text' name='title' value={title} onChange={this.onChange} disabled={disabled} />
						</div>

						<div className='create-modal__form__field create-modal__form__field--textarea'>
							<label htmlFor='create_post_body'>Body</label>
							{ bodyError && <sub className='create-modal__form__field__error'>{bodyError}</sub> }
							<textarea id='create_post_body'  name='body' value={body} onChange={this.onChange} disabled={disabled} />
						</div>

						{ apiError && <sub className='create-modal__form__field__error'>{apiError}</sub> }
						<button type='submit' className='btn btn-larger btn-primary create-modal__submit-btn' disabled={disabled}>
							<i className={submitButtonCss} />
							Post It
						</button>
					</form>
				</div>
			);
		}

		return (
			<Modal onBackgroundClick={this.onClose}>
				{toRender}
			</Modal>
		);

	}
}

const mapDispatchToProps = {
	closeCreateModal: () => actionCreators.closeCreateModal(),
	fetchWallPosts: () => actionCreators.fetchWallPosts()
};

CreatePostModal.propTypes = {
	closeCreateModal: PropTypes.func.isRequired,
	fetchWallPosts: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(CreatePostModal);
