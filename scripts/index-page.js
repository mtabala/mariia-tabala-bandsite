// create an array with objects
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
]
//open the UL comments list in JS
const commentList = document.querySelector(".conversation__list"); 
//create new elements inside the UL
function createComment (comment) {
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
    commentDate.innerText = comment.date;

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
// loop through each object in the array 
for (let i = 0; i < commentsArr.length; i++) {
    createComment(commentsArr[i]);
}
//open the form in JS
const commentForm = document.querySelector (".conversation__form");
console.log (commentForm);
//add EventListener that submits and prevents page from reloading
commentForm.addEventListener ("submit", function(event) {
    event.preventDefault();
    console.log('click');
    
    const newMessage = {}

    newMessage.name = event.target.name.value;
    newMessage.comment = event.target.comment.value;
    newMessage.date = new Date ();

    commentsArr.push(newMessage);

    console.log (newMessage.name);
    //loops
    // for (i = 0; i < commentsArr.length; i++) {
    //     const element = commentsArr[i];
    //     console.log (element);
    // }

    //function renderComments () {
    //     for (let i = 0; i < 3; i ++) {
    //         commentsList(commentsArr[i]);
    //     }
    // }
});