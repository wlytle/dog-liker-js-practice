document.addEventListener("DOMContentLoaded", () => {
    const DOGSURL = "http://localhost:3000/dogs"
    const main = document.getElementsByTagName("main")[0]
    const newDogForm = document.getElementsByTagName("form")[0]

    fetch(DOGSURL)
        .then(res => res.json())
        .then(json => {
            populateDogs(json)
        })

    const populateDogs = (dogs) => {
        dogs.forEach(dog => {
            addDogToDom(dog)
        })
        let formHeader = document.createElement('h2')
        formHeader.innerText = "Create a new dog here!"
        newDogForm.appendChild(formHeader)
        let labelN = document.createElement('label')
        labelN.innerText = "Name: "
        let nameField = document.createElement('input')
        // nameField.name = "dogName"
        nameField.id = "diana"
        newDogForm.appendChild(labelN)
        newDogForm.appendChild(nameField)
        let labelB = document.createElement('label')
        labelB.innerText = "Breed: "
        let breedField = document.createElement('input')
        breedField.name = "breed"        
        breedField.id = "breed"
        newDogForm.appendChild(labelB)
        newDogForm.appendChild(breedField)
        let labelI = document.createElement('label')
        labelI.innerText = "Image URL: "
        let urlField = document.createElement('input')
        urlField.name = "image"
        urlField.id = "image"
        newDogForm.appendChild(labelI)
        newDogForm.appendChild(urlField)
        let newDogSubmit = document.createElement('button')
        newDogSubmit.innerText = 'Save Doggo'
        newDogForm.appendChild(newDogSubmit)
        newDogForm.addEventListener('submit', (event) => { addDoggo(event) })
    }


    const submitComment = (event, dog) => {
        event.preventDefault()
        let postData = { comments: [...dog.comments, event.target.comment.value] }
        console.log(postData)
        fetch(`${DOGSURL}/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(json => {
                let ul = document.getElementById(`${json.name}-comments`)
                let noComments = document.getElementById(`no-${dog.name}-comments`)
                if(noComments){
                    //delete child node
                }
                let li = document.createElement('li')
                li.innerText = json.comments[json.comments.length - 1]
                ul.appendChild(li)
            })
    }

    const upvoteDoggo = (dog, superLike = false) => {
        let p = document.getElementById(`${dog.name}-likes`);
        let postData;
        if (superLike) {
            postData = { likes: parseInt(p.innerText) + 10 };
        }
        else postData = { likes: parseInt(p.innerText) + 1 }

        fetch(`${DOGSURL}/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(json => {
                p.innerText = json.likes
            })
    }

    const addDoggo = (event) => {
        // {
        //     "id": 10,
        //     "likes": 4,
        //     "name": "Opie",
        //     "breed": "Chiweenie",
        //     "image": "https://66.media.tumblr.com/tumblr_nsg59zPRGN1uayzz1o1_1440100468_cover.png",
        //     "comments": [
        //       "just a fat lil meatball",
        //       "opie dopie :D",
        //       "10,000 stars"
        //     ]
        //   }
        event.preventDefault()
        let name = event.target.diana.value
        let breed = event.target.breed.value
        let image = event.target.image.value

        let dogData = {
            likes: 1,
            name,
            breed,
            image,
            comments: ["oaisjdfglas", "dogs r great", "this dog stinks", "football"]
        }

        fetch("http://localhost:3000/dogs", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accepts: 'application/json' 
            },
            body: JSON.stringify(dogData)
        }).then(response => response.json())
        .then(json => addDogToDom(json))
    }

    function addDogToDom(dog){
        // debugger;
        const dogBode = document.createElement('div')
        dogBode.id = dog.id

        const nameTag = document.createElement('h2')
        nameTag.innerText = dog.name

        const breedTag = document.createElement('p')
        breedTag.innerText = dog.breed

        const image = document.createElement('img')
        image.src = dog.image

        const likesTag = document.createElement('p')
        likesTag.innerText = `Likes: ${dog.likes}`
        const commentTag = document.createElement('p')
        commentTag.innerText = `Comments:`

        const dogUl = document.createElement('ul')

        dog.comments.forEach(comment => {
            let li = document.createElement('li')
            li.innerText = comment
            dogUl.appendChild(li)
        })

        const commentForm = document.createElement('form')
        const label = document.createElement('label')
        label.innerText = "Add Comment: "
        const commentInfo = document.createElement('input')
        commentInfo.placeHolder = 'jazz'
        commentInfo.type = 'text'
        commentInfo.name = 'comment'
        const submitButton = document.createElement('input')
        submitButton.setAttribute("type", "submit")

        commentForm.appendChild(label)
        commentForm.appendChild(commentInfo)
        commentForm.appendChild(submitButton)

        commentForm.addEventListener('submit', (event) => addCommentToDog(event,dog))


        dogBode.appendChild(nameTag)
        dogBode.appendChild(breedTag)
        dogBode.appendChild(image)
        dogBode.appendChild(likesTag)
        dogBode.appendChild(commentTag)
        dogBode.appendChild(dogUl)
        dogBode.appendChild(commentForm)

        main.appendChild(dogBode)
        // make a new thing that matches all the other dog things
    }
    
    
    const addDogToPage = (dog) => {
        let div = document.createElement('div')
        div.id = dog.id
        let h2 = document.createElement('h2')
        h2.innerText = dog.name
        let p = document.createElement('p')
        p.innerText = dog.breed
        let img = document.createElement('img')
        img.src = dog.image
        let p2 = document.createElement('p')
        p2.id = `${dog.name}-likes`
        p2.innerText = dog.likes
        let likesLabel = document.createElement('p')
        likesLabel.innerText = "Likes:"
        let btn = document.createElement('button')
        btn.innerText = "like this doggo"
        btn.addEventListener('click', () => upvoteDoggo(dog))
        let superBtn = document.createElement('button')
        superBtn.innerText = "Super Like"
        superBtn.addEventListener('click', () => upvoteDoggo(dog, true))
        let p3 = document.createElement('p')
        p3.innerText = "Comments:"
        let ul = document.createElement('ul')
        ul.id = `${dog.name}-comments`
        if(dog.comments.length){
            dog.comments.forEach(comment => {
                let li = document.createElement('li')
                li.innerText = comment
                ul.appendChild(li)
            })
        }
        else {
            let noneYet = document.createElement('p')
            noneYet.innerText = "None Yet!"
            noneYet.id = `no-${dog.name}-comments`
            ul.appendChild(noneYet)
        }
        let commentForm = document.createElement('form')
        let label = document.createElement('label')
        label.innerText = "Add Comment:"
        let input1 = document.createElement('input')
        input1.placeholder = "text here"
        input1.type = "text"
        input1.name = "comment"
        let input2 = document.createElement('input')
        input2.type = 'submit'

        commentForm.addEventListener('submit', (ev) => submitComment(ev, dog))
        commentForm.appendChild(label)
        commentForm.appendChild(input1)
        commentForm.appendChild(input2)

        div.appendChild(h2)
        div.appendChild(p)
        div.appendChild(img)
        div.appendChild(likesLabel)
        div.appendChild(p2)
        div.appendChild(btn)
        div.appendChild(superBtn)
        div.appendChild(p3)
        div.appendChild(ul)
        div.appendChild(commentForm)
        main.appendChild(div)
    }

    const addCommentToDog = (event, dog) => {
        event.preventDefault()
        let commentData = dog.comments
        commentData.push(event.target["comment"].value)
        

        fetch(`${DOGSURL}/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({comments: commentData})
        }).then(response=>response.json())
        .then(json=>{
            let h1 = document.createElement('h1')
            h1.innerText = "you added a comment didt you."
            main.appendChild(h1)
        })
    }

})
