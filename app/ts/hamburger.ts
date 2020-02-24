export const attachHamburgerEvent = (): void => {
  const hamburger = document.querySelector('[hamburger-open]')
  const navMobile = document.querySelector('[mobile-nav]')
  const body = document.querySelector('body')

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navMobile.classList.toggle('is-mobile')
    body.classList.toggle('is-menu-active')
  })

  document.addEventListener('click', (event: Event) => {
    if (event.target !== hamburger) {
      hamburger.classList.remove('active')
      navMobile.classList.remove('is-mobile')
      body.classList.remove('is-menu-active')
    }
  })
  // ### END ###
}
