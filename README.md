# We need to build a Dog Liking website!

This website should allow people to like pictures of dogs, submit new dogs, update dogs in both the front end and the back (persisting the data to the json file included). 

## Setup

To begin, first start your json server by running 
```json-server --watch db.json```

Once you can confirm that your server is hosting the data at http://localhost:3000/dogs, you should open up your index.html page in your browser. You can then begin to work with the index.js file to meet the deliverables. 


## Deliverables

1. Import all dogs in the database so that they load into the page. The structure for each dog should look like this once it is loaded into the HTML:
```html
    <div id='1'>
            <p>Norma</p>
            <p>Italian Greyhound</p>
            <img src='https://3.bp.blogspot.com/-uCd3eT8_AgA/XCZ-qnZIbXI/AAAAAAAATgQ/G8t6mwyZeIwb9OtUd2tEuasstpXsJgWlQCLcBGAs/s1600/IMG_3613l.JPG'></img>
            <p>Likes: 15</p>
            <p>Comments:</p>
            <ul>
                <li>God's perfect idiot</li>
                <li>Everyone loves her</li>
                <li>I'm literally going to steal this dog</li>
            </ul>
            <form>
                <label>Add Comment:</label>
                <input placeholder='text here' type='text' name='comment'></input>
                <input type='submit'></input>
            </form>
        </div>
```