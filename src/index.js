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
            p.innerText = `Likes: ${dog.likes}`
            let p3 = document.createElement('p')
            p3.innerText = "Comments:"
            let ul = document.createElement('ul')
            dog.comments.forEach(comment=> {
                let li = document.createElement('li')
                li.innerText = comment
                ul.appendChild(li)
            })
            let form = document.createElement('form')
            form.addEventListener('submit')

            div.appendChild(h2)
            div.appendChild(p)
            div.appendChild(img)
            div.appendChild(p2)
            div.appendChild(p3)
            div.appendChild(ul)
            div.appendChild(form)
            main.appendChild(div)
        })
    }
    
    
})