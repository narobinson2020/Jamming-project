import React from 'react'; 
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.searchTerm);
    }

    handleSearchTermChange(event) {
        this.props.handleSearchTermChange(event.target.value);
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleSearchTermChange}/>
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;