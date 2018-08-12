_['app/tasks/tasksController'] = function initTasksController () {

   const getTasksView = _['app/tasks/tasksView']
   const getEditView = _['app/tasks/editView']
   const model = _['app/model']

   let selectedIndex = undefined
   let editView = undefined
   let editViewOn = false



   
   

   
   const tasksView = getTasksView(model.list)
   
   tasksView.listeners = {
      onAdd () {
         selectedIndex = model.newTask()
         tasksView.addTask(model.list[selectedIndex])
         handleEdit()
      },
      onSelect (id) {
         const index = model.getIndexForId(id)
         
         if(selectedIndex === index){return}
         
         selectedIndex = index

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
         editView.showTask(model.list[selectedIndex])
         tasksView.showAside(editView.ele)
         editViewOn = true
      }
      else {
         editView.showTask(model.list[selectedIndex])
      }
   }

   function initEditView () {
      editView = getEditView(model.list[selectedIndex])
      
      editView.listeners = {
         onBlurDescription (value) {
            model.list[selectedIndex].description = value
         },
         onBlurTitle (value) {
            model.list[selectedIndex].title = value
            tasksView.changeTask(model.list[selectedIndex].id, value)
         },
         onClose () {
            tasksView.removeAside()
            editViewOn = false
         }
      }
   }
}