_['app/tasks/tasksView'] = function initTasksView (data) {
   const newEle = _['app/lib'].newEle
   

   const ele = newEle(`<div class="tasks">
      <div class="tasks__l-box">
         <div class="tasks__box">
            <div class="tasks__header">
               <button type="button" class="tasks__add">Add Task</button>
               <button type="button" class="tasks__config"></button>
            </div>
            <div class="tasks__body">
               <ul class="tasks__list">
                  <div class="tasks__line">
                     <li class="task">
                        <button type="button" class="task__badge">
                           <span class="task__badge-l">L</span>
                        </button>
                        <p class="task__text">Work it Harder</p>
                     </li>
                  </div>
                  <div class="tasks__line">
                     <li class="task">
                        <button type="button" class="task__badge">
                           <span class="task__badge-l">L</span>
                        </button>
                        <p class="task__text">Make it better</p>
                     </li>
                  </div>
                  <div class="tasks__line">
                  </div>
                  <div class="tasks__line">
                  </div>
                  <div class="tasks__line">
                  </div>
                  <div class="tasks__line">
                  </div>
                  <div class="tasks__line">
                  </div>
                  <div class="tasks__line">
                  </div>
               </ul>
            </div>
         </div>
      </div>
   </div>`)
   console.log(ele)

   return { ele }
}