function shuffle(array) {
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

module.exports = { shuffle };