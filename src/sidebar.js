import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SideBar extends Component {
  state = {
     query: '',
   }

  // checks the state for changes
  updateQuery = (query) => {
      this.setState({ query: query.trim() })
  }

  clearQuery = () => {
      this.setState({ query: '' })
  }

  render() {
    // checks the placesLocated Array to return search bar results
    let placesLocated = []

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      placesLocated = this.props.places.filter((place) => match.test(place.name))
    } else {
      placesLocated = this.props.places
    }

    placesLocated.sort(sortBy('name'))

    return (
      <div className='side-menu' aria-label='menu' tabIndex='0'>
        <ul className='places-list'>
          <li className='search-places'>
            <input
              className='search-places-box'
              type='text'
              placeholder='Search'
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              aria-label='Search Box'
            />
          </li>
        {placesLocated.length !== this.props.places.length && (
          <div className='showing-places'>
            <span>Now showing {placesLocated.length} of {this.props.places.length} total.</span>
            <div><button onClick={this.clearQuery}>Show All</button></div>
          </div>
        )}
        {placesLocated.map(place => (
          <li className='places-list-item' key={place.id}>
            <Link to={`/info/${place.alias}`}>
              <button
                className='places-list-button'
                tabIndex='0'
                id={place.name}
              >{place.name}</button>
            </Link>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default SideBar;
