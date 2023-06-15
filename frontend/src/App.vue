<script setup>
import { ref } from 'vue';

const repositories = ref(null)

async function fetchRepositories() {
  repositories.data = null
  const res = await fetch("https://api.github.com/repositories")
  repositories.value = await res.json()
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
        <th scope="col">url</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="repository in repositories" :key="repository.id">
        <td>{{ repository.full_name }}</td>
        <td><a :href="repository.html_url">{{ repository.html_url}}</a></td>
        <td><button class="btn btn-primary">Analyse</button></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
