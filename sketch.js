var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFeed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed");
  feed.position(1000,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
   
  if(button.mousePressed(Feed))
  {
    for(var i=0;i<this.foodStock;i--)
    {
      if(i%10==0)
      {
        x=80;
        y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
    }
  }

  function readlastFed(data){
    feed=data.val();
    lastFeed.updateFoodStock(foodS);
  }
    
 
  //write code to display text lastFed time here
  
  var title=createElement("h2");
        title.html("Last Fed : ");
        title.position(130,0);

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updatelastFeed(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  updateFoodStock(foodS)
  {
      database.ref("/").update({
          foodStock:foods
      })
  }
  
  updatelastFeed(lastFeed)
  {
      database.ref("/").update({
          feed:lastFeed
      })
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
