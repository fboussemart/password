db.users.drop();
db.users.insert({
    username: 'toto',
    password: '123'
});

db.cities.drop();
db.cities.insert([
    {name:"Dundalk",country:"Ireland"},
    {name:"Lodz",country:"Poland"},
    {name:"Lens",country:"France"}
]);