_['app/lib'] = (function initLib () {
   return {
      
      newEle (html) {
         var div = document.createElement('div')
         div.innerHTML = html
         return div.firstElementChild   
      },
      
      addActions (ele, actions) {
         ele.addEventListener('click', function addActions_ClickHandler (e) {
            var t = e.target
            var d = t.dataset
                
            if(d.act){
               if(typeof actions[d.act] != "function" ){
                  throw('addActions - No action registered for this key: ' + d.act)
               }
               
               actions[d.act](d,t)
            }
                 
         })
      },

      addEventPromise (ele, event) {
         return new Promise(resolve => {ele.addEventListener(event, resolve, {once: true})})
      },

      doubleRAFPromise () {
         return new Promise(x => {
            requestAnimationFrame(()=>{
               requestAnimationFrame(x)
            })
         })
      }
   }
})()