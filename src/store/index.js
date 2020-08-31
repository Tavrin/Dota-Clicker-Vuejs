
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

const labor =   {
  id: 0,
  name: 'Manual Labor',
  earningGold: 1,
  purchased: 0
}

var currentLevel = 1;

const minions = [
  {
      id: 0,
      name: 'melee minion',
      filename:'Melee_Creep_card_image.png',
      costGold: 5,
      goldPerSeconds: 0,
      purchased: 0,
      damage: 5,
      discovered: false,
      
  },
  {
      id: 1,
      name: 'ranged minion',
      filename:'ranged_creep_radiant.png',
      costGold: 10,
      goldPerSeconds: 0,
      purchased: 0,
      damage: 20,
      discovered: false,
      
  },
  {
      id: 2,
      name: 'Catapult',
      filename:'siege_creep_radiant.png',
      costGold: 15,
      goldPerSeconds: 0,
      purchased: 0,
      damage: 60,
      discovered: false,
     
  },
]

const enemies = [
    {
        id: 0,
        name:"Dire Melee Creep",
        filename: "Mega_Melee_Creep_Dire_model.png",
        level: 1,
        baseLife: function(){
            return 200 + (15 *  this.level)
        }, 
        currentLife: 215,
        resetLife: function(){
            return this.currentLife = this.baseLife();
        },
        active: true
    }
]
const heroes = [
    {
        id: 0,
        name: "timbersaw",
        goldPassive: 1,
        active:false,
        filename: "timbersaw.png",
        slots:[],
        level: 1,
        life:  function(){
                return 300 + (30 * this.level)
            
        },
        mana: function(){
                return 10 + (10 * this.level)
            
        },
        damage:
                 10 + (10 * currentLevel)
            ,
        category: "Strength"
    },
    {
        id: 1,
        name: "morphling",
        goldPassive: 1,
        active:false,
        filename: "morphling.png",
        filename2: "morph-portrait.jpg",
        slots:[],
        level: 1,
        life: function(){
            return 10 + (15 *  this.level)
         },
            
        mana: function(){
                return 10 + (15 * this.level)
            
        },
        damage:
          20 + (10* currentLevel)
            
        ,
        category: "Agility"
    },
    {
        id: 2,
        name: "Storm Spirit",
        goldPassive: 1,
        active:false,
        filename: "storm_spirit.png",
        slots:[],
        level: 1,
        life:function(){
                return 100 + (20 * this.level)
            
        },
        mana: function(){
                return 30 + (30 * this.level)
          
        },
        damage: 40 + (10 * currentLevel)
            
        ,
        category: "Intelligence"
    }
]

export default new Vuex.Store({
  state: {
      chosenHero: null,
      chooseHero: false,
    clickAmount: 0,
    goldAmount: 0,
    goldPerSecond: 0,
    damagePerSecond: 0,
    minions: minions,
    heroes: heroes,
    labor: labor,
    enemies: enemies,
    currentLevel: currentLevel
  },
  mutations: {
      chooseHero(state,id){
        state.heroes[id].active = true;
      },
        incrementGold (state){
            state.goldAmount += state.goldPerSecond
            console.log("Increment Money/s : ", state.goldPerSecond)
        },
        doLabor (state){
            labor.purchased++
            state.clickAmount++
            state.goldAmount += labor.earningGold
            console.log("Do : ", labor.name)
        },
        buyMinion (state, minionID){
            var minion = state.minions.find(minion => minion.id === minionID)
            if (minion.id === minionID) {
              minion.purchased++
                state.goldAmount -= minion.costGold
                console.log("Buy minion : ", minion.name)
             }
        },
        discoverMinion (state){
            for (let minion of state.minions) {
                if(minion.discovered === false && state.goldAmount >= minion.costGolds){
                    console.log("Discovered : ", minion.name)
                    minion.discovered = true
                }
            }
        },
        countGoldPerSecond (state){
            state.goldPerSecond = 0
            for (let minion of state.minions) {
                state.goldPerSecond += minion.goldPerSeconds * minion.purchased
            }
            return state.goldPerSecond
        }
        ,countDamagePerSecond (state){
            state.damagePerSecond = 0
            for (let minion of state.minions) {
                state.damagePerSecond += minion.damage * minion.purchased
            }
            return state.damagePerSecond
        }
        ,damageEnemyAutomatic (state){

            for (let enemy of state.enemies) {
                if(enemy.active == true){
                    if((enemy.currentLife - state.damagePerSecond) <= 0){
                        state.clickAmount++
            state.goldAmount += labor.earningGold;
                     enemy.level +=1
                     return   enemy.resetLife();
                    }
                    else{
                        return enemy.currentLife -= state.damagePerSecond;
                    }
                    
                }
                
            }
            
        }
    }
})
