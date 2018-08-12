_['app/tasks/tasksController'] = function initTasksController () {

   const getTasksView = _['app/tasks/tasksView']
   const getlistView = _['app/tasks/listView']
   const getEditView = _['app/tasks/editView']
   const model = _['app/model']

   let selectedIndex = undefined
   let editView = undefined
   let editViewOn = false





   
   const listView = getlistView(model.getList())
   
   listView.listeners = {
      onAdd () {
         selectedIndex = model.newTask()
         listView.addTask(model.getItem(selectedIndex))
         listView.selectTask(selectedIndex)
         handleEdit()
      },
      onSelect (id) {
         const index = model.getIndexForId(id)
         if(selectedIndex === index){return}
         selectedIndex = index

         listView.selectTask(selectedIndex)
         handleEdit()
      }
   }





   const tasksView = getTasksView(listView.ele)
   



   
   
   
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
            listView.changeTask(selectedIndex, value)
         },
         onClose () {
            tasksView.removeAside()
            listView.unselectTask()
            editViewOn = false
            selectedIndex = undefined
         }
      }
   }
}