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
        // catImage.width = "300"
        // catImage.height = "300"
        catImage.className = "catPictures"

        //create p age
        const catAge = document.createElement('li')
        catAge.textContent = cat.age

        //create p for description
        const catDescription = document.createElement('p')
        catDescription.textContent = cat.Description

        //create like button
        const catLikeButton = document.createElement('button')
        catLikeButton.innerText = "Like me!"
        catLikeButton.className = "buttons"
        catLikeButton.setAttribute('id', cat.id)
        const catLikeDisplay = document.createElement('li')
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
        catAvailability.className = "buttons"
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
                emailSubmit.className = "emailSubmit"
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
        availabilityText.className = "availability"

        //add all above elements to catDiv
        //append catDiv to catContainer

        catDiv.append(catName, catImage, catAge, catDescription, catLikeDisplay, catLikeButton, catAvailability, availabilityText)
        catContainer.append(catDiv)

    })
}
const newCatDiv = document.querySelector('#newCats')
const newCatForm = document.querySelector(".newCatForm")

newCatForm.addEventListener('submit', addNewCat)

function addNewCat(event) {
    event.preventDefault();
    console.log(event)
    const userName = document.querySelector("#userName").value
    const newCatPicture = document.querySelector("#catPicture").value
    const catName = document.querySelector("#catName").value
    const newCatLocation = document.querySelector("#location").value
    
    const displayUserName = document.createElement("p")
    displayUserName.textContent = `Submitted By: ${userName}`

    const displayNewCatPic = document.createElement('img')
    displayNewCatPic.height = "250"
    displayNewCatPic.width = "250"
    displayNewCatPic.src = newCatPicture

    const displayNewCatName = document.createElement("p")
    displayNewCatName.textContent = `Cat Called: ${catName}`

    const displayCatLocation = document.createElement("p")
    displayCatLocation.textContent = `Cat Seen: ${newCatLocation}`
    displayCatLocation.style.marginBottom = "100px"

    newCatDiv.append(displayUserName, displayNewCatPic, displayNewCatName, displayCatLocation)
}

