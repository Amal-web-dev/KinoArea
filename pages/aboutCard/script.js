import axios from "axios";
import { header } from "../../modules/header";
import { aboutMovieFunc } from "../../modules/function.js";

let movieCard = document.querySelector('.movie-card')
let body = document.querySelector('body')
let img  = import.meta.env.VITE_BASE_IMG
let aboutMovieCont  = document.querySelector('.about-movie-cont')
let btnTop = document.querySelector('.btn-top')

header()

let movie_id = location.search.split("=").at(-1)

axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?language=ru-RU`, {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    Accept: 'application/json'
  }
}).then(res => {
    body.style.backgroundImage = 'url(' +  img + res.data.poster_path + ')'
    console.log(res.data);
    aboutMovieFunc(res.data, aboutMovieCont)
})

btnTop.onclick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
}