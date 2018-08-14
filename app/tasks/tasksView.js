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
      const distanceFromLeft = lBoxEle.offsetLeft

      lBoxEle.classList.add('transition_t')
      lBoxEle.style.willChange = `transform`
      lBoxEle.style.transform = `translateX(-${distanceFromLeft}px)`

      asideEle.classList.add('transition_t-o')
      asideEle.style.transform = `translateY(300px)`
      asideEle.style.opacity = '0'
      asideEle.style.willChange = `transform`
      lAsideEle.append(asideEle)
      
      
      await addEventPromise(thisEle, 'transitionend')
      lBoxEle.classList.remove('transition_t')
      lBoxEle.style.transform = ''

      thisEle.append(lAsideEle)
      

      await doubleRAFPromise()
      asideEle.style.transform = ''
      asideEle.style.opacity = '1'

      
      await addEventPromise(thisEle, 'transitionend')
      lBoxEle.style.willChange = ''

      asideEle.classList.remove('transition_t-o')
      asideEle.style.willChange = ''

   }




   api.removeAside = async function () {
      const fullWidth = thisEle.offsetWidth
      const distanceToMiddle = (fullWidth * 0.45) / 2

      asideEle.classList.add('transition_t-o')
      asideEle.style.opacity = '0'
      asideEle.style.willChange = 'transform'
      

      await addEventPromise(thisEle, 'transitionend')
      lAsideEle.remove()
      asideEle.remove()

      asideEle.classList.remove('transition_t-o')
      asideEle.style.opacity = ''
      asideEle.style.willChange = ''
      asideEle = undefined

      lBoxEle.style.willChange = `transform`
      lBoxEle.style.transform = `translateX(-${distanceToMiddle}px)`

      
      await doubleRAFPromise()
      lBoxEle.classList.add('transition_t')
      lBoxEle.style.transform = ''

      
      await addEventPromise(thisEle, 'transitionend')
      lBoxEle.classList.remove('transition_t')
      lBoxEle.style.willChange = ''

   }



   api.ele = thisEle

   return api

}
