import TestData from "./assets/data/listings.json";

function pushTestData() {
	console.log('running')
	for (let i = 0; i < TestData.length; i++){
		console.log(TestData[i]);
		fetch('http://localhost:4000/post_listing', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({newListing: TestData[i]})
		})
		.then(response => console.log(response.status))

		console.log('posting')
	}
}

export default pushTestData;