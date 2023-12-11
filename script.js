const gameboard =document.getElementById('game-board')
let direction = 'right'

let snake_pos= [{x:10,y:10}]

let snake_head = createElement('div','snake-body')
document.getElementById('snake').appendChild(snake_head)
// let snake_head = snake_pos[0]

snake_head.style.gridColumn = snake_pos[0].x
snake_head.style.gridRow = snake_pos[0].y
// console.log('============',snake_pos[0].x)





// food 
let food  = createElement('div','food')
let food_pos = {x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)} 

food.style.gridColumn = food_pos.x
food.style.gridRow = food_pos.y

// food


gameboard.appendChild(food)


console.log(food_pos)



function collisson(){
    if (snake_pos[0].x == 21 || snake_pos[0].y ==21 || snake_pos[0].x == -1 || snake_pos[0].y ==-1  ){
        // console.log('x========',snake_pos[0].x)
        // console.log('y========',snake_pos[0].y)
        console.log('Breaking')
        clearInterval(runtime)
    }
    let new_snake_body = snake_pos.slice(1,snake_pos.length-1)
    console.log(new_snake_body)
    for (let i in new_snake_body){
        console.log(new_snake_body[i])
        // console.log(i)
        // console.log('x=======',i.x)
        // console.log('y=======',i.y)
        if(new_snake_body[i].x==snake_pos[0].x && new_snake_body[i].y==snake_pos[0].y ){
            
            console.log('Colllisson')
            clearInterval(runtime)
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
    
    // console.log(snake_pos[0].x,snake_pos[0].y)
    // snake_pos.push(food_pos)
    
    if ((snake_pos[0].x==food_pos.x )&&(snake_pos[0].y==food_pos.y )){
        console.log('hit')
        console.log(food_pos)
        snake_pos.push(snake_pos[0])



        food_pos.x = Number(Math.floor(Math.random()*20))+1
        food_pos.y = Number(Math.floor(Math.random()*20))+1

        food.style.gridColumn = food_pos.x
        food.style.gridRow = food_pos.y

        console.log(Number(document.getElementById('curr-score').innerText)+1)
        document.getElementById('curr-score').innerText=Number(document.getElementById('curr-score').innerText)+1 
        // console.log(text)
        // text = Number(text)+1
        

        // 
    }
    else{
        snake_pos.pop()
        let SNAKE = document.getElementById('snake')
        SNAKE.removeChild(SNAKE.firstElementChild)
    }
    collisson()
}



console.log(food_pos)

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




function createElement(tag,className){
    const element=document.createElement(tag)
    element.className = className
    element.id = className
    return element
}



function gameTrigger(){

    if(document.getElementById('start-screen').style.display=='none'){

        document.getElementById('start-screen').style.display='block'
        document.getElementById('snake').style.display='none'


    }else{
        document.getElementById('start-screen').style.display='none'
        document.getElementById('snake').style.display='grid'
        
    }


}
// let startpage = createElement('div','start-page')
// startpage.style.height='400px'
// startpage.style.width='400px'
// gameboard.appendChild(startpage)
// document.getElementById('snake').style.display='none'
let runtime = setInterval(()=>{
    mover()
    listener()
},200)