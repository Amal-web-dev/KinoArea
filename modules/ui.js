let img  = import.meta.env.VITE_BASE_IMG
import axios from "axios";

export function axiosGet12(arr) {
    axios.get("https://api.themoviedb.org/3/trending/movie/day?language=ru-RU", {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
}).then(res => arr(res.data.results.slice(0, 12)))
}

export function axiosGet1(arr, place) {
    axios.get("https://api.themoviedb.org/3/trending/movie/day?language=ru-RU", {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
}).then(res => arr(res.data.results.slice(0, 1), place))
}

export function axiosGet8Popular(arr, place, from, to) {
    place.innerHTML = ''
    axios.get("https://api.themoviedb.org/3/movie/popular?language=ru-RU&with_genres=", {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
}).then(res => arr(res.data.results.slice(from, to), place))
}

export function axiosGetPopular(arr, place, from, to) {
    place.innerHTML = ''
    axios.get("https://api.themoviedb.org/3/movie/popular?language=ru-RU", {
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
}).then(res => arr(res.data.results.slice(from, to), place))
}

export function axiosGetPopularHuman(arr, place, from, to) {
axios.get(import.meta.env.VITE_PERSON_URL , {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      Accept: 'application/json'
    }
  }).then(res => arr(res.data.results.slice(from, to), place))
}