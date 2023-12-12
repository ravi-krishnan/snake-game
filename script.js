let game_started = 0
let direction ='right'
let gameboard = document.getElementById('game-board')
let pad = "000"
function createElement(tag,className){
    const element=document.createElement(tag)
    element.className = className
    element.id = className
    return element
}


function startGame(){

    game_started=1

    let snake_pos = [{x:10,y:10}]
    let snake_head = createElement('div','snake-body')
    document.getElementById('snake').appendChild(snake_head)

    snake_head.style.gridColumn = snake_pos[0].x
    snake_head.style.gridRow = snake_pos[0].y

    let food  = createElement('div','food')
    let food_pos = {x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)} 

    food.style.gridColumn = food_pos.x
    food.style.gridRow = food_pos.y

    // food


    gameboard.appendChild(food)
    
    document.getElementById('end-screen').style.display = 'none'
    document.getElementById('start-screen').style.display = 'none'
    document.getElementById('snake').style.display = 'grid'

    function collisson(){
        if (snake_pos[0].x == 21 || snake_pos[0].y ==21 || snake_pos[0].x == -1 || snake_pos[0].y ==-1  ){
            // console.log('x========',snake_pos[0].x)
            // console.log('y========',snake_pos[0].y)
            console.log('Breaking')
            clearInterval(runtime)
            stopGame()
        }
        let new_snake_body = snake_pos.slice(1,snake_pos.length-2)
        console.log(new_snake_body)
        for (let i in new_snake_body){
            console.log(new_snake_body[i])
            // console.log(i)
            // console.log('x=======',i.x)
            // console.log('y=======',i.y)
            if(new_snake_body[i].x==snake_pos[0].x && new_snake_body[i].y==snake_pos[0].y ){
                
                console.log('Colllisson')
                // clearInterval(runtime)
                stopGame()
            }
        }
    
    }
    function mover(){
        //  moving the snake head based on direction
        switch (direction){
            case 'right':
                var new_body  = createElement('div','snake-body')
                new_body.style.gridColumn = Number(snake_pos[0].x)+1
                new_body.style.gridRow = snake_pos[0].y
                document.getElementById('snake').appendChild(new_body)
                snake_pos.unshift({x:new_body.style.gridColumn,y:new_body.style.gridRow})
    
                // document.getElementById('snake-body').style.gridColumn++
                break
            case 'left':
                var new_body  = createElement('div','snake-body')
                new_body.style.gridColumn = Number(snake_pos[0].x)-1
                new_body.style.gridRow = snake_pos[0].y 
                document.getElementById('snake').appendChild(new_body)
                snake_pos.unshift({x:new_body.style.gridColumn,y:new_body.style.gridRow})
    
                // document.getElementById('snake-body').style.gridColumn--
                // .style.gridColumn--
                break  
            case 'down':
                var new_body  = createElement('div','snake-body')
                new_body.style.gridColumn = snake_pos[0].x 
                new_body.style.gridRow = Number(snake_pos[0].y)+1
                document.getElementById('snake').appendChild(new_body)
                snake_pos.unshift({x:new_body.style.gridColumn,y:new_body.style.gridRow})
    
                // document.getElementById('snake-body').style.gridRow++
                // .style.gridRow++
                break 
            case 'up':
                var new_body  = createElement('div','snake-body')
                new_body.style.gridColumn = snake_pos[0].x 
                new_body.style.gridRow = Number(snake_pos[0].y)-1
                document.getElementById('snake').appendChild(new_body)
                snake_pos.unshift({x:new_body.style.gridColumn,y:new_body.style.gridRow})
    
                // document.getElementById('snake-body').style.gridRow--
                // .style.gridRow--
                break          
        } 
        
        if ((snake_pos[0].x==food_pos.x )&&(snake_pos[0].y==food_pos.y )){
            console.log('hit')
            console.log(food_pos)
            snake_pos.push(snake_pos[0])

            food_pos.x = Number(Math.floor(Math.random()*20))+1
            food_pos.y = Number(Math.floor(Math.random()*20))+1
    
            food.style.gridColumn = food_pos.x
            food.style.gridRow = food_pos.y

            let value = ""+1
    
            console.log(Number(document.getElementById('curr-score').innerText)+1)
            document.getElementById('curr-score').innerText=Number(document.getElementById('curr-score').innerText)+1 
            // let current_score  = document.getElementById('curr-score').innerText
            // let new_score = pad.substring(0,pad.length-current_score.length)+value
            // document.getElementById('curr-score').innerText = new_score
        }
        else{
            snake_pos.pop()
            let SNAKE = document.getElementById('snake')
            SNAKE.removeChild(SNAKE.firstElementChild)
            collisson()
        }
        
    }
     
    let runtime = setInterval(()=>{
        mover()

    },200)


}
function stopGame(){
    game_started=0
    document.getElementById('end-screen').style.display = 'grid'
    document.getElementById('start-screen').style.display = 'grid'
    document.getElementById('snake').style.display = 'none'
    // let snake_exist = document.getElementById('snake-body')
    let exist_body = document.querySelectorAll('.snake-body')
    
    exist_body.forEach(body=>{
        body.remove()
    })

    let food=document.getElementById('food')
    food.remove()
    // snake_exist.remove()
    let high_score = document.getElementById('high-score').textContent
    let score = document.getElementById('curr-score').textContent
    if (Number(score)>Number(high_score)){
        document.getElementById('high-score').textContent = score
    }
}
function gameTrigger(){
    if(game_started==0){
        console.log('starting game')
        // game_started=1
        startGame()
    }
    else if (game_started==1){
        console.log('stopping game')
        // game_started=0
        stopGame()
    }


}
function listener(){
    document.addEventListener('keydown',(event)=>{
        var name  = event.key
        // var code = event
        switch (event.key){
            
            case ' ':
                // console.log('SPAACEEE')
                gameTrigger()
                break
            case 'ArrowUp':
                direction = 'up'
                // console.log('iisas')
                break
            case 'ArrowDown':
                direction = 'down'
                break
            case 'ArrowLeft':
                direction = 'left'
                break
            case 'ArrowRight':
                direction = 'right'
                break
            
        }
        // console.log('=============')
        // console.log(code)
        // ArrowUp , ArrowDown , ArrowLeft , ArrowRight
    })
}
listener()
