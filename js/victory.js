class Victory{
    constructor (victoryElement, elementToOverlay) {
        this.banner = document.getElementById(victoryElement);
        this.banner.style.cssText= "display: none";
        this.banner.innerHTML = "Finished";
        this.target = document.getElementById(elementToOverlay);

        window.addEventListener("resize", ()=>this.updatePosition());
        this.updatePosition();
        
        

    }

    updatePosition(){
        console.log("banner false", this.banner.style.display)
        if(!this.banner.style.display || this.banner.style.display !== "flex"){
            return;
        }
        
        
            const bannerRect = this.banner.getBoundingClientRect();
            const targetRect = this.target.getBoundingClientRect();
            const top = targetRect.top + (targetRect.height/2) - (bannerRect.height);
            const width = targetRect.width;
            const left = targetRect.left;


            this.banner.style.cssText = `
                display: flex;
                top: ${top}px;
                left: ${left}px;
                width: ${width}px;
            
            `
         
       
    }



    close(){
        this.banner.style.cssText = "display: none";    
    }


    open(){
        this.banner.style.cssText= "display: flex"
        this.updatePosition();
    }
}