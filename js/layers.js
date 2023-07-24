addLayer("cr",{
    name: "creation",
    symbol: "CR",
    position: 0,
    startData() {return{
        unlocked: true,
        points: new Decimal(0),
        total:new Decimal(0),
        best: new Decimal(0),
    }},
    color: "yellow",
    requires(){
            return new Decimal(0)
        },
    resource: "creator points",
    baseResource: "atoms",
    baseAmount() {return player.points},
    type: "static",
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
        return mult
    },
    tabFormat: ["main-display",
    "blank",
    ["display-test",
    function() {return 'You gain ' + tmp.cr.effect + ' creator points every second'},],
    "blank",
    "upgrades",
    ["display-text",
    function() {return 'e'},]
    ],
    update(diff) {
        if (hasUpgrade("cr", "11")) player.cr.points = player.cr.points.add(tmp.cr.effect.times(diff));
    },
    effect(){
        return new Decimal(1)
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "c", description: "c: Reset for creator points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
        11: {
            title: "Start",
            description: "Generate 1 creator point per second",
            cost: new Decimal(1)
        },
        12: {

        }
    },
})


addLayer("d",{
    name: "discoveries",
    symbol: "D",
    position: 0,
    startData() {return{
        unlocked: true,
        points: new Decimal(0),
        total:new Decimal(0),
        best: new Decimal(0),
    }},
    color: "blue",
    requires(){
        return new Decimal(0)
        },
    resource: "discoveries",
    baseResource: "atoms",
    baseAmount() {return player.points},
    type: "static",
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1,
    hotkeys: [
        {key: "d", description: "d: Reset for discoveries", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Placeholder",
            description: "sus",
            cost: new Decimal(10000)

        }
    },
})
