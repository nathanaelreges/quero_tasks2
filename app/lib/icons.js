_['app/lib/icons'] = function initIcons () {
   const {newEle}  = _['app/lib']

   const iconsHTML = getIcons()
   const iconsKeys = Object.keys(iconsHTML)
   const iconsEles = iconsKeys.reduce((acc, key)=>{
      acc[key] = newEle(iconsHTML[key])
      return acc
   }, {})

   
   const docIconsNodeList = document.querySelectorAll('.js-icon')
   const docIcons = Array.from(docIconsNodeList)


   docIcons.forEach(ele => {
      const iconEleClone = iconsEles[ele.dataset.id].cloneNode(true)
      
      ele.classList.remove('js-icon')
      iconEleClone.setAttribute('class', ele.className)

      ele.parentElement.replaceChild(iconEleClone, ele)
   })




   const api = {}

   api.getIconHtml = (id) => {
      return iconsHTML[id]
   }

   return api

   function getIcons () {
      return {
         'arrow': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="square" stroke-miterlimit="10" viewBox="0 0 250 250">
            <path stroke="unset" stroke-linecap="butt" stroke-linejoin="round" stroke-width="34" d="M237 67L125 183 13 68"/>
         </svg>`,

         'mark': `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="square" stroke-miterlimit="10" viewBox="0 0 500 500">
            <path stroke="unset" stroke-linecap="butt" stroke-linejoin="round" stroke-width="55" d="M48 226l83 196 337-318"/>
         </svg>`,

         'connect': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <g fill="none">
               <path d="M5 3v17s0 5 5 5h12M5 12h17"/>
               <path d="M28 12a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3zM28 25a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3z" paint-order="markers stroke fill"/>
            </g>
         </svg>`,

         'clip': `<svg xmlns="http://www.w3.org/2000/svg" style="transform:rotate(45deg)" viewBox="0 0 500 500">
            <g fill="none" stroke-width="25">
               <path d="M204.1671 155.2829a42.916461 46.233858 0 0 1 42.91645-46.23378A42.916461 46.233858 0 0 1 290 155.2829" paint-order="markers stroke fill"/>
               <path d="M137.06089 155.63741A110.46955 113.21628 0 0 1 247.53047 42.42114 110.46955 113.21628 0 0 1 358 155.63741" paint-order="markers stroke fill"/>
               <path d="M358 153.58498V340M204.1671 155.2829V340"/>
               <path d="M358 340a76.916467 81.798955 0 0 1-76.91646 81.7986A76.916467 81.798955 0 0 1 204.1671 340" paint-order="markers stroke fill"/>
               <path d="M290 155v124.36259M137.06089 155.63741v50.93995"/>
            </g>
         </svg>`,

         'lens': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <g fill="none" stroke-width="25">
               <path d="M361 191c0 45-18 85-48 114A165 165 0 0 1 34 191c0-88 73-160 163-160 91 0 164 72 164 160z" paint-order="markers stroke fill"/>
               <path d="M313 305l148 148"/>
            </g>
         </svg>`,

         'calendar': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <path fill="none" stroke="#adb5b4" stroke-width="25" d="M59 60h382v394H59z" paint-order="markers stroke fill"/>
            <path fill="none" stroke="#adb5b4" stroke-width="25" d="M59 170h382M337 27v66M180 27v66"/>
            <path fill="#adb5b4" d="M268 354h39v42h-39zm-66 0h39v42h-39zm-66 0h39v42h-39zm198-68h39v41h-39zm-66 0h39v41h-39zm-66 0h39v41h-39zm-66 0h39v41h-39zm198-69h39v41h-39zm-66 0h39v41h-39zm-66 0h39v41h-39z" paint-order="markers stroke fill"/>
         </svg>`,

         'heart': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 500 500"  stroke-width="25">
            <path fill="none" d="M473.99857 302.37959L298.15242 478.02343 122.30627 302.37959m.59733.75221a103.18171 103.05579 0 0 1-.41766-.41405 103.18171 103.05579 0 0 1 0-145.7429 103.18171 103.05579 0 0 1 145.4838-.43407m59.53665.6748a102.79858 103.25132 0 0 1 .413-.41794 102.79858 103.25132 0 0 1 145.37916 0 102.79858 103.25132 0 0 1 .43298 145.58195M267.31542 155.89545l41.12482 37.76767m19.47958-36.86591l-36.53265 37.01448"/>
         </svg>`,

         'dots': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 500 500">
            <path fill="#adb5b4" d="M184 300a36 36 0 0 1-36 36 36 36 0 0 1-35-36 36 36 0 0 1 35-36 36 36 0 0 1 36 36zm303 0a36 36 0 0 1-35 36 36 36 0 0 1-36-36 36 36 0 0 1 36-36 36 36 0 0 1 35 36zm-151 0a36 36 0 0 1-36 36 36 36 0 0 1-36-36 36 36 0 0 1 36-36 36 36 0 0 1 36 36z"/>
         </svg>`,

         'menu': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 500 500">
            <path d="M105 406h390v51H105zm0-132h390v52H105zm0-131h390v51H105z"/>
         </svg>`,

         'plus': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 500 500">
            <path fill="none" stroke="#fff" stroke-width="70" d="M300 84v432m216-216H84"/>
         </svg>`,

         'config': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 500 500">
            <g fill="none" stroke-linecap="square" stroke-width="35" transform="translate(0 -165)">
               <path d="M490 385c11 27-32 54-32 81s43 53 32 77c-10 24-59 13-77 32-19 19-7 69-34 80-26 11-54-32-81-32-26 0-52 42-76 32-25-10-13-59-32-77-19-19-69-8-80-34s32-54 32-80c0-27-43-53-32-78 10-24 58-12 77-31 18-20 7-69 34-80s53 32 80 32c26 0 53-43 77-33 27 12 14 59 32 78 19 18 70 9 80 33z"/>
               <circle cx="98" cy="544" r="90" transform="rotate(-23)"/>
            </g>
         </svg>`
      }
   }

}