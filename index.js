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
        const catLikes = document.createElement('button')
        catLikes.innerText = "Like me!"
        catLikes.setAttribute('id', cat.id)
        const catLikeDisplay = document.createElement('p')
        catLikeDisplay.textContent = cat.likes + " likes"
        catLikes.addEventListener('click', (cat) => {
            //acess cat.likes and then when clicked updated catLikeDisplay
            //ADD IF STATEMENT FOR 1 LIKE AND THEN LIKES
            const newLikes = parseInt(catLikeDisplay.textContent) + 1
            catLikeDisplay.textContent = newLikes + " likes"
            //potential: patch request to update server with newlikes
        })

        //create available button
        const catAvailability = document.createElement('button')
        catAvailability.innerText = "Check Availability"
        catAvailability.setAttribute('id', cat.Available)
        catAvailability.addEventListener('click', (cat) => {
            if (cat )
            //if avaiable add new reserver cat button and then click resever to grey out cat (and claim as yours!)
        })

        //add all above elements to catDiv
        //append catDiv to catContainer

        catDiv.append(catName, catImage, catAge, catDescription, catLikeDisplay, catLikes, catAvailability)
        catContainer.append(catDiv)

    })
}

function checkIfCatIsAvailable(){
    console.log('clicky click2')
}
