import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
            }
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count',
            'Distance': 'distance'
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        }
    }

    handleSortByChange(sortByOption) {
        if (this.state.term === '' || this.state.location === '') {
            this.setState({sortBy: sortByOption});
        } else {
            this.setState({sortBy: sortByOption}, () => {
                this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            });
        }
    }

    handleTermChange(event) {
        this.setState({term: event.target.value});
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value});
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        event.preventDefault()
    }

    handleEnter(event) {
        if (window.event.keyCode == 13) {
            return this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            event.preventDefault()
        } 
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li 
                className={this.getSortByClass(sortByOptionValue)} 
                key={sortByOptionValue}
                onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                >{sortByOption}</li>
        });  
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input 
                        placeholder="Search Businesses" 
                        onChange={this.handleTermChange}/>
                    <input 
                        placeholder="Where?" 
                        onChange={this.handleLocationChange}
                        onKeyPress={this.handleEnter}/>
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}
                       onKeyPress={this.handleEnter}>Let's Go</a>
                </div>
            </div>
        );
    }
}

export default SearchBar;