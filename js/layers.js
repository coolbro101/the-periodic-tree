addLayer("a",{
    startData() {return {unlocked: true,}},
    color: "#FC6A03",
    row:"side",
    layerShown() {return true},
    tooltip() {return ("Achievements!")},
    achievements:{
        rows: 10,
        cols: 5,
        11:{
            name: "The Big Bang",
            tooltip: "You have done your first creation... I wonder what's next...",
            done(){return player.cr.points.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.B-k2pblYQTZL_HSKGKNWRAHaEK?w=310&h=180&c=7&r=0&o=5&pid=1.7"
        },
        12:{
            name: "Breaking the timewall",
            tooltip: "omg you actually get content now. Reward: 10 Atoms",
            done(){return tmp.cr.bars.progBar.progress.gte(1)},
            onComplete(){
                player.points = new Decimal(10)
            },
            done(){return player.cr.points.gt(0)},
          style() {
            return hasAchievement(this.layer, this.id) ? "" : {
                backgroundImage: ""
             }
         },
            image: "https://th.bing.com/th/id/OIP.N_Ts9vyIZqVbp5sDUSENpgHaFq?w=248&h=190&c=7&r=0&o=5&pid=1.7"

        },
        /*11:{
            name: "A beginning",
            tooltip: "Do your first hydrogen reset",
            done() {return player.h.points.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.5iyUUKSTmL-taBas--_oMAAAAA?w=156&h=180&c=7&r=0&o=5&pid=1.7"
        },
        12:{
            name: "Getting the hang of it",
            tooltip: "Have 3 or more hydrogen upgrades",
            unlocked() {return hasAchievement("a", 11)},
            done() {return player.h.upgrades.length >= 3},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.NP5QSvrCh0DK8Gao192sPwHaFK?w=240&h=180&c=7&r=0&o=5&pid=1.7"
        },
        13:{
            name: "Wow you're really still playing?",
            tooltip: "Have 20 total hydrogen",
            unlocked() {return hasAchievement('a', 12)},
            done() {return player.h.total.gte(20)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },  
            image: "https://th.bing.com/th/id/OIP.JwrL266NzPtHWrCn4dxmAwHaIN?w=179&h=199&c=7&r=0&o=5&pid=1.7"
        },
        14:{
            name: "Moving on",
            tooltip: "Do your first row 2 reset. Reward: Unlock more hydrogen upgrades",
            unlocked(){return hasAchievement('a', 13)},
            done() {return player.he.total.gt(0) || player.l.total.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.JA8mkwas7jiV-oYo3YuTLAHaE8?w=256&h=180&c=7&r=0&o=5&pid=1.7"
        },
        15:{
            name: "Both",
            tooltip: "Do both a lithium and helium reset",
            unlocked(){return hasAchievement('a', 14)},
            done() {return player.he.total.gt(0) && player.l.total.gt(0)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.BukJXMRGR9uUJi9qADeeXgHaFj?w=211&h=180&c=7&r=0&o=5&pid=1.7"
        },
        21:{
            name: "Hydrogen Bonding",
            tooltip: "Have 1 Million hydrogen",
            unlocked(){return hasAchievement('a', 15)},
            done() {return player.h.points.gte(1e6)},
            style() {
                return hasAchievement(this.layer, this.id) ? "" : {
                  backgroundImage: ""
                }
              },
            image: "https://th.bing.com/th/id/OIP.DlFfktjLOBOpDYHK8X3f1QHaIG?w=189&h=207&c=7&r=0&o=5&pid=1.7",
        },*/
    }
})

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
    infoboxes: {
        lore: {
            title: "Lore",
            body() { return "<img src="lore11.png" width="500"><br>In the beginning, all was simple - there were 4 elements: Earth, Fire, Water, and Air. All was in peace and harmony... until the fire nation attacked. Anyways, in the beginning, there was creation. I don't care what you believe in, or what religion you are, but all of them have a starting point of the world being created. In this case, The Big Bang will be what we'll refer to since most people accept that as a possible source of creation. The Big Bang happened around 13.8 billion years ago - the number of creation points you'll need to get to the next layer. Good Luck! Have fun with the time walls!
		 },
    
       },
    }
    color: "yellow",
    resource: "creator points",
    baseResource: "atoms",
	branches: ["h"],
    baseAmount() {return player.points},
    type: "static",
    exponent: 1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	
        return mult
    },
    tabFormat: ["main-display",
    ["display-text",
    function() {return 'You are generating ' + format(tmp.cr.effect) + '/s creation points.'},],
    "blank",
    "upgrades",
    ["bar","progBar"]
    ],

    update(diff) {
        if (hasUpgrade("cr", "11")) player.cr.points = player.cr.points.add(tmp.cr.effect.times(diff));
    },
    effect(){
        let effect = new Decimal(0)
        if(hasUpgrade("cr", "11")) effect = new Decimal(12312312)
        if(hasUpgrade("cr", "12")) effect = new Decimal(1)
        if(hasUpgrade("cr", "13")) effect = new Decimal(5)
        return effect
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "c", description: "c: Reset for creator points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    doReset(resettingLayer) {
        let keep = [];
        if (resettingLayer) keep.push("upgrades")
        if (resttingLayer) layerDataReset("h", keep)
    },
    bars: {
        progBar: {

            direction: RIGHT,

            width: 400,
            height: 100,
            fillStyle: {'background-color' : "#FFD700"},
            baseStyle: {'background-color' : "#696969"},
            borderStyle: {'border-width' : "10px"},
            textStyle: {'color': '#000000'},
            progress() {
                let progress = player.cr.points.div(1500)
                if(progress.gte(1) && tmp.cr.bars.progBar.divider.eq(1500)) progress = player.cr.points.div(10000)
                return progress
            },
            divider(){
                let value = new Decimal(1500)
                if (tmp.cr.bars.progBar.progress.neq(player.cr.points.div(1500))) value = new Decimal(10000)
                return value
            },
            display() {
                let display = format(player.cr.points) + ' / ' + tmp.cr.bars.progBar.divider + '<br><p>Unlocks 1 More Upgrade<p>'
                return display
            },
        },
    }, 
    
    upgrades: {
        11: {
            title: "A Start",
            description: "Generate 0.5 creator points per second",
            cost: new Decimal(0),
        },
        12: {
            title: "Get Timewalled",
            description: "This will take a while. Increase CR generation to 1 per second.",
            cost: new Decimal(50)
        },
        13: {
            title: "This Is Meant To Be Slow",
            description: "You might grow a year older while waiting for this upgrade! Increase CR generation to 5 a second.",
            cost: new Decimal(200)
        },
        14: {
            title: "Beginnings",
            description: "Unlocks a new layer",
            cost: new Decimal(1500),
            unlocked(){
                let status = false
                if(tmp.cr.bars.progBar.progress.gte(1) || hasUpgrade("cr", "14") || tmp.cr.bars.progBar.progress.neq(player.cr.points.div(1500))) status = true
                return status
            },
        },
    },

})

