_['app/lib/icons'] = function initIcons () {
      
   const templatesNodeList = document.querySelectorAll('.js-template')
   const templatesArray = Array.from(templatesNodeList)

   const { templatesObj, templatesHtmlObj } = templatesArray.reduce((acc, cur)=>{
      cur.remove()
      cur.setAttribute('class', '')

      const id = cur.dataset.id
      acc.templatesObj[id] = cur
      acc.templatesHtmlObj[id] = cur.outerHTML

      return acc
   }, {templatesObj: {}, templatesHtmlObj: {}})



   const iconsNodeList = document.querySelectorAll('.js-icon')
   const iconsArray = Array.from(iconsNodeList)


   iconsArray.forEach(ele => {
      const iconEleClone = templatesObj[ele.dataset.id].cloneNode(true)
      
      ele.classList.remove('js-icon')
      iconEleClone.setAttribute('class', ele.className)

      ele.parentElement.replaceChild(iconEleClone, ele)
   })
   



   const api = {}

   api.getIconHtml = (id) => {
      return templatesHtmlObj[id]
   }

   return api

}