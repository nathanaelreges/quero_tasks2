_['app/tasks/tasksController'] = function initTasksController () {

   const getTasksView = _['app/tasks/tasksView']

   const array = [
      {title: 'Work it Harder'},
      {title: 'Make it Better'},
      {title: 'Do it Faster'}
   ]

   const tasksView = getTasksView(array)

   return tasksView.ele
}