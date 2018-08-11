_['app/lib'] = (function initLib () {
   return {
      newEle: function (html) {
         var div = document.createElement('div')
         div.innerHTML = html
         return div.firstElementChild   
      }
   }
})()