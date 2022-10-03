export class Pagination {
  constructor(pets, pages) {
    this.pets = pets
    this.pages = pages
  }

  setPetsArray() {
    let arrayForPagination = []
    for (let i = 1; i <= 6; i++) {
      let unsortedArray = this.shuffleArray([...this.pets])
      arrayForPagination = [...arrayForPagination, ...unsortedArray]
    }
    return arrayForPagination
  }

  shuffleArray(array) {
    return array.map(i => [Math.random(), i]).sort().map(i => i[1])
  }

  getCountOfCardsOnPage(array) {
    return Math.ceil(array.length / this.pages)
  }

  addPageToPagination(number) {
    const numberWrapper = document.querySelector('.pagination__number')
    numberWrapper.innerHTML = number
  }

  divideArrayToPages(numberPage, paginationArray) {
    let cardsOnPage = this.getCountOfCardsOnPage(paginationArray)
    let start = (numberPage - 1) * cardsOnPage
    let end = start + cardsOnPage
    let arrayCardsOnPage = paginationArray.slice(start, end)
    return arrayCardsOnPage
  }
}