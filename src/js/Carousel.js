export class Carousel {

    constructor(element) {
        this.element = element;

        this.upgrade();
    }

    /**
     * Upgrades the carousel so that it is ready to be used
     */
    upgrade() {
        this.element.classList.add("_simple-carousel");

        var x, child, children = this.element.children;

        for(x = 0; x < children.length; x++) {
            child = children[x];

            child.classList.add("_carousel-element");
        }
    }

}
