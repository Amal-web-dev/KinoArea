import axios from 'axios'
import { header } from "./modules/header.js";

let img  = import.meta.env.VITE_BASE_IMG
let moviesBlock = document.querySelector('.movies-block')

//  change icon color
setTimeout(() => {
    let cinemaLogo = document.querySelector('.cinema-logo')
cinemaLogo.onclick = () => {
    if (cinemaLogo.src.includes('cinema1.svg')) {
      cinemaLogo.src = './public/icon/cinema-icon.svg';
    } else {
      cinemaLogo.src = './public/icon/cinema1.svg';
    }
  };
}, 500);

//  change icon color

axios.get("https://api.themoviedb.org/3/movie/popular?language=ru-RU", {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
}).then(res => reloadMovie(res.data.results.slice(0, 12)))

//  создает обложки кино
function reloadMovie(arr) {
    for (const movie of arr) {
        let movieBlock = document.createElement('div')
        let bottomBlock = document.createElement('div')
        let rateBlock = document.createElement('div')
        let cardBlock = document.createElement('div')
        let cardMovie = document.createElement('div')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')

        movieBlock.classList.add('movie')
        bottomBlock.classList.add('bottom-description')
        rateBlock.classList.add('rated-block')
        cardBlock.classList.add('movie-card')
        cardMovie.classList.add('card-movie')

        if(movie.title.length > 25) {
            h3.innerHTML = movie.title.slice(0, 25) + ' . . . .'
        } else {
            h3.innerHTML = movie.title.slice(0, 25)
        }
        movieBlock.style.backgroundImage = 'url(' +  img + movie.poster_path + ')'
        rateBlock.innerHTML = movie.vote_average
        cardMovie.innerHTML = 'Карточка фильма'

        moviesBlock.append(movieBlock)
        movieBlock.append(bottomBlock, rateBlock, cardBlock)
        bottomBlock.append(h3, p)
        cardBlock.append(cardMovie)
    }
}

//  создает обложки кино

header()