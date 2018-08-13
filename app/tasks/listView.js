_['app/tasks/listView'] = function initListView (data) {
   const {newEle, addActions}  = _['app/lib']

   let numberOfTasks = data.length
   let minNumberOfLines = 12
   

   const _data = data.reduce((acc, cur)=>{
      acc.push(cur)
      return acc
   }, [])

   do{
      _data.push(false)
   } while(_data.length < minNumberOfLines) 



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
         return `<span class="list__row list__row--empty">
            <div class="task"></div>
         </span>`
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
   const listEleChildren = listEle.children
   let selectedRowEle = undefined //used by api.selectTask() & api.unselectTask()

   _data.forEach(item => {
      const rowEle = getRowEle(item)
      listEle.append(rowEle)
   })

   console.log(numberOfTasks)
   listEleChildren[numberOfTasks].classList.add('drag-spot')



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
      if(numberOfTasks < minNumberOfLines - 1){
         const newRowEle = getRowEle(task)
         const oldRowEle = listEleChildren[numberOfTasks]
         listEle.replaceChild(newRowEle, oldRowEle)
      }
      else {
         const newRowEle = getRowEle(task)
         const lastRowEle = listEleChildren[numberOfTasks]
         listEle.insertBefore(newRowEle, lastRowEle)
      }

      numberOfTasks++

      listEleChildren[numberOfTasks].classList.add('drag-spot')
   }

   api.reOrder = (fromIndex, toIndex) => { console.log(fromIndex, toIndex)
      const rowEle = listEleChildren[fromIndex]
      const targetRowEle = listEleChildren[toIndex]
      listEle.insertBefore(rowEle, targetRowEle)
   }


   api.removeTask = (index) => {
      const rowEle = listEleChildren[index]
      const newEmptyRowEle = renderRow()
      listEle.replaceChild(newEmptyRowEle, rowEle)
   }

   api.changeTask = (index, value) => {
      const rowEle = listEleChildren[index]
      const taskTextEle = rowEle.querySelector('.task__text')
      taskTextEle.innerText = value
   }

   api.selectTask = (index) => {
      if(selectedRowEle){
         selectedRowEle.classList.remove('list__row--selected')
      }

      const rowEle = listEleChildren[index]
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
   
      if(data){
         const textEle = rowEle.querySelector('.task__text')
         textEle.innerText = data.title
      }

      return rowEle
   }



   function handleDragging () {
      listEle.addEventListener('mousedown', e => {
         if(e.target.className != 'list__drag'){return}
      
         const rowEle = e.target.parentElement
         const originId = e.target.dataset.id
         
         rowEle.classList.add('drag-target')
         listEle.classList.add('dragging')
         document.body.classList.add('drag-block-cursor')
   
         //e.preventDefault()
   
         handleEventListener(window, 'add', ['mouseup', 'blur'], end)
   
         function end (e)  {
            listEle.classList.remove('dragging')   
            document.body.classList.remove('drag-block-cursor')
            rowEle.classList.remove('drag-target')
            handleEventListener(window, 'remove', ['mouseup', 'blur'], end)
            
            if(!e.target.classList.contains('drag-spot')){return}

            let targetId = e.target.dataset.id 
            if(targetId === originId){return}
            targetId = targetId? +targetId : 'end'
   
            console.log(originId, targetId)
            api.listeners.onDrag(+originId, targetId)
            
         }
   
         function handleEventListener(target, type, events, callback) {
            events.forEach(event => {
               target[type + 'EventListener'](event, callback)      
            })
         }
      })
   }


}
