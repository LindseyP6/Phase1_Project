document.addEventListener('DOMContentLoaded',fetchCats)
function fetchCats(){
    fetch("http://localhost:3000/cats")
    .then(response => response.json())
    .then(cats => displayCats(cats))
}

const catContainer = document.querySelector('#catContainer')
function displayCats(cats){
    cats.forEach(cat => {

        const catDiv = document.createElement('div')
        catDiv.className = "catCards"

        const catName = document.createElement('h2')
        catName.textContent = cat.name

        const catImage = document.createElement('img')
        catImage.src = cat.image
        catImage.className = "catPictures"

        const catAge = document.createElement('li')
        catAge.textContent = cat.age

        const catDescription = document.createElement('p')
        catDescription.textContent = cat.Description

        const catLikeDisplay = document.createElement('li')
        catLikeDisplay.textContent = cat.likes + " likes"

        const catLikeButton = document.createElement('button')
        catLikeButton.innerText = "Like me!"
        catLikeButton.className = "buttons"
        catLikeButton.setAttribute('id', cat.id)
        catLikeButton.addEventListener('click',(cat) => {
            const newLikes = parseInt(catLikeDisplay.textContent) + 1
            catLikeDisplay.textContent = newLikes + " likes"

            fetch(`http://localhost:3000/cats/`, {
                METHOD: 'PATCH',
                Headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                Body: JSON.stringify(catLikeDisplay)
            })
            .then(resp => resp.json())
            .then(catLikeDisplay => console.log(catLikeDisplay))
            //potential: patch request to update server with like count
        })

        //create available button
        const catAvailability = document.createElement('button')
        catAvailability.className = "buttons"
        catAvailability.innerText = "Check Availability"
        catAvailability.setAttribute('id', cat.Available)
        catAvailability.addEventListener('click', availabilityOfCats(cat))
        //() => {
        //     if (cat.Available) {
        //         availabilityText.hidden = false
        //         availabilityText.textContent = "Available! Enter your email here: "
        //         // add email input space
        //         const emailInput = document.createElement('input')
        //         emailInput.setAttribute('type', 'email')
        //         availabilityText.appendChild(emailInput)
        //         // submit button
        //         const emailSubmit = document.createElement('button')
        //         emailSubmit.className = "emailSubmit"
        //         emailSubmit.textContent = "Submit"
        //         availabilityText.appendChild(emailSubmit)
        //         emailSubmit.addEventListener('click', (e) => {
        //             availabilityText.textContent = "Thank you for submitting your email. We'll reach out to you soon!"
        //             emailSubmit.hidden = true
        //             // emailInput.value = ''
        //             emailInput.hidden = true
        //         })
        //     } else {
        //         availabilityText.hidden = false
        //         availabilityText.textContent = "Sorry, this cat is not available."
        //     }
        //     //if avaiable add new reserver cat button and then click resever to grey out cat (and claim as yours!)
        // })
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

    const newCat = {
        userName: document.querySelector("#userName").value,
        newCatPicture: document.querySelector("#catPicture").value,
        catName: document.querySelector("#catName").value,
        newCatLocation: document.querySelector("#location").value
    }

    addNewCatToServer(newCat)
    // console.log(newCat)
    newCatDiv.append(displayUserName, displayNewCatPic, displayNewCatName, displayCatLocation)
}

function addNewCatToServer(newCat) {
    fetch("http://localhost:3000/userSubmittedCats", {
        METHOD: 'POST',
        Headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        Body: JSON.stringify(newCat)
    })
    .then(resp => resp.json())
    .then(newCat => console.log(newCat))
}

function availabilityOfCats(cat){
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
}
