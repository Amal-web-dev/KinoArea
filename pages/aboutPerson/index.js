import axios from "axios";
import { header, footer } from "../../modules/header";
import { getDetails } from "../../modules/https.request.js";
import { reloadMovie, allNewsInfFunc, createAllNews } from "../../modules/function.js";


header()


let person_id = location.search.split("=").at(-1)
let posterPerson = document.querySelector('.poster-person')
let infP = document.querySelector('.inf-p')
let infBlock = document.querySelector('.inf-block')
let bioP = document.querySelector('.bio-p')
let bioBlock = document.querySelector('.bio-block')
let bioBlockP = document.querySelector('.bio-block p')
let career = document.querySelector(".career")
let birthday = document.querySelector(".birthday")
let place_of_birth = document.querySelector(".place_of_birth")
let also_known_as = document.querySelector(".also_known_as")
let popularity = document.querySelector(".popularity")
let gender = document.querySelector(".gender")
let nameTitle = document.querySelector('.name-title')
let origTitle = document.querySelector('.original-title')
let lastNewsBlock =  document.querySelector('.last-news-block')
let allLastNewsBlock = document.querySelector('.all-last-news-block')
let popularPersonBlock = document.querySelector('.popular-person-block')
let footCont = document.querySelector('.footer-cont')

footer(footCont
    )

let img  = import.meta.env.VITE_BASE_IMG

getDetails(`/person/${person_id}`)
    .then(res => {
        if(res.data.profile_path)  {
            posterPerson.style.backgroundImage = `url(${img + res.data.profile_path})`
        } else {
            posterPerson.style.backgroundImage = `url(/public/img/poster-without.png)`
        }
        bioP.onclick = () => {
            infBlock.classList.add('no-active-block')
            bioBlock.classList.remove('no-active-block-bio')
            bioP.classList.add('active-info')
            infP.classList.remove('active-info')
        }

        infP.onclick = () => {
            infBlock.classList.remove('no-active-block')
            bioBlock.classList.add('no-active-block-bio')
            bioP.classList.remove('active-info')
            infP.classList.add('active-info')
        }
        career.innerHTML = res.data.known_for_department
        gender.innerHTML = res.data.gender === 1 ? "Female" : "Male"
        birthday.innerHTML = res.data.birthday
        place_of_birth.innerHTML = res.data.place_of_birth + "."
        also_known_as.innerHTML = res.data.also_known_as.slice(0, 3)
        popularity.innerHTML = res.data.popularity
        bioBlockP.innerHTML = res.data.biography
        nameTitle.innerHTML = res.data.name
        origTitle.innerHTML = res.data.known_for_department

    })


    getDetails(`/person/${person_id}/movie_credits`)
    .then(res => {
        console.log(res.data);
        reloadMovie(res.data.cast.slice(0, 4), popularPersonBlock)
        allNewsInfFunc(res.data.cast.slice(0, 1), lastNewsBlock)
        createAllNews(res.data.cast.slice(0, 4), allLastNewsBlock)
    })

    let photoBlock= document.querySelector('.photo-block')
    
    getDetails(`/person/${person_id}/images`)
    .then(res => {
        console.log(res.data.profiles);
        photoBlock.innerHTML = ""

        for (let item of res.data.profiles.slice(0, 6)) {
            let stills_item = document.createElement("div")
            stills_item.classList.add('stills_item')
            stills_item.style.backgroundImage = `url(${img + item.file_path})`
            photoBlock.append(stills_item)
        }
    })