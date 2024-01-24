export default class Welcome extends crs.classes.BindableElement {
    #list;
    #initListHandler = this.initList.bind(this);

    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    get shadowDom() {
        return true;
    }

    get n() {
        return this.getProperty("n");
    }

    async connectedCallback() {
        await super.connectedCallback();
        this.setProperty("n", 100000);
        requestAnimationFrame(async () => {
            this.#list = this.shadowRoot.querySelector("list-component");
            if (this.#list == null) return;

            if (this.#list.dataset.status === "ready") {
                this.initList(10);
            } else {
                this.#list.addEventListener("ready", this.#initListHandler);
            }
        })
    }

    async disconnectedCallback() {
        this.#list.removeEventListener("ready", this.#initListHandler);
        this.#initListHandler = null
        this.#list = null;
        await super.disconnectedCallback();
    }

    createRecords(n) {
        const records = [];

        //create n number of records
        for (let i = 0; i < n; i++) {
            records.push({
                id: i,
                code: `Record ${i}`
            })
        }

        return records
    }

    clearRecords() {
        this.initList(0);
    }

    initList(n) {
        this.#list.items = this.createRecords(n);
    }
}