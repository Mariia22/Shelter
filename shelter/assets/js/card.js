export class Card {
  constructor({ name, img }) {
    this.name = name
    this.img = img
  }

  generateCard() {
    let template = ''
    let card = document.createElement('div')
    card.className = 'pets__cards__card card'
    card.setAttribute('data-name', this.name);

    this.img && (template += `<img class="card__img" src=${this.img} alt=${this.name}>`)
    this.name && (template += `<h4 class="card__name">${this.name}</h4>`)
    template += `<button class="button button__card">Learn more</button>`
    template += `</div>`
    card.innerHTML = template
    return card
  }

  generateCardPetsPage() {
    let template = ''
    let petCard = document.createElement('div')
    petCard.className = 'pet__card card'
    petCard.setAttribute('data-name', this.name);

    template += `<div class="pet__card__container">`
    this.img && (template += `<img class="card__img" src=${this.img} alt=${this.name}>`)
    this.name && (template += `<h4 class="card__title">${this.name}</h4>`)
    template += `<button class="button button__card">Learn more</button>`
    template += `</div>`
    template += `</div>`
    petCard.innerHTML = template
    return petCard
  }

}