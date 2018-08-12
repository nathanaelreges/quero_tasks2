_['app/model'] = function theModel () {

   const listJSON = localStorage.getItem('quero_tasks')
   const savedLastId = localStorage.getItem('quero_tasks-lastid')
   const list = listJSON? JSON.parse(listJSON) : []
   let lastId = savedLastId || 0


   window.addEventListener('unload', ()=>{
      localStorage.setItem('quero_tasks', JSON.stringify(list))
      localStorage.setItem('quero_tasks-lastid', JSON.stringify(lastId))
   })





   const api = {}

   api.newTask = () => {
      const task = {
         title: '',
         description: '',
         id: ++lastId
      }

      const taskIndex = list.push(task) - 1
      
      saveList()
      saveLastId()
      
      return taskIndex
   }

   api.getIndexForId = (id) => (
      list.findIndex(x => x.id===id)
   )

   api.getItem = (index) => {
      return list[index]
   }

   api.updateItem = (index, {title, description}) => {
      if(typeof title == 'string') {
         list[index].title = title
      }

      if(typeof description == 'string') {
         list[index].description = description
      }

      saveList()
   }

   api.getList = () => {
      const copyOfList = list.map(x=>x)
      return copyOfList
   }



   return api

   function saveList () {
      localStorage.setItem('quero_tasks', JSON.stringify(list))
   }

   function saveLastId () {
      localStorage.setItem('quero_tasks-lastid', JSON.stringify(lastId))
   }
}

/*
window.addEventListener('unload', ()=>{
   localStorage.clear()
})
*/