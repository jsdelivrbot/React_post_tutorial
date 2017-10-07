import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createPost } from '../actions/index'
import { Link } from 'react-router'

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	}
	onSubmit(props) {
		this.props.createPost(props).then( () => {
					this.context.router.push('/')
				})
	}
	render() {
		const { fields: { title, categories, content }, handleSubmit } = this.props
		console.log(title)
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create New Posts</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type='text' className='form-control' {...title} />
					<div className='text-help'>
						{title.touched ? title.error : ''}
					</div>
				</div>
				<div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type='text' className='form-control' {...categories} />
					<div className='text-help'>
						{categories.touched ? categories.error : ''}
					</div>
				</div>
				<div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<textarea className='form-control' {...content} />
					<div className='text-help'>
						{content.touched ? content.error : ''}
					</div>
				</div>
				<button className='btn btn-primary' type='submit'>Submit</button>
				<Link className='btn btn-danger' to='/'>Cencel</Link>
			</form>
		)
	}
}

function validate(values) {
	const errors = {}

	if (!values.title) {
		errors.title = "Enter Title"
	}

	if (!values.categories) {
		errors.categories = "Enter Categories"
	}

	if (!values.content) {
		errors.content = "Enter Content"
	}

	return errors
}

export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'],
	validate
}, null, { createPost })(PostsNew)