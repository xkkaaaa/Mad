interface Islide {
  color: string
  text: string
}

const slides: Islide[] = [
  { color: '#c62828', text: 'RED' },
  { color: '#ad1457', text: 'PINK' },
  { color: '#6a1b9a', text: 'PURPLE' },
  { color: '#4527a0', text: 'DEEP_PURPLE' },
  { color: '#283593', text: 'INDIGO' },
  { color: '#1565c0', text: 'BLUE' },
  { color: '#0277bd', text: 'LIGHT_BLUE' },
  { color: '#00838f', text: 'CYAN' },
  { color: '#00695c', text: 'TEAL' },
  { color: '#2e7d32', text: 'GREEN' },
  { color: '#558b2f', text: 'LIGHT_GREEN' },
  { color: '#827717', text: 'LIME' },
  { color: '#ef6c00', text: 'ORANGE' },
  { color: '#d84315', text: 'DEEP_ORANGE' },
  { color: '#4e342e', text: 'BROWN' },
]

function Slider({ sliderId = 'slider', slideDuration = 2500, slidesData = slides }: {
  sliderId?: string
  slideDuration?: number
  slidesData?: Islide[]
}) {
  const container = document.getElementById(sliderId) as HTMLElement
  if (!container) {
    throw new Error(`Slider container with id ${sliderId} not found`)
  }

  const slidesContainer = document.createElement('div')
  slidesContainer.className = 'slides'
  container.appendChild(slidesContainer)

  // Здесь определяются переменные slideWidth (ширина слайда), slideCount (количество слайдов), currentSlide (текущий активный слайд) и intervalId (идентификатор интервала для автоматического переключения слайдов).
  const slideWidth: number = container.offsetWidth
  const slideCount: number = slidesData.length
  let currentSlide: number = 0
  let intervalId: number

  function createSlideElement(slideData: Islide): HTMLDivElement {
    const slideElement = document.createElement('div')
    slideElement.className = 'slide'
    slideElement.style.backgroundColor = slideData.color
    slideElement.textContent = slideData.text
    return slideElement
  }

  function renderSlides() {
    slidesData.forEach((slideData) => {
      const slideElement = createSlideElement(slideData)
      slidesContainer.appendChild(slideElement)
    })
  }

  // Функция goToSlide проверяет, является ли индекс допустимым. Если индекс допустим, то slidesContainer сдвигается влево с использованием CSS свойства transform: translateX()
  function goToSlide(index: number) {
    if (index >= 0 && index < slideCount) {
      slidesContainer.style.transform = `translateX(-${slideWidth * index}px)`
      currentSlide = index
    } else {
      throw new Error(`Invalid slide index: ${index}`)
    }
  }

  // Функция nextSlide переключает слайды вперед. Она проверяет, является ли текущий слайд последним слайдом
  function nextSlide() {
    if (currentSlide === slideCount - 1) {
      clearInterval(intervalId)
      return
    }
    goToSlide(currentSlide + 1)
  }

  function startSlider() {
    intervalId = setInterval(nextSlide, slideDuration)
  }

  renderSlides()
  startSlider()
}

try {
  new Slider({ sliderId: 'slider', slideDuration: 2500, slidesData: slides })
} catch (error) {
  console.error(error)
}
