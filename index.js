    
    
    class Tab{
        constructor(zindex, startX, startY, startWidth, startHeight, bodyText, iconURL, tabName){

            this.zIndex = zindex
            this.startX = startX
            this.startY = startY
            this.startWidth = startWidth
            this.startHeight = startHeight
            this.bodyText = bodyText
            this.iconURL = iconURL
            this.tabName = tabName
            this.tabContainer = null
            this.tabBar = null


        }


        makeTabActive(){
            this.tabContainer.classList.add("Active-Tab")
            this.tabBar.classList.add("Active-Tab")
            this.tabBar.style.top = "-.25rem"
        }

        makeTabUnactive(){
            this.tabContainer.classList.remove("Active-Tab")
            this.tabBar.classList.remove("Active-Tab")
            this.tabBar.style.top = ""
        }


        createWindowAndTab(){
            this.createWindow()
            this.createTab()
            
            this.makeTabActive()
        }

        createWindow(img){


            // <div style="left:5em; top:10em; width: 20em; height: 10em;" class="Window-Container Not-Selectable" id="Window-Num-0" onpointerdown="moveToFront(event)">
            //     <div class="Window-Header" onpointerdown="mousedown(event)" onpointerup="mouseup(event)"> 
            //         <button class="Window-Header Window-Close-Button" onpointerup="closeTab(event)">X</button> 
            //         <img src="https://www.svgrepo.com/show/510391/close.svg" class = "Window-Header Window-Icon"> </img>
            //         <div class = "Window-Header Window-Name">  tabName </div> 
            //     </div> 
            //     <div class="Window-Body">  bodyText  </div> 
            //     <div class="Window-Resize" onpointerdown="mouseresizestart(event)" onpointerup="mouseresizeend(event)"> </div>
            // </div>


            this.tabContainer = document.createElement("div")

            this.tabContainer.setAttribute('id', "Tab-Num-" + (this.zindex))

            this.tabContainer.classList.add("Window-Container")
            this.tabContainer.classList.add("Not-Selectable")

            this.tabContainer.onpointerdown = moveToFront



            var tabHeader = '<div class="Window-Header" onpointerdown="mousedown(event)" onpointerup="mouseup(event)"> '
            var closeButton = '<button class="Window-Header Window-Close-Button" onpointerup="closeTab(event)">X</button> '
            var windowImg = '<img src="' + this.iconURL + '" class = "Window-Header Window-Icon"> </img> '
            var windowName = '<div class = "Window-Header Window-Name">' + this.tabName + '</div> </div> '
            if(img == false){
            var tabBody = '<div class="Window-Body File-Display"> ' + this.bodyText + '</div> '
            }else{
                
                var tabBody = '<img class="Window-Body" src="' + this.bodyText + '"></img> '
            }
            var resizeTab = '<div class="Window-Resize" onpointerdown="mouseresizestart(event)" onpointerup="mouseresizeend(event)"> </div>'


            this.tabContainer.innerHTML = tabHeader + closeButton + windowImg + windowName + tabBody + resizeTab

            document.getElementById("Main-Window-Container").appendChild(this.tabContainer)
            this.tabContainer.style.width = this.startWidth;
            this.tabContainer.style.height = this.startHeight;
            this.tabContainer.style.left = this.startX;
            this.tabContainer.style.top = this.startY;
            this.tabContainer.style.zIndex = this.zindex;
            
        }


        createTab(){


            this.tabBar = document.createElement("div")

            this.tabBar.setAttribute('id', "Tab-Bar-Num-" + (this.zindex))

            this.tabBar.classList.add("Hot-bar-tab")
        
            this.tabBar.onpointerdown =  tabToWindow
            this.tabBar.onpointerleave = unhighlightWindow
            this.tabBar.onpointerover = highlightWindow



            var hot_bar_img = '<img class="bar-image" src="' + this.iconURL +'">            </img>'
            var hot_bar_text = '<div class="bar-text">' + this.tabName +  '</div>'

            this.tabBar.innerHTML = hot_bar_img + hot_bar_text

            document.getElementById("Hot-bar").appendChild(this.tabBar)
        }



        insertIntoBody(input){
            var bodyDiv = this.tabContainer.querySelector(".Window-Body")
            bodyDiv.insertAdjacentHTML(input)
        }





    }
    
    

    var windows = []

    const hot_bar = document.getElementById("Hot-bar")
    
    offsetX = 0;
    offsetY = 0;



    function tabToWindow(ev){
        const tabElement = ev.target.closest(".Hot-bar-tab")

        var input = parseInt(tabElement.id.substring(12))
        var tabzIndex = windows[input].tabContainer.style.zIndex
        windows[input].tabContainer.style.zIndex = windows.length
        
        makeWindowIndexFront(tabzIndex)
    }






    function moveToFront(ev){
        var oldzIndex = ev.target.closest(".Window-Container").style.zIndex
        const tabElement = ev.target.closest(".Window-Container")
        tabElement.style.zIndex = windows.length
        
        
        
        
        makeWindowIndexFront(oldzIndex)
        
    }





    function makeNewTab(ev){
        windows.forEach(element =>{
            element.makeTabUnactive()
        })
        const newTab = new Tab(windows.length, Math.floor(Math.random() * 70) + 1 + '%', Math.floor(Math.random() * 70) + 1 + '%', Math.floor(Math.random() * 30) + 1 + "em", Math.floor(Math.random() * 30) + 1 + "em", "https://www.svgrepo.com/show/510391/close.svg", "https://www.svgrepo.com/show/510391/close.svg", "Hai hai hai :3")
        newTab.createWindow(false)
        newTab.createTab()
        newTab.makeTabActive()
        windows.push(newTab)
    }


    

    function mousedown(ev){
        const tabElement = ev.target.closest(".Window-Container")
        offsetX = ev.clientX - tabElement.offsetLeft;
        offsetY = ev.clientY - tabElement.offsetTop;
        tabElement.classList.add("dragging");
    }

    function mouseup(ev){
        ev.target.closest(".Window-Container").classList.remove("dragging");
    }


    function mouseresizestart(ev){
        ev.target.closest(".Window-Container").classList.add("resizing");
    }
    function mouseresizeend(ev){
        ev.target.closest(".Window-Container").classList.remove("resizing");
    }




    function mousemove(ev){
        var targetObject = document.querySelector(".dragging")
        if(targetObject != null){
            newX = ev.clientX - offsetX ;
            newY = ev.clientY - offsetY;

            if(newX >= 0 && newX + targetObject.offsetWidth <= window.innerWidth){
                targetObject.style.left = (newX) + "px";
            }
            if(newY >= 0 && newY + targetObject.offsetHeight <= window.innerHeight - hot_bar.offsetHeight){
                
                targetObject.style.top = (newY) + "px";
            }
        }

        targetObject = null;
        targetObject = document.querySelector(".resizing")
        if(targetObject != null){
            targetObject.style.width = ev.clientX - targetObject.offsetLeft + "px"
            targetObject.style.height = ev.clientY - targetObject.offsetTop + "px"
        }
        
        
    }




    function closeTab(ev){
        var tabzIndex = ev.target.closest(".Window-Container").style.zIndex;
        const tabElement = ev.target.closest(".Window-Container")
        var tabID = parseInt(tabElement.id.substring(8))

        windows[tabID].tabBar.remove()
        windows[tabID].tabContainer.remove()

        
        windows.splice(tabID, 1)
        
        makeWindowIndexFront(tabzIndex)


        
    }
    

    function makeWindowIndexFront(input){


        var counter = 0
        windows.forEach(element => {

            element.makeTabUnactive()
            element.tabContainer.setAttribute("id", "Tab-Num-" + (counter))
            element.tabBar.setAttribute("id", "Tab-Bar-Num-" + (counter))


            if(parseInt(element.tabContainer.style.zIndex) > input){
                element.tabContainer.style.zIndex -= 1;
            }
            
            if(parseInt(element.tabContainer.style.zIndex) == parseInt(windows.length) - 1){
                element.makeTabActive()
            }   
            counter++

            element.zIndex = element.tabContainer.style.zIndex

        })
    }



    function highlightWindow(ev){
        const tabElement = ev.target.closest(".Hot-bar-tab")
        document.querySelector(".opacityScreen").classList.add("startOpacity")
        var input = parseInt(tabElement.id.substring(12))

        windows[input].tabContainer.style.zIndex = ""

        windows[input].tabContainer.classList.add("hovering-tab-bar")
    }


    function unhighlightWindow(ev){
        const tabElement = ev.target.closest(".Hot-bar-tab")


        document.querySelector(".opacityScreen").classList.remove("startOpacity")

        var input = parseInt(tabElement.id.substring(12))

        windows[input].tabContainer.style.zIndex = windows[input].zIndex

        windows[input].tabContainer.classList.remove("hovering-tab-bar")
    }



    window.addEventListener('touchmove', ev => {
        
          ev.preventDefault();
          ev.stopImmediatePropagation();
        
      }, { passive: false });