/* eslint-disable prettier/prettier */
<template>

<div class="heroes" >
  <div class="heroData">
    <img :src="`${publicPath}img/heroes/${hero.filename}`" alt="" @click="chooseHero">

    {{hero.name}}
    </div>
    </div>
  
</template>

<script>
export default {
  name: "Hero",
  props: ["hero"],
  data: function() {
    return {
      count: 0,
      minion1: 0,
      publicPath: process.env.BASE_URL
    };
  },
  methods: {
      chooseHero: function(){
          this.$store.state.chooseHero = true
          console.log(this.hero.id)
          this.$store.state.chosenHero = this.hero.id
      }
  },
  computed: {
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .heroes{
    margin: 1rem;
  }
  .heroData{
    display: flex;
    flex-direction: column;
  }
</style>
