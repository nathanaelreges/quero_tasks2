_['app/tasks/tasksController'] = function initTasksController () {

   const getTasksView = _['app/tasks/tasksView']
   const getEditView = _['app/tasks/editView']
   const model = _['app/model']

   let selectedIndex = undefined
   let editView = undefined
   let editViewOn = false



   
   

   
   const tasksView = getTasksView(model.getList())
   
   tasksView.listeners = {
      onAdd () {
         selectedIndex = model.newTask()
         tasksView.addTask(model.getItem(selectedIndex))
         tasksView.selectTask(selectedIndex)
         handleEdit()
      },
      onSelect (id) {
         const index = model.getIndexForId(id)
         if(selectedIndex === index){return}
         selectedIndex = index

         tasksView.selectTask(selectedIndex)
         handleEdit()
      }
   }
   



   
   
   
   return tasksView.ele




   function handleEdit () {
      if(!editView) {
         initEditView()
         tasksView.showAside(editView.ele)
         editViewOn = true
      }
      else
      if(!editViewOn) {
         editView.showTask(model.getItem(selectedIndex))
         tasksView.showAside(editView.ele)
         editViewOn = true
      }
      else {
         editView.showTask(model.getItem(selectedIndex))
      }
   }




   function initEditView () {
      editView = getEditView(model.getItem(selectedIndex))
      
      editView.listeners = {
         onBlurDescription (value) {
            model.updateItem(selectedIndex, {description: value})
         },
         onBlurTitle (value) {
            model.updateItem(selectedIndex, {title: value})
            tasksView.changeTask(selectedIndex, value)
         },
         onClose () {
            tasksView.removeAside()
            tasksView.unselectTask()
            editViewOn = false
            selectedIndex = undefined
         }
      }
   }
}