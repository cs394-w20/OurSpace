import TestData from "./assets/data/listings.json";

for (let i = 0; i < TestData.length; i++){
	fetch('http://localhost:4000/post_listing', {
		method: 'POST',
		body: JSON.stringify(TestData[i])
	})
	.then(response => console.log(response.status))
}