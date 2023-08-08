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

    iconSearch.src = '/public/icon/search-icon.svg'
    buttonSignIn.innerHTML = 'Войти'
    cinemaIconP.innerHTML = 'area'
    cinemaIconSpan.innerHTML = 'Kino'
    cinemaIcon.src = '/public/icon/cinema-icon.svg'
    networkIcon.src = '/public/icon/network-icon.svg'

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



export function footer(place) {
     place.innerHTML += `
     <div class="container">
        <div class="links-cont">
          <div class="top-links">
            <img src="/public/icon/cinema-icon.svg" alt="">
            <span>Kinoarea</span>
          </div>   

          <div class="center-links">
            <h1>Подпишитесь на E-mail рассылку</h1>
           <p>Если хотиет быть в курсе последних новостей и новинок кино - <br> заполните форму ниже и оформите бесплатную E-mail рассылку! </p>

           <div class="bottom-links">
            <input type="email" placeholder="Введите свой E-mail адрес">
            <button class="follow-btn">Подписаться</button>
           </div>
          </div>
        </div>

        <div class="links-network-block">
          <img src="/public/icon/many-links.svg" alt="">
          <div class="all-hovered-block all-afish">
            <div class="hovered-block"><p>Афиша</p></div>
            <div class="hovered-block"><p>Новости</p></div>
            <div class="hovered-block"><p>Персоны</p></div>
            <div class="hovered-block"><p>Рейтинги</p></div>
            <div class="hovered-block"><p>Рецензии</p></div>
            <div class="hovered-block"><p>Каталог фильмов</p></div>
          </div>
          <p>2020 © Kinoarea.  Все права защищены</p>
        </div>
        
      </div>
     `
}