<script setup>
import { ref } from 'vue';

const repositories = ref(null)

async function fetchRepositories() {
  repositories.data = null
  const res = await fetch("https://api.github.com/repositories")
  repositories.value = await res.json()
}

async function sendAnalysis(url) {
  const options = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({url: url})
    }

  await fetch("http://localhost:3001/api/analysis", options)
}

fetchRepositories()


</script>

<template>
  <h1>Repository analyser</h1>
  <p v-if="!repositories">Loading repositories...</p>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Slug</th>
        <th>README.md</th>
        <th>Status</th>
        <th></th><!-- Analyse Button-->
      </tr>
    </thead>
    <tbody>
      <tr v-for="repository in repositories" :key="repository.id">
        <td>{{ repository.full_name }}</td>
        <td></td>
        <td></td>
        <td>
          <button @click="sendAnalysis(repository.url)" class="btn btn-primary">Analyse</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
