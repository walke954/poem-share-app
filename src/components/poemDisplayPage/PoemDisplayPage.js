import React from 'react';
import {connect} from 'react-redux';
import PoemDisplay from './PoemDisplay.js';
import PoemEdit from './PoemEdit.js';
import PoemDisplayComments from './PoemDisplayComments.js';
import {getLikes} from '../../redux/actions/user.js';
import {getSelectPoem, deletePoem, likePoem} from '../../redux/actions/poem.js';
import RequireLogin from '../RequireLogin.js';

export class PoemDisplayPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			error: false,
			deleting: false,
			edit: false,
			liking: false
		}
		this.toggleEdit = this.toggleEdit.bind(this);
		this.deleteSelectedPoem = this.deleteSelectedPoem.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
	}

	componentDidMount(){
		new Promise((resolve, reject) => {
			const load = this.props.dispatch(getSelectPoem(this.props.match.params.poemId));
			resolve(load);
		})
			.then(() => {
				this.props.dispatch(getLikes());
			})
			.then(() => {
				this.setState({loading: false});
			})
			.catch(err => {
				console.error(err);
				this.setState({error: true});
			});
	}

	toggleEdit(){
		this.setState({edit: !this.state.edit});
	}

	toggleLike(toggle){
		new Promise((resolve, reject) => {
			const like = this.props.dispatch(likePoem(this.props.match.params.poemId, toggle));
			resolve(like);
		})
			.then(() => this.props.dispatch(getLikes()))
			.catch(err => {
				console.error(err);
			});
	}

	deleteSelectedPoem(){
		new Promise((resolve, reject) => {
			this.setState({deleting: true});
			const remove = this.props.dispatch(deletePoem(this.props.match.params.poemId));
			resolve(remove);
		})
			.then(res => {
				this.props.history.push('/home/');
			})
			.catch(err => {
				console.error(err);
			});
	}

	render(){
		if(this.state.deleting){
			return <div>Deleting poem...</div>;
		}

		if(this.state.error){
			return <div>Poem does not exist!!!</div>;
		}

		if(this.state.loading){
			return <div>Loading poem...</div>;
		}

		if(this.state.edit){
			return (
				<div>
					<PoemEdit toggleEdit={this.toggleEdit} title={this.props.poem.title} id={this.props.poem.id} content={this.props.poem.content} />
				</div>
			);
		}

		return (
			<div>
				<PoemDisplay 
					toggleEdit={this.toggleEdit} 
					deleteSelectedPoem={this.deleteSelectedPoem}
					toggleLike={this.toggleLike}
				/>
				<PoemDisplayComments />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	poem: state.poem,
	auth: state.auth
});

export default RequireLogin()(connect(mapStateToProps)(PoemDisplayPage));