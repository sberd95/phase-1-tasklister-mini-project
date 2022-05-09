document.addEventListener("DOMContentLoaded", () => {
  // your code here
  document.getElementById('create-task-form').addEventListener('submit', addToList)
  //add a listener to initiate add to list function

  // making a dropdown menu with 3 options
  const dropDown = document.createElement('select')
  const dropOp1 = document.createElement('option')
  const dropOp2 = document.createElement('option')
  const dropOp3 = document.createElement('option')
  dropDown.textContent = 'Select Priority'
  dropDown.id = 'level'
  dropOp1.textContent = 'Low'
  dropOp2.textContent = 'Medium'
  dropOp3.textContent = 'High'
  //putting it together and adding it on to the end of the form
  dropDown.appendChild(dropOp1)
  dropDown.appendChild(dropOp2)
  dropDown.appendChild(dropOp3)
  document.getElementById('create-task-form').appendChild(dropDown)

  //adding a owner/author entry field
  const input = document.createElement('input')
  input.placeholder = 'owner'
  input.id = 'owner'
  document.getElementById('new-task-description').insertAdjacentElement('afterend', input)

  //adding a sort button with a click listener
  const sort = document.createElement('button')
  sort.textContent = 'Sort:'
  sort.addEventListener('click', toggleSort)
  document.getElementById('tasks').insertAdjacentElement('afterend', sort)

  //adding a triple click event listener to the body of the page
  document.body.addEventListener('click', (e) => {
    if (e.detail === 3) {
      alert('Color Change!')
      let r = Math.floor(Math.random()*255)
      let g = Math.floor(Math.random()*255)
      let b = Math.floor(Math.random()*255)
      //generating and applying a random rgb color set
      document.querySelector('body').style.color = `rgb(${r}, ${g}, ${b})`
      document.querySelector('body').style.background = `rgb(${255-r}, ${255-g}, ${255-b})`
    }
  })

  //Main function in charge of adding task to list: options for priority, owner, description
  function addToList(e) {
    //stopping page refresh and getting the dropdown menu priority
    e.preventDefault()
    const level = document.querySelector('#level').value

    //creating a task li element and buttons
    const task = document.createElement('li')
    const span = document.createElement('span')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
    span.id = 'task'
    btn1.textContent = 'X'
    btn2.textContent = 'Edit'
    //adding click listeners to the buttons with associated fns
    btn1.addEventListener('click', removeFromList)
    btn2.addEventListener('click', editList)
    
    //putting the text entry field into the list item, setting the background color to white
    span.textContent = `${e.target.querySelector('#new-task-description').value}`
    //putting an id based on given task onto the li element
    let keyGen = e.target.querySelector('#new-task-description').value.split(' ')
    let keyCode = ''
    //generating part of a unique id tag based on the first letter of each word of the task
    for (let word of keyGen) {
      keyCode+= word.charAt(0)
    }
    const date = new Date()
    const secId = date.getMilliseconds()
    //adding to the id based on current milliseconds to prevent duplication
    task.id = `${keyCode + secId}`

    //correlating selected priority to assign color for element
    if (level === 'Low') {
      span.style.color = 'green'
      task.classList.add('1')
    }
    else if (level === 'Medium') {
      span.style.color = 'yellow'
      task.classList.add('2')
    }
    else if (level === 'High') {
      span.style.color = 'red'
      task.classList.add('3')
    }

    //adding the buttons onto the span item
    task.appendChild(span)
    task.appendChild(btn1)
    task.appendChild(btn2)
    //getting the owner info and adding it to the end of the list item
    const owner = document.getElementById('owner').value
    if (owner !== '') {
      const spanOwner = document.createElement('span')
      spanOwner.textContent = `Owner: ${owner}`
      task.appendChild(spanOwner)
    }
    //resetting the text fields, adding the task to list
    e.target.reset()
    document.getElementById('tasks').appendChild(task)
  }

  //simple removal of item
  function removeFromList(e) {
    e.target.parentNode.remove()
  }

  //fn features text entry popup but currently deletes existing buttons after edit
  function editList(e) {
    let input = prompt('Enter new task', '')
    console.log(e.target)
    console.log(e.target.parentNode)
    e.target.parentNode.querySelector('#task').innerText = input
  }

  //fn only changes the sorting method displayed on button
  function toggleSort(e) {
    if (e.target.textContent === 'Sort: Descending') {
      e.target.textContent = 'Sort: Ascending'
      const tempTaskList = [...document.querySelectorAll('#tasks li')]
      const sortTaskList = tempTaskList.sort((a,b) => {
        return parseInt(a.classList[0]) - parseInt(b.classList[0])
      })
      document.querySelector('#tasks').replaceChildren()
      sortTaskList.forEach(task => document.querySelector('#tasks').appendChild(task))
    }
    else {
      e.target.textContent = 'Sort: Descending'
      const tempTaskList = [...document.querySelectorAll('#tasks li')]
      const sortTaskList = tempTaskList.sort((a,b) => {
        return parseInt(b.classList[0]) - parseInt(a.classList[0])
      })
      document.querySelector('#tasks').replaceChildren()
      sortTaskList.forEach(task => document.querySelector('#tasks').appendChild(task))
    }
  }
});
