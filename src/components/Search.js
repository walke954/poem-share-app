import React from 'react';
import PoemBlock from './inputs/PoemBlock.js';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';
import RequireLogin from './RequireLogin.js';
import SearchForm from './forms/SearchForm.js';

import Loading from './Loading.js';

import './search.css';

export class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 0,
			poem_items: [],
			keyword: '',
			end: false,
			loading: true
		}
		this.getPoemList = this.getPoemList.bind(this);
		this.selectPoem = this.selectPoem.bind(this);
		this.resetPage = this.resetPage.bind(this);
	}

	componentDidMount(){
		this.getPoemList('');
	}

	resetPage(){
		this.setState({
			page: 0,
			poem_items: [],
			keyword: '',
			end: false
		});
	}

	getPoemList(keyword){
		this.setState({keyword: keyword});

	    const queryString = `search=${keyword}&page=${this.state.page}`;

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

		    	if(list.poems.length !== 5){
		    		this.setState({end: true});
		    	}

		    	this.setState({loading: false});
		    })
		    .catch(err => {
		        console.error(err);
		    });
	}

	selectPoem(id){
		this.props.history.push(`/poem/${id}`);
	}

	render(){
		if(this.state.loading){
			return <Loading />;
		}

		const poem_blocks = this.state.poem_items.map((item, index) => 
			<div className="poemBlockWrapper" key={index}>
				<PoemBlock selectPoem={this.selectPoem} item={item} />
			</div>
		);

		let message = null;
		if(this.state.poem_items.length === 0){
			message = <p>No items listed</p>;
		}

		let button = null;
		if(this.state.end === false && this.state.poem_items.length !== 0){
			button = <button className="common-button" onClick={() => this.getPoemList(this.state.keyword)}>More</button>;
		}

		return (
			<div className="search">
				<SearchForm getPoemList={this.getPoemList} resetPage={this.resetPage} />
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