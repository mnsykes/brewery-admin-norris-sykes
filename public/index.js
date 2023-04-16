async function removeRequest(e) {
	const requestId = e.target.getAttribute("data-request-id");

	await fetch(`/api/requests/${requestId}`, {
		method: "delete"
	});
	window.location.replace("/requests");
}
if (typeof document !== "undefined") {
	for (const btn of document.querySelectorAll(".delete-btn")) {
		btn.onclick = removeRequest;

		// Manipulating the DOM here
	}
}

async function approveRequest(e) {
	const requestId = e.target.getAttribute("data-request-id");
	await fetch(`/api/requests/${requestId}`, {
		method: "put"
	});
	window.location.replace("/requests");
}
if (typeof document !== "undefined") {
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
if (typeof document !== "undefined") {
	for (const btn of document.querySelectorAll(".emp-action-btn")) {
		btn.onclick = removeEmployee;
	}
}

async function removeTap(e) {
	const tapId = e.target.getAttribute("data-request-id");

	await fetch(`/api/tapplan/now/${tapId}`, {
		method: "put"
	});
	window.location.replace("/tapplan");
}
if (typeof document !== "undefined") {
	for (const btn of document.querySelectorAll(".delete-btn-tapplan")) {
		btn.onclick = removeTap;

		
	}
}

async function removeTapNext(e) {
	const tapId = e.target.getAttribute("data-request-id");

	await fetch(`/api/tapplan/next/${tapId}`, {
		method: "put"
	});
	window.location.replace("/tapplan");
}
if (typeof document !== "undefined") {
	for (const btn of document.querySelectorAll(".delete-btn-tapplan-next")) {
		btn.onclick = removeTapNext;

		
	}
}