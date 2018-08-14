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
         
         listView.selectTask(index)
         selectedIndex = index
         handleEdit()
      },
      onDrag (from, to) {
         const fromIndex = model.getIndexForId(from)
         const toIndex = to == 'end'? 
            model.getListLength():
            model.getIndexForId(to)
         //

         if(selectedIndex != undefined) {
            var selectedId = model.getItem(selectedIndex).id
         }

         model.changeIndex(fromIndex, toIndex)
         listView.reOrder(fromIndex, toIndex)

         if(selectedIndex != undefined) {
            selectedIndex = model.getIndexForId(selectedId)
         }
      },
      onMark: handleMark
   }





   const tasksView = getTasksView(listView.ele)

   tasksView.listeners = {
      onAnimationFinished () {
         editView.focus()
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
         tasksView.showAside(editView.ele)
         editView.showTask(model.getItem(selectedIndex))
         editViewOn = true
      }
      else {
         editView.showTask(model.getItem(selectedIndex))
      }
   }


   
   function handleMark (id) {
      const index = id? model.getIndexForId(id): selectedIndex
      const value = !model.getItem(index).status
      
      model.updateItem(index, {status: value})
      listView.changeTask(index, {status: value})
      
      const updatedItem = model.getItem(index)
      
      if(selectedIndex == index) {
         editView.showTask(updatedItem, {focus: false})
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
            listView.changeTask(selectedIndex, {title: value})
         },
         onClose () {
            tasksView.removeAside()
            listView.unselectTask()
            editViewOn = false
            selectedIndex = undefined
         },
         onMark: handleMark
      }
   }
}