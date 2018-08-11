_['app'] = function initApp () {
   const getTasksEle = _['app/tasks']

   const tasksEle = getTasksEle()

   document.querySelector('.main__body').appendChild(tasksEle)
}