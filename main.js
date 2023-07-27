import axios, { formToJSON } from 'axios'
import { header } from "./modules/header.js";
import { reloadMovie, createTrailerMovie, allNewTrailer } from "./modules/function.js";
import { axiosGet12, axiosGet1, axiosGet12Popular, axiosGetPopular } from "./modules/ui.js";

header()

let img  = import.meta.env.VITE_BASE_IMG
let moviesBlock = document.querySelector('.movies-block')
let movieTrailerBlock = document.querySelector('.movie-trailer-block')
let allNewTrailerBlock = document.querySelector('.all-new-trailer')
let popularMoviesBlock = document.querySelector('.popular-movies-block')
let arrowLeft = document.querySelector('.arrow-left')
let arrowRight = document.querySelector('.arrow-right')
let fromNum = document.querySelector('.from-num') 
let toNum = document.querySelector('.to-num') 
let countFrom = 0
let countTo = 4 

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

//  создает обложки кино
axiosGet12Popular(reloadMovie, moviesBlock)
//  создает обложки кино


//  create trailer
axiosGet1(createTrailerMovie)
//  create trailer


// create all trailer 
axiosGet12(allNewTrailer)
// create all trailer 

// popular movie

// swiper
fromNum.innerHTML = countFrom
toNum.innerHTML = countTo
arrowLeft.onclick = () => {
    if(countFrom <= 0) {
        arrowLeft.style.filter = 'invert(50%)'
    } else {
        countFrom -= 4
        countTo -= 4
        fromNum.innerHTML = countFrom
        toNum.innerHTML = countTo
    axiosGetPopular(reloadMovie, popularMoviesBlock, countFrom, countTo)
    arrowLeft.style.filter = 'invert(100%)'
    arrowRight.style.filter = 'invert(100%)'
    }
}

arrowRight.onclick = () => {
    if(countTo >= 20) {
        arrowRight.style.filter = 'invert(50%)'
    } else {
        countFrom += 4
        countTo += 4
        fromNum.innerHTML = countFrom
        toNum.innerHTML = countTo
    axiosGetPopular(reloadMovie, popularMoviesBlock, countFrom, countTo)
    arrowRight.style.filter = 'invert(100%)'
    arrowLeft.style.filter = 'invert(100%)'
    }
   
}
// swiper
axiosGetPopular(reloadMovie, popularMoviesBlock, 0, 4)
// popular movie
