<script setup>
import { ref } from 'vue'

const steps = ref([
  { id: 1, title: 'Vue 3 Basics', description: 'Lerne die Grundlagen von Vue 3.' },
  { id: 2, title: 'Composition API', description: 'Moderne Art Vue-Komponenten zu schreiben.' },
  { id: 3, title: 'Vue Router', description: 'Navigation und Routen in Vue.' },
])
</script>

<template>
    <div class="card-container">
        <div v-for="step in steps" :key="step.id" class="card">
            <h3>{{step.title}}</h3>
            <p>{{step.description}}</p>
        </div>
    </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: #1a1a1a;
  color: white;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>