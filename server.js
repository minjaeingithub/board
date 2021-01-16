const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

let app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }, { useUnifiedTopology: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});
/*스키마 선언*/
const itemsSchema = {
  name: String,
};

/*아이템스키마를 몬구스모델에 복사*/    
const Item = mongoose.model("item", itemsSchema);

/*구현하려는 기능 함수 전 변수(3개) 설정*/
const item4 = new Item({
  name: "alksdjfl;akjsl;fkj",
})

const item1 = new Item({
  name: "Welcome to your todolist",
});

const item2 = new Item({
  name: "Hit the + button to add a new item",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item",
});

const defaultItems = [item1, item2, item3, item4];

//{} 모르겠씀, 함수 내용: error 구분
app.get("/", function (req, res) {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
      if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      });
      //성공하면 board.js(디폴트 화면)로 보내기
      res.redirect("/");
    } else { //투데이??
      res.render("board", {newListItems: foundItems});
    }
    if (err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  });
});
//data에 서브밋!!!!! create
app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({ name: itemName });

  item.save();

  res.redirect("/"); //db에 세이브하고 원래대로 respond
});

//check하면 딜리트 페이지로 보낸다!
app.post("/delete", function (req, res) {
  const checkedItemID = req.body.checkbox; 
  console.log(checkedItemID); 
  Item.findByIdAndRemove(checkedItemID, function (err) {
    if (!err) { //아까 선언한 함수에서 에러가 아니면
      console.log("successfully deleted"); //찐으로 딜리트됨
      res.redirect("/");//그리고 다시 원래페이지로 커몬
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
