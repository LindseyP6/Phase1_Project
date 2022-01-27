const catContainer = document.querySelector("#catContainer")
const newCatContainer = document.querySelector(".addedCats")
const newCatForm = document.querySelector(".newCatForm")

function getCats() {
    fetch("http://localhost:3000/cats")
    .then(res => res.json())
    .then(cats => displayCats(cats))
}

function getNewCats() {
    fetch("http://localhost:3000/userSubmittedCats")
    .then(res => res.json())
    .then(cats => displayNewCats(cats))
}

function displayCats(cats) {
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
        catLikeButton.type = "button"

        const catLikeDisplay = document.createElement('li')
        catLikeDisplay.textContent = cat.likes + " likes"

        catLikeButton.addEventListener('click', () => {
            newLikes = cat.likes + 1
            fetch(`http://localhost:3000/cats/${cat.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    likes: newLikes
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(json => console.log(json))

            catLikeDisplay.textContent = newLikes + " likes"
            catLikeButton.innerText = "Liked!"
        })

        const catAvailability = document.createElement('button')
        catAvailability.className = "buttons"
        catAvailability.innerText = "Check Availability"

        const availabilityText = document.createElement('p')
        availabilityText.hidden = true
        availabilityText.className = "availability"

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

                emailSubmit.addEventListener('click', () => {
                    availabilityText.textContent = "Thank you for submitting your email. We'll reach out to you soon!"
                    emailSubmit.hidden = true
                    emailInput.hidden = true

                    let newEmail = {
                        "id": getId("userEmails"),
                        "userEmail": emailInput.value,
                        "userInterestedIn": cat.name
                    }

                    fetch("http://localhost:3000/userEmails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify(newEmail)
                    })
                })
            } else {
                availabilityText.hidden = false
                availabilityText.textContent = "Sorry, this cat is not available."
            }
        })
        

        catDiv.append(catName, catImage, catAge, catDescription, catLikeDisplay, catLikeButton, catAvailability, availabilityText)
        catContainer.append(catDiv)
    })
}

function getId(target) {
    fetch(`http://localhost:3000/${target}`)
    .then(res => res.json())
    .then((data) => {
    return data.length + 1;
    })
}

function addNewCat(username, catpic, catname, catlocation) {
    let newCat = {
        "id": getId("userSubmittedCats"),
        "userName": username,
        "newCatPicture": catpic,
        "catName": catname,
        "newCatLocation": catlocation,
    }

    fetch("http://localhost:3000/userSubmittedCats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newCat)
    })

    displayNewCats(newCat)
}

function displayNewCats(cats) {
    cats.forEach(cat => {
        const newCatDiv = document.createElement("div")
        newCatDiv.className = "newCatCards"

        const displayUserName = document.createElement("p")
        displayUserName.textContent = `Submitted by: ${cat.userName}`

        const displayCatPic = document.createElement("img")
        displayCatPic.src = cat.newCatPicture
        displayCatPic.height = "250"
        displayCatPic.width = "250"

        const displayNewCatName = document.createElement("p")
        displayNewCatName.textContent = `Cat Called: ${cat.catName}`

        const displayCatLocation = document.createElement("p")
        displayCatLocation.textContent = `Cat Seen: ${cat.newCatLocation}`
        displayCatLocation.style.marginBottom = "100px"

        newCatDiv.append(displayUserName, displayCatPic, displayNewCatName, displayCatLocation)
        newCatContainer.append(newCatDiv)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    console.log('loaded')
    getCats()
    getNewCats()
    newCatForm.addEventListener('submit', (e) => {
        e.preventDefault()
        addNewCat(e.target.name.value, e.target.pic.value, e.target.cat.value, e.target.location.value)
    })
})