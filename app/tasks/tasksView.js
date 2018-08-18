_['app/tasks/tasksView'] = function initTasksView (mainEle) {
   const {newEle, addEventPromise, doubleRAFPromise}  = _['app/lib']


   
   
   const thisEle = newEle(`<div class="tasks">
      <div class="tasks__l-box">
      </div>
   </div>`)

   const lBoxEle = thisEle.querySelector('.tasks__l-box')
   const lAsideEle = newEle('<div class="tasks__l-aside"></div>')
   let asideEle = undefined //used by api.showAside() & api.hideAside()

   lBoxEle.append(mainEle)






   const api = {}

   api.showAside = async function (ele) {
      asideEle = ele
      
      const fullWidth = thisEle.offsetWidth
      const boxWidth = lBoxEle.offsetWidth

      let asideWidth = fullWidth * 0.45
         asideWidth = asideWidth < 460? 460 : asideWidth
      //
      
      const boxNewWidth = fullWidth - asideWidth
      const boxDistance = (fullWidth - boxWidth) / 2
      const bigBox = boxWidth == fullWidth
      

      //Gettig asideEle ready
      asideEle.classList.add('transition_t-o')
      asideEle.style.transform = 'translateY(300px)'
      asideEle.style.opacity = '0'
      asideEle.style.willChange = 'transform'
      lAsideEle.append(asideEle)
      //

      lBoxEle.style.width = `${boxWidth}px`

      await doubleRAFPromise()

      if(!bigBox){
         lBoxEle.classList.add('transition_t-w')
         lBoxEle.style.willChange = `transform`
         lBoxEle.style.transform = `translateX(-${boxDistance}px)`
         
         await addEventPromise(thisEle, 'transitionend') 
         lBoxEle.classList.remove('transition_t-w')
         lBoxEle.style.transform = ''
      }
      
      lBoxEle.style.marginRight = 'auto'
      lBoxEle.style.flexShirink = '0'
      
   
      
      await doubleRAFPromise()
      lBoxEle.classList.add('transition_t-w')
      lBoxEle.style.width = `${boxNewWidth}px`
      
      
      await addEventPromise(thisEle, 'transitionend') 
      thisEle.append(lAsideEle)
      
      
      await doubleRAFPromise()
      asideEle.style.transform = ''
      asideEle.style.opacity = '1'
      
      
      await addEventPromise(thisEle, 'transitionend')
      lBoxEle.classList.remove('transition_t-w')
      lBoxEle.style.willChange = ''
      lBoxEle.style.marginRight = ''
      lBoxEle.style.width = ''

      asideEle.classList.remove('transition_t-o')
      asideEle.style.willChange = ''
      asideEle.style.opacity = ''
      
      api.listeners.onAnimationFinished()
   }




   api.removeAside = async function () {
      const fullWidth = thisEle.offsetWidth
      const boxWidth = lBoxEle.offsetWidth
      const boxNewWidth = fullWidth <= 1000? fullWidth: 1000
      const distanceToMiddle = fullWidth <= 1000? 0: (fullWidth - 1000)/2

      asideEle.classList.add('transition_t-o')
      asideEle.style.opacity = '0'
      asideEle.style.willChange = 'transform'
      
      lBoxEle.style.width = `${boxWidth}px`

      await addEventPromise(thisEle, 'transitionend')
      lAsideEle.remove()
      asideEle.remove()

      asideEle.classList.remove('transition_t-o')
      asideEle.style.opacity = ''
      asideEle.style.willChange = ''
      asideEle = undefined

      lBoxEle.style.willChange = `transform`
      lBoxEle.style.marginRight = 'auto'
      
      
      await doubleRAFPromise()
      lBoxEle.classList.add('transition_t-w')
      lBoxEle.style.width = `${boxNewWidth}px`
      
      await addEventPromise(thisEle, 'transitionend')
      lBoxEle.classList.remove('transition_t-w')
      lBoxEle.style.marginRight = ''

      if(distanceToMiddle> 0){
         lBoxEle.style.transform =  `translateX(-${distanceToMiddle}px)`

         await doubleRAFPromise()
         lBoxEle.classList.add('transition_t-w')
         lBoxEle.style.transform = ''
         
         await addEventPromise(thisEle, 'transitionend')
         lBoxEle.classList.remove('transition_t-w')
         lBoxEle.style.width = ''
      }
      
      lBoxEle.style.willChange = ''
      
   }



   api.ele = thisEle

   return api

}
