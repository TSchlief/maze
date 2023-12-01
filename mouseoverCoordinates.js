class MouseoverCoordinates {
    constructor(elementId, widthSegments = 100, heightSegments = 100, callback) {
        this.element = document.getElementById(elementId);
        this.x = null;
        this.y = null;
        this.callback = callback;

        this.mousemoveHandler = (event) => {
            this.handleMousemove(event, widthSegments, heightSegments);
        };

        this.element.addEventListener('mousemove', this.mousemoveHandler);
    }

    handleMousemove(event, widthSegments, heightSegments) {
        const height = this.element.getBoundingClientRect().height;
        const width = this.element.getBoundingClientRect().width;
        const x = Math.floor((event.offsetX * widthSegments) / width);
        const y = Math.floor((event.offsetY * heightSegments) / height);
        if (x !== this.x || y !== this.y) {
            this.x = x;
            this.y = y;
            if (this.callback) {
                this.callback(x, y);
            }
        }
    }

    destroy() {
        this.element.removeEventListener('mousemove', this.mousemoveHandler);
    }
}

const ev = new MouseoverCoordinates("myDiv", 10, 10, (x, y) => console.log(x, y));


