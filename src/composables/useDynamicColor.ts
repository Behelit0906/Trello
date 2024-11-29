import Color from 'color'

export const useDynamicColor = () => {
  // Calcula el color principal basado en el nombre de la imagen
  function setColorVariables(imageName?: string) {
    const html = document.documentElement
    
    const image = new Image()
    image.src = new URL(`../assets/backgrounds/${imageName}`, import.meta.url).href

    image.onload = () => {
      const averageColor = getAverageColor(image)
      const color = Color(averageColor)
      let navbarColor = ''
      let textColor = ''
      let sideNavBar = ''
      let logoFilter = ''
      let customShadow = ''

      if (color.isLight()) {
        navbarColor = color.hue(40).saturate(0.6).lighten(0.3).hsl().toString()
        sideNavBar = color.hsl().hue(40).saturate(0.6).lighten(0.3).alpha(0.9).toString()
        textColor = '#172D4B'
        logoFilter = 'brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%) hue-rotate(179deg) brightness(91%) contrast(88%)'
        if(!html.classList.contains('dark'))
          customShadow = '0px 8px 12px #091e4226, 0px 0px 1px #091e424f'
        
      } else {
        navbarColor = color.darken(0.50).lightness(1).hsl().toString()
        sideNavBar = color.darken(0.50).lightness(1).alpha(0.9).hsl().toString()
        textColor = '#FFFFFF'
        logoFilter = ''
        customShadow = '0px 0px 0px 1px #39424a, 0px 8px 12px #0304045C, 0px 0px 1px 1px #03040480'  
      }

      html.style.setProperty('--custom-shadow', customShadow)
      html.style.setProperty('--dynamic-side-navbar-color', sideNavBar)
      html.style.setProperty('--dynamic-navbar-color', navbarColor)
      html.style.setProperty('--dynamic-text-color', textColor)
      html.style.setProperty('--dynamic-logo-filter', logoFilter)
    };
  }

  return {
    setColorVariables
  };
}


const getAverageColor = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) return 'rgb(0,0,0)'// Si no hay contexto, devuelve un valor por defecto.

  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  let r = 0,
    g = 0,
    b = 0

  for (let i = 0; i < data.length; i += 4) {
    r += data[i]
    g += data[i + 1]
    b += data[i + 2]
  }

  const pixelCount = data.length / 4
  r = Math.floor(r / pixelCount)
  g = Math.floor(g / pixelCount)
  b = Math.floor(b / pixelCount)

  return `rgb(${r},${g},${b})`
}