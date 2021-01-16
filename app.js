const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

let app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

app.get("/", function (req, res) {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      });
      res.redirect("/");
    } else {
      res.render("board", { listTitle: "Today", newListItems: foundItems });
    }
    if (err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({ name: itemName });

  item.save();

  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checkedItemID = req.body.checkbox;
  console.log(checkedItemID);
  Item.findByIdAndRemove(checkedItemID, function (err) {
    if (!err) {
      console.log("successfully deleted");
      res.redirect("/");
    }
  });
});

app.get("/work", function (req, res) {
  res.render("board", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
