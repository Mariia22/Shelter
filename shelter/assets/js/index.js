import { pets } from "./pets.js"
import { Card } from "./card.js"
import { Slider } from "./slider.js"
import { CardModal } from "./cardModal.js"

//Slider

const leftButton = document.querySelector('.pets__cards__left')
const rightButton = document.querySelector('.pets__cards__right')
let globalResizeTimer = null
let currentSlides = []
let isEnabled = true

window.onload = function () {
  if (pets) {
    renderCardsToDom(pets)
  }
  toggleMenu()
  closeMenu()
  closeMenuMain()
  leftButtonSlider()
  rightButtonSlider()
}


const numberSlides = () => {
  let phone = window.matchMedia('(max-width: 767px)').matches
  let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches
  let laptop = window.matchMedia('(min-width: 1279px)').matches
  if (phone) {
    return 1
  }
  if (tablet) {
    return 2
  }
  if (laptop) {
    return 3
  }
}

const generateCards = (data) => {
  let cards = []
  data.forEach(card => {
    cards.push(new Card(card))
  })
  return cards
}

const getCardWrapper = () => {
  const cardWrapper = document.querySelector('.pets__cards__container')
  cardWrapper.innerHTML = ''
  return cardWrapper
}

const renderCardsToDom = () => {
  const cardSlider = getCardWrapper()
  let data = generateCards(pets)

  let phone = window.matchMedia('(max-width: 767px)').matches
  let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches
  let laptop = window.matchMedia('(min-width: 1279px)').matches
  if (phone) {
    cardSlider.append(data[4].generateCard())
    setCurrentSlides([pets[4]])
  }
  if (tablet) {
    cardSlider.append(data[4].generateCard())
    cardSlider.append(data[0].generateCard())
    setCurrentSlides([pets[4], pets[0]])

  }
  if (laptop) {
    cardSlider.append(data[4].generateCard())
    cardSlider.append(data[0].generateCard())
    cardSlider.append(data[2].generateCard())
    setCurrentSlides([pets[4], pets[0], pets[2]])
  }
  addActiveClassSlider('pets__cards__container--active')
  addCardClickHandler()
}

const setCurrentSlides = (array) => {
  currentSlides = [...array]
}

const getCurrentSlides = () => {
  return currentSlides
}

const changeSlides = () => {
  let numberOfSlides = numberSlides()
  currentSlides = getCurrentSlides()
  let newSlides = new Slider(numberOfSlides, currentSlides).findNextSlides(pets)
  setCurrentSlides(newSlides)
  const nextCardWrapper = document.createElement('div')
  nextCardWrapper.className = 'pets__cards__container'

  generateCards(newSlides).forEach(pet => {
    nextCardWrapper.append(pet.generateCard())
  })
  nextCardWrapper.classList.add('next')
  document.querySelector('.pets__cards').append(nextCardWrapper)
}

const addActiveClassSlider = (classes) => {
  document.querySelectorAll('.pets__cards__container').forEach(element => element.classList.add(classes))
}

const hideCards = (direction) => {
  isEnabled = false
  let previousItem = document.querySelector('.pets__cards__container--active')
  previousItem.classList.add(direction)
  previousItem.addEventListener('animationend', function () {
    this.classList.remove('pets__cards__container--active', direction)
    this.remove()
  })
}

const showCards = (direction) => {
  let nextItem = document.querySelector('.next')
  nextItem.classList.add(direction)
  nextItem.addEventListener('animationend', function () {
    this.classList.remove('next', direction)
    this.classList.add('pets__cards__container--active')
    isEnabled = true
  })
}

const leftButtonSlider = () => {
  leftButton.addEventListener('click', () => {
    if (isEnabled) {
      hideCards('to-right')
      changeSlides()
      showCards('from-left')

    }
  })
}

const rightButtonSlider = () => {
  rightButton.addEventListener('click', () => {
    if (isEnabled) {
      hideCards('to-left')
      changeSlides()
      showCards('from-right')
    }
  })
}

//Change number of slider's cards
window.addEventListener('resize', function () {
  if (globalResizeTimer != null) { window.clearTimeout(globalResizeTimer) }
  globalResizeTimer = window.setTimeout(function () {
    renderCardsToDom()
  }, 200)
});

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
    document.body.classList.toggle('overflow__hidden')
    main.classList.toggle('blackout')
    header.classList.toggle('header-open')
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
    nav.classList.remove('nav-open')
    logo.classList.remove('header__logo--active')
    if (flags.length > 0) {
      lines.forEach(line => line.classList.add('header__line__dark'))
    }
  })
}

const addCardClickHandler = () => {
  document.querySelector('.pets__cards').addEventListener('click', (event) => {
    if (event.target.closest('.pets__cards__card')) {
      let cardName = event.target.closest('.pets__cards__card').getAttribute('data-name')
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



