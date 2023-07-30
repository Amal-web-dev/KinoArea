import axios from "axios";
import { header } from "../../modules/header";
import { aboutMovieFunc } from "../../modules/function.js";
import { Chart, registerables } from "chart.js";
import { getDetails } from "../../modules/https.request.js";

Chart.register(...registerables)

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
    body.style.backgroundImage = 'url(' +  img + res.data.backdrop_path + ')'
    console.log(res.data);
    aboutMovieFunc(res.data, aboutMovieCont)
})

btnTop.onclick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
}


// new Chart(kinoarea_ctx, {
//   type: 'doughnut',
//   data: {
//       labels: ['Blue', 'Green',],
//       datasets: [{
//           data: [firstNum, 100 - firstNum],
//           backgroundColor: ['#4acb36', '#4bcb364d'],
//           borderWidth: 0
//       }]
//   },
//   options: {
//       plugins: {
//           legend: {
//               display: false, // Убрать надписи сбоку (легенда)
//           }
//       }
//   }
// });




getDetails(`/movie/${movie_id}`)
.then(res => {

const imdb_ctx = document.getElementById('IMDbChart').getContext('2d');

  new Chart(imdb_ctx, {
    type: 'doughnut',
    data: {
        labels: ['Blue', 'Green',],
        datasets: [{
            data: [res.data.vote_average * 10, 100 - res.data.vote_average * 10],
            backgroundColor: ['#88cb36', '#88cb3653'],
            borderWidth: 0
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false, // Убрать надписи сбоку (легенда)
            }
        }
    }
  });
})

