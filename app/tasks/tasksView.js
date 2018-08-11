_['app/tasks/tasksView'] = function initTasksView (data) {
   const newEle = _['app/lib'].newEle

   const _data = data.reduce((acc, cur)=>{
      acc.push(cur)
      return acc
   }, [])

   while(_data.length < 12) {
      _data.push(false)
   }

   const ele = newEle(`<div class="tasks">
      <div class="tasks__l-box">
         <div class="tasks__box">
            <div class="tasks__header">
               <button type="button" class="tasks__add">Add Task</button>
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
         const task = renderTask(cur)
         return acc + task
      }, '')
   }

   function renderTask (task) {
      return `<div class="tasks__line">
         ${task?
            `<li class="task">
               <button type="button" class="task__badge">
                  <span class="task__badge-l">L</span>
               </button>
               <p class="task__text">${task.title}</p>
            </li>`:
            ''
         }
      </div>`
   }

   return { ele }
}