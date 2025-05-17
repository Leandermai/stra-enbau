<script setup>
import { ref } from 'vue'

const text = ref('')
const confirmed = ref(false)

let steps = ref([
  { id: 1, title: 'Vue 3 Basics', description: 'Lerne die Grundlagen von Vue 3.' },
  { id: 2, title: 'Composition API', description: 'Moderne Art Vue-Komponenten zu schreiben.' },
  { id: 3, title: 'Vue Router', description: 'Navigation und Routen in Vue.' },
])

const roadmap = ref('')


const regexTest = "**1****A****asdasdasdad****2****B****zzzzzzzzzz****3****C****vbbbbbbbbbbbb****4****D****hhhhhhhhhhhhh****5****E****eeeeeeeeee**";

function parseRoadmapString(input) {
  steps = [];
  const stepRegex = /\*\*(\d+)\*\*\*\*(.+?)\*\*\*\*(.+?)\*\*/g;
  let match;

  while ((match = stepRegex.exec(roadmap.value)) !== null) {
    const id = parseInt(match[1], 10);
    const title = match[2].trim();
    const description = match[3].trim();
    steps.push({ id, title, description });
  }
  steps.value = steps;
  console.log('Parsed Steps:', steps);
  console.log("Roadmap value:", roadmap.value);
}
const generateRoadmapString = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text.value }),
    })

    if (!res.ok) {
      throw new Error(`Server antwortete mit Status ${res.status}`)
    }

    const data = await res.json()
    console.log('Antwort vom Server:', data)

    roadmap.value = data.roadmap || 'Fehler beim Generieren.'
  } catch (error) {
    console.error('Fetch Fehler:', error)
    roadmap.value = `Fehler: ${error.message}`
  }
}


const submit = async () => {
  if (text.value.trim() !== '') {
    await generateRoadmapString();
    parseRoadmapString(roadmap.value);          
    confirmed.value = true;                     
  }
}


const backToHome = () => {
  confirmed.value = false
  text.value = ''
  roadmap.value = ''
}

const regextestbutton = () => {
  parseRoadmapString(regexTest);
}
</script>

<template>
  <div v-if="!confirmed" class="inputCard">
    <h2 class="headline">Let's build your roadmap!</h2>
    <label for="username">What do you want to learn?</label>
    <input id="username" v-model="text" placeholder="e.g. Vue 3" />
    <button @click="submit">Submit!</button>
  </div>

  <div v-else class="card-container">
    <h1 class="title">Your Roadmap for "{{ text }}"</h1>
    <div v-for="step in roadmap.value" :key="step.id" class="card step-card">
      <h3>{{ step.title }}</h3>
      <p>{{ step.description }}</p>
    </div>
    <button @click="backToHome">Return</button>
  </div>
</template>

<style scoped>
body {
  background-color: #121212;
}

.inputCard {
  min-width: 300px;
  padding: 60px 120px;
  background-color: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  font-family: 'Segoe UI', sans-serif;
  color: #e0ffe8;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card {
  margin: 20px auto;
  padding: 24px;
  background-color: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  font-family: 'Segoe UI', sans-serif;
  color: #e0ffe8;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
}

.headline {
  color: #b8f7c4;
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;
}

label {
  font-weight: bold;
  color: #b8f7c4;
  margin-bottom: 6px;
}

input {
  padding: 10px 14px;
  font-size: 1rem;
  background-color: #2a2a2a;
  border: 1px solid #3e3e3e;
  border-radius: 6px;
  color: #ffffff;
  transition: 0.2s ease-in-out;
}

input:focus {
  border-color: #00cc66;
  box-shadow: 0 0 0 2px rgba(0, 204, 102, 0.4);
  outline: none;
}

button {
  width: 100%;
  background-color: #00cc66;
  color: #121212;
  border: none;
  padding: 10px 14px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #009f4c;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #e0ffe8;
}

.title {
  color: #b8f7c4;
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 20px;
}

.step-card {
  width: 100%;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #00cc66;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.step-card h3 {
  color: #b8f7c4;
  margin-bottom: 8px;
}

.step-card p {
  color: #e0ffe8;
}
</style>
