const adapter = new DatabaseAdapter("http://localhost:8000");
adapter.post(1, new Date(), 100, function() {
    console.log("yay!");
});
