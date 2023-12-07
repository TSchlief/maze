class Victory{
    constructor (victoryElement, elementToOverlay) {
        this.banner = document.getElementById(victoryElement);
        this.target = document.getElementById(elementToOverlay);

        window.addEventListener("resize", ()=>this.updatePosition());
        this.updatePosition();
        
        this.banner.style.cssText= "display: none;";

    }

    updatePosition(){
       
            const bannerRect = this.banner.getBoundingClientRect();
            const targetRect = this.target.getBoundingClientRect();
            const top = targetRect.top + (targetRect.height/2) - (bannerRect.height);
            const width = targetRect.width;
            const left = targetRect.left;


            this.banner.style.cssText = `
                top: ${top}px;
                left: ${left}px;
                width: ${width}px;
            
            `
            console.log(targetRect);
       
    }



    close(){
        this.banner.style.cssText="display: none;";
    }


    open(){
        this.banner.style.cssText="display: flex;"
        this.updatePosition();
        console.log("open")
    }
}