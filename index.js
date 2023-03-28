const app = require("./app");
const PORT = process.env.PORT || 3000;
const fetch = require('node-fetch')



app.listen(PORT, function () {
	console.log("listening on http://localhost:" + PORT);
});


//insert the json into the app, convert to obj, use api
let data = function () {
	const apiurl = `https://api.github.com/repos/ascholer/bjcp-styleview/contents/styles.json`
	fetch(apiurl)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			throw new Error('Network response was not ok.');
		})
		.then(data => {
			// parse
			const beerData = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
			//console.log(beerData);
			console.log(beerData[20].name)
		})
		.catch(error => {
			console.error('There was a problem fetching the JSON file:', error);
		});
}

data()

function search_beer() {
	const searchbar1 = document.querySelector('#searchbar1')
	const searchbar2 = document.querySelector('#searchbar2')
	const categoryList = document.getElementById('categories')
	const styleList = document.getElementById('styles')
	searchbar1.addEventListenter('input', (event) => {
		const input = event.target.value
		const options = categoryList.getElementById('category-option')
		options.forEach((option) => {
			if (option.value.toLowerCase().startsWith(input.toLowerCase())) {
				option.hidden = false
			} else {
				option.hidden = true
			}
		})
	})
	searchbar2.addEventListenter('input', (event) => {
		const input = event.target.value
		const styleOptions = styleList.getElementById('styles-option')
		styleOptions.forEach((styleOptions) => {
			if (styleOptions.value.toLowerCase().startsWith(input.toLowerCase())) {
				styleOptions.hidden = false
			} else {
				styleOptions.hidden = true
			}
		})
	})

}
