import { pets } from "./pets.js"
import { Pagination } from "./pagination.js"
import { Card } from "./card.js"
import { CardModal } from "./cardModal.js"

//Pagination

let numberPage = 1
let pagination
let pages
let paginationArray = []
const leftBorder = document.querySelector('.pagination__border__left')
const left = document.querySelector('.pagination__left')
const right = document.querySelector('.pagination__right')
const rightBorder = document.querySelector('.pagination__border__right')


window.onload = function () {
  if (pets) {
    renderPetsCardsToDom(pets)
  }
  toggleMenu()
  closeMenu()
  closeMenuMain()
}

const renderPetsCardsToDom = (pets) => {
  pages = getNumberOfPages()
  pagination = new Pagination(pets, pages)
  paginationArray = pagination.setPetsArray()
  renderElements(paginationArray)
  addCardClickHandler()
}

const getCardsWrapper = () => {
  const cardWrapper = document.querySelector('.pets__container')
  cardWrapper.innerHTML = ''
  return cardWrapper
}

const generateCards = (data) => {
  let cards = []
  data.forEach(card => {
    cards.push(new Card(card))
  })
  return cards
}

const getNumberOfPages = () => {
  let numberOfPages = 1;
  let phone = window.matchMedia('(max-width: 767px)').matches
  let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches
  let laptop = window.matchMedia('(min-width: 1279px)').matches
  if (phone) {
    numberOfPages = 16
  }
  if (tablet) {
    numberOfPages = 8
  }
  if (laptop) {
    numberOfPages = 6
  }

  return numberOfPages
}

const renderElements = (paginationArray) => {
  let petsCards = pagination.divideArrayToPages(numberPage, paginationArray)
  const petsCardContainer = getCardsWrapper()
  generateCards(petsCards).forEach(pet => {
    petsCardContainer.append(pet.generateCardPetsPage())
  })
  pagination.addPageToPagination(numberPage)
}

const changeButtonClass = () => {
  if (numberPage > 1) {
    leftBorder.classList.remove('button__disabled')
    left.classList.remove('button__disabled')
    leftBorder.classList.add('button__circle')
    left.classList.add('button__circle')
  }
  else {
    leftBorder.classList.add('button__disabled')
    left.classList.add('button__disabled')
    leftBorder.classList.remove('button__circle')
    left.classList.remove('button__circle')
  }
  if (numberPage < pages) {
    rightBorder.classList.remove('button__disabled')
    right.classList.remove('button__disabled')
    rightBorder.classList.add('button__circle')
    right.classList.add('button__circle')
  }
  else {
    rightBorder.classList.add('button__disabled')
    right.classList.add('button__disabled')
    rightBorder.classList.remove('button__circle')
    right.classList.remove('button__circle')
  }
}

//Pagination handlers

leftBorder.addEventListener('click', () => {
  if (numberPage > 1) {
    numberPage = 1
    renderElements(paginationArray)
    changeButtonClass()
  }
})
left.addEventListener('click', () => {
  if (numberPage > 1) {
    numberPage--
    renderElements(paginationArray)
    changeButtonClass()
  }
})
right.addEventListener('click', () => {
  if (numberPage < pages) {
    numberPage++
    renderElements(paginationArray)
    changeButtonClass()
  }
})
rightBorder.addEventListener('click', () => {
  numberPage = pages
  renderElements(paginationArray)
  changeButtonClass()
})


// Burger menu
const header = document.querySelector('.header')
const main = document.querySelector('.hero__filter')
const hamburger = document.querySelector('.header__hamburger')
const nav = document.querySelector('.nav')
const navLinks = document.querySelectorAll('.nav__link')
const logo = document.querySelector('.header__logo')
const lines = document.querySelectorAll('.header__line__dark')
const flags = document.querySelectorAll('.header__line__page')

const toggleMenu = () => {
  hamburger.addEventListener('click', () => {
    window.scrollTo(0, 0)
    document.body.classList.toggle('overflow__hidden')
    main.classList.toggle('blackout')
    header.classList.toggle('header-open')
    header.classList.toggle('header__light')
    header.classList.toggle('header__light-open')
    hamburger.classList.toggle('header__hamburger--active')
    nav.classList.toggle('nav-open')
    logo.classList.toggle('header__logo--active')
    if (flags.length > 0) {
      lines.forEach(line => line.classList.toggle('header__line__dark'))
    }
  })
}

const closeMenu = () => {
  navLinks.forEach(link => link.addEventListener('click', (event) => {
    if (event.target.classList.contains('nav__link')) {
      document.body.classList.remove('overflow__hidden');
      hamburger.classList.remove('header__hamburger--active');
      main.classList.remove('blackout')
      header.classList.remove('header-open')
      header.classList.add('header__light')
      header.classList.remove('header__light-open')
      nav.classList.remove('nav-open')
      logo.classList.remove('header__logo--active')
      if (flags.length > 0) {
        lines.forEach(line => line.classList.add('header__line__dark'))
      }
    }
  }))
}

const closeMenuMain = () => {
  main.addEventListener('click', () => {
    document.body.classList.remove('overflow__hidden');
    hamburger.classList.remove('header__hamburger--active');
    main.classList.remove('blackout')
    header.classList.remove('header-open')
    header.classList.add('header__light')
    header.classList.remove('header__light-open')
    header.classList.add('header__light')
    header.classList.remove('header__light-open')
    nav.classList.remove('nav-open')
    logo.classList.remove('header__logo--active')
    if (flags.length > 0) {
      lines.forEach(line => line.classList.add('header__line__dark'))
    }
  })
}

const addCardClickHandler = () => {
  document.querySelector('.pets__container').addEventListener('click', (event) => {
    if (event.target.closest('.pet__card__container')) {
      let cardName = event.target.closest('.pet__card').getAttribute('data-name')
      let cardData = getData(cardName)

      renderCardModalWindow(cardData)
    }
  })
}

const getData = (name) => {
  return pets.find(card => card.name == name)
}

const renderCardModalWindow = (card) => {
  let modal = new CardModal('card__modal', card)
  modal.buildContent();
}