_['app/model'] = function theModel () {

   const savedListJSON = localStorage.getItem('quero_tasks')
   const list = savedListJSON? JSON.parse(savedListJSON) : []
   
   const savedLastId = localStorage.getItem('quero_tasks-lastid')
   let lastId = savedLastId? Number.parseInt(savedLastId) : 0


   

   const api = {}

   api.newTask = () => {
      const task = {
         title: '',
         description: '',
         status: false,
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

   api.updateItem = (index, {title, description, status}) => {
      if(typeof title == 'string') {
         list[index].title = title
      }

      if(typeof description == 'string') {
         list[index].description = description
      }

      if(typeof status == 'boolean') {
         list[index].status = status
      }

      saveList()
   }

   api.toggleStatus = (index) => {
      list[index].status = !list[index].status
      
      saveList()
   }

   api.removeItem = (index) => {
      list.splice(index, 1)
   }
   
   api.changeIndex = (from, to) => {
      const item = list.splice(from, 1)[0]
      from<to && --to
      list.splice(to, 0, item)

      saveList()
   }
   
   api.getList = () => {
      const copyOfList = list.slice()
      return copyOfList
   }

   api.getListLength = () => {
      return list.length
   }



   return api

   function saveList () {
      localStorage.setItem('quero_tasks', JSON.stringify(list))
   }

   function saveLastId () {
      localStorage.setItem('quero_tasks-lastid', lastId.toString())
   }
}

/* snippet to clear saved tasks on reload
window.addEventListener('unload', ()=>{
   localStorage.clear()
})
*/