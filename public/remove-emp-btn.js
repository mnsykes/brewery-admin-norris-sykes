await fetch(`/api/employees/${employeeId}`, {
    method: "delete"
})
window.location.replace

async function removeButton(e) {
	const employeeId = e.target.getAttribute("data-request-id");

	await fetch(`/api/employees/:${employeeId}`, {
		method: "delete"
	});
	window.location.replace("/employees");
}
if (typeof document !== 'undefined') {
	for (const btn of document.querySelectorAll(".delete-btn")) {
		btn.onclick = removeButton;
	}
}