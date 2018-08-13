_['app/lib/icons'] = function initIcons () {
      
   var templatesNodeList = document.querySelectorAll('.js-template')
   var templatesArray = Array.from(templatesNodeList)

   var tamplatesObj = templatesArray.reduce((acc, cur)=>{
      cur.remove()
      cur.setAttribute('class', '')
      acc[cur.dataset.id] = cur
      return acc
   }, {})


   var arrayOfEles = document.querySelectorAll('.js-icon')

   for (var i = 0; i < arrayOfEles.length; i++) {
      var ele = arrayOfEles[i]
      var iconEleClone = tamplatesObj[ele.dataset.id].cloneNode(true)
      ele.classList.remove('js-icon')
      iconEleClone.setAttribute('class', ele.className)
      ele.parentElement.replaceChild(iconEleClone, ele)
   }

   return function getIconHtml (id) {
      return tamplatesObj[id].outerHTML
   }

}