export function header() {
let container = document.querySelector('.container')

    let typeMovie = ['Афиша', 'Медиа', 'Фильмы', 'Актеры', 'Новости', 'Подборки', 'Категории']

    let header = document.createElement('div')
    let headerLeft = document.createElement('div')
    let headerCenter = document.createElement('div')
    let headerRight = document.createElement('div')
    let cinemaIconBlock = document.createElement('div')
    let cinemaIcon = document.createElement('img')
    let cinemaIconSpan = document.createElement('span')
    let cinemaIconP = document.createElement('p')
    let networkIconsBlock = document.createElement('div')
    let networkIcon = document.createElement('img')
    let buttonSearh = document.createElement('button')
    let buttonSignIn = document.createElement('button')
    let iconSearch = document.createElement('img')


    header.classList.add('header-main')
    headerLeft.classList.add('header-left')
    headerCenter.classList.add('header-center')
    headerRight.classList.add('header-right')
    cinemaIconBlock.classList.add('cinema-icon-block')
    cinemaIcon.classList.add('cinema-logo')
    networkIconsBlock.classList.add('network-icons')
    buttonSearh.classList.add('search-btn')
    buttonSignIn.classList.add('btn-sign-in')

    iconSearch.src = './public/icon/search-icon.svg'
    buttonSignIn.innerHTML = 'Войти'
    cinemaIconP.innerHTML = 'area'
    cinemaIconSpan.innerHTML = 'Kino'
    cinemaIcon.src = './public/icon/cinema-icon.svg'
    networkIcon.src = './public/icon/network-icon.svg'

   for (const mov of typeMovie) {
    let aType = document.createElement('a')
    let hoveredBlock = document.createElement('div')
    hoveredBlock.classList.add('hovered-block')

    aType.href = '#'
    aType.innerHTML = mov

    hoveredBlock.append(aType)
    headerCenter.append(hoveredBlock)
   }

   container.prepend(header)
   header.append(headerLeft, headerCenter, headerRight)
   headerLeft.append(cinemaIconBlock, networkIconsBlock)
   cinemaIconBlock.append(cinemaIcon, cinemaIconSpan, cinemaIconP)
   networkIconsBlock.append(networkIcon)
   headerRight.append(buttonSearh, buttonSignIn)
   buttonSearh.append(iconSearch)

}
