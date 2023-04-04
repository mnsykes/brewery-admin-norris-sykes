const { application } = require('express');
const { text } = require('stream/consumers');
const { router } = require('../app');
const app = require('../app');

app.use('/public', (req, res, next) => {
	if (req.url.endsWith('.json')) {
	  res.setHeader('Content-Type', 'application/json');
	}
	next();
  });

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


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

function getData() {
	var input = document.getElementById('searchbar1')
	var filter = input.value.toUpperCase();
	var ul = document.getElementById("myUL")
	var li = ul.getElementsByTagName('li')

	for(i=0; i < li.length; i++) {
		tag = li[i].getElementsByTagName("a")[0]
		textValue = a.textContent || a.innerText
		if (textValue.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none"
		}
		
	}
}



// function search_beer() {
// 	const searchbar1 = document.getElementById('searchbar1')
// 	const searchbar2 = document.getElementById('searchbar2')
// 	const categoryList = document.getElementById('categories')
// 	const styleList = document.getElementById('styles')
// 	searchbar1.addEventListener('input', (event) => {
// 		const input = event.target.value
// 		const options = categoryList.querySelectorAll('#category-option')
// 		options.forEach((option) => {
// 			if (option.value.toLowerCase().startsWith(input.toLowerCase())) {
// 				option.hidden = false
// 			}
// 			if (option.value = "") {
// 				option.hidden = false
// 			} else {
// 				option.hidden = true
// 			}
// 		})
// 	})
// 	searchbar2.addEventListener('input', (event) => {
// 		const input = event.target.value
// 		const styleOptions = styleList.querySelectorAll('#styles-option')

// 		const checkForCat = function () {
// 			const beer = beerData[i]
// 			for(i = 0; i < beerData.length; i++) {
// 				//the category must apply to the name of the style
// 				if(searchbar1.value == beer.category) {
// 					if(beer.includes(styleOptions.style[i])) {
// 						styleOptions[i].hidden = false
// 					} else {
// 						styleOptions[i].hidden = true
// 					}
// 				}
// 			}
// 		}

// 		checkForCat()

	
// 		styleOptions.forEach((style) => {
// 			checkForCat()
// 			if (style.value.toLowerCase().startsWith(input.toLowerCase())) {
// 				style.hidden = false
// 			}
// 			if (style.value = "") {
// 				style.hidden = false
// 			} else {
// 				style.hidden = true
// 			}
// 		})
// 	})

// }
// search_beer()

//should only be doing put and delete requests
