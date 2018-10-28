const game = document.getElementById("game");
        const context = game.getContext("2d");
        const numEnemies = 5; //COUNT(enemies) can change it into any other number
        const background = new Image();  
        background.src = 'https://vignette.wikia.nocookie.net/disney/images/4/43/Zootopia_City_Full.jpg/revision/latest?cb=20160102163923';
  
        const lenivec = new Image();
        lenivec.src = "http://www.youloveit.ru/uploads/gallery/main/861/youloveit_ru_zveropolis_kartinki86.png";
        
        const enemiesImg = new Image();
        enemiesImg.src = "https://png2.kisspng.com/20180530/hjo/kisspng-fan-art-work-of-art-drawing-chief-bogo-5b0e8c6d739333.1006385015276801094734.png";
        const floorY = game.height - 350; //the ground
        const randomchoose = function(num) {
          return Math.floor(Math.random() * num)+1; 
        };
        const enemies = []; //empty array for later use
        const gameData = {
            hero  : {
              x       : 100,
              y       : floorY,
              width   : 250,
              img     : lenivec,
              height  : 200,
              xDelta  : 0,
              yDelta  : 15
            },
            
        };
  
       
        const leftKey = 37;
        const upKey = 38;
        const rightKey = 39;
        const downKey = 40;
        addEventListener('keydown', function(event) {
    
            const hero = gameData.hero;
    
            if(event.keyCode === rightKey) {
                hero.x = hero.x + 10;
                  if(hero.x >= game.width - hero.width){
                      hero.x = 0; //from the end to the start
                }
            }
              else if(event.keyCode === leftKey) {
                  hero.x = hero.x - 10;
                  if(hero.x <= 0){
                      hero.x = game.width - hero.width; //from the end to the start
                }
          
            
              } 
              else if (event.keyCode === upKey) {
                  hero.y = hero.y - hero.yDelta;
                  if(hero.y <= 0) {
                    hero.y = game.height - hero.height;
                  }
              }
                 
              
              else if (event.keyCode === downKey) {
                  hero.y = hero.y + hero.yDelta;
                  if(hero.y >= game.height - hero.height) {
                    hero.y = 0;
                  }
              }
                 
              
      
        }, false); 
        const forEach = function(arr, func){
            const helper = function(index){
                if (index === arr.length){
                return;
                }
          
                func(arr[index]);
          
                helper(index + 1);
            };
            helper(0);
          
        };
    
        const createEnemies = function(count, w, h) {
       
            if(count === 0) {
                return;
        }
            enemies.push({
              x      : randomchoose(w - 20), //for random x
              y      : randomchoose(h - 20), //for random y
              width  : 70,
              height : 80,
              xDelta : 2,
              yDelta : 4,
              img    : enemiesImg
            });
      
            createEnemies(count-1, w, h);
        };
      
        createEnemies(numEnemies, game.width, game.height);
        const collision = function() { // to figure out when objects have common points
            
            const hero = gameData.hero;
      
  
            forEach(enemies, function(enemy){
        
                  if((hero.x <= enemy.x && enemy.x <= hero.x + hero.width) ||
                      (hero.x <= enemy.x + enemy.width &&  enemy.width + enemy.x <= hero.x + hero.width)){
                      if((hero.y <= enemy.y && enemy.y <= hero.y + hero.height) ||
                          (hero.y <= enemy.y + enemy.height &&  enemy.height + enemy.y <= hero.y + hero.height)) {
                              let bool = confirm("Game Over!!!"); 
                              if(bool) {
                                location.reload();
                               //you loose
                              }
                      enemies.splice(0, enemies.length);
              
                      }
                  }
            });
        };
      
     
        const draw = function() {
    
            context.drawImage(background, 0, 0, game.width, game.height);
   
            const hero = gameData.hero;
            context.drawImage(lenivec, hero.x, hero.y, hero.width, hero.height);
            
            forEach(enemies, function (enemy) {
                context.drawImage(enemiesImg, enemy.x, enemy.y, enemy.width, enemy.height)
            });
        };
   
        const update = function() {
            forEach(enemies, function(enemy) { //onctopi going randomly
                if(enemy.x >= game.width - enemy.width){
                    enemy.xDelta = - randomchoose(6);
                } else if(enemy.x <= 0){
                      enemy.xDelta = randomchoose(6);
                  }
            
                if(enemy.y >= game.height - enemy.height){
                    enemy.yDelta = -6;
                } else if(enemy.y <= 0){
                      enemy.yDelta = 6;
            }
            enemy.x += enemy.xDelta;
            enemy.y += enemy.yDelta;
        
            });
            collision()
               }
           
    
        const loop = function() {
            draw();
            update();
            requestAnimationFrame(loop);
    
        };
  
        loop();
  
 
  