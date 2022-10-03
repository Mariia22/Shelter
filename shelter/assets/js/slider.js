export class Slider {
  constructor(numberOfSlides, currentSlides) {
    this.numberOfSlides = numberOfSlides || 1
    this.currentSlides = currentSlides || []
    this.previousSlides
  }

  findNextSlides(array) {
    this.previousSlides = [...this.currentSlides]
    this.currentSlides = []
    let count = this.numberOfSlides
    while (count > 0) {
      let randomElement = this.getRandomArrayElement(array)
      if (!this.previousSlides.includes(randomElement) && !this.currentSlides.includes(randomElement)) {
        this.currentSlides = [...this.currentSlides, randomElement]
        count--
      }
    }
    return this.currentSlides
  }

  getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }
}