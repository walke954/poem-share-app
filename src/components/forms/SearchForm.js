import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.props.getPoemList(this.state.value);
  }

   handleChange(event) {
    this.setState({value: event.target.value});

    // The setState() function passed by resetPage() is asynchronous, therefore the page needs to be reset using a promise before new values are submitted
    new Promise((resolve, reject) => {
      resolve(this.props.resetPage());
    })
      .then(() => {
        this.props.getPoemList(this.state.value);
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    // The setState() function passed by resetPage() is asynchronous, therefore the page needs to be reset using a promise before new values are submitted
    new Promise((resolve, reject) => {
      resolve(this.props.resetPage());
    })
      .then(() => {
        this.props.getPoemList(this.state.value);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Search</label>
        <input className="search-input" type="text" value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}