addLayer("h", {
    name: "hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() { // This appears on the layer's node. Default is the id with the first letter capitalized
        return `
        <p>H
        <p class='cBreak' style='font-size:16px'>1 | 1.007</p>
        </p>`
      },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
	    points: new Decimal(0),
        total: new Decimal(0),
	    best: new Decimal(0),
    }},
    color: "white", //#ADD8E6
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "hydrogen", // Name of prestige currency
    baseResource: "atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses. Edit by King_B3H: Can reduce the cost or increase cost
        let mult = new Decimal(1);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses Edit by King_B3H: Can reduce the cost or increase cost.
        let exp = new Decimal(1)
        if (hasUpgrade("h", 31)) exp = exp.times(1.05);
        return exp;
    },
    directMult(){ //Directly multiplies the resource gain of that layer
        let multiplier = new Decimal(1);
        if (hasUpgrade('h', 21)) multiplier = multiplier.times(upgradeEffect('h', 21))
        return multiplier
    },
    hotkeys: [
        {key: "h", description: "H: Reset for hydrogen atoms", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        let show = false
        if (hasUpgrade("cr", "14")) show = true
        return show
    },
    doReset(resettingLayer) {
        let keep = [];
        if (layers[resettingLayer].row > this.row) layerDataReset("h", keep)
    },
    upgrades: {
        11:{
            title: "Atom Generator",
            description: "Allows you to start generating atoms!",
            cost: new Decimal(1)
           
        },
        12: {
            title: "Stronger Hydrogen I",
            description: "Doubles your atom gain.",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade("h", 11) },
        },
        13: {
            title: "Synergetic Hydrogen",
            description: "Best hydrogen boosts atom gain.",
            cost: new Decimal(5),
            effect() {
              let effect = player.h.best.add(1).pow(0.3)
                if (hasUpgrade('h', 32)) effect = effect.pow(1.5)
                return effect;
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' },
            unlocked() { return hasUpgrade("h", 12) },
        },
        21: {
            title: "More Hydrogen",
            description: "Atoms boost hydrogen",
            cost: new Decimal(10),
            effect() {
                let effect = new Decimal(1)
                effect = effect.add(player.points.add(1).log10().pow(0.5))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' },
            unlocked() { return hasUpgrade("h", 13) },
        },
        22: {
            title: "Stronger Hydrogen II",
            description: "Triples atom gain.",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade("h", 21) },
        },
        23: {
            title: "Atomical I",
            description: "Atoms boost atom gain",
            cost: new Decimal(100),
            effect() {
                let effect = player.points.pow(0.1)
                if(player.points.lt(1)){
                    effect = new Decimal(1)
                }
                return effect
            },
            gainMult(){
                let mult = new Decimal(1)
                if(hasUpgrade('h', 23)) mult = mult.times(upgradeEffect('h', 23))
                return mult
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x' },
            unlocked() { return hasUpgrade("h", 21) },
        },
        31: {
          title: "Even more synergy!!",
            description: 'The effect of <b>Synergetic Hydrogen</b> is raised to the 1.5',
            cost: new Decimal(1000),
            unlocked() {return hasAchievement('a', 14) && hasUpgrade("h", 23)}
        },
    },
})
