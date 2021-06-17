import SearchBar from '../Components/SearchBar/SearchBar';

let accessToken;
const clientId = 'f4b64568e3894cc391a4dc00fa137d65';

//this uri doesn't exist anymore. will need to make a new one
const redirectURI = 'http://innocent-thrill.surge.sh'; 

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }

        // check for an access token
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // this clears the parameters, so you can grab the new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); 
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        
        const response = fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const jsonResponse = response.json();
        if (!jsonResponse.tracks) {
            return [];
        } else {
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist[0].name,
                album: track.album.name,
                URI: track.uri
            }));
        }
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`}
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})

            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
    
                })
            })
        })
    }
}

export default Spotify; 