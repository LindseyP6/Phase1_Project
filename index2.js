/*
    <form name="form1" id="form1">
        Sort: <select name="subject" id="subject">
          <option id="availableDropdown" value="" selected="selected">Available</option>
          <option id="notAvailableDropdown" value="" selected="selected">Not Avaialble</option>
        </select>
      </form>
    <div id="catContainer">
    </div>


    sortBy.addEventListener('change', (cat) => {
    console.log('clicked')
    if (cat.available === true)
    //pull only those cats and display to catContainer
    if (cat.available === false)
    //pull and display only those ats
})
*/

/*
function addCatLikes(cat){
    fetch(`http://localhost:3000/cats/${cat.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
    .then(response => response.json())
}

catLikeButton.addEventListener('click', () => {
    cat.likes += 1

    catLikeDisplay.textContent = cat.likes + " likes"
    catLikeButton.innerText = "Liked!"
    addCatLikes(cat)
*/