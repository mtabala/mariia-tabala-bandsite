//get DOM elements to work with 
const commentList = document.querySelector(".conversation__list"); //open the UL comments list in JS
const commentForm = document.querySelector (".conversation__form"); //open the form in JS
const apiURL = "https://project-1-api.herokuapp.com";
const apiKey = "6621de2c-5d7f-49e0-ad3e-6ba13f94538c";
const target = "comments"
// create an array with objects to push to and render to DOM
const commentsArr = [
    {
    name: "Connor Walton",
    date: "02/17/2021",    
    comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    },

    {
    name: "Emilie Beach",
    date: "01/09/2021",    
    comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    },

    {
    name: "Miles Acosta",
    date: "12/20/2020",    
    comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    },    
];
//add even listener to submit the new comment and push it to the array
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    commentList.innerText = '';    

    const newCommentEntry = {
        name: event.target.name.value,
        comment: event.target.comment.value,
        date: Date.now()
    }
    commentsArr.push(newCommentEntry);
    
    //sort comments by date
    commentsArr.sort((a,b) => new Date (b.date) - new Date (a.date));

    clearComments(commentList);
    event.target.reset(); //clears the form

    for (let i =0; i < 3; i++) {
        displayComment(commentsArr[i]);
    }
});
// create a function to clear comments
function clearComments (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
//use a function for a better date format that uses date object as an input and returns a string aka time that passed since the date up to the current time
function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
  
    if (interval >= 1) {
      return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
  
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
  
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
  
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
  
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
  
    return Math.floor(seconds) + " second" + (Math.floor(seconds) === 1 ? "" : "s") + " ago";
  };  
//create a function that takes in new comment and displays it on the page using DOM
function displayComment (comment) {    

    const commentItem = document.createElement("li");
    commentItem.classList.add("conversation__item");

    const commentDivImg = document.createElement("div");
    commentDivImg.classList.add("conversation__img");

    const commentDiv1 = document.createElement("div");
    commentDiv1.classList.add ("conversation__comment");

    const commentDiv2 = document.createElement("div");
    commentDiv2.classList.add ("conversation__comment-header");

    const commentName = document.createElement("p");
    commentName.classList.add ("conversation__name");
    commentName.innerText = comment.name;

    const commentDate = document.createElement("p");
    commentDate.classList.add ("conversation__date");
    const dateObj = new Date(comment.date); // create a Date object from the date string for the timeSince function
    commentDate.innerText = timeSince(dateObj);

    const commentText = document.createElement("p");
    commentText.classList.add ("conversation__comment-text");
    commentText.innerText = comment.comment;
// append created elements to ul
    commentItem.appendChild(commentDivImg);
    commentDiv2.appendChild(commentName);
    commentDiv2.appendChild(commentDate);
    commentDiv1.appendChild(commentDiv2);
    commentDiv1.appendChild(commentText);
    commentItem.appendChild(commentDiv1);
    commentList.appendChild(commentItem);
}

for (let i =0; i < 3; i++) {
    displayComment(commentsArr[i]);
}