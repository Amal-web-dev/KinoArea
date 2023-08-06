import axios from "axios";
import { header, footer } from "../../modules/header";
import { aboutMovieFunc, reloadProduction, reloadStarActors, createTrailerMovie, reloadMovie } from "../../modules/function.js";
import { Chart, registerables } from "chart.js";
import { getDetails } from "../../modules/https.request.js";
import { axiosGet1 } from "../../modules/ui";

Chart.register(...registerables)

let movieCard = document.querySelector('.movie-card')
let body = document.querySelector('body')
let img  = import.meta.env.VITE_BASE_IMG
let aboutMovieCont  = document.querySelector('.about-cont')
let btnTop = document.querySelector('.btn-top')
let footerCont = document.querySelector('.footer-cont')

header()
footer(footerCont)

let movie_id = location.search.split("=").at(-1)
let trailer_movie = document.querySelector('.trailer_movie-movie')
let iframe = document.querySelector('iframe')




let productionCont = document.querySelector('.production-cont')
let starActorCont = document.querySelector('.all-actor-block')
let personnelBlock = document.querySelector('.personnel-block')


getDetails(`/movie/${movie_id}/credits`)
    .then(res => {
      reloadStarActors(res.data.cast.slice(0, 10), starActorCont)
      reloadProduction(res.data.crew.slice(0, 2), productionCont)
    })

btnTop.onclick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

getDetails(`/movie/${movie_id}/videos`)
    .then(res => {
      let video = res.data.results[0].key
        iframe.src = `https://www.youtube.com/embed/${video}`
    })

    let poster_block = document.querySelector('.poster_block')

    getDetails(`/movie/${movie_id}/images`)
    .then(res => {
        for (let item of res.data.posters.slice(0, 4)) {
          poster_block.innerHTML += `
                <img src="${img + item.file_path}" alt="" />
            `
        }

        personnelBlock.innerHTML = ""

        for (let item of res.data.backdrops.slice(10, 16)) {
            let stills_item = document.createElement("div")
            stills_item.classList.add('stills_item')
            stills_item.style.backgroundImage = `url(${img + item.file_path})`
            personnelBlock.append(stills_item)
        }
      })


      let similarBlock = document.querySelector('.similar-block')
    
      getDetails(`/movie/${movie_id}/similar?language=ru-RU`)
      .then(res => {
              reloadMovie(res.data.results.slice(0, 4), similarBlock);
      });

getDetails(`/movie/${movie_id}`)
.then(res => {
  let { data: { genres} } = res


  createTrailerMovie([res.data], trailer_movie)
  body.style.backgroundImage = 'url(' +  img + res.data.backdrop_path + ')'
  aboutMovieFunc(res.data, aboutMovieCont)

const imdb_ctx = document.getElementById('IMDbChart').getContext('2d');

new Chart(imdb_ctx, {
  type: 'doughnut',
  data: {
      labels: ['IMDb', 'IMDb',],
      datasets: [{
          data: [res.data.vote_average * 10, 100 - res.data.vote_average * 10],
          backgroundColor: [getColorByNumber(res.data.vote_average), getColorByNumber(res.data.vote_average) + '70'],
          cutout: '70%',
          borderWidth: 0
      }]
  },
  options: {
      plugins: {
          legend: {
              display: false,
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
  let allGenres = []

  getDetails(`/movie/${arr.id}?language=ru-RU`)
        .then(reses => {
            const { data: { genres } } = reses
            for (let gen of genres) {
              allGenres = gen
            }
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
                        <td>Жанр:</td>
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

function getColorByNumber(number) {
  const colors = {
      10: "#28FF04",
      9: "#34EA16",
      8: "#4BCB36",
      7: "#78CB36",
      6: "#89CB36",
      5: "#CB6C36",
      4: "#CB3F36",
      3: "#DA3434",
      2: "#F13030",
      1: "#ff0000",
      0: "#ff0000"
  };

  return colors[number.toFixed(0)] || "Недопустимая цифра";
}