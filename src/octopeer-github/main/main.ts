const adapter = new DatabaseAdapter("http://localhost:8000", 1, 1);
adapter.post(1, new Date(), 100, function() {
    console.log("yay!");
});
