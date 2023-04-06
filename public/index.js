async function removeRequest(e) {
	const requestId = e.target.getAttribute("data-request-id");

	await fetch(`/api/requests/${requestId}`, {
		method: "delete"
	});
	window.location.replace("/requests");
}

for (const btn of document.querySelectorAll(".delete-btn")) {
	btn.onclick = removeRequest;
}

async function approveRequest(e) {
	const requestId = e.target.getAttribute("data-request-id");
	// console.log(requestId);
	await fetch(`/api/requests/${requestId}`, {
		method: "put"
	});
	window.location.replace("/requests");
}

for (const btn of document.querySelectorAll(".approve-btn")) {
	btn.onclick = approveRequest;
}

async function removeEmployee(e) {
	const employeeId = e.target.getAttribute("data-request-id");

	await fetch(`/api/employees/${employeeId}`, {
		method: "delete"
	});
	window.location.replace("/employees");
}

for (const btn of document.querySelectorAll(".emp-action-btn")) {
	btn.onclick = removeEmployee;
}

// let gitdata = fetch(`https://api.github.com/repos/ascholer/bjcp-styleview/contents/styles.json`)
// 	.then((d) => d.json())
// 	.then((d) => fetch(`https://api.github.com/repos/ascholer/bjcp-styleview/git/blobs/styles.json`))
// 	.then((d) => d.json())
// 	.then((d) => JSON.parse(atob(d.content)));
// console.log(gitdata);
