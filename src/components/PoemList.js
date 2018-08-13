import React from 'react';
import PoemBlock from './inputs/PoemBlock.js';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';

export class PoemList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 0,
			poem_items: [],
			end: false,
			query: null
		}
		this.getPoemList = this.getPoemList.bind(this);
		this.selectPoem = this.selectPoem.bind(this);
	}

	componentDidMount(){
		if(this.props.likes && this.props.username){
			const query = {
				username: this.props.username,
				likes: true,
				page: this.state.page
			}
			this.getPoemList(query);
		}
		else if(this.props.username){
			const query = {
				username: this.props.username,
				page: this.state.page
			}
			this.getPoemList(query);
		}
		else{
			console.error('PoemList contains incorrect properties and cannot be loaded.')
		}
	}

	getPoemList(query){
		let queryString = '';
		if(query.username){
			queryString = queryString.concat(`username=${query.username}&`);
		}
		if(query.likes){
			queryString = queryString.concat(`likes=${query.likes}&`);
		}
		queryString = queryString.concat(`page=${query.page}`);

		return fetch(`${API_BASE_URL}/poem/list/?${queryString}`, {
	        method: 'GET',
	        mode: 'cors',
	        headers: {
	           'Content-Type': 'application/json'
	        }
	    })
		    .then( res => {
		    	if (!res.ok) {
                    return Promise.reject(res.statusText);
                }
                return res.json();
            })
		    .then(list => {
		    	this.setState({poem_items: this.state.poem_items.concat(list.poems)})

		    	const query = {
					username: this.props.username,
					page: this.state.page + 1
				}
				this.setState({query: query});

		    	if(list.poems.length !== 10){
		    		this.setState({end: true});
		    	}
		    })
		    .catch(err => {
		        console.error(err);
		    });
	}

	selectPoem(id){
		this.props.history.push(`/poem/${id}`);
	}

	render(){
		const poem_blocks = this.state.poem_items.map((item, index) => 
			<div key={index} onClick={() => this.selectPoem(item.id)}>
				<PoemBlock item={item} />
			</div>
		);

		let message = null;
		if(this.state.poem_items.length === 0){
			message = <p>No items listed</p>;
		}

		let button = null;
		if(this.state.end === false && this.state.poem_items.length !== 0){
			button = <button onClick={() => this.getPoemList(this.state.query)}>More</button>;
		}

		return (
			<div className="Search">
				{poem_blocks}
				{message}
				{button}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	poem: state.poem
});

export default connect(mapStateToProps)(PoemList);