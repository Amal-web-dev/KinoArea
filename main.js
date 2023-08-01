import axios, {
    formToJSON
} from 'axios'
import {
    header,
    footer
} from "./modules/header.js";
import {
    otherPerson,
    reloadMovie,
    createTrailerMovie,
    allNewTrailer,
    allNewsInfFunc,
    createAllNews,
    createPopularPerson
} from "./modules/function.js";
import {
    axiosGet12,
    axiosGet1,
    axiosGet8Popular,
    axiosGetPopular,
    axiosGetPopularHuman
} from "./modules/ui.js";
let footerCont = document.querySelector('.footer-cont')

header()
footer(footerCont)

let img =
    import.meta.env.VITE_BASE_IMG
let moviesBlock = document.querySelector('.movies-block')
let movieTrailerBlock = document.querySelector('.movie-trailer-block')
let allNewTrailerBlock = document.querySelector('.all-new-trailer')
let popularMoviesBlock = document.querySelector('.popular-movies-block')
let lastNewsBlock = document.querySelector('.last-news-block')
let arrowLeft = document.querySelector('.arrow-left')
let arrowRight = document.querySelector('.arrow-right')
let allLastNewsBlock = document.querySelector('.all-last-news-block')
let fromNum = document.querySelector('.from-num')
let toNum = document.querySelector('.to-num')
let popularPeopleBlock = document.querySelector('.popular-people-block')
let otherPopularHuman = document.querySelector('.other-popular-human')
let btnTop = document.querySelector('.btn-top')
let allPopularBtn = document.querySelector('.all-popular')
let allGenreBlock = document.querySelector('.all-genre')

let allGenreContent = ['Все', 'Боевик', 'Приключения', 'Комедия', 'Фантастика', 'Ужасы', 'Драма', 'Мелодрама']
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
let hiddenFalse = false

//  создает обложки кино
allPopularBtn.onclick = () => {
    if (!hiddenFalse) {
        axiosGet8Popular(reloadMovie, moviesBlock, 0, 20)
        allPopularBtn.innerHTML = 'Скрыть все'
        hiddenFalse = true
        window.scrollTo({
            top: 2000,
            behavior: 'smooth'
        });
    } else if (hiddenFalse) {
        axiosGet8Popular(reloadMovie, moviesBlock, 0, 8)
        allPopularBtn.innerHTML = 'Bсе новинки'
        hiddenFalse = false
        window.scrollTo({
            top: 200,
            behavior: 'smooth'
        });
    }
}
axiosGet8Popular(reloadMovie, moviesBlock, 0, 8)
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
    if (countFrom <= 0) {
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
    if (countTo >= 20) {
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

// selected news
axiosGetPopular(allNewsInfFunc, lastNewsBlock, 1, 2)
// selected news

// ALL NEWS
axiosGetPopular(createAllNews, allLastNewsBlock, 0, 4)
// ALL NEWS

axiosGetPopularHuman(createPopularPerson, popularPeopleBlock, 0, 2)


axiosGetPopularHuman(otherPerson, otherPopularHuman, 2, 20)

btnTop.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// all genre


function allGenre(arr, place) {
    for (const genre of arr) {
        let p = document.createElement('p')
        let hoveredBlock = document.createElement('div')

        hoveredBlock.classList.add('hovered-block')

        p.innerHTML = genre


        hoveredBlock.append(p)
        place.append(hoveredBlock)


        hoveredBlock.onclick = () => {
            let allHovered = document.querySelectorAll('.hovered-block')
            allHovered.forEach(hover => {
                hover.classList.remove('click-block')
            })
            hoveredBlock.classList.add('click-block')

            // axios.get("https://api.themoviedb.org/3/movie/popular?language=ru-RU&with_genres=", {
            //     headers: {
            //         Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            //     }
            // }).then(res =>  {
            //     let results = res.data.results
            //     // if(p.innerHTML.trim().toLowerCase() == 'все') {
            //     // axiosGet8Popular(reloadMovie, moviesBlock, 0, 8)
            //     // } 
            //     results.forEach(re => {
            //         if(re.genre_ids[0] == 2 || re.genre_ids[1] == 12 || re.genre_ids[2] == 28) {
            //             console.log('efef');
            //         }
            //        console.log(re.genre_ids);
            //     })
            // })
        }

    }
}

allGenre(allGenreContent, allGenreBlock)