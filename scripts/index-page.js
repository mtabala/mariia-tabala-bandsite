// create an array for the comments
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
//open the UL comments list from HTML in JS
const commentsList = document.querySelector(".conversation__list"); 
// function createList (list)
function createList (list) {
    const commentsLi = document.createElement ("li");
    commentsLi.classList.add("conversation__item");

    const commentsDivImg = document.createElement ("div");
	commentsDivImg.classList.add ("conversation__img");

    const commentsDiv = document.createElement ("div");
	commentsDiv.classList.add ("conversation__comment");

}

// loop through each object in the commentsArr array 
for (let i = 0; i < commentsArr.length; i++) {
    createList(commentsArr[i]);
  }