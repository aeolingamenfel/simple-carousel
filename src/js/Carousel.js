export class Carousel {

    constructor(element) {
        this.element = element;
        this.tray = this.element.querySelector(".tray");
        this.children = this.tray.children;
        this.movementIncrement = 100;
        this.movementUnit = "%";
        this.currentMovement = 0;

        this.upgrade();
    }

    /**
     * Upgrades the carousel so that it is ready to be used
     */
    upgrade() {
        this.element.classList.add("_simple-carousel");

        var x, child, children = this.children;

        for(x = 0; x < children.length; x++) {
            child = children[x];

            child.classList.add("_carousel-element");
        }
    }

    next() {
        var amountToMove = this.currentMovement + this.movementIncrement;

        this.moveTo(amountToMove);
    }

    previous() {
        var amountToMove = this.currentMovement - this.movementIncrement;

        this.moveTo(amountToMove);
    }

    moveTo(locationIncrement) {
        var computedMove = locationIncrement + this.movementUnit;

        requestAnimationFrame(function() {
            this.tray.style.transform = "translateX(-" + computedMove + ")";
        }.bind(this));

        this.currentMovement = locationIncrement;
    }

}
