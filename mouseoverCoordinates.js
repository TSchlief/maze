export default class MouseoverCoordinates {
    constructor (element, widthSegments = 100, heightSegments = 100) {
        this.element = document.getElementById(element);
        this.widthSegments = widthSegments;
        this.heightSegments = heightSegments;
    
        element.addEventListener('mousemove', (event) => {
        const height = myDiv.getBoundingClientRect().height;
        const width = myDiv.getBoundingClientRect().width;
        const relativeX = Math.floor((event.offsetX*widthSegments) / width);
        const relativeY = Math.floor((event.offsetY*heightSegments) / height);
        console.log(`Relative Coordinates: X=${relativeX}, Y=${relativeY}`);
        }
    }
}