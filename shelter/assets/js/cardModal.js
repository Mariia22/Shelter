import { Modal } from "./modal.js"

export class CardModal extends Modal {
  constructor(classes, { name, img, type, breed, description, age, inoculations, diseases, parasites }) {
    super(classes)
    this.img = img
    this.name = name
    this.type = type
    this.breed = breed
    this.description = description
    this.age = age
    this.inoculations = inoculations
    this.diseases = diseases
    this.parasites = parasites
  }

  generateContent() {
    let template = ''
    let cardWindow = document.createElement('div')
    cardWindow.className = 'modal__card'

    this.img && (template += `<img class="modal__card__image" src=${this.img} alt="modalCardImage">`)
    if (this.name || this.type || this.breed || this.description || this.age || this.inoculations || this.diseases || this.parasites) {
      template += `<div class="modal__card__content">`
      this.name && (template += `<h3 class="modal__card__header">${this.name}</h3>`)
      template += `<div class="modal__card__subheader">`
      this.type && (template += `<h4 class="modal__card__type">${this.type} </h4>`)
      template += `<h4 class="modal__card__type">-</h4>`
      this.breed && (template += `<h4 class="modal__card__type">${this.breed}</h4>`)
      template += `</div>`
      this.description && (template += `<p class="modal__card__description">${this.description}</p>`)
      if (this.age || this.inoculations || this.diseases || this.parasites) {
        template += `<ul class="modal__list">`
        template += `<li class="modal__list__item">`
        this.age && (template += `<p class="modal__list__item__text"><span class="modal__list__item__header">Age: </span>${this.age}</p>`)
        template += `</li>`
        template += `<li class="modal__list__item">`
        this.inoculations && (template += `<p class="modal__list__item__text"><span class="modal__list__item__header">Inoculations: </span>${this.inoculations}</p>`)
        template += `</li>`
        template += `<li class="modal__list__item">`
        this.diseases && (template += `<p class="modal__list__item__text"><span class="modal__list__item__header">Diseases: </span>${this.diseases}</p>`)
        template += `</li>`
        template += `<li class="modal__list__item">`
        this.parasites && (template += `<p class="modal__list__item__text"><span class="modal__list__item__header">Parasites: </span>${this.parasites}</p>`)
        template += `</li>`
        template += `</ul>`
      }
      template += `</div>`
    }
    cardWindow.innerHTML = template
    return cardWindow
  }

  buildContent() {
    let content = this.generateContent()
    super.buildModal(content)
  }
}