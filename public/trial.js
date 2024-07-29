const API_URL = "http://localhost:3000/"

console.log("Running");
fetch( API_URL + "info/get_all_prices").then((data) => {
    console.log(data);
}).catch(err => {
    console.log(`Error -> `, err);
})
