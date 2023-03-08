async function removeRequest(e) {
	const requestId = e.target.getAttribute("data-request-id");

	await fetch(`/api/requests/${requestId}`, {
		method: "delete"
	});
	window.location.replace("/requests");
}

for (const btn of document.querySelectorAll(".action-btn")) {
	btn.onclick = removeRequest;
}
