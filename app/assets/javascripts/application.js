//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here

  document.querySelectorAll(".js-hidden").forEach((el, i) => {
    el.style.display = "none";
  });

  if (document.querySelector("#js-async-processing-message")) {
    setTimeout(() => {
      updateAsync("complete");
    }, 5 * 1000);
  }

  let updateAsync = (status) => {
    let processingHeading = "Checking your data";
    let processingMessage = `
      <p>Your data is being checked.</p>

      <p>You&rsquo;ll be able to continue when it&rsquo;s ready.</p>
    `;

    let completedHeading = "Your data has been checked";
    let completedMessage = "";

    let statusHeading = processingHeading;
    let statusMessage = processingMessage;

    if (status == "complete") {
      statusHeading = completedHeading;
      statusMessage = completedMessage;
    } else if (status == "timeout") {
      statusMessage = timeoutMessage;
    }

    let asyncHeadingElement = document.querySelector(
      "#js-async-processing-heading"
    );
    let asyncMessageElement = document.querySelector(
      "#js-async-processing-message"
    );
    let asyncButton = document.querySelector("#js-async-continue-button");

    asyncHeadingElement.textContent = statusHeading;
    asyncMessageElement.innerHTML = statusMessage;

    if (status == "complete") {
      asyncButton.style.display = "inline";
      asyncButton.textContent = "Continue";
    }

    if (status == "timeout") {
      asyncButton.style.display = "inline";
      asyncButton.textContent = "Continue";
    }
  };
});
