
function getWinningLanes(){
    const top = ["X","","O"]
    const mid = ["X","",""]
    const btm = ["","",""]

    return {top, mid, btm}
}

const x = getWinningLanes();

for (const [key, value] of Object.entries(x)) {
    console.log(key, value);
    if (value.includes("X")){
        console.log("INCLUDES X")
        console.log(key)
    }
}