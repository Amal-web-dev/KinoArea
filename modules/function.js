let img  = import.meta.env.VITE_BASE_IMG
let moviesBlock = document.querySelector('.movies-block')
let movieTrailerBlock = document.querySelector('.movie-trailer-block')
let allNewTrailerBlock = document.querySelector('.all-new-trailer')

export function reloadMovie(arr, place) {
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

        place.append(movieBlock)
        movieBlock.append(bottomBlock, rateBlock, cardBlock)
        bottomBlock.append(h3, p)
        cardBlock.append(cardMovie)
    }
}


// create trailer
export function createTrailerMovie(arr) {
    let counterLike = 0
    let counterDisLike = 0
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
    
        likeIcon.src = './public/icon/Like.svg'
        disLikeIcon.src = './public/icon/disLike.svg'
        commentImg.src = './public/icon/network-icon.svg' 
        btnDisLikeP.innerHTML = 0
        btnlikeP.innerHTML = counterLike
        commentH1.innerHTML = trailer.title
        movieTrailer.style.backgroundImage = 'url(' +  img + trailer.backdrop_path + ')' 
    
        movieTrailerBlock.append(movieTrailer)
        movieTrailer.append(commentBlock)
        commentBlock.append(commentLeft, commentRight)
        commentLeft.append(commentH1, commentImg)
        commentRight.append(btnLikeBlock, btnDisLikeBlock)
        btnLikeBlock.append(btnLike, btnlikeP)
        btnDisLikeBlock.append(btnDisLike, btnDisLikeP)
        btnDisLike.append(disLikeIcon)
        btnLike.append(likeIcon)
    
    
    
        btnLikeBlock.onclick = () => {
              if (isLiked) {
                likeIcon.src = './public/icon/Like.svg';
                counterLike--;
                btnlikeP.innerHTML = counterLike;
                isLiked = false;
              } else {
                likeIcon.src = './public/icon/Like-full.svg';
                disLikeIcon.src = './public/icon/disLike.svg';
                if(counterDisLike > 0) {
                   counterDisLike--;
                }
                btnDisLikeP.innerHTML = counterDisLike;
                isDisLiked = false;
                counterLike++;
                btnlikeP.innerHTML = counterLike;
                isLiked = true;
              }
          };
          
          btnDisLikeBlock.onclick = () => {
              if (isDisLiked) {
                disLikeIcon.src = './public/icon/disLike.svg';
                counterDisLike--;
                btnDisLikeP.innerHTML = counterDisLike;
                isDisLiked = false;
              } else {
                disLikeIcon.src = './public/icon/disLike-full.svg';
                counterDisLike++;
                btnDisLikeP.innerHTML = counterDisLike;
                isDisLiked = true;
                likeIcon.src = './public/icon/Like.svg';
                if(counterLike > 0) {
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

export function allNewTrailer(arr) {
    for (const trailer of arr) {
        let trailerMovie = document.createElement('div')
        let moviePath = document.createElement('div')
        let moviePathTitle = document.createElement('div')
        let moviePathTitleH2 = document.createElement('h2')

        trailerMovie.classList.add('trailer-movie')
        moviePath.classList.add('movie-path')
        moviePathTitle.classList.add('movie-path-title')

        if(trailer.title.length > 20) {
            moviePathTitleH2.innerHTML = trailer.title.slice(0, 20) + '. . . .'
        } else {
            moviePathTitleH2.innerHTML = trailer.title.slice(0, 20)
        }
        moviePath.style.backgroundImage = 'url(' +  img + trailer.backdrop_path + ')' 

        allNewTrailerBlock.append(trailerMovie)
        trailerMovie.append(moviePath, moviePathTitle)
        moviePathTitle.append(moviePathTitleH2)


        moviePath.onclick = () => {
            let movieTrailer = document.querySelector('.movie-trailer')
            movieTrailer.style.backgroundImage = moviePath.style.backgroundImage
            // console.log(moviePath.style.backgroundImage);
        }
    }
}

// create all trailer 