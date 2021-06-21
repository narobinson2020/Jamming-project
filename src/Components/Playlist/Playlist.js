import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange= this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        // this.props.onNameChange(event.target.value);
        // double check this event handler for onNameChange
        this.setState({onNameChange: event.target.value});
        console.log(this.state);
    }

    render() {
        return(
            <div className="Playlist">
                <input defaultValue= {"New Playlist"}
                // the onNameChange attribute also showed an error in the console because it can't read the handleNameChange event handler
                onChange= {this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} //you were missing this attribute and value the whole time >:(
                onRemove= {this.props.onRemove}
                isRemoval= {true}/>
                <button className="Playlist-save" onClick= {this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;