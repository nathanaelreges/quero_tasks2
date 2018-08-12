_['app/tasks/tasksView'] = function initTasksView (data) {
   const {newEle, addActions, addEventPromise, doubleRAFPromise}  = _['app/lib']

   let numberOfTasks = data.length
   let minNumberOfLines = 12
   

   const _data = data.reduce((acc, cur)=>{
      acc.push(cur)
      return acc
   }, [])

   while(_data.length < minNumberOfLines) {
      _data.push(false)
   }



   /*
   * Elements
   */
   const thisEle = newEle(`<div class="tasks">
      <div class="tasks__l-box">
         <div class="tasks__box">
            <div class="tasks__header">
               <button type="button" class="tasks__add" data-act="tasks_add">Add Task</button>
               <button type="button" class="tasks__config"></button>
            </div>
            <div class="tasks__body">
               <ul class="tasks__list">
               </ul>
            </div>
         </div>
      </div>
      
   </div>`)

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
         <p class="task__text"></p>
      </li>`
   }

   const tasksBox = thisEle.querySelector('.tasks__box')
   const tasksLBox = thisEle.querySelector('.tasks__l-box')
   const taskList = thisEle.querySelector('.tasks__list')
   const tasksLAside = newEle('<div class="tasks__l-aside"></div>')
   let asideEle = undefined //used by api.showAside() & api.hideAside()
   let selectedRowEle = undefined //used by api.selectTask() & api.unselectTask()


   const listOfRows = _data.map(item => {
      const rowObj = getRowEle(item)
      taskList.append(rowObj.ele)
      return rowObj
   })






   addActions(tasksBox, {
      'tasks_add' () {
         api.listeners.onAdd()
      },
      'tasks_select' (d) {
         api.listeners.onSelect(+d.id)
      }
   })


   const api = {}

   api.addTask = (task) => {
      if(numberOfTasks < minNumberOfLines){
         const newRowObj = getRowEle(task)
         const oldRowObj = listOfRows[numberOfTasks]
         taskList.replaceChild(newRowObj.ele, oldRowObj.ele)

         listOfRows[numberOfTasks] = newRowObj
      }
      else {
         const newRowObj = getRowEle(task)
         taskList.append(newRowObj.ele)

         listOfRows.push(newRowObj)
      }
      numberOfTasks++
   }

   api.removeTask = (index) => {
      const rowEle = listOfRows[index].ele
      const newEmptyRowEle = renderRow()
      taskList.replaceChild(newEmptyRowEle, rowEle)
      listOfRows.splice(index, 1)
   }

   api.changeTask = (index, value) => {
      const taskTextEle = listOfRows[index].text
      taskTextEle.innerText = value
   }

   api.selectTask = (index) => {
      if(selectedRowEle){
         selectedRowEle.classList.remove('tasks__row--selected')
         const rowEleOnTop = selectedRowEle.previousElementSibling
         rowEleOnTop && rowEleOnTop.classList.remove('tasks__row--noborder')
      }

      const rowEle = listOfRows[index].ele
      rowEle.classList.add('tasks__row--selected')
      
      const rowEleOnTop = rowEle.previousElementSibling
      rowEleOnTop && rowEleOnTop.classList.add('tasks__row--noborder') 
      
      selectedRowEle = rowEle 
   } 

   api.unselectTask = () => {
      if(selectedRowEle){
         selectedRowEle.classList.remove('tasks__row--selected')
      
         const rowEleOnTop = selectedRowEle.previousElementSibling
         rowEleOnTop && rowEleOnTop.classList.remove('tasks__row--noborder')

         selectedRowEle = undefined
      }
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



   api.ele = thisEle

   return api


   function getRowEle (data) {
      const rowHtml = renderRow(data)
      const rowEle = newEle(rowHtml)
      const obj = {ele: rowEle}
      
      if(data){
         const textEle = rowEle.querySelector('.task__text')
         textEle.innerText = data.title
         obj.text = textEle
      }

      return obj
   }

}
