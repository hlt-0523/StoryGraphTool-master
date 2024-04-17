class Engine {
    constructor(firstSceneClass, storyDataUrl) {
        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;
        this.playerInventory = [];  // Track player's items

        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));

        fetch(storyDataUrl).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass);
            }
        );
    }

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        this.scene.create(data);
    }

    addChoice(action, data) {
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        button.disabled = data === null;  // Disable button if data is null
        button.onclick = () => {
            while (this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild);
            }
            this.scene.handleChoice(data);
        };
    }

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    show(msg) {
        let div = document.createElement("div");
        div.innerHTML = msg;
        this.output.appendChild(div);
    }

    addItem(itemName) {
        if (!this.hasItem(itemName)) {
            this.playerInventory.push(itemName);
            this.updateUI();  // Update the UI to reflect the new inventory state
        }
    }

    hasItem(itemName) {
        return this.playerInventory.includes(itemName);
    }

    addItem(itemName) {
        if (!this.hasItem(itemName)) {
            this.playerInventory.push(itemName);
        }
    }

    removeItem(itemName) {
        this.playerInventory = this.playerInventory.filter(item => item !== itemName);
    }
}

class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() {}

    update() {}

    handleChoice(action) {
        console.warn('No choice handler on scene', this);
    }
}
