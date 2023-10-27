function xWins(first, second, third){
    if (first === second && second === third){
        console.log("WINNER")
        console.log(`${first} === ${second}`)
    } else {
        console.log("no winner")
    }
}

arr = ["x", "x", "x"]

xWins(arr[0], arr[1], arr[2])