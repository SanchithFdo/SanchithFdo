// payments calculation//
//getting the input values//

document.getElementById("form").addEventListener("submit", function(event) {
	event.preventDefault();

	const formData = new FormData(event.target);
	const name = formData.get("name");
	const email = formData.get("email");

	console.log("Name:", name);
	console.log("Email:", email);
});

const adults = document.getElementById("people-adults");
const children = document.getElementById("people-children");
const total = document.getElementById("total");

const priceAdult = 9500
const priceChildren = 4750

function updateTotal() {
	const numberofAdults = parseInt(adults.value)|| 0;
	const numberofChildren = parseInt(children.value)|| 0;

	const totalAmount = (numberofAdults * priceAdult) + (numberofChildren * priceChildren);

	total.textContent = "Your Total: Rs. " + totalAmount;

}

window.addEventListener("load", updateTotal);

adults.addEventListener("input", updateTotal);
children.addEventListener("input", updateTotal);

