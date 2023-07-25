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
    color: "yellow",
    requires(){
            return new Decimal(0)
        },
    resource: "creation points",
    baseResource: "atoms",
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
        if(hasUpgrade("cr", "11")) effect = new Decimal(0.1)
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

    bars: {
        progBar: {
            display(){
                '<p style="color:white;">Hi</p>'
            },
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { return player.cr.points },
        },
    }, 
    
    upgrades: {
        11: {
            title: "A Start",
            description: "Generate 0.1 creator points per second",
            cost: new Decimal(0),
        },
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
    color: "yellow",
    requires(){
            return new Decimal(1.38e10)
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
            title: "A Start",
            description: "Generate 0.1 creator points per second",
            cost: new Decimal(0),
        },
    },

})

