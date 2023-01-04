const link = 'https://jsonplaceholder.typicode.com/todos'
const getButton = document.querySelector('#get')
const todoList = document.querySelector('#todo-list')
const modal = document.querySelector('.modal')
const modalBlock = document.querySelector('.modal-block')
const modalText = document.querySelector('.modal-text')
const addButton = document.querySelector('#add')
const form = document.querySelector('form')
const formModal = document.querySelector('.form-modal')
const closeButton = document.querySelector('#close')
const textarea = document.querySelector('#title')

function sendRequest(url, method = 'GET', body, headers = {'Content-Type': 'application/json'}) {
  return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
  }).then(response => {
      return response.json()
  })
}

function createElement(tag, className) {
  const element = document.createElement(tag)
  element.classList.add(className)
  return element
}

function completeTask(li) {
  modalLoading()
  const patchLink = `${link}/${li.id}`
  sendRequest(patchLink, 'PATCH', {completed: true})
      .then(() => {
          modalSuccess()
          li.classList.remove('unfinished')
          li.add('finished')
        })
        .catch(() => modalError())
        .finally(() => modalHide())
  }
  
  function deleteTask(li) {
    modalLoading()
    const patchLink = `${link}/${li.id}`
    sendRequest(patchLink, 'DELETE')
        .then(() => {
            modalSuccess()
            li.remove()
        })
        .catch(() => modalError())
        .finally(() => modalHide())
  }
  
  function modalLoading() {
    modal.classList.add('shown')
    modalBlock.classList.add('loading')
    modalText.textContent = 'Loading...'
  }
  
  function modalSuccess() {
    modalBlock.classList.add('success')
    modalText.textContent = 'Success!'
  }
  
  function modalError() {
    modalBlock.classList.add('error')
    modalText.textContent = 'Error!'
  }
  
  function modalHide() {
    setTimeout(() => {
        modalBlock.classList.remove('error')
        modalBlock.classList.remove('success')
        modal.classList.remove('shown')
    }, 2000)
  }
  
  function createTask(todo) {
    let li
    const button = createElement('button', 'todo-button')
    const p = createElement('p', 'todo-text')
    
    if (todo.completed) {
        li = createElement('li', 'finished')
        button.addEventListener('click', () => {
            deleteTask(li)
        })
    } else { li = createElement('li', 'unfinished')
    button.addEventListener('click', () => {
        completeTask(li)
        button.addEventListener('click', () => {
            deleteTask(li)
        })
    })
}
li.id = todo.id

p.textContent = todo.title
li.append(button, p)

return li
}

getButton.addEventListener('click', () => {
modalLoading()
todoList.innerHTML = ''
sendRequest(link)
    .then(todos => {
        modalSuccess()
        addButton.classList.remove('hidden')
        todos.forEach(todo => {
            const task = createTask(todo)
            todoList.append(task)
        })
    })
    .catch(() => modalError())
    .finally(() => modalHide())
})

addButton.addEventListener('click', () => {
formModal.classList.add('shown')
})

form.addEventListener('submit', e => {
e.preventDefault()
modalLoading()
sendRequest(link, 'POST', {title: textarea.value, completed: false})
    .then(todo => {
        modalSuccess()
        todoList.append(createTask(todo))
        textarea.value = ''
    })
    .catch(() => modalError())
    .finally(() => modalHide())
})