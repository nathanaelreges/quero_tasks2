_['app/tasks/editView'] = function initEditView (data) {
   const {newEle, addActions, addEventPromise, doubleRAFPromise}  = _['app/lib']

   const thisEle = newEle(`<div class="edit">
      <div class="edit__box">
         <div class="edit__header">
            <div class="edit__user-img"></div>
            <div class="edit__user-name">Roger Garcia</div>
            <div class="edit__user-status"></div>
            <button class="edit__date">
               <div class="edit__date-icon"></div>
               <div class="edit__date-text">Due Date</div>
            </button>
            <button class="edit__button"></button>
            <button class="edit__button"></button>
            <button class="edit__button"></button>
            <button class="edit__button"></button>
            <button class="edit__close" data-act="edit_close">
               <span class="edit__close-text">+</span>
            </button>
         </div>
         <div class="edit__body">
            <form action="#" class="edit__form" onsubmit="return false">
               <div class="edit__title-box">
                  <button type="button" class="edit__badge">
                     <span class="edit__badge-l">L</span>
                  </button>
                  <input type="text" name class="edit__title" placeholder="New Task" />
               </div>
               <textarea type="text" class="edit__description" placeholder="Description" rows="3"></textarea>
            </form>
         </div>
      </div>
   </div>`)

   const editTitle = thisEle.querySelector('.edit__title')
   const editDescription = thisEle.querySelector('.edit__description')
   
   showTask(data)

   addActions(thisEle, {
      'edit_close' () {
         //api.listeners.onClose()
      }
   })


   editTitle.addEventListener('blur', ()=>{
      //api.listeners.onBlurTitle(editTitle.value)
      console.log(editTitle.value)
   })

   editTitle.addEventListener('keyup', (e)=>{
      if(e.key === "Enter") {
         editTitle.blur()
      }
   })


   editDescription.addEventListener('blur', ()=>{
      //api.listeners.onBlurTitle(editDescription.value)
      console.log(editDescription.value)
   })

   editDescription.addEventListener('keydown', (e)=>{
      if(e.key === "Enter") {
         editDescription.blur()
         e.preventDefault()
      }
   })

   const api = {}

   api.showTask = showTask

   window.test = api

   return { ele: thisEle }





   function showTask (task = {title: '', description: ''}) {
      editTitle.value = task.title
      editDescription.value = task.description
   }
}