_['app/tasks/editView'] = function initEditView (data) {
   const {newEle, addActions}  = _['app/lib']
   const { getIconHtml }   = _['app/lib/icons']


   const markIconHtml = getIconHtml('mark')

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
                  <button type="button" class="edit__badge" data-act="edit_mark">
                     ${markIconHtml}
                  </button>
                  <input type="text" name class="edit__title" autofocus placeholder="New Task" />
               </div>
               <textarea type="text" class="edit__description" placeholder="Description" rows="3"></textarea>
            </form>
         </div>
         <form action="#" class="edit__footer" onsubmit="return false">
            <div class="edit__user-img edit__user-img--comments"></div>
            <textarea type="text" name class="edit__comment" placeholder="Write a comment..." rows="4"></textarea>
         </form>
      </div>
   </div>`)

   const titleEle = thisEle.querySelector('.edit__title')
   const titleBoxEle = thisEle.querySelector('.edit__title-box')
   const descriptionEle = thisEle.querySelector('.edit__description')
   const badgeEle = thisEle.querySelector('.edit__badge')
   
   showTask(data)

   addActions(thisEle, {
      'edit_close' () {
         api.listeners.onClose()
      },
      'edit_mark' (d,t,e) {
         api.listeners.onMark()
      }
   })


   titleEle.addEventListener('focus', ()=>{
      titleBoxEle.classList.add('edit__title-box--focus')
   })

   titleEle.addEventListener('blur', ()=>{
      titleBoxEle.classList.remove('edit__title-box--focus')
      api.listeners.onBlurTitle(titleEle.value)
   })

   titleEle.addEventListener('keyup', (e)=>{
      if(e.key === "Enter") {
         titleEle.blur()
         descriptionEle.focus()
      }
   })

   descriptionEle.addEventListener('blur', ()=>{
      api.listeners.onBlurDescription(descriptionEle.value)
   })

   descriptionEle.addEventListener('keydown', (e)=>{
      if(e.key === "Enter") {
         descriptionEle.blur()
         e.preventDefault()
      }
   })



   const api = {}

   api.showTask = showTask
   
   api.focus = () => {
      titleEle.focus()
   }

   api.ele = thisEle

   return api 




   function showTask (task = {}, { focus } = {}) {
      titleEle.value = task.title || ''
      descriptionEle.value = task.description || ''
      badgeEle.className = 'edit__badge' + (task.status? ' edit__badge--done': '')
      
      if(focus !== false) {
         titleEle.focus()
      }
   }
}