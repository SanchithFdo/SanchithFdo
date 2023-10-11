function theme_Black() {
    var body = document.getElementById("main");
    body.style.backgroundColor = "black";
    body.style.color = "white";
    body.style.transition = "1s";
    getElementById("container").style.border = "1px solid white";
}
function theme_blue() {
    var body = document.getElementById("main");
    body.style.backgroundColor = "rgb(29, 31, 92)";
    body.style.color = "white";
    body.style.transition = "1s";
    getElementById("container").style.border = "1px solid white";
}

function theme_white() {
    var body = document.getElementById("main");
    body.style.backgroundColor = "white";
    body.style.color = "black";
    body.style.transition = "1s";
    getElementById("container").style.border = "1px solid black";
}

function text_small() {
    var body = document.getElementById("main");
    body.style.fontSize = 14 + "px";
}

function text_medium() {
    var body = document.getElementById("main");
    body.style.fontSize = 16 + "px";
}

function text_large() {
    var body = document.getElementById("main");
    body.style.fontSize = 18 + "px";
}

// Get the container element
var container = document.getElementsByClassName("container")[0];

// Get the Image text element
var imgText = document.getElementById("imgtext");

// Get all the column elements
var columns = document.getElementsByClassName("column");

// Loop through each column element
for (var i = 0; i < columns.length; i++) {
    // Add a click event listener to the column element
    columns[i].addEventListener("click", function () {
        // Get the image element and its alt text
        var img = this.getElementsByTagName("img")[0];
        var alt = img.alt;

        // Get the image description element and its text
        var desc = this.getElementsByClassName("img_desc")[0];
        // var text = desc.getElementsByTagName("p")[0].innerHTML;
        var text = desc.innerHTML;

        // Set the src and alt attributes of the expanded image
        var expandedImg = container.getElementsByTagName("img")[0];
        expandedImg.src = img.src;
        expandedImg.alt = alt;

        // Set the text in the imgtext element
        imgText.innerHTML = text;

        //Show the border for the expd image
        container.classList.add("show-border");

        // Show the container element
        container.style.display = "block";
    });
}

// Add a click event listener to the close button
var closeBtn = document.getElementsByClassName("closebtn")[0];
closeBtn.addEventListener("click", function () {
    container.style.display = "none";
    container.classList.remove("show-border");
});
