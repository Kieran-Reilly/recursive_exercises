/**
 * Simple web component which displays a given list of items
 */
export class ListComponent extends HTMLElement {
    #items = [];

    set items(items) {
        this.#items = items || [];
        this.render();
    }

    async connectedCallback() {
        await this.init();
    }

    disconnectedCallback() {
        this.#items = null;
    }

    async init() {
        await fetch(import.meta.url.replace(".js", ".html")).then(async (r) => {
            this.innerHTML = await r.text();
            this.setAttribute("data-status", "ready");
            this.dispatchEvent(new CustomEvent("ready", {bubbles: true, composed: true}));
        });
    }

    /**
     * Renders the list of items
     */
    async render() {
        if (this.#items == null) return;

        if (this.#items.length == 0) {
            this.innerHTML = '<link rel="stylesheet" href="/components/list_component/list_component.css">';
            return;
        }

        const docFrag = document.createDocumentFragment();
        for (const item of this.#items) {
            const li = document.createElement("li");
            li.innerText = item.code;
            docFrag.appendChild(li);
        }
        this.appendChild(docFrag.cloneNode(true));

        // for (const item of this.#items) {
        //     const li = document.createElement("li");
        //     li.innerText = item.code;
        //     this.appendChild(li);
        // }
    }
}

customElements.define("list-component", ListComponent);




