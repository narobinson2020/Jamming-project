import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                {/* this is supposed to pass the list of tracks that come from the SearchResults component */}
                <TrackList tracks={this.props.SearchResults} 
                onAdd={this.props.onAdd}
                isRemoval={false}/>
            </div>
        )
    }
}

export default SearchResults;