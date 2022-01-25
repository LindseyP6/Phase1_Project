document.addEventListener('DOMContentLoaded',fetchCats)
function fetchCats(){
    fetch("http://localhost:3000/cats")
    .then(response => response.json())
    .then(cats => displayCats(cats))
}

const catContainer = document.querySelector('#catContainer')
function displayCats(cats){
    cats.forEach(cat => {
        //create a div
        const catDiv = document.createElement('div')
        catDiv.className = "catCards"

        //create h2 for name
        const catName = document.createElement('h2')
        catName.textContent = cat.name

        //create image for image name
        const catImage = document.createElement('img')
        catImage.src = cat.image
        catImage.width = "300"
        catImage.height = "300"
        catImage.className = "catPictures"

        //create p age
        const catAge = document.createElement('p')
        catAge.textContent = cat.age

        //create p for description
        const catDescription = document.createElement('p')
        catDescription.textContent = cat.Description

        //create like button
        const catLikeButton = document.createElement('button')
        catLikeButton.innerText = "Like me!"
        catLikeButton.setAttribute('id', cat.id)
        const catLikeDisplay = document.createElement('p')
        catLikeDisplay.textContent = cat.likes + " likes"
        catLikeButton.addEventListener('click', () => {
            //acess cat.likes and then when clicked updated catLikeDisplay
            //ADD IF STATEMENT FOR 1 LIKE AND THEN LIKES
            const newLikes = parseInt(catLikeDisplay.textContent) + 1
            catLikeDisplay.textContent = newLikes + " likes"
            // const catLikes = parseInt(catLikeDisplay.textContent) + 1
            // const catLikes = parseInt(catLikeDisplay.textContent) + 1
            // if (catLikes > 1) {
            //     catLikeDisplay.textContent = catLikes + " likes"
            // } else {
            //     catLikeDisplay.textContent = catLikes + " like"
            // }


            //potential: patch request to update server with like count
        })

        //create available button
        const catAvailability = document.createElement('button')
        catAvailability.innerText = "Check Availability"
        catAvailability.setAttribute('id', cat.Available)
        catAvailability.addEventListener('click', () => {
            if (cat.Available) {
                availabilityText.hidden = false
                availabilityText.textContent = "Available! Enter your email here: "
                // add email input space
                const emailInput = document.createElement('input')
                emailInput.setAttribute('type', 'email')
                availabilityText.appendChild(emailInput)
                // submit button
                const emailSubmit = document.createElement('button')
                emailSubmit.textContent = "Submit"
                availabilityText.appendChild(emailSubmit)
                emailSubmit.addEventListener('click', (e) => {
                    availabilityText.textContent = "Thank you for submitting your email. We'll reach out to you soon!"
                    emailSubmit.hidden = true
                    // emailInput.value = ''
                    emailInput.hidden = true
                })
            } else {
                availabilityText.hidden = false
                availabilityText.textContent = "Sorry, this cat is not available."
            }
            //if avaiable add new reserver cat button and then click resever to grey out cat (and claim as yours!)
        })
        const availabilityText = document.createElement('p')
        availabilityText.textContent = ''
        availabilityText.hidden = true;

        //add all above elements to catDiv
        //append catDiv to catContainer

        catDiv.append(catName, catImage, catAge, catDescription, catLikeDisplay, catLikeButton, catAvailability, availabilityText)
        catContainer.append(catDiv)

    })
}

function checkIfCatIsAvailable(){
    console.log('clicky click2')
}
