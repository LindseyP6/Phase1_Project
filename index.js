document.addEventListener('DOMContentLoaded',fetchCats)

function fetchCats(){
    fetch("http://localhost:3000/cats")
    .then(response => response.json())
    .then(cats => displayCats(cats))
}

const newCatDiv = document.querySelector('#newCats')
const newCatForm = document.querySelector(".newCatForm")
const catContainer = document.querySelector('#catContainer')
newCatForm.addEventListener('submit', addNewCat)

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

        const catLikeButton = document.createElement('button')
        catLikeButton.innerText = "Like me!"
        catLikeButton.className = "buttons"
        catLikeButton.setAttribute('id', cat.id)
        const catLikeDisplay = document.createElement('li')
        catLikeDisplay.textContent = cat.likes + " likes"
        catLikeButton.addEventListener('click', () => {
 
            const newLikes = parseInt(catLikeDisplay.textContent) + 1
            catLikeDisplay.textContent = newLikes + " likes"
            //potential: patch request to update server with like count
        })

        const catAvailability = document.createElement('button')
        catAvailability.className = "buttons"
        catAvailability.innerText = "Check Availability"
        catAvailability.setAttribute('id', cat.Available)
        catAvailability.addEventListener('click', () => {
            if (cat.Available) {
                availabilityText.hidden = false
                availabilityText.textContent = "Available! Enter your email here: "
    
                const emailInput = document.createElement('input')
                emailInput.setAttribute('type', 'email')
                availabilityText.appendChild(emailInput)

                const emailSubmit = document.createElement('button')
                emailSubmit.className = "emailSubmit"
                emailSubmit.textContent = "Submit"
                availabilityText.appendChild(emailSubmit)
                emailSubmit.addEventListener('click', (e) => {
                    availabilityText.textContent = "Thank you for submitting your email. We'll reach out to you soon!"
                    emailSubmit.hidden = true
                    emailInput.hidden = true
                })
            } else {
                availabilityText.hidden = false
                availabilityText.textContent = "Sorry, this cat is not available."
            }
        })
        const availabilityText = document.createElement('p')
        availabilityText.textContent = ''
        availabilityText.hidden = true;
        availabilityText.className = "availability"

        catDiv.append(catName, catImage, catAge, catDescription, catLikeDisplay, catLikeButton, catAvailability, availabilityText)
        catContainer.append(catDiv)

    })
}

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

    // const newCat = {
    //     userName: document.querySelector("#userName").value,
    //     newCatPicture: document.querySelector("#catPicture").value,
    //     catName: document.querySelector("#catName").value,
    //     newCatLocation: document.querySelector("#location").value
    // }

    // addNewCatToServer(newCat)
    newCatDiv.append(displayUserName, displayNewCatPic, displayNewCatName, displayCatLocation)
}

// function addNewCatToServer(newCat) {
//     fetch("http://localhost:3000/userSubmittedCats", {
//         METHOD: 'POST',
//         Headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         Body: JSON.stringify(newCat)
//     })
//     .then(resp => resp.json())
//     .then(newCat => console.log(newCat))
// }