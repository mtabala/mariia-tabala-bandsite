// create an array with objects
const showsInfo = [
    {
    subheader1: "date",
    subheader2: "venue",
    subheader3: "location",
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },
    
    {
    subheader1: "date",
    subheader2: "venue",
    subheader3: "location",
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },
    
    {
    subheader1: "date",
    subheader2: "venue",
    subheader3: "location",
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },
    
    {
    subheader1: "date",
    subheader2: "venue",
    subheader3: "location",
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },
    
    {
    subheader1: "date",
    subheader2: "venue",
    subheader3: "location",
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },
    
    {
    subheader1: "date",
    subheader2: "venue",
    subheader3: "location",
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
    button: "Buy Tickets"
    },
]
//open the UL in JS
const showsList = document.querySelector(".shows__list"); 
//create new elements inside the UL
function createList (list) {
    const showsItem = document.createElement ("li");
    showsItem.classList.add("shows__item");

    const showsDiv = document.createElement ("div");
	showsDiv.classList.add ("shows__content");

    const showsSubheader1 = document.createElement ("p");
	showsSubheader1.classList.add ("shows__subheader")
	showsSubheader1.innerText = list.subheader1;

    const showsDate = document.createElement ("p");
	showsDate.classList.add ("shows__text");
	showsDate.classList.add ("shows__text--date");
	showsDate.innerText = list.date;

    const showsSubheader2 = document.createElement ("p");
	showsSubheader2.classList.add ("shows__subheader")
	showsSubheader2.innerText = list.subheader2;

    const showsVenue = document.createElement ("p");
	showsVenue.classList.add ("shows__text");
	showsVenue.innerText = list.venue;

    const showsSubheader3 = document.createElement ("p");
	showsSubheader3.classList.add ("shows__subheader")
	showsSubheader3.innerText = list.subheader3;

    const showsLocation = document.createElement ("p");
	showsLocation.classList.add ("shows__text");
	showsLocation.innerText = list.location;

    const showsButton = document.createElement ("a");
	showsButton.classList.add ("shows__button");
	showsButton.innerText = list.button;

// append created elements to ul
    showsDiv.appendChild(showsSubheader1);
    showsDiv.appendChild(showsDate);
    showsDiv.appendChild(showsSubheader2);
    showsDiv.appendChild(showsVenue);
    showsDiv.appendChild(showsSubheader3);
    showsDiv.appendChild(showsLocation);
    showsDiv.appendChild(showsButton);
    showsItem.appendChild(showsDiv);
    showsList.appendChild(showsItem);
//add event listener to modify the row when clicked
    showsItem.addEventListener ("click", (event) => {
        const allShowItems = document.querySelectorAll('.shows__item');
        allShowItems.forEach (show => show.classList.remove ('shows__item--selected'));
        event.currentTarget.classList.add ("shows__item--selected"); 
    });
}
// loop through each object in the array 
for (let i = 0; i < showsInfo.length; i++) {
    createList(showsInfo[i]);
}