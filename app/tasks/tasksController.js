_['app/tasks/tasksController'] = function initTasksController () {

   const getTasksView = _['app/tasks/tasksView']

   const array = [
      {title: 'Work it Harder', id: 9121},
      {title: 'Make it Better', id: 9122},
      {title: 'Do it Faster', id: 9123}
   ]

   const tasksView = getTasksView(array)

   return tasksView.ele
}