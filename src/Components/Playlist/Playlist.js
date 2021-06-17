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
        this.setState({onNameChange: event.target.value});
        console.log(this.state);
    }

    render() {
        return(
            <div className="Playlist">
                <input defaultValue= {"New Playlist"}
                onNameChange= {this.handleNameChange}/>
                <TrackList onRemove= {this.props.onRemove}
                isRemoval= {true}/>
                <button className="Playlist-save" onClick= {this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;