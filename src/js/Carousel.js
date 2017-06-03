export class Carousel {

    constructor(config) {
        this.element = config.element || document.querySelector(config.selector);
        this.tray = config.traySelector || this.element.querySelector(".tray");
        this.children = this.tray.children;
        this.movementIncrement = config.movementIncrement || 100;
        this.movementUnit = config.movementUnit || "%";
        this.currentMovement = 0;
        this.isAgainstLeftWall = false;
        this.isAgainstRightWall = false;
        this.isMoving = false;

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

        this.tray.addEventListener("transitionend", function(e) {
            this.movementEnded(e);
        }.bind(this), false);
    }

    movementEnded(e) {
        this.isMoving = false;
    }

    next() {
        this.computeStatus();

        if(this.isAgainstRightWall) {
            return;
        }

        var amountToMove = this.currentMovement + this.movementIncrement;

        this.moveTo(amountToMove);
    }

    previous() {
        this.computeStatus();

        if(this.isAgainstLeftWall) {
            return;
        }

        var amountToMove = this.currentMovement - this.movementIncrement;

        this.moveTo(amountToMove);
    }

    moveTo(locationIncrement) {
        if(this.isMoving) {
            return;
        }

        var computedMove = (-1 * locationIncrement) + this.movementUnit;

        requestAnimationFrame(function() {
            this.tray.style.transform = "translateX(" + computedMove + ")";
        }.bind(this));

        this.isMoving = true;
        this.currentMovement = locationIncrement;
    }

    getChildWidthSum() {
        var x, sum = 0, child;

        for(x = 0; x < this.children.length; x++) {
            child = this.children[x];

            sum += child.offsetWidth;
        }

        return sum;
    }

    getCurrentMovementInPixels() {
        if(this.movementUnit !== '%') {
            return this.currentMovement;
        }

        var parentWidth = this.element.offsetWidth;
        var pixelMovementValue = parentWidth * (this.currentMovement * 0.01);

        return pixelMovementValue;
    }

    computeStatus() {
        var sum = this.getChildWidthSum();
        var movementInPixels = this.getCurrentMovementInPixels();

        if(movementInPixels == 0) {
            this.isAgainstLeftWall = true;
        } else {
            this.isAgainstLeftWall = false;
        }

        if(movementInPixels + this.element.offsetWidth > sum) {
            this.isAgainstRightWall = true;
        } else {
            this.isAgainstRightWall = false;
        }
    }

}
