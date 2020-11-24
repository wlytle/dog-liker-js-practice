document.addEventListener("DOMContentLoaded", () => {
  const DOGSURL = "http://localhost:3000/dogs";
  const main = document.querySelector("main");

  //Get all the dogs
  function getAllDogs() {
    fetch(DOGSURL)
      .then((resp) => resp.json())
      .then((dogs) => handleDogs(dogs))
      .catch((err) => console.log(err.message));
  }

  function handleDogs(dogs) {
    for (dog of dogs) {
      renderDog(dog);
    }
  }

  function renderDog({ id, name, breed, image, likes, comments }) {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const breedP = document.createElement("p");
    const img = document.createElement("img");
    const likesP = document.createElement("p");
    const likeBtn = document.createElement("BUTTON");
    const superLikBtn = document.createElement("BUTTON");
    const commentsP = document.createElement("p");
    const form = document.createElement("form");
    const label = document.createElement("label");
    const commentInput = document.createElement("input");
    const submit = document.createElement("input");

    div.id = id;
    h2.textContent = name;
    breedP.textContent = breed;
    img.src = image;
    likesP.textContent = `Likes: ${likes}`;
    likeBtn.textContent = "Like!";
    likeBtn.className = "like";
    superLikBtn.textContent = "SUPER LIKE!";
    superLikBtn.className = "super-like";
    commentsP.textContent = "Comments:";
    label.textContent = "Add Comment:";
    commentInput.placeholder = "Who's A Good Dog?!?";
    commentInput.type = "text";
    commentInput.name = "comment";
    submit.type = "submit";

    const ul = renderComments(comments);
    form.append(label, commentInput, submit);

    div.append(
      h2,
      breedP,
      img,
      likesP,
      likeBtn,
      superLikBtn,
      commentsP,
      ul,
      form
    );
    main.appendChild(div);
  }

  function renderComments(comments) {
    const ul = document.createElement("ul");
    comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment;
      ul.appendChild(li);
    });

    return ul;
  }
  //add coment to dog that is persisted, updates dom with/out page refresh
  function addComment(e) {
    let testDog;
    e.preventDefault();
    const id = e.target.parentNode.id;
    fetch(DOGSURL + "/" + id)
      .then((resp) => {
        console.log("first response", resp);
        return resp.json();
      })
      .then((dog) => {
        console.log("first dog fetch", dog);
        dog.comments.push(e.target.comment.value);
        testDog = dog.comments;
        console.log("testDog", testDog);
        console.log("dog with updated comments", dog.comments);

        fetch(DOGSURL + "/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application.json",
            Accept: "application/json",
          },
          body: JSON.stringify({ comments: testDog }),
        })
          .then((resp) => {
            console.log("Second response", resp);
            return resp.json();
          })
          .then((dog) => console.log(dog))
          .catch((err) => console.log(err.message));
      });
  }
  //add functionality to increase likes optimisitically

  //add super like button likes += 10, dealers choice on rendering

  //add form to html that allows a new dog to be created

  main.addEventListener("submit", addComment);
  getAllDogs();
});
