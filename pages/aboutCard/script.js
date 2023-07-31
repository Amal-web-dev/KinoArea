import axios from "axios";
import { header } from "../../modules/header";
import { aboutMovieFunc } from "../../modules/function.js";
import { Chart, registerables } from "chart.js";
import { getDetails } from "../../modules/https.request.js";

Chart.register(...registerables)

let movieCard = document.querySelector('.movie-card')
let body = document.querySelector('body')
let img  = import.meta.env.VITE_BASE_IMG
let aboutMovieCont  = document.querySelector('.about-cont')
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

let allInfBlock =  document.querySelector('.left-actors-block')

axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`, {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    Accept: 'application/json'
  }
}).then(res => {
  let arr = res.data
  console.log(arr);
  let allGenres = []

  getDetails(`/movie/${arr.id}?language=ru-RU`)
        .then(reses => {
            const { data: { genres } } = reses
            for (let gen of genres) {
              allGenres = gen
            }
            console.log(allGenres);
            allInfBlock.innerHTML += `
        <div class="left">
                  <table>
                    <tbody>
                      <tr>
                          <td>Год:</td>
                          <td class="color-column">${arr.release_date.split("-").at(0)}</td>
                      </tr>
                      <tr>
                          <td>Страна:</td>
                          <td class="color-column">${arr.production_countries[0].name}</td>
                      </tr>
                      <tr>
                          <td>Слоган:</td>
                          <td class="color-column">${arr.tagline}</td>
                      </tr>
                      <tr>
                          <td>Режиссер:</td>
                          <td class="color-column">Фрэнсис Аннан</td>
                      </tr>
                      <tr>
                          <td>Сценарий:  </td>
                          <td class="color-column">Фрэнсис Аннан, Л.Х. Адамс, Кэрол Гриффитс, ...</td>
                      </tr>
                      <tr>
                          <td>Продюсер:</td>
                          <td class="color-column">Дэвид Баррон, Марк Блэйни, Гари Хэмилтон, ...</td>
                      </tr>
                      <tr>
                          <td>Оператор:</td>
                          <td class="color-column">Джеффри Холл</td>
                      </tr>
                      <tr>
                          <td>Композитор:</td>
                          <td class="color-column">Дэвид Хиршфелдер</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
      
                <div class="right">
                  <table>
                    <tbody>
                      <tr>
                        <td>Художник: </td>
                        <td class="color-column">Скотт Бёрд, Эрика Брайан, Мариот Керр, ... </td>
                      </tr>
                      <tr>
                        <td>Монтаж: </td>
                        <td class="color-column">Ник Фентон </td>
                      </tr>
                      <tr>
                        <td> Жанр: </td>
                        <td class="color-column">${allGenres.name}</td>
                      </tr>
                      <tr>
                        <td>Сборы в мире: </td>
                        <td class="color-column">${arr.budget + ' ' + '$'}</td>
                      </tr>
                      <tr>
                        <td>Премьера (мир): </td>
                        <td class="color-column">${arr.release_date}</td>
                      </tr>
                      <tr>
                        <td>Премьера (РФ): </td>
                        <td class="color-column">${arr.release_date}</td>
                      </tr>
                      <tr>
                        <td>Возраст:</td>
                        <td class="color-column">16+ </td>
                      </tr>
                      <tr>
                        <td>Время: </td>
                        <td class="color-column">${arr.runtime} Мин.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
        `
        })
        
})