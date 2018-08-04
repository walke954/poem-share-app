import React from 'react';
import PoemBlock from './inputs/PoemBlock.js';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';



export class PoemList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			page: 0,
			poem_items: []
		}
		this.getPoemList = this.getPoemList.bind(this);
		this.selectPoem = this.selectPoem.bind(this);
	}

	componentDidMount(){
		if(this.props.username){
			const query = {
				username: this.props.username,
				page: this.state.page
			}
			this.getPoemList(query);
		}
		else if(this.props.search){
			const query = {
				search: this.props.search,
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
		if(query.search){
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
		    .then(list => this.setState({poem_items: list.poems}))
		    .catch(err => {
		        console.error(err);
		    });
	}

	selectPoem(id){
		this.props.history.push(`/poem/${id}`);
	}

	render(){
		if(this.props.orientation === 'vertical'){

		}
		else{

		}
		const poem_blocks = this.state.poem_items.map((item, index) => 
			<div key={index} onClick={() => this.selectPoem(item.id)}>
				<PoemBlock item={item} />
			</div>
		);

		return (
			<div className="PoemList">
				{poem_blocks}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	poem: state.poem
});

export default connect(mapStateToProps)(PoemList);