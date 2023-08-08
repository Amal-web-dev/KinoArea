let img =
    import.meta.env.VITE_BASE_IMG
let moviesBlock = document.querySelector('.movies-block')
let movieTrailerBlock = document.querySelector('.movie-trailer-block')
let allNewTrailerBlock = document.querySelector('.all-new-trailer')
let backModal = document.querySelector('.back-modal')
import { getDetails } from "./https.request";

export function reloadMovie(arr, place) {
    place.innerHTML = ''

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

        if (movie.title.length > 25) {
            h3.innerHTML = movie.title.slice(0, 25) + ' . . . .'
        } else {
            h3.innerHTML = movie.title.slice(0, 25)
        }
        movieBlock.style.backgroundImage = 'url(' + img + movie.poster_path + ')'
        rateBlock.innerHTML = movie.vote_average.toFixed(1)
        cardMovie.innerHTML = 'Карточка фильма'
        getDetails(`/movie/${movie.id}?language=ru-RU`)
            .then(res => {
                const {
                    data: {
                        genres
                    }
                } = res
                for (let gen of genres) {
                    p.innerHTML = gen.name
                }
            })

        place.append(movieBlock)
        movieBlock.append(bottomBlock, rateBlock, cardBlock)
        bottomBlock.append(h3, p)
        cardBlock.append(cardMovie)

        cardBlock.onclick = () => {
            location.assign('/pages/aboutCard/?id=' + movie.id)
        }
    }
}

let counterLike = 0
let counterDisLike = 0
// create trailer
export function createTrailerMovie(arr, place) {
    
    let isLiked = false; 
    let isDisLiked = false; 


    for (const trailer of arr) {
        let movieTrailer = document.createElement('div')
        let commentBlock = document.createElement('div')
        let commentLeft = document.createElement('div')
        let commentRight = document.createElement('div')
        let commentH1 = document.createElement('h1')
        let commentImg = document.createElement('img')
        let btnLikeBlock = document.createElement('div')
        let btnLike = document.createElement('button')
        let btnlikeP = document.createElement('p')
        let btnDisLikeBlock = document.createElement('div')
        let btnDisLike = document.createElement('button')
        let btnDisLikeP = document.createElement('p')
        let likeIcon = document.createElement('img')
        let disLikeIcon = document.createElement('img')

        movieTrailer.classList.add('movie-trailer')
        commentBlock.classList.add('comment-block')
        commentLeft.classList.add('comment-left')
        commentRight.classList.add('comment-right')
        btnLikeBlock.classList.add('btn-like-block')
        btnDisLikeBlock.classList.add('btn-disLike-block')
        btnLike.classList.add('btn-like')
        btnDisLike.classList.add('btn-disLike')
    
        likeIcon.src = '/public/icon/Like.svg'
        disLikeIcon.src = '/public/icon/disLike.svg'
        commentImg.src = '/public/icon/network-icon.svg' 
        counterLike = Math.floor(trailer.vote_count)
        counterDisLike = Math.floor(trailer.vote_count / 3)
        btnDisLikeP.innerHTML = counterDisLike
        btnlikeP.innerHTML = counterLike
        commentH1.innerHTML = trailer.title
        

        place.append(movieTrailer)
        movieTrailer.append(commentBlock)
        commentBlock.append(commentLeft, commentRight)
        commentLeft.append(commentH1, commentImg)
        commentRight.append(btnLikeBlock, btnDisLikeBlock)
        btnLikeBlock.append(btnLike, btnlikeP)
        btnDisLikeBlock.append(btnDisLike, btnDisLikeP)
        btnDisLike.append(disLikeIcon)
        btnLike.append(likeIcon)

        btnLike.onclick = () => {
              if (isLiked) {
                likeIcon.src = '/public/icon/Like.svg';
                    counterLike--;
                btnlikeP.innerHTML = counterLike;
                isLiked = false;
              } else {
                likeIcon.src = '/public/icon/Like-full.svg';
                disLikeIcon.src = '/public/icon/disLike.svg';
                if(isDisLiked) {
                   counterDisLike--;
                }
                btnDisLikeP.innerHTML = counterDisLike;
                isDisLiked = false;
                counterLike++;
                btnlikeP.innerHTML = counterLike;
                isLiked = true;
            }
        };

          
          btnDisLike.onclick = () => {
              if (isDisLiked) {
                disLikeIcon.src = '/public/icon/disLike.svg';
                    counterDisLike--;
                btnDisLikeP.innerHTML = counterDisLike;
                isDisLiked = false;
              } else {
                disLikeIcon.src = '/public/icon/disLike-full.svg';
                counterDisLike++;
                btnDisLikeP.innerHTML = counterDisLike;
                isDisLiked = true;
                likeIcon.src = '/public/icon/Like.svg';
                if(isLiked) {
                   counterLike--;
                }
                btnlikeP.innerHTML = counterLike;
                isLiked = false;
            }
        };
    }



}

