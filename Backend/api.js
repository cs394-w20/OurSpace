app.post('/get_listings', (req, res) => {
    const searchParameter = req.body.parameter;
    const pageNumber = req.body.page;
    const listingsPer = req.body.listingsPer;
    const skipNumber = pageNumber * listingsPer;
    listings.find(req.body.parameter).limit(listingsPer).skip(skipNumber)   
});
