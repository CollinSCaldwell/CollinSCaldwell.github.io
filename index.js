    
    
    class Tab{
        constructor(zindex, startX, startY, startWidth, startHeight, bodyText, iconURL, tabName){

            this.windowNum = windows
            this.tabContainer = document.createElement("div")
            this.tabContainer.classList.add("Tab")
            this.tabContainer.classList.add("Tab-Container")
            this.tabContainer.classList.add("Not-Selectable")

            this.tabContainer.onmousedown = moveToFront

            var tabHeader = '<div class="Tab Tab-Header" onmousedown="mousedown(event)" onmouseup="mouseup(event)"> '
            var closeButton = '<button class="Tab Tab-Header Window-Close-Button" onmouseup="closeTab(event)">X</button> '
            var windowImg = '<img src="' + iconURL + '" class = "Tab Tab-Header Window-Icon"> </img> '
            var windowName = '<div class = "Tab Tab-Header Window-Name">' + tabName + '</div> </div> '
            var tabBody = '<div class="Tab Tab-Body"> ' + bodyText + '</div> '
            var resizeTab = '<div class="Tab Tab-Resize" onmousedown="mouseresizestart(event)" onmouseup="mouseresizeend(event)"> </div>'


            this.tabContainer.innerHTML = tabHeader + closeButton + windowImg + windowName + tabBody + resizeTab

            const temp = document.querySelector(".Main-Page")
            temp.appendChild(this.tabContainer)
            this.tabContainer.style.width = startWidth;
            this.tabContainer.style.height = startHeight;
            this.tabContainer.style.left = startX;
            this.tabContainer.style.top = startY;
            this.tabContainer.style.zIndex = zindex;

            this.tabContainer.classList.add("Active-Tab")

        }

        getWindowsNum(){
            return this.windowNum
        }
    }
    
    

    var windows = []


    function moveToFront(ev){
        reOrderZWindows()
        ev.target.closest(".Tab-Container").style.zIndex = windows.length
        reOrderZWindows()

        ev.target.closest(".Tab-Container").classList.add("Active-Tab")
    }



    function reOrderZWindows(){
        console.log(windows)
        var counter = 0
        var skipped = false
        var amountSkipped = 0
        var numSkipped = 0

        var placeholderArray = []

        windows.forEach(element => {
            element.tabContainer.classList.remove("Active-Tab")
            placeholderArray.push(element.tabContainer.style.zIndex)
        })

        placeholderArray.sort()
        placeholderArray.forEach(element =>{
            if(counter < element){
                skipped = true
                amountSkipped = counter - element
                numSkipped = element
            }
        })

        windows.forEach(element => {
            if(skipped){
                if(element.tabContainer.style.zIndex >= numSkipped){
                    element.tabContainer.style.zIndex -= amountSkipped
                }else{
                    element.tabContainer.style.zIndex -= 1
                }

            }else{
                
                element.tabContainer.style.zIndex -= 1
            }
        })


        console.log(windows)
    }



    function makeNewTab(ev){
        reOrderZWindows()
        const newTab = new Tab(windows.length, Math.floor(Math.random() * 100) + 1 + '%', Math.floor(Math.random() * 100) + 1 + '%', Math.floor(Math.random() * 30) + 1 + "em", Math.floor(Math.random() * 30) + 1 + "em", "This is filler text", "https://www.svgrepo.com/show/510391/close.svg", "Hai hai hai :3")
        windows.push(newTab)
    }


    
    offsetX = 0;
    offsetY = 0;

    function mousedown(ev){
        offsetX = ev.clientX - ev.target.closest(".Tab-Container").offsetLeft;
        offsetY = ev.clientY - ev.target.closest(".Tab-Container").offsetTop;
        ev.target.closest(".Tab-Container").classList.add("dragging");
    }

    function mouseup(ev){
        ev.target.closest(".Tab-Container").classList.remove("dragging");
    }


    function mouseresizestart(ev){
        ev.target.closest(".Tab-Container").classList.add("resizing");
    }
    function mouseresizeend(ev){
        ev.target.closest(".Tab-Container").classList.remove("resizing");
    }


    function mousemove(ev){
        var targetObject = document.querySelector(".dragging")
        if(targetObject != null){
            newX = ev.clientX - offsetX;
            newY = ev.clientY - offsetY;

            if(newX >= 0 && newX + targetObject.offsetWidth <= window.innerWidth){
                targetObject.style.left = (ev.clientX- offsetX) + "px";
            }
            if(newY >= 0 && newY + targetObject.offsetHeight <= window.innerHeight){
                
                targetObject.style.top = (ev.clientY- offsetY) + "px";
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
        var counter = 0;
        while(windows[counter].tabContainer.style.zIndex != ev.target.closest(".Tab-Container").style.zindex){
            counter++
        }
        windows.splice(windows[counter], 1)


        ev.target.closest(".Tab-Container").remove();
    }
    