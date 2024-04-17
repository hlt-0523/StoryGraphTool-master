class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body); 

        if (locationData.Choices) {
            for (let choice of locationData.Choices) {
                if (choice.RequiresItem && !this.engine.hasItem(choice.RequiresItem)) {
                    this.engine.addChoice("You need the " + choice.RequiresItem, null);  // Show but disable the option
                } else {
                    this.engine.addChoice(choice.Text, choice);
                }
            }
        }
    }
    
    handleChoice(choice) {
        if(choice) {
            this.engine.show("> " + choice.Text);
            if (choice.Text === "Take the access code and return") {
                this.engine.addItem("Access Code");  // Add the access code to inventory
            }
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
