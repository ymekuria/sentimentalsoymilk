app.post('/trips', function(req,res){
  var tripItem = new TripItems(
    {name: req.body.name,
     address: req.body.address,
     notes: req.body.notes,
     category: req.body.category,
     rating: req.body.rating,
     phone: req.body.phone,
     url : req.body.url
    }
  )
  tripItem.save();
  res.sendStatus(200);
})


app.get('/trips', function(req,res){
  TripItems.find(function (err, tripitems) {
    res.send(200, tripitems);
  })
})

app.post('/signup', function(req,res) {
  var user = new User({
    username : req.body.username,
    password : req.body.password
  })

  user.save();
  res.sendStatus(200);
})

app.get('/signup', function(req,res) {
  User.find(function (err, tripitems) {
    res.send(200, tripitems);
  })
})