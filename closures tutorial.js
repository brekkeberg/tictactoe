// CLOSURES are...
// Closures are the ability of a child function, or an inner function,
// to access variables from a higher level scope even after
//  the functions have been called or closed or closed over.
// this is done by assigning the outer function (which contains the inner functions)
// to a variable of its own (outside of the outer function)
// and then returning the inner function in the outer function

// CLOSURES EXAMPLE - private variables
// this is useful because it allows us to maintain multiple "games" at once

function createGame(gameName){
    let score = 0;

    function win(){
        score ++;
        return `Your name ${gameName} score is ${score}`
    }
    return win
}

const hockeyGame = createGame("Hockey");
const basketballGame = createGame('basketball');





// CLOSURES EXAMPLE - intermediate example
// makes outer function that takes greeting argument
// outer function returns the innner function

// inner function returns an uppercase version of greeting 
// the name argument that is passed to it

// closure assigns the outer function to a variable
// while passing an argument for the outer function
// eg: sayHello

// when sayHello is called with an argument, that argument goes to the inner func
// because the inner func is what was assigned to the closure variable



function createGreeting(greeting = ""){
    const myGreet = greeting.toUpperCase();

    const nameFunc = function(name){
        return `${myGreet} ${name}`;
    };
    return nameFunc
}

const sayHello = createGreeting('Hello');
const sayHey = createGreeting('Hey');
const noGreet = createGreeting();

console.log(sayHello("brekke"))

//CLOSURES EXAMPLE - same as above, just different syntax 
// (does not name the inner function)

function createGreeting2(greeting = ""){
    const myGreet = greeting.toUpperCase();

    return function(name){
        return `${myGreet} ${name}`;
    };
}










// CLOSURES - basic example
// What you can do is stick a function into a variable, and then at a later point in time, you can have access to that function.
// A closure comes into play because you can access the function even though the outer function is done.

//it's just assigning the innner functions (which are returned as output from the outer function, to the variable)

function outer(){
    const outerVar = "Hey I am the outer var";
    function inner(){
        const innerVar = "Hey I am the inner var"
        console.log(innerVar);
        console.log(outerVar);
    }
    function inner2(){
        const innerVar = "Hey I am the inner var1231231"
        console.log(innerVar);
        console.log(outerVar);
    }
    return {inner, inner2};
}

const innerFn = outer();

console.log(outer())
console.log(innerFn);
console.log(innerFn.inner);
console.log(innerFn.inner());
console.log(innerFn.inner2());







const dog = "snickers";

function logDog(){
    console.log(dog);
}

function go(){
    const dog = 'sunny';
    logDog();
}

go();



