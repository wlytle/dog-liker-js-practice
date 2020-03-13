document.addEventListener("DOMContentLoaded", () => {
    const DOGSURL = "http://localhost:3000/dogs"
    const main = document.getElementsByTagName("main")[0]
    const form = document.getElementsByTagName("form")[0]

    fetch(DOGSURL)
    .then(res=>res.json())
    .then(json=>{
        populateDogs(json)
    })

    const populateDogs = (dogs) => {
        dogs.forEach(dog=> {
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
            btn.addEventListener('click', ()=>upvoteDoggo(dog))
            let superBtn = document.createElement('button')
            superBtn.innerText = "Super Like"
            superBtn.addEventListener('click', ()=>upvoteDoggo(dog, true))
            let p3 = document.createElement('p')
            p3.innerText = "Comments:"
            let ul = document.createElement('ul')
            ul.id = `${dog.name}-comments`
            dog.comments.forEach(comment=> {
                let li = document.createElement('li')
                li.innerText = comment
                ul.appendChild(li)
            })
            let commentForm = document.createElement('form')
            let label = document.createElement('label')
            label.innerText = "Add Comment:"
            let input1 = document.createElement('input')
            input1.placeholder = "text here"
            input1.type = "text"
            input1.name = "comment"
            let input2 = document.createElement('input')
            input2.type = 'submit'
            
            commentForm.addEventListener('submit', (ev)=> submitComment(ev, dog))
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
        })
    }
    
    const submitComment = (event, dog) => {
        event.preventDefault()
        let postData = {comments: [...dog.comments, event.target.comment.value]}
        console.log(postData)
        fetch(`${DOGSURL}/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res=>res.json())
        .then(json=> {
            let ul = document.getElementById(`${json.name}-comments`)
            console.log(ul)
            let li = document.createElement('li') 
            li.innerText = json.comments[json.comments.length-1]
            ul.appendChild(li)
        })  
    }

    const upvoteDoggo = (dog, superLike=false) => {
        let p = document.getElementById(`${dog.name}-likes`)
        let postData
        if(superLike){
            postData = {likes: parseInt(p.innerText)+10}
        }
        else postData = {likes: parseInt(p.innerText)+1}
        
        fetch(`${DOGSURL}/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res=>res.json())
        .then(json=> {
            p.innerText = json.likes
        })  
    }
    
})