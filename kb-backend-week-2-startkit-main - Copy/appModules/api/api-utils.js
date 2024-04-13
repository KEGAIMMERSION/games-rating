async function getData(url){
   try{
        const response = await fetch(url)
        const data = await response.json()
        return data
   }catch(error){
    console.log(error)
   }
}

function getRandomGame(array){
   const randomIndex = Math.floor(Math.random() * array.length)
   return array[randomIndex]
}


module.exports = {getData, getRandomGame}