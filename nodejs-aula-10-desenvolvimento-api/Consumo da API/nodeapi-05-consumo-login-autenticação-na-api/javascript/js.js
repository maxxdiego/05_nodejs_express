var axiosConfig = {
  headers: {
    authorization: "Bearer " + localStorage.getItem("token")
  }
}

// Função de login
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

// Função de logout
function logout(){
  localStorage.removeItem("token")
  alert("Deslogado com sucesso!")
  location.reload()
}

// Capturando o botão de cadastrar
const createBtn = document.getElementById("createBtn")
// Escuta ao evento click no botão
createBtn.addEventListener("click", createGame)

// Capturando o botão de editar
const updateBtn = document.getElementById("updateBtn")
// Escuta ao evento click no botão
updateBtn.addEventListener("click", updateGame)

// Enviando uma requisição GET para API para listar todos os games
axios.get("http://localhost:4000/games", axiosConfig).then((response) => {
    const games = response.data.games
    const listGames = document.getElementById("games")

    games.forEach((game) => {
      let item = document.createElement("li")

      // Setando os atributos ID, título, price e descrição para cada game
      item.setAttribute("data-id", game._id)
      item.setAttribute("data-title", game.title)
      item.setAttribute("data-year", game.year)
      item.setAttribute("data-price", game.price)
      
      item.innerHTML = `<h4>${game.title}</h4>
        <p>Descrição: ${game.year}</p> 
        <p>price: ${game.price}</p>
        <p>ID: ${game._id}</p>`

        var deleteBtn = document.createElement("button")
        deleteBtn.innerHTML = "Deletar"
        deleteBtn.classList.add("btn", "btn-danger", "mb-3")
        deleteBtn.addEventListener("click", () => {
          deleteGame(item)
        })

        var editBtn = document.createElement("button")
        editBtn.innerHTML = "Editar"
        editBtn.classList.add("btn", "btn-warning", "mb-3")
        editBtn.addEventListener("click", function(){
          loadForm(item)
        })

        item.appendChild(deleteBtn)
        item.appendChild(editBtn)
        listGames.appendChild(item)
      })
    }).catch((error) => {
      console.log(error)
    })

// Função para CADASTRAR games
function createGame() {

  const form = document.getElementById("createForm");
  form.addEventListener("submit", function(event) {
  event.preventDefault() // Evita o envio padrão do formulário
  })

  const titleInput = document.getElementById("title")
  const yearInput = document.getElementById("year")
  const priceInput = document.getElementById("price")

  const game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  }
  axios.post("http://localhost:4000/game", game, axiosConfig).then((response) => {
      if (response.status == 201) {
        alert("Game cadastrado!")
        location.reload()
      }
    }).catch((err) => {
      console.log(err)
    })
}

// Função para DELETAR games
function deleteGame(listItem) {
  const id = listItem.getAttribute("data-id")
  axios.delete(`http://localhost:4000/game/${id}`, axiosConfig).then(response => {
      alert("Game deletado!")
      location.reload()
  }).catch(err => {
      console.log(err)
  })
}

// Função para carregar formulário de edição
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

// Função para ALTERAR games
function updateGame() {
  const form = document.getElementById("editForm");
  form.addEventListener("submit", function(event) {
  event.preventDefault() // Evita o envio padrão do formulário
  })

  const idInput = document.getElementById("idEdit")
  const titleInput = document.getElementById("titleEdit")
  const yearInput = document.getElementById("yearEdit")
  const priceInput = document.getElementById("priceEdit")
  
  const game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value
  }

  var id = idInput.value

  axios.put(`http://localhost:4000/game/${id}`, game, axiosConfig).then((response) => {
      if (response.status == 200) {
        alert("Game atualizado!")
        location.reload()
      }
    }).catch((err) => {
      console.log(err)
    })
}