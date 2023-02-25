//get DOM elements to work with
const showsList = document.querySelector(".shows__list"); 
const apiURL = "https://project-1-api.herokuapp.com";
const apiKey = "6621de2c-5d7f-49e0-ad3e-6ba13f94538c";
const target = "showdates"
//create new elements inside the UL
function createList (list) {
    const showsItem = document.createElement ("li");
    showsItem.classList.add("shows__item");

    const showsDiv = document.createElement ("div");
	showsDiv.classList.add ("shows__content");

    const showsSubheader1 = document.createElement ("p");
	showsSubheader1.classList.add ("shows__subheader")
	showsSubheader1.innerText = "DATE";

    const showsDate = document.createElement ("p");
    const dateObj = new Date (list.date);
	showsDate.classList.add ("shows__text");
	showsDate.classList.add ("shows__text--date");
	showsDate.innerText = dateObj.toDateString();

    const showsSubheader2 = document.createElement ("p");
	showsSubheader2.classList.add ("shows__subheader")
	showsSubheader2.innerText = "VENUE";

    const showsVenue = document.createElement ("p");
	showsVenue.classList.add ("shows__text");
	showsVenue.innerText = list.place;

    const showsSubheader3 = document.createElement ("p");
	showsSubheader3.classList.add ("shows__subheader")
	showsSubheader3.innerText = "LOCATION";

    const showsLocation = document.createElement ("p");
	showsLocation.classList.add ("shows__text");
	showsLocation.innerText = list.location;

    const showsButton = document.createElement ("a");
	showsButton.classList.add ("shows__button");
	showsButton.innerText = "BUY TICKET";

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
// for (let i = 0; i < showsInfo.length; i++) {
//     createList(showsInfo[i]);
// }
//use axios to fetch data from the API 
function getShowList () {
    axios
    .get(`${apiURL}/${target}?api_key=${apiKey}`)
    .then((response) => {
        console.log (response);
        const data = response.data;

        showsList.innerHTML = "";

        data.sort((a,b) => new Date (b.timestamp) - new Date (a.timestamp))

        data.forEach ((list) => {
            createList(list);
        });
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}
getShowList ()