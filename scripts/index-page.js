//get DOM elements to work with 
const commentList = document.querySelector(".conversation__list"); //open the UL comments list in JS
const commentForm = document.querySelector (".conversation__form"); //open the form in JS
const apiURL = "https://project-1-api.herokuapp.com";
const apiKey = "6621de2c-5d7f-49e0-ad3e-6ba13f94538c";
const target = "comments"
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
    const dateObj = new Date(comment.timestamp); // create a Date object from the date string for the timeSince function
    commentDate.innerText = timeSince(dateObj);

    const commentText = document.createElement("p");
    commentText.classList.add ("conversation__comment-text");
    commentText.innerText = comment.comment;

    const commentBtnWrap = document.createElement("div");
    commentBtnWrap.classList.add ("conversation__btn-wrap");

    const commentBtnLike = document.createElement("button");
    commentBtnLike.classList.add ("conversation__button");
    commentBtnLike.classList.add ("conversation__button--like");

    const commentBtnDelete = document.createElement("button");
    commentBtnDelete.classList.add ("conversation__button");
    commentBtnDelete.classList.add ("conversation__button--delete");
    
// append created elements to ul
    commentItem.appendChild(commentDivImg);
    commentBtnWrap.appendChild(commentBtnLike);
    commentBtnWrap.appendChild(commentBtnDelete);
    commentDiv2.appendChild(commentName);
    commentDiv2.appendChild(commentDate);
    commentDiv1.appendChild(commentDiv2);
    commentDiv1.appendChild(commentText);
    commentDiv1.appendChild(commentBtnWrap);
    commentItem.appendChild(commentDiv1);
    commentList.appendChild(commentItem);
}
//use axios to fetch data from the API 
function getComments () {
    axios
    .get(`${apiURL}/${target}?api_key=${apiKey}`)
    .then((response) => {
        console.log (response);
        const data = response.data;

        commentList.innerHTML = "";

        data.sort((a,b) => new Date (b.timestamp) - new Date (a.timestamp))

        data.forEach ((comment) => {
            displayComment(comment);
        });
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}
getComments ()
//use axios to post data to the API 
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const commentInfo = {
      name: event.target.name.value,
      comment: event.target.comment.value,
    };

    axios
    .post(`${apiURL}/${target}?api_key=${apiKey}`, commentInfo)
    .then((response) => {
      getComments()

      // clear the form after submission
      event.target.name.value = "";
      event.target.comment.value = "";
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});