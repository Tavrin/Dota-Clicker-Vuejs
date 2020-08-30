<template>
  <div  class="game">
    <h1>WORK IN PROGRESS</h1>
<transition name="fade">
              <div id="heroes-choose" v-if="this.$store.state.chooseHero == false && show">
                <h2>Choisissez votre Héro</h2>
                <div id="heroes-info-zone">
                <hero v-for="hero in heroes" :hero="hero" :key="hero.name"></hero>
                </div>
                </div>
            </transition>

    <Game />
  </div>
  
</template>

<script>

// @ is an alias to /src
import Game from "@/components/Game.vue";
import Hero from "@/components/Hero.vue";

export default {
  name: "GameBoard",
    data: function() {
      return{
        show: false,
        publicPath: process.env.BASE_URL
      }
  },
  components: {
    Hero,
    Game
  },
  computed: {
    heroes: function(){
      return this.$store.state.heroes
    }
  },
  mounted(){
     this.show = true;
  }

};
</script>
<style scoped> 
.game{

transition: opacity 0.5s ease-in-out;
}
#heroes-choose{
  display: flex;
  flex-direction: column;
}
#heroes-info-zone{
  display: flex;
  align-content: center;
  margin: 0 auto;
  max-width: 50%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>