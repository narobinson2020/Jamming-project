import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return(
            <div className="TrackList">
                { 
                // this is supposed to render the tracks from the search results component. 
                // I'm passing the search results from the SearchResults component
                // this.props.tracks is an array with 3 objects and each with 4 properties but I can't find the array
                    this.props.tracks.map(track => {
                        return <Track track={track} 
                        key={track.id} 
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}/>
                    })
                }
            </div>
        )
    }
}

export default TrackList;