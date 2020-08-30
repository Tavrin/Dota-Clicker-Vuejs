
<template  >
<transition name="fade2">
  <div class="gameBoard" v-if="this.$store.state.chooseHero">
    <h2>Dota Clicker</h2>


    <img :src="`${publicPath}img/heroes/${chosenHero.filename}`" id="hero-portrait" alt="">
  <img :src="`${publicPath}img/dota-interface1.png`" id="dota-interface-bar" alt="">
  <img :src="`${publicPath}img/heroes/${chosenHero.name}-minimap-icon.png`" id="hero-minimap-icon" alt="">
  <h3 id="hero-damage">{{chosenHero.life()}}</h3>

    <button @click="addMinion1" v-if="count >= 10">Buy Minion</button>
    <div id="gold-info">{{ totalGold }}</div>
    <span class="text-left red-text">(+{{ totalDamagePerSecond }}/dps)</span>




    <!-- ZONE D'ACHAT CREEPS -->
    <div id="creeps-buy-zone">
    <div v-for="minion in minions" :minion="minion" :key="minion.name" class="creep-buy-card" v-show="isDiscovered(minion.id)">

        <img :src="`${publicPath}img/creeps/${minion.filename}`" alt="" c style="max-width: 7rem">
        <button
          v-on:click="
            minionClick(minion.id);
            canBuy();
          "
          class="stylish-color-dark rounded hoverable"
        >
          {{ minion.name }} - {{ minion.purchased }}
        </button>
   
    </div>
    </div>
<!-- FIN ZONE D'ACHAT CREEPS -->


<div id="enemies-spawn">
  <img :src="`${publicPath}img/creeps/${enemies[0].filename}`" alt="" style="max-width: 20rem"  @click="damageEnemy(enemies[0].id);  canBuy();">
  <h3>{{enemies[0].currentLife}}</h3>
</div>

  </div>
   </transition>
</template>

<script>

export default {
  name: "Game",
  props: ["minion"],
  data: function() {
    return {
      count: 0,
      minion1: 0,
      publicPath: process.env.BASE_URL
    };
  },
  mounted() {
    this.goldProducer();
  },
  methods: {
    damageEnemy(id){
    // return this.$store.commit("damageEnemyClick", id);

      if((this.enemies[id].currentLife - this.chosenHero.damage) <= 0){
        this.laborClick();
     return   this.enemies[id].resetLife();
      }
      else{
        return  this.enemies[id].currentLife -= this.chosenHero.damage;
      }
    
    },
    isDiscovered(minionId) {
      return this.$store.state.minions[minionId].discovered;
    },
    laborClick() {
      this.$store.commit("doLabor");
    },
    addCount() {
      this.count++;
    },
    addMinion1() {
      this.minion1++;
    },
    minionClick: function(id) {
      if (
        this.minions[id].discovered == true &&
        this.totalGold - this.minions[id].costGold >= 0
      ) {
        return this.$store.commit("buyMinion", id);
      }
    },
    canBuy: function() {
      var minions = this.$store.state.minions;

      for (var i = 0; i < minions.length; i++) {
        if (
          minions[i].costGold <= this.totalGold &&
          minions[i].discovered == false
        ) {
          console.log(this.totalGold + "  " + minions[i].name);
          minions[i].discovered = true;
        }
      }
    },
    goldProducer: function() {
      setInterval(() => {
        this.canBuy();
        this.$store.commit("countGoldPerSecond");
        this.$store.commit("countDamagePerSecond");
        this.$store.commit("incrementGold");
        this.$store.commit("damageEnemyAutomatic");
      }, 1000);
    }
  },
  computed: {
    minions: function() {
      return this.$store.state.minions;
    },
    enemies: function() {
      return this.$store.state.enemies;
    },
    chosenHero: function(){
      var heroId= this.$store.state.chosenHero
      return this.$store.state.heroes[heroId];
    },
    totalGold: function() {
      return this.$store.state.goldAmount;
    },
    totalGoldPerSecond: function() {
      return this.$store.state.goldPerSecond;
    },
    totalDamagePerSecond: function(){
      return this.$store.state.damagePerSecond;
    },
    progress: function() {
      let progressPc = (this.totalGold / this.minion.costGold) * 100;
      return progressPc <= 100 ? progressPc : 100;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.creep-buy-card{
  display: flex;
  flex-direction: column;
}
#creeps-buy-zone{
  position: fixed;
  top: 3rem;
  left: 5;
}
#hero-damage{
  z-index: 11;
  position: fixed;
  bottom: 0;
  right: 50rem;
}
.fade2-enter-active, .fade2-leave-active {
  transition: opacity 2s;
}
.fade2-enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 2s;
}

#hero-portrait{
  z-index: 2;
  max-width: 15rem;
  position: fixed;
  bottom: 0;
  left: 38rem;

}
#hero-minimap-icon{
  z-index: 11;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
}
#dota-interface-bar{
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;
}
#gold-info{
  z-index: 11;
  position: fixed;
  bottom: 1.2rem;
  right: 12rem;
  font-weight: 800;
}
</style>
