_['app/model'] = function theModel () {

   const list = [
      {title: 'Work it Harder', id: 0},
      {title: 'Make it Better', id: 1},
      {title: 'Do it Faster', id: 2}
   ]

   let lastId = 2


   const api = {}

   api.newTask = () => {
      const task = {
         title: '',
         description: '',
         id: ++lastId
      }

      const taskIndex = list.push(task) - 1
      
      return taskIndex
   }

   api.getIndexForId = (id) => (
      list.findIndex(x => x.id===id)
   )

   api.list = list

   return api

}