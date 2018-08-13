import React from 'react';
import PoemBlock from './inputs/PoemBlock.js';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';
import RequireLogin from './RequireLogin.js';
import SearchForm from './forms/SearchForm.js';

export class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 0,
			poem_items: [],
			keyword: '',
			end: false
		}
		this.getPoemList = this.getPoemList.bind(this);
		this.selectPoem = this.selectPoem.bind(this);
	}

	getPoemList(keyword){
		this.setState({keyword: keyword});

	    const queryString = `search=${keyword}&page=${this.state.page}`

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
		    	let copy = this.state.poem_items.slice();
		    	this.setState({poem_items: copy.concat(list.poems)});
		    	this.setState({page: this.state.page + 1});

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
			button = <button onClick={() => this.getPoemList(this.state.keyword)}>More</button>;
		}

		return (
			<div className="Search">
				<SearchForm getPoemList={this.getPoemList} />
				{poem_blocks}
				{message}
				{button}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
});

export default RequireLogin()(connect(mapStateToProps)(Search));