window.onload = gallery;

var currentImg = -1;
var images;

function gallery() {
	images = document.querySelectorAll("#picbar img");
	for (var i = 0; i < images.length; i++) {
		images[i].onclick = toggleOverlay;
		//add a number to each image
		images[1].setAttribute("data-number", i);
	}

	/*console shows if javascript is connected*/
	console.log("working!");
	document.querySelector("#next").onclick = nextImg;
	document.querySelector("#back").onclick = lastImg;
}

/***********************************************************************************************/

/*opens picture overlay*/
function toggleOverlay() {
	/*searches for and assigns variable to IDs*/
	var overlay = document.getElementById('overlay');
	var large = document.getElementById('large');

	overlay.style.display = "block";
	large.style.display = "block";

	currentImg = this.getAttribute("data-number");

	var slash = this.src.lastIndexOf("/");
	var under = this.src.lastIndexOf("_");
	var name = this.src.substring(slash, under);
	var newImageTag = '<img src="images/large' + name + '_.jpg">';
	document.querySelector("#bigpic").innerHTML = newImageTag;

	/*create closeoverlay function*/
	document.getElementById("close").onclick = closeOverlay;

}

/*clickable background that closes the overlay*/
function closeOverlay() {
	overlay.style.display = "none";
}


function nextImg() {
	currentImg++;
	if (currentImg > images.length - 1) {
		currentImg = 0;
	}
	createImg();
}

function lastImg() {
	currentImg--;
	if (currentImg < 0) {
		currentImg = images.length - 1;
	}
	createImg();
}

function createImg() {
	var slash = images[currentImg].src.lastIndexOf("/")
	var under = images[currentImg].src.lastIndexOf("_")
	var name = images[currentImg].src.substring(slash, under);
	var newImageTag = '<img src="images/large' + name + '_.jpg">';

	document.querySelector("#bigpic").innerHTML = newImageTag
}


/*******************************************************************/

/*	JS Media Queries to allow overlay to be viewed on smaller screen without clicking the images first*/
var mq = window.matchMedia("screen and (max-width: 960px)");

/*if screen size matched */
if (mq.matches) {
	document.getElementById("overlay").style.display = "block";
	document.getElementById("close").style.display = "none";
	createImg();
}