import React from 'react';
import {connect} from 'react-redux';
import PoemDisplay from './PoemDisplay.js';
import PoemDisplayComments from './PoemDisplayComments.js';
import {getSelectPoem} from '../../redux/actions/poem.js';

export class PoemDisplayPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true
		}
	}

	componentDidMount(){
		new Promise((resolve, reject) => {
			const load = this.props.dispatch(getSelectPoem(this.props.match.params.poemId));
			resolve(load);
		})
			.then(() => {
				this.setState({loading: false});
			})
			.catch(err => {
				console.log(err);
			});
	}

	render(){
		if(this.state.loading){
			return <div></div>;
		}

		return (
			<div>
				<PoemDisplay />
				<PoemDisplayComments />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	poem: state.poem,
	auth: state.auth
});

export default connect(mapStateToProps)(PoemDisplayPage);