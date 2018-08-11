_['app/tasks/tasksView'] = function initTasksView (data) {
   const {newEle, addActions, addEventPromise, doubleRAFPromise}  = _['app/lib']

   let numberOfTasks = data.length
   let minNumberOfLines = 4

   const _data = data.reduce((acc, cur)=>{
      acc.push(cur)
      return acc
   }, [])

   while(_data.length < minNumberOfLines) {
      _data.push(false)
   }

   const thisEle = newEle(`<div class="tasks">
      <div class="tasks__l-box">
         <div class="tasks__box">
            <div class="tasks__header">
               <button type="button" class="tasks__add" data-act="tasks_add">Add Task</button>
               <button type="button" class="tasks__config"></button>
            </div>
            <div class="tasks__body">
               <ul class="tasks__list">
                  ${renderTasks(_data)}
               </ul>
            </div>
         </div>
      </div>
      
   </div>`)

   function renderTasks (tasks) {
      return tasks.reduce((acc, cur)=>{
         const task = renderRow(cur)
         return acc + task
      }, '')
   }

   function renderRow (task) {
      return `<div class="tasks__row">
         ${task? renderTask(task): '<div class="task"></div>'}
      </div>`
   }

   function renderTask (task) {
      return `<li class="task" data-act="tasks_select" data-id="${task.id}">
         <button type="button" class="task__badge">
            <span class="task__badge-l">L</span>
         </button>
         <p class="task__text">${task.title}</p>
      </li>`
   }

   const tasksBox = thisEle.querySelector('.tasks__box')
   const tasksLBox = thisEle.querySelector('.tasks__l-box')
   const taskList = thisEle.querySelector('.tasks__list')
   const tasksLAside = newEle('<div class="tasks__l-aside"></div>')
   let asideEle = undefined //used by api.showAside() & api.hideAside()
   let selectedRowEle = undefined //used by api.selectTask() & api.unselectTask()

   addActions(tasksBox, {
      'tasks_add' () {
         //api.listeners.onAdd()
         console.log('add')
      },
      'tasks_select' (d) {
         //api.listeners.onSelect(d.id)
         console.log('select' + d.id)
      }
   })


   const api = {}

   api.addTask = (task) => {
      if(numberOfTasks < minNumberOfLines){
         const taskHtml = renderTask(task)
         const taskEle = newEle(taskHtml)
         const taskRowEle = taskList.children[numberOfTasks]
         taskRowEle.replaceChild(taskEle, taskRowEle.firstElementChild)
      }
      else{
         const lineHtml = renderRow(task)
         const lineEle = newEle(lineHtml)
         taskList.append(lineEle)
      }
      numberOfTasks++
   }

   api.removeTask = (id) => {
      const taskEle = taskList.querySelector(`[data-id="${id}"]`)
      const tasksRowEle = taskEle.parentElement
      const newEmptyRowEle = renderRow()
      taskList.replaceChild(newEmptyRowEle, tasksRowEle)
   }

   api.changeTask = (id, value) => {
      const taskTextEle = taskList.querySelector(`[data-id="${id}"] .task__text`)
      taskTextEle.innerText = value
   }
   
   api.showAside = async function (ele) {
      asideEle = ele
      const distanceFromLeft = tasksLBox.getBoundingClientRect().x

      tasksLBox.classList.add('transition_t')
      tasksLBox.style.willChange = `transform`
      tasksLBox.style.transform = `translateX(-${distanceFromLeft}px)`

      asideEle.classList.add('transition_t-o')
      asideEle.style.transform = `translateY(300px)`
      asideEle.style.opacity = '0'
      asideEle.style.willChange = `transform`
      tasksLAside.append(asideEle)
      
      await addEventPromise(thisEle, 'transitionend')
      tasksLBox.classList.remove('transition_t')
      tasksLBox.style.transform = ''

      thisEle.append(tasksLAside)
      
      await doubleRAFPromise()

      asideEle.style.transform = ''
      asideEle.style.opacity = '1'

      await addEventPromise(thisEle, 'transitionend')

      tasksLBox.style.willChange = ''

      asideEle.classList.remove('transition_t-o')
      asideEle.style.willChange = `transform`
      asideEle.style.transform = ''
      asideEle.style.opacity = '1'

   }

   api.removeAside = async function () {
      const fullWidth = thisEle.getBoundingClientRect().width
      const distanceToMiddle = (fullWidth * 0.45) / 2

      asideEle.classList.add('transition_t-o')
      asideEle.style.opacity = '0'
      asideEle.style.willChange = 'transform'
      
      await addEventPromise(thisEle, 'transitionend')

      tasksLAside.remove()
      asideEle.remove()

      asideEle.classList.remove('transition_t-o')
      asideEle.style.opacity = ''
      asideEle.style.willChange = ''
      asideEle = undefined

      tasksLBox.style.willChange = `transform`
      tasksLBox.style.transform = `translateX(-${distanceToMiddle}px)`

      await doubleRAFPromise()

      tasksLBox.classList.add('transition_t')
      tasksLBox.style.transform = ''

      await addEventPromise(thisEle, 'transitionend')

      tasksLBox.classList.remove('transition_t')
      tasksLBox.style.willChange = ''

   }

   api.selectTask = (id) => {
      if(selectedRowEle){
         selectedRowEle.classList.remove('tasks__row--selected')
         const tasksRowEleOnTop = selectedRowEle.previousElementSibling
         tasksRowEleOnTop && tasksRowEleOnTop.classList.remove('tasks__row--noborder')
      }

      const taskEle = taskList.querySelector(`[data-id="${id}"]`)
      const tasksRowEle = taskEle.parentElement
      tasksRowEle.classList.add('tasks__row--selected')
      
      const tasksRowEleOnTop = tasksRowEle.previousElementSibling
      tasksRowEleOnTop && tasksRowEleOnTop.classList.add('tasks__row--noborder') 
      
      selectedRowEle = tasksRowEle 
   } 

   api.unselectTask = () => {
      if(selectedRowEle){
         selectedRowEle.classList.remove('tasks__row--selected')
         selectedRowEle = undefined

         const tasksRowEleOnTop = selectedRowEle.previousElementSibling
         tasksRowEleOnTop && tasksRowEleOnTop.classList.remove('tasks__row--noborder')
      }
   }

   api.ele = thisEle

   return api
}


//function () { const elee = document.createElement('div'); elee.style.flexGrow = 1; elee.style.backgroundColor = 'red'; return elee}