function changeArrayIndexes(array) {
    const newArray = [ ...array ];

    var m = newArray.length, t, i;
    while (m > 0) 
    {
      i = Math.floor(Math.random() * m--);
      t = newArray[m];
      newArray[m] = newArray[i];
      newArray[i] = t;
    }

    return newArray;
}

function shuffle(array) {
    let resultOfShuffling = changeArrayIndexes(array);
    let shuffleBad = array.some((user, index) => {
        if (array[index].id === resultOfShuffling[index].id) return true;
    });
    
    while (shuffleBad) {
        resultOfShuffling = changeArrayIndexes(array);
    
        shuffleBad = array.some((user, index) => {
            if (array[index].id === resultOfShuffling[index].id) return true;
        });
    }

    return resultOfShuffling;
}



module.exports = { shuffle };