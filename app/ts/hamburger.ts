export const attachHamburgerEvent = (): void => {
  const hamburger = document.querySelector('[hamburger-open]')
  const body = document.querySelector('body')

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    body.classList.toggle('is-menu-active')
  })

  document.addEventListener('click', (event: Event) => {
    if (event.target !== hamburger) {
      hamburger.classList.remove('active')
      body.classList.remove('is-menu-active')
    }
  })
}
