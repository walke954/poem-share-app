import React from 'react';
import PoemBlock from './inputs/PoemBlock.js';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';

import './poemList.css';

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
			const query = {
				search: '',
				page: this.state.page
			}
			this.getPoemList(query);
		}
	}

	// calls to the API to get a list of poems for the component.
	getPoemList(query){
		let queryString = '';
		if(query.username){
			queryString = queryString.concat(`username=${query.username}&`);
		}
		if(query.likes){
			queryString = queryString.concat(`likes=${query.likes}&`);
		}
		if(query.search === ''){
			queryString = queryString.concat(`search=${query.search}&`);
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

		    	// records the last query and adds a page as well. Next time 'getPoemList()' is called, this will be used, adding another page to the list.
		    	let new_query;
		    	if(query.username){
		    		new_query = {
						username: this.props.username,
						page: this.state.page + 1
					}
				}
				else{
		    		new_query = {
						search: '',
						page: this.state.page + 1
					}
				}
				this.setState({query: new_query});

		    	if(list.poems.length !== 5){
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
			<div className="poemBlockWrapper" key={index}>
				<PoemBlock item={item} selectPoem={this.selectPoem} />
			</div>
		);

		// to be displayed if the list is empty
		let message = null;
		if(this.state.poem_items.length === 0){
			message = <p className="noItemMessage">No items listed</p>;
		}

		let button = null;
		if(this.state.end === false && this.state.poem_items.length !== 0){
			button = <button className="common-button" onClick={() => this.getPoemList(this.state.query)}>More</button>;
		}

		return (
			<div className="poemList">
				{poem_blocks}
				{message}
				{button}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
});

export default connect(mapStateToProps)(PoemList);