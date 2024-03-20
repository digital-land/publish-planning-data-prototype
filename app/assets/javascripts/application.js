//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
 
  document.querySelectorAll('.js-hidden').forEach((el, i) => {
    console.log(el)
    el.style.display = "none";
  })

  if (document.querySelector('#js-async-processing-message')) {
    setTimeout(() => {
      let diceRoll = Math.random()
      let status = 'complete'

      console.log(`diceRoll: ${diceRoll}`)

      if (diceRoll > 0.95) {
        status = 'timeout'
      }

      console.log(`status: ${status}`)

      updateAsync(status)
    }, 5 * 1000)  
  }

  let updateAsync = (status) => {
    let processingMessage = "Checking file"
    let completedMessage = "File checked"
    let timeoutMessage = "Error checking file"

   let statusMessage = processingMessage

    if (status == 'complete') {
      statusMessage = completedMessage
    } else if (status == 'timeout') {
      statusMessage = timeoutMessage
    }

    let asyncHeadingElement = document.querySelector('#js-async-processing-heading')
    let asyncMessageElement = document.querySelector('#js-async-processing-message')
    let asyncButton = document.querySelector('#js-async-continue-button')

    asyncHeadingElement.textContent = statusMessage
    asyncMessageElement.style.display = "none";

    if (status == 'complete') {
      asyncButton.style.display = "inline";
      asyncButton.textContent = "Continue"
    }

    if (status == 'timeout') {
      asyncButton.style.display = "inline";
      asyncButton.textContent = "Continue"
    }
  }
})