//  create trailer

// create all trailer 
let trailerMovieIframe = document.querySelector(".trailers_player")

export function allNewTrailer(arr) {
    for (const trailer of arr) {

        let trailerMovie = document.createElement('div')
        let moviePath = document.createElement('div')
        let moviePathTitle = document.createElement('div')
        let moviePathTitleH2 = document.createElement('h2')
        let stopVideoBlock = document.createElement('div')
        let stopVideoIcon = document.createElement('img')

        trailerMovie.classList.add('trailer-movie')
        moviePath.classList.add('movie-path')
        moviePathTitle.classList.add('movie-path-title')
        stopVideoBlock.classList.add('stop-video-block')

        if (trailer.title.length > 20) {
            moviePathTitleH2.innerHTML = trailer.title.slice(0, 20) + '. . . .'
        } else {
            moviePathTitleH2.innerHTML = trailer.title.slice(0, 20)
        }
        moviePath.style.backgroundImage = 'url(' +  img + trailer.backdrop_path + ')' 
        stopVideoIcon.src = '/public/icon/stop-video-icon.svg'
        moviePath.classList.add('movie-path')

        allNewTrailerBlock.append(trailerMovie)
        trailerMovie.append(moviePath, moviePathTitle, stopVideoBlock)
        moviePathTitle.append(moviePathTitleH2)
        stopVideoBlock.append(stopVideoIcon)

        getDetails(`/movie/${trailer.id}/videos`)
            .then(res => {
                let videoObj = res.data.results[0]

                trailerMovieIframe.src = `https://www.youtube.com/embed/${videoObj.key}`

            })

        moviePath.onclick = () => {
            // let movieTrailer = document.querySelector('.movie-trailer');
            moviePath.style.border = '2px solid #3657CB';
            let otherMoviePaths = document.querySelectorAll('.movie-path');
            otherMoviePaths.forEach((path) => {
                if (path !== moviePath) {
                    path.style.border = 'none';
                }
            });
            let movieTrailerTitle = document.querySelector('.movie-trailer h1');
            let btnDisLikeP = document.querySelector('.movie-trailer .btn-disLike-block p');
            let btnLikeP = document.querySelector('.movie-trailer .btn-like-block p');
            // movieTrailer.style.backgroundImage = moviePath.style.backgroundImage;
            movieTrailerTitle.innerHTML = trailer.title;
            counterLike = Math.floor(trailer.vote_count);
            counterDisLike = Math.floor(trailer.vote_count / 3);
            btnDisLikeP.innerHTML = counterDisLike;
            btnLikeP.innerHTML = counterLike;

            getDetails(`/movie/${trailer.id}/videos`)
                .then(res => {
                    let videoObj = res.data.results[0]

                    trailerMovieIframe.src = `https://www.youtube.com/embed/${videoObj.key}`

                })
        };
    }
}

// create all trailer 




// create allNewsInf

export function allNewsInfFunc(arr, place) {
    place.innerHTML = ''

    for (const item of arr) {
        let lastNewsMovie = document.createElement('div')
        let aboutBlock = document.createElement('div')
        let spanDate = document.createElement('span')
        let spanView = document.createElement('span')
        let spanComments = document.createElement('span')
        let viewIcon = document.createElement('img')
        let commentsIcon = document.createElement('img')
        let descriptNewsBlock = document.createElement('div')
        let descH1 = document.createElement('h1')
        let descP = document.createElement('p')

        lastNewsMovie.classList.add('last-news-movie')
        aboutBlock.classList.add('about-block')
        descriptNewsBlock.classList.add('description-news-block')

        spanDate.innerHTML = item.release_date
        spanDate.id = 'date'
        spanView.innerHTML = '242'
        spanComments.innerHTML = '14'
        descH1.innerHTML = item.title
        descP.innerHTML = item.overview
        viewIcon.src = '/public/icon/views.svg'
        commentsIcon.src = '/public/icon/comments.svg'
        lastNewsMovie.style.backgroundImage = 'url(' +  img + item.backdrop_path + ')' 

        place.append(lastNewsMovie)
        lastNewsMovie.append(aboutBlock, descriptNewsBlock)
        aboutBlock.append(spanDate, viewIcon, spanView, commentsIcon, spanComments)
        descriptNewsBlock.append(descH1, descP)
    }
}


export function createAllNews(arr, place) {
    place.innerHTML = ''

    for (const news of arr) {
        let lastNews = document.createElement('div')
        let p = document.createElement('p')
        let h3 = document.createElement('h3')
        let backBlue = document.createElement('div')
        let backBlueButton = document.createElement('button')



        lastNews.classList.add('last-news-mini')
        lastNews.classList.add('blue-block-clicked')
        backBlue.classList.add('back-blue')

        p.innerHTML = news.release_date
        h3.innerHTML = news.title
        if(news.backdrop_path)  {
            lastNews.style.backgroundImage = 'url(' + img + news.backdrop_path + ')'
        } else {
            lastNews.style.backgroundImage = `url(/public/img/poster-without.png)`
        }
        backBlueButton.innerHTML = 'Читать новость'

        place.append(lastNews)
        backBlue.append(backBlueButton)
        lastNews.append(p, h3, backBlue)


        lastNews.onclick = () => {
            let lastNewsMovie = document.querySelector('.last-news-movie')
            let lastNewsMovieTitle = document.querySelector('.last-news-movie h1')
            let lastNewsMovieDate = document.querySelector('.last-news-movie #date')
            let lastNewsMovieDesc = document.querySelector('.last-news-movie .description-news-block p')
            setTimeout(() => {
                lastNewsMovie.style.backgroundImage = lastNews.style.backgroundImage
            }, 0);
            lastNewsMovieTitle.innerHTML = h3.innerHTML
            lastNewsMovieDate.innerHTML = p.innerHTML
            lastNewsMovieDesc.innerHTML = news.overview
        }
        
    }
   
}

// create person

export function createPopularPerson(arr, place) {
    place.innerHTML = ''
    let counPlace = 1

    for (const person of arr) {
        let popularHuman = document.createElement('div')
        let descHuman = document.createElement('div')
        let h1 = document.createElement('h1')
        let h2 = document.createElement('h2')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')

        popularHuman.classList.add('popular-human')
        descHuman.classList.add('descript-human')
        p.classList.add('rate-human')

        h1.innerHTML = person.name
        h3.innerHTML = person.original_name
        h2.innerHTML = Math.floor(person.id / 10) + ' лет'
        p.innerHTML = counPlace + '-е место'
        popularHuman.style.backgroundImage = 'url(' + img + person.profile_path + ')'

        place.append(popularHuman)
        popularHuman.append(descHuman, p)
        descHuman.append(h1, h3, h2)

        counPlace++

    }

}
// create person

// create other person

export function otherPerson(arr, place) {
    place.innerHTML = ''
    let placeCount = 3

    for (const person of arr) {
        let otherHuman = document.createElement('div')
        let infHuman = document.createElement('div')
        let placeBlock = document.createElement('div')
        let h1 = document.createElement('h1')
        let h2 = document.createElement('h2')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')


        otherHuman.classList.add('other-human')
        infHuman.classList.add('inf-human-block')
        placeBlock.classList.add('place-block')

        h1.innerHTML = person.name
        h2.innerHTML = Math.floor(person.id / 10)
        h3.innerHTML = person.original_name
        p.innerHTML = placeCount + '-е место'

        place.append(otherHuman)
        otherHuman.append(infHuman, placeBlock)
        infHuman.append(h1, h3, h2)
        placeBlock.append(p)

        placeCount++
    }
}


export function aboutMovieFunc(arr, place) {

    place.innerHTML += `
        <div class="about-movie-block">
        <div class="poster-movie" style='background-image: url(${img + arr.poster_path})'>
    </div>
    <div class="about-right">
    <h1>${arr.title}</h1>
    <h3>${arr.original_title}</h3>
    <div id="IMDb" style="width: 70px; height: 70px;">
            <canvas id="IMDbChart"></canvas>
                    <div class="rate__counter rate__counter_IMDb"><span>${arr.vote_average.toFixed(1)}</span></div>
                <p>IMDb</p>
            </div>
    <div class="desc-about-movie">
    <p>${arr.overview.slice(0, 200)}. . . .</p>
</div>
<button class="see-btn"><img src="/public/icon/see-video-icon.svg" alt=""> Смотреть трейлер</button>
</div>
</div>
<div class="about-movie-ratings">
     <div class="btn-like"><img src="/public/icon/Like.svg" alt=""></div>
     <div class="btn-disLike"><img src="/public/icon/disLike.svg" alt=""></div>
     <div class="rating-waiting-block">Рейтинг ожиданий ${arr.vote_average.toFixed(1) * 10}% 
     <div class="rating-waiting-block-bar" style='width: ${arr.vote_average.toFixed(1) * 10}%'></div>
     <div class="rating-waiting-block-bar-black"></div>
     </div>
     <div class="like-block">
        <button class="btn-like heart-btn"><img src="/public/icon/heart-icon.svg" alt=""></button>
        <span>В избранном у ${arr.vote_count} человек </span>
     </div>
</div>
        `
 }

export function openModal(modal) {
    modal.style.scale = '1'
    backModal.style.display = 'block'
    document.body.style.overflowY = 'hidden'
}

export function closeModal(modal) {
    modal.style.scale = '0'
    backModal.style.display = 'none'
    document.body.style.overflowY = 'scroll'
}


export function reloadProduction(arr, place) {
    for (const item of arr) {
       let productBlock = document.createElement('div')
       let productManBlock = document.createElement('div')
       let productDescBlock = document.createElement('div')
       let h3 = document.createElement('h3')
       let h5 = document.createElement('h5')
       let h4 = document.createElement('h4')
       let productPoster = document.createElement('img')


       productBlock.classList.add('product-block')
       productManBlock.classList.add('produt-man-block')
       productDescBlock.classList.add('product-descr-man')
       h3.innerHTML = item.name
       h5.innerHTML = item.name
       h4.innerHTML = item.department
       console.log(item);
       if(item.profile_path) {
        productPoster.src = `${img + item.profile_path}`
       }else {
        productPoster.src = '/public/img/poster-without.png'
       }

       place.append(productBlock)
       productBlock.append(productManBlock, productDescBlock)
       productManBlock.append(productPoster)
       productDescBlock.append(h3, h5, h4)

    //     place.innerHTML += `
    //     <div class="product-block">
    //     <div class="produt-man-block">
    //         <img src="${img + item.profile_path}">
    //     </div>
    //     <div class="product-descr-man">
    //         <h3>${item.name}</h3>
    //         <h5>${item.name}</h5>
    //         <h4>${item.department}</h4>
    //     </div>
    // </div>
    //     `
    }
    place.innerHTML += `
    <div class="create-block">
    <h3>Производство:</h3> <br>
    <span>1:</span><a href="#">Arclight Films</a> <br>
    <span>2:</span><a href="#">Beagle Pug Films</a> <br>
    <span>3:</span><a href="#">Footprint Films</a> 
</div>
    `
}

export function reloadStarActors(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let actor = document.createElement("div")
        let actor_img = document.createElement("div")
        let actor_info = document.createElement("div")
        let actor_name = document.createElement("h3")
        let actor_original_name = document.createElement("p")
        let actor_role = document.createElement("p")


        actor.classList.add('actor')
        actor_img.classList.add('actor-img')
        actor_info.classList.add("actor_info")
        actor_name.classList.add('actor_name')
        actor_role.classList.add('actor_role')
        actor_role.classList.add("yellow")
        actor_original_name.classList.add('actor_original_name')

        if(item.profile_path) {
            actor_img.style.backgroundImage = `url(${img + item.profile_path})`
           }else {
            actor_img.style.backgroundImage = `url(/public/img/poster-without.png)`
           }
        actor_name.innerHTML = item.name
        actor_original_name.innerHTML = item.original_name
        actor_role.innerHTML = item.character

        actor.append(actor_img, actor_info)
        actor_info.append(actor_name, actor_original_name, actor_role)
        place.append(actor)


        actor.onclick = () => {
            location.assign('/pages/aboutPerson/?id=' + item.id)
        }

    }

}



export function reloadSearch(arr, place) {
    place.innerHTML = ''

    for (const item of arr) {
        let movieBlock = document.createElement('div')
        let posterSearch = document.createElement('div')
        let titleBlock = document.createElement('div')
        let rateBlock = document.createElement('div')
        let h3 = document.createElement('p')
        let h6 = document.createElement('h6')
        let h5 = document.createElement('h5')


        movieBlock.classList.add('movie-block-for-search')
        posterSearch.classList.add('poster-block-search')
        titleBlock.classList.add('title-block-search')
        rateBlock.classList.add('right-rate')

        if(item.title.length >= 10) {
            h3.innerHTML = item.title.slice(0, 10) + '..'
        } else {
            h3.innerHTML = item.title.slice(0, 10)
        }
        h5.innerHTML = item.release_date.slice(0, 4) + ' year'
        h6.innerHTML = item.original_title.slice(0, 8) 
        rateBlock.innerHTML =  item.vote_average.toFixed(1)

        if(item.poster_path) {
            posterSearch.style.backgroundImage = 'url(' + img + item.poster_path + ')' 
        }  else {
            posterSearch.style.backgroundImage =  `url(/public/img/poster-without.png)`
        }

        place.append(movieBlock)
        movieBlock.append(posterSearch, titleBlock, rateBlock)
        titleBlock.append(h3, h6, h5)

        movieBlock.onclick = () => {
            location.assign('/pages/aboutCard/?id=' + item.id)
        }
    }
}

export function reloadSearchPerson(arr, place) {
    place.innerHTML = ''

    for (const item of arr) {
        let movieBlock = document.createElement('div')
        let posterSearch = document.createElement('div')
        let titleBlock = document.createElement('div')
        let h3 = document.createElement('p')
        let h6 = document.createElement('h6')
        let h5 = document.createElement('h5')


        movieBlock.classList.add('movie-block-for-search')
        posterSearch.classList.add('poster-block-search')
        titleBlock.classList.add('title-block-search')

        h3.innerHTML = item.name
        h5.innerHTML = "work: " + item.known_for_department
        h6.innerHTML = item.original_name

        if(item.profile_path) {
            posterSearch.style.backgroundImage = 'url(' + img + item.profile_path + ')' 
        }  else {
            posterSearch.style.backgroundImage =  `url(/public/img/poster-without.png)`
        }

        place.append(movieBlock)
        movieBlock.append(posterSearch, titleBlock)
        titleBlock.append(h3, h6, h5)
    }
}