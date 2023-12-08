class SliderValue {
    constructor(value) {
        this.value = value;
        this.userSetValue = value;
    }
    setByUser(value) {
        this.value = value;
        this.userSetValue = value;
    }
    setByConstraint(value) {
        this.value = value;
    }
    get() {
        return this.value;
    }
    getUserSetValue() {
        return this.userSetValue;
    }
}

module.exports = SliderValue;