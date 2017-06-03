export class Carousel {

    constructor(config) {
        this.element = config.element || document.querySelector(config.selector);
        this.tray = config.traySelector || this.element.querySelector(".tray");
        this.children = this.tray.children;
        this.movementIncrement = config.movementIncrement || 100;
        this.movementUnit = config.movementUnit || "%";
        this.movementMode = config.movementMode || "normal";
        this.currentChildIndex = 0; // used only for movementMode == 'child-increment'
        this.currentMovement = 0;
        this.isAgainstLeftWall = false;
        this.isAgainstRightWall = false;
        this.isMoving = false;

        if(this.movementMode === 'child-increment') {
            this.movementUnit = "px";
        }

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

    computeAmountToMove(isGoingRight) {
        switch(this.movementMode) {
            // Mode in which the carousel moves child-by-child
            case "child-increment":
                // determine index of the child who's width will be used for the
                // next movement value
                const nextIndex = isGoingRight ? this.currentChildIndex
                    : this.currentChildIndex - 1;

                // if the nextIndex is out of bounds, don't do anything
                if(nextIndex < 0 || nextIndex >= this.children.length) {
                    return 0;
                }

                const child = this.children[nextIndex];
                const childWidth = child.offsetWidth;

                return this.currentMovement
                    + ((isGoingRight ? 1 : -1) * childWidth);
            default:
                return this.currentMovement
                    + ((isGoingRight ? 1 : -1) * this.movementIncrement);
        }
    }

    next() {
        this.computeStatus();

        if(this.isAgainstRightWall) {
            return;
        }

        var amountToMove = this.computeAmountToMove(true);

        if(this.movementMode === 'child-increment') {
            this.currentChildIndex += 1;
        }

        this.moveTo(amountToMove);
    }

    previous() {
        this.computeStatus();

        if(this.isAgainstLeftWall) {
            return;
        }

        var amountToMove = this.computeAmountToMove(false);

        if(this.movementMode === 'child-increment') {
            this.currentChildIndex -= 1;
        }

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
