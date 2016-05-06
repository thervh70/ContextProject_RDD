const adapter = new DatabaseAdapter("http://localhost:8000", 1, 1);
adapter.log(1, 1, new Date(), 100, function() {
    console.log("yay!");
}, function() {
    console.log("awwh...");
});
