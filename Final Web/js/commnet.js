/* JavaScript */
// When the DOM content is loaded, set up event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get references to the form and popup elements
    var form = document.getElementById("form");
    var popup = document.getElementById("popup");

    // Add event listener to the form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form field values
        var fullName = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var navigate = document.getElementById("subject").value;
        var satisfaction = document.querySelector('input[name="Satisfaction"]:checked');
        var feedback = document.getElementById("query").value;

        // Check if all required fields are filled
        if (fullName === "" || email === "" || navigate === "" || satisfaction === null || feedback === "") {
            alert("Please fill in all the required fields.");
            return;
        }

        // Prepare mailto link with form data
        var mailtoLink =
            "mailto:dasiru.20223300@iit.ac.lk" +
            "?subject=" + encodeURIComponent("Feedback Submission-Lanka Planet") +
            "&body=" +
            encodeURIComponent(
                "Full Name: " + fullName + "\n" +
                "Email: " + email + "\n" +
                "Navigation Rating: " + navigate + "\n" +
                "Satisfaction: " + satisfaction.value + "\n" +
                "Feedback: " + feedback
            );

        // Update popup content with a thank-you message and mailto link
        var popupContent = document.getElementById("popup");
        popupContent.innerHTML = '<img src="images/right-tick.png" alt="Right Tick">' +
            '<h2>Thank You!</h2>' +
            '<p>Your details have been successfully submitted.</p>' +
            '<a href="' + mailtoLink + '"><span>Click here<span></a>to open your email application.';

        // Show the popup
        popup.classList.add("open-popup");
    });

    // Function to close the popup
    function closePopup() {
        popup.classList.remove("open-popup");
    }
});






