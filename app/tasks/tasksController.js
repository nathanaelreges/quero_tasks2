_['app/tasks/tasksController'] = function initTasksController () {

   const getTasksView = _['app/tasks/tasksView']
   const getEditView = _['app/tasks/editView']

   const array = [
      {title: 'Work it Harder', id: 9121},
      {title: 'Make it Better', id: 9122},
      {title: 'Do it Faster', id: 9123}
   ]

   const tasksView = getTasksView(array)
   
   window.showEdit = showEdit

   requestAnimationFrame(showEdit)
   
   return tasksView.ele

   function showEdit () {
      const editView = getEditView({title: 'Make it better', description: 'Work it stronger.'}) 
      tasksView.showAside(editView.ele)
   }
}