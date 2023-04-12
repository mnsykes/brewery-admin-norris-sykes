async function removeRequest(e) {
	const requestId = e.target.getAttribute("data-request-id");

	await fetch(`/api/requests/${requestId}`, {
		method: "delete"
	});
	window.location.replace("/requests");
}
if (typeof document !== 'undefined') {
	for (const btn of document.querySelectorAll(".delete-btn")) {
		btn.onclick = removeRequest;

		// Manipulating the DOM here
	}

}

async function approveRequest(e) {
	const requestId = e.target.getAttribute("data-request-id");
	// console.log(requestId);
	await fetch(`/api/requests/${requestId}`, {
		method: "put"
	});
	window.location.replace("/requests");
}
if (typeof document !== 'undefined') {
	for (const btn of document.querySelectorAll(".approve-btn")) {
		btn.onclick = approveRequest;
	}
}

async function removeEmployee(e) {
	const employeeId = e.target.getAttribute("data-request-id");

	await fetch(`/api/employees/${employeeId}`, {
		method: "delete"
	});
	window.location.replace("/employees");
}
if (typeof document !== 'undefined') {
	for (const btn of document.querySelectorAll(".emp-action-btn")) {
		btn.onclick = removeEmployee;
	}
}



//filtering out names according to categories
async function filterStyles(e) {

	fetch("/stylesearch", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		body: {beerData}
	})
		.then(function (response) {
			return response.json();
		})

		.catch(function (error) {
			console.log(error);
		});

	const categoryDropdown = document.querySelector('#category-dropdown');
	const styleDropdown = document.querySelector('#style-dropdown');

	categoryDropdown.addEventListener('change', () => {

		console.log('clicked')
		const selectedCategory = categoryDropdown.value;
		const filteredData = beerData.filter(item => item.category === selectedCategory);
		const styleOptions = filteredData.map(item => `<option value="${item.name}" class="name-option">${item.name}</option>`).join('');
		styleDropdown.innerHTML = styleOptions;
	});
}

// Get the URL of the current page
const currentUrl = window.location.href;

// Listen for the page refresh event
window.addEventListener('refresh', () => {
  // Redirect the user back to the current page on refresh
  window.location.href = currentUrl;
});

