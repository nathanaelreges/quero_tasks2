_['app/tasks/tasksView'] = function initTasksView (mainEle) {
   const {newEle, addEventPromise, doubleRAFPromise}  = _['app/lib']


   
   
   const thisEle = newEle(`<div class="tasks">
      <div class="tasks__l-box">
      </div>
   </div>`)

   const LBoxEle = thisEle.querySelector('.tasks__l-box')
   const LAsideEle = newEle('<div class="tasks__l-aside"></div>')
   let asideEle = undefined //used by api.showAside() & api.hideAside()

   LBoxEle.append(mainEle)






   const api = {}

   api.showAside = async function (ele) {
      asideEle = ele
      const distanceFromLeft = LBoxEle.getBoundingClientRect().x

      LBoxEle.classList.add('transition_t')
      LBoxEle.style.willChange = `transform`
      LBoxEle.style.transform = `translateX(-${distanceFromLeft}px)`

      asideEle.classList.add('transition_t-o')
      asideEle.style.transform = `translateY(300px)`
      asideEle.style.opacity = '0'
      asideEle.style.willChange = `transform`
      LAsideEle.append(asideEle)
      
      await addEventPromise(thisEle, 'transitionend')
      LBoxEle.classList.remove('transition_t')
      LBoxEle.style.transform = ''

      thisEle.append(LAsideEle)
      
      await doubleRAFPromise()

      asideEle.style.transform = ''
      asideEle.style.opacity = '1'

      await addEventPromise(thisEle, 'transitionend')

      LBoxEle.style.willChange = ''

      asideEle.classList.remove('transition_t-o')
      asideEle.style.willChange = `transform`
      asideEle.style.transform = ''
      asideEle.style.opacity = '1'

   }




   api.removeAside = async function () {
      const fullWidth = thisEle.getBoundingClientRect().width
      const distanceToMiddle = (fullWidth * 0.45) / 2

      asideEle.classList.add('transition_t-o')
      asideEle.style.opacity = '0'
      asideEle.style.willChange = 'transform'
      
      await addEventPromise(thisEle, 'transitionend')

      LAsideEle.remove()
      asideEle.remove()

      asideEle.classList.remove('transition_t-o')
      asideEle.style.opacity = ''
      asideEle.style.willChange = ''
      asideEle = undefined

      LBoxEle.style.willChange = `transform`
      LBoxEle.style.transform = `translateX(-${distanceToMiddle}px)`

      await doubleRAFPromise()

      LBoxEle.classList.add('transition_t')
      LBoxEle.style.transform = ''

      await addEventPromise(thisEle, 'transitionend')

      LBoxEle.classList.remove('transition_t')
      LBoxEle.style.willChange = ''

   }



   api.ele = thisEle

   return api

}
