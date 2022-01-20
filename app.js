const searchSongs = ()=>{
    const searchText = document.getElementById('search-btn').value;
    // console.log(searchText);
    const url =`https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
    .then(res =>res.json())
    .then(data => displaySong(data.data))
    .catch(error => displayError('Lyric Not Found'));
};
                    //**** Async System  */ 
// const searchSongs = async()=>{
//     const searchText = document.getElementById('search-btn').value;
//     // console.log(searchText);
//     const url =`https://api.lyrics.ovh/suggest/${searchText}`;
//     const res = await fetch(url)
//     const data = await res.json();
//     displaySong(data.data);
// }


const displaySong = songs=>{
    // console.log(songs);
    const songList = document.getElementById('song-container');
    songList.innerHTML= '';
    songs.forEach(song => {
        // console.log(song)
        const songDiv = document.createElement('div');
        songDiv.className='single-result row align-items-center my-3 p-3'
        songDiv.innerHTML=`
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.artist.name}</h3>
            <p class="author lead"> <span>${song.title}</span></p>
            <audio controls> <source src="${song.preview}" type="audio/mpeg"> </audio>
        </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        
        `;
        songList.appendChild(songDiv);
        // console.log(songDiv)
    });
};

const getLyric = (artist, title)=>{
    console.log(artist, title)
    const url =`https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res=>res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError(error));

};

const displayError = error =>{
    const errorMessage = document.getElementById('error-text');
    errorMessage.innerText=error;
}

const displayLyrics = lyric =>{
    const lyricDiv = document.getElementById('song-lyric');
    lyricDiv.innerText = lyric;
}