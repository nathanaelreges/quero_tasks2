_['app/tasks/listView'] = function initListView (data) {
   const {newEle, addActions}  = _['app/lib']

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
   const thisEle = newEle(`<div class="list__box">
      <div class="list__header">
         <button type="button" class="list__add" data-act="list_add">Add Task</button>
         <button type="button" class="list__config"></button>
      </div>
      <div class="list__body">
         <ul class="list__list">
         </ul>
      </div>
   </div>`)

   function renderRow (task) {
      if(task){
         return `<div class="list__row drag-spot" data-act="list_select" data-id="${task.id}">
            <button rel="button" class="list__drag" data-id="${task.id}">...<br/>...</button>
            ${renderTask()}
            <span class="list__arrow">></span>
         </div>`
      }
      else {
         return `<div class="list__row list__row--empty">
            <div class="task"></div>
         </div>`
      }
   }

   function renderTask () {
      return `<li class="task" >
         <button type="button" class="task__badge">
            <span class="task__badge-l">L</span>
         </button>
         <p class="task__text"></p>
         <button type="button" class="task__assign"></button>
      </li>`
   }


   const listEle = thisEle.querySelector('.list__list')
   let selectedRowEle = undefined //used by api.selectTask() & api.unselectTask()


   const listOfRows = _data.map(item => {
      const rowObj = getRowEle(item)
      listEle.append(rowObj.ele)
      return rowObj
   })



   addActions(thisEle, {
      'list_add' () {
         api.listeners.onAdd()
      },
      'list_select' (d) {
         api.listeners.onSelect(+d.id)
      } 
   })

   handleDragging ()




   const api = {}

   api.addTask = (task) => {
      if(numberOfTasks < minNumberOfLines){
         const newRowObj = getRowEle(task)
         const oldRowObj = listOfRows[numberOfTasks]
         listEle.replaceChild(newRowObj.ele, oldRowObj.ele)

         listOfRows[numberOfTasks] = newRowObj
      }
      else {
         const newRowObj = getRowEle(task)
         listEle.append(newRowObj.ele)

         listOfRows.push(newRowObj)
      }
      numberOfTasks++
   }

   api.reOrder = (fromIndex, toIndex) => {
      const rowEle = listOfRows[fromIndex].ele
      const targetRowEle = listOfRows[toIndex].ele
      listEle.insertBefore(rowEle, targetRowEle)
      
      const item = listOfRows.splice(fromIndex, 1)[0]
      fromIndex<toIndex && --toIndex
      listOfRows.splice(toIndex, 0, item)
   }


   api.removeTask = (index) => {
      const rowEle = listOfRows[index].ele
      const newEmptyRowEle = renderRow()
      listEle.replaceChild(newEmptyRowEle, rowEle)
      listOfRows.splice(index, 1)
   }

   api.changeTask = (index, value) => {
      const taskTextEle = listOfRows[index].text
      taskTextEle.innerText = value
   }

   api.selectTask = (index) => {
      if(selectedRowEle){
         selectedRowEle.classList.remove('list__row--selected')
      }

      const rowEle = listOfRows[index].ele
      rowEle.classList.add('list__row--selected')
      
      selectedRowEle = rowEle 
   } 

   api.unselectTask = () => {
      if(selectedRowEle) {
         selectedRowEle.classList.remove('list__row--selected')
   
         selectedRowEle = undefined
      }
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


   function handleDragging () {
      listEle.addEventListener('mousedown', e => {
         if(e.target.className != 'list__drag'){return}
      
         const rowEle = e.target.parentElement
         const dragedId = e.target.dataset.id
         
         rowEle.classList.add('drag-target')
         listEle.classList.add('dragging')
         document.body.classList.add('drag-block-cursor')
   
         e.preventDefault()
   
         handleEventListener(window, 'add', ['mouseup', 'blur'], end)
   
   
         function end (e)  {
            listEle.classList.remove('dragging')   
            document.body.classList.remove('drag-block-cursor')
            rowEle.classList.remove('drag-target')
            handleEventListener(window, 'remove', ['mouseup', 'blur'], end)
            
            if(!e.target.classList.contains('drag-spot')){return}
   
            const targetId = e.target.dataset.id

            api.listeners.onDrag(+dragedId, +targetId)
            
         }
   
         function handleEventListener(target, type, events, callback) {
            events.forEach(event => {
               target[type + 'EventListener'](event, callback)      
            })
         }
      })
   }

}
