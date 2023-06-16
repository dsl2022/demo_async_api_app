const BASE_URL = "https://fsa-puppy-bowl.herokuapp.com"
let isHidden = false
const COHORT_NAME = "2302-acc-pt-web-pt-e"
const list = document.getElementById("list")
const showButton  = document.getElementById("show")
async function getData(){
    try{
        const rawData =await fetch(`${BASE_URL}/api/${COHORT_NAME}/players`)
        const resultData = await rawData.text()
        const resultJsonData = JSON.parse(resultData)
        return resultJsonData.data.players
    }catch(error){
        console.error(error)
    }    
}

async function render(){
    const data = await getData()    
    data?.forEach(({name, breed,imageUrl})=>{
            const img = document.createElement("img")
            const li = document.createElement("li")
            const title = document.createElement('h4')
            const p = document.createElement('p')
            title.textContent = name
            p.textContent = breed
            img.src = imageUrl
            img.alt = name
            img.height = 500
            li.append(img)
            li.append(title)
            li.append(p)
            list.append(li)
        })
}


showButton.addEventListener("click", () => {
    isHidden = !isHidden;
    if (isHidden) {
      showButton.textContent = "Show Images";
      list.style.display = "none"; 
    } else {
      showButton.textContent = "Hide";
      list.style.display = "block";
      render();
    }
  });
  




