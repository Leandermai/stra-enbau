<script setup>
import { ref } from 'vue'
let text = ref('')
</script>

<template>
  <div class="card">
    <label for="username">What do you want to learn?</label><br />
    <input id="username" v-model="text" />
    <button>Submit!</button>
  </div>
</template>
<style scoped>
.card {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background-color: #1a1a1a; /* helles Schwarz */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: sans-serif;
  color: #ffffff; /* weißer Text */
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: #b8f7c4; /* heller Grünton für Text */
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #3e3e3e;
  border-radius: 4px;
  margin-bottom: 16px;
  box-sizing: border-box;
  background-color: #2a2a2a;
  color: #ffffff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  border-color: #00cc66; /* dunkleres Grün */
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 204, 102, 0.4);
}

h2 {
  font-size: 1.2rem;
  color: #e0ffe8; /* leicht grünliches Weiß */
}
</style>