var axiosConfig = {
  headers: {
    authorization: "Bearer " + localStorage.getItem("token")
  }
}

function login(){
  var emailField = document.getElementById("email")
  var passwordField = document.getElementById("password")

  var email = emailField.value
  var password = passwordField.value

  axios.post("http://localhost:4000/auth", {
    email,
    password
  }).then(res => {
    var token = res.data.token
    localStorage.setItem("token", token)
    axiosConfig.headers.authorization = "Bearer " + localStorage.getItem("token")
    alert("Login realizado com sucesso!")
    location.reload()
  }).catch(err => {
    alert("Login incorreto!")
  })
}

function logout(){
  localStorage.removeItem("token")
  alert("Deslogado com sucesso!")
  location.reload()
}

const createBtn = document.getElementById("createBtn")
const updateBtn = document.getElementById("updateBtn")
createBtn.addEventListener("click", createGame)
updateBtn.addEventListener("click", updateGame)

function createGame() {
  const titleInput = document.getElementById("title")
  const yearInput = document.getElementById("year")
  const priceInput = document.getElementById("price")

  const game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  }
  axios
    .post("http://localhost:4000/game", game, axiosConfig)
    .then((response) => {
      if (response.status == 200) {
        alert("Game cadastrado!")
        location.reload()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function deleteGame(listItem) {
    const id = listItem.getAttribute("data-id")
    axios.delete("http://localhost:4000/game/" + id, axiosConfig).then(response => {
        alert("Game deletado!")
        location.reload()
    }).catch(err => {
        console.log(err)
    })
}

function loadForm(listItem) {
  const id = listItem.getAttribute("data-id")
  const title = listItem.getAttribute("data-title")
  const year = listItem.getAttribute("data-year")
  const price = listItem.getAttribute("data-price")
  document.getElementById("idEdit").value = id
  document.getElementById("titleEdit").value = title
  document.getElementById("yearEdit").value = year
  document.getElementById("priceEdit").value = price
}

function updateGame() {
  const idInput = document.getElementById("idEdit")
  const titleInput = document.getElementById("titleEdit")
  const yearInput = document.getElementById("yearEdit")
  const priceInput = document.getElementById("priceEdit")

  const game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  }

  var id = idInput.value

  axios
    .put("http://localhost:4000/game/" + id, game, axiosConfig)
    .then((response) => {
      if (response.status == 200) {
        alert("Game atualizado!")
        location.reload()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}


axios
  .get("http://localhost:4000/games",axiosConfig)
  .then((response) => {
    const games = response.data.games
    const list = document.getElementById("games")

    games.forEach((game) => {
      let item = document.createElement("li")

      item.setAttribute("data-id", game._id)
      item.setAttribute("data-title", game.title)
      item.setAttribute("data-year", game.year)
      item.setAttribute("data-price", game.price)

      item.innerHTML = `<h3>${game.title}</h3>
        <p>Preço: R$ ${game.price}</p> 
        <p>Ano: ${game.year}</p>
        <p>ID: ${game._id}</p>`

      var deleteBtn = document.createElement("button")
      deleteBtn.innerHTML = "Deletar"
      deleteBtn.classList.add("btn")
      deleteBtn.classList.add("btn-danger")
      deleteBtn.classList.add("mb-3")
      deleteBtn.addEventListener("click", function(){
        deleteGame(item)
      })

      var editBtn = document.createElement("button")
      editBtn.innerHTML = "Editar"
      editBtn.classList.add("btn")
      editBtn.classList.add("btn-warning")
      editBtn.classList.add("mb-3")
      editBtn.addEventListener("click", function(){
        loadForm(item)
      })
  
      item.appendChild(deleteBtn)
      item.appendChild(editBtn)
      list.appendChild(item)
    })
  })
  .catch((error) => {
    console.log(error)
  })
