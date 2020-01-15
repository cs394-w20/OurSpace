import TestData from "./assets/data/listings.json";

function pushTestData() {
	for (let i = 0; i < TestData.length; i++){
		setTimeout(() => {
			console.log(i);
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
		}, 3000 * i);
	}
}

export default pushTestData;