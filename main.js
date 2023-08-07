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
    createPopularPerson,
    openModal,
    closeModal,
    reloadSearch,
    reloadSearchPerson
} from "./modules/function.js";
import {
    axiosGet12,
    axiosGet1,
    axiosGet8Popular,
    axiosGetPopular,
    axiosGetPopularHuman
} from "./modules/ui.js";
import {
     getDetails 
    } 
    from "./modules/https.request.js";
let footerCont = document.querySelector('.footer-cont')

header()
footer(footerCont)

let img = import.meta.env.VITE_BASE_IMG
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
let searchBtn = document.querySelector('.search-btn')
let searchBlock = document.querySelector('.search-block')
let closeModalIcon = document.querySelectorAll('.close-modal-icon')
let btnSignIn = document.querySelector('.btn-sign-in')
let signInCont = document.querySelector('.sign-in-cont')
let searchPlace = document.querySelector('.all-movie-search')
let searchInp = document.querySelector('#search-inp')
let btnSearch = document.querySelector('.block-search-icon')
let posterBlockSearchPerson = document.querySelector('.all-person-search')
let cont = document.querySelector('.container')

let countFrom = 0
let val
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




searchInp.onkeyup = (e) => {
    val = searchInp.value.toLowerCase().trim()
    if (e.key === "Enter") {
        getData(searchPlace, val)
        getDataPerson(posterBlockSearchPerson, val)
    }
}


btnSearch.onclick = () => {
    getData(searchPlace, val)
    getDataPerson(posterBlockSearchPerson, val) 
}

function getData(place, name) {
    getDetails(`/search/movie?query=${name}`)
        .then(res => {
            reloadSearch(res.data.results, place)
        })
}

function getDataPerson(place, name) {
    getDetails(`/search/person?query=${name}`)
        .then(res => {
            reloadSearchPerson(res.data.results, place)
        })
}

getDataPerson(posterBlockSearchPerson, 'statham') 
getData(searchPlace, 'barbie')
//  create trailer
axiosGet1(createTrailerMovie, movieTrailerBlock)
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

axios.get("https://api.themoviedb.org/3/genre/movie/list?language=ru-RU", {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
}).then(res => {
    allGenre(res.data.genres, allGenreBlock)
}
)


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
    btnTop.style.bottom = "-80px"
}

window.onscroll = () => {
    let { top } = cont.getBoundingClientRect()

    if (Math.abs(top) > 500) {
        btnTop.style.bottom = "50px"

    } else {
        btnTop.style.bottom = "-80px"

    }
}

// all genre


function allGenre(arr, place) {
    for (const genre of arr) {
        let p = document.createElement('p')
        let hoveredBlock = document.createElement('div')

        hoveredBlock.classList.add('hovered-block')
        hoveredBlock.classList.add('genre-hover')

        p.classList.add('genre-p')
        p.innerHTML = genre.name
        p.id = genre.id

        hoveredBlock.append(p)
        place.append(hoveredBlock)


        hoveredBlock.onclick = () => {
            let allHovered = document.querySelectorAll('.hovered-block')
            allHovered.forEach(hover => {
                hover.classList.remove('click-block')
            })
            hoveredBlock.classList.add('click-block')
        }

    }
}

setTimeout(() => {
    let allGenreP = document.querySelectorAll('.genre-p')
    let hoveredBl = document.querySelectorAll('.genre-hover')



    hoveredBl.forEach(p => {
        p.onclick = () => {
            let pValue = p.firstChild.id
            axios.get("https://api.themoviedb.org/3/movie/popular?language=ru-RU&with_genres=" + pValue, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            }).then(res => {
                reloadMovie(res.data.results.slice(0, 8), moviesBlock)
            })
        }
    })
}, 500);




// search



searchBtn.onclick = () => {
    openModal(searchBlock)
}

btnSignIn.onclick = () => {
    openModal(signInCont)
}

closeModalIcon.forEach(close => {
    close.onclick = () => {
        closeModal(close.parentElement)
    }
})

let yearP = document.querySelectorAll('.year-p')


yearP.forEach(pYear => {
    pYear.onclick = () => {
        axios.get("https://api.themoviedb.org/3/movie/popular?language=ru-RU&year=" + pYear.innerHTML, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
            }
        }).then(res => {
            reloadMovie(res.data.results.slice(0, 4), popularMoviesBlock)
        })
    }
})