//get DOM elements to work with 
const commentList = document.querySelector(".conversation__list"); //open the UL comments list in JS
const commentForm = document.querySelector (".conversation__form"); //open the form in JS
const apiURL = "https://project-1-api.herokuapp.com";
const apiKey = "72d05541-4135-49b5-b1b2-880a28baad10";
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

    const commentLikeWrap = document.createElement("div");
    commentLikeWrap.classList.add ("conversation__btn-like-wrap");

    const commentBtnLike = document.createElement("button");
    commentBtnLike.classList.add ("conversation__button");
    commentBtnLike.classList.add ("conversation__button--like");
//create event listener to count likes
    commentBtnLike.addEventListener("click", () => {
        axios
          .put(`${apiURL}/${target}/${comment.id}/like?api_key=${apiKey}`)
          .then((response) => {
            comment.likes++;
            commentLikes.innerText = comment.likes;
          })
          .catch((error) => {
            console.log("error: ", error);
          });
    });

    const commentLikes = document.createElement("div");
    commentLikes.classList.add("conversation__likes");
    commentLikes.innerText = comment.likes;

    const commentBtnDelete = document.createElement("button");
    commentBtnDelete.classList.add ("conversation__button");
    commentBtnDelete.classList.add ("conversation__button--delete");
//create event listener for the delete button
    commentBtnDelete.addEventListener("click", () => deleteComment(comment.id, commentItem));
    
// append created elements to ul
    commentItem.appendChild(commentDivImg);
    commentBtnWrap.appendChild(commentLikeWrap);
    commentLikeWrap.appendChild(commentBtnLike);
    commentLikeWrap.appendChild(commentLikes);
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
  
// Check if the submit button was clicked
    if (event.submitter.id === 'submit-comment-btn') {
      const nameInput = document.getElementById("name");
      const commentInput = document.getElementById("comment");
  
// Add the "invalid" class if either input is empty
      if (!nameInput.value.trim() || !commentInput.value.trim()) {
        nameInput.classList.add('invalid');
        commentInput.classList.add('invalid');
      }
      else {
// Remove the "invalid" class if both inputs have a value
        nameInput.classList.remove('invalid');
        commentInput.classList.remove('invalid');
//post comments to the page
        const commentInfo = {
          name: event.target.name.value,
          comment: event.target.comment.value,
        };
  
        axios
          .post(`${apiURL}/${target}?api_key=${apiKey}`, commentInfo)
          .then((response) => {
            getComments();
  
// clear the form after submission
            event.target.name.value = "";
            event.target.comment.value = "";
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      }
    }
});
//function to delete comments
function deleteComment(commentId, commentItem) {
    axios
        .delete(`${apiURL}/${target}/${commentId}?api_key=${apiKey}`)
        .then(() => {
// remove comment from DOM
            commentList.removeChild(commentItem); 
        })
        .catch((error) => {
            console.log("error: ", error);
        });
}