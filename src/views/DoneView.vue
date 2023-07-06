<template>
  <div class="centered-container">
    <h1 class="title">Fitnesstracker</h1>
    <div v-if="kraftuebungen.length || ausdaueruebungen.length">
      <div v-if="kraftuebungen.length">
        <h2>Kraftübungen</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Repeat</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="kraftuebung in kraftuebungen" :key="kraftuebung.id">
              <td v-if="kraftuebung.confirm">{{ kraftuebung.name }}</td>
              <td v-if="kraftuebung.confirm">{{ kraftuebung.repeat }}</td>
              <td v-if="kraftuebung.confirm">{{ kraftuebung.weight }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="ausdaueruebungen.length">
        <h2>Ausdauerübungen</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ausdaueruebung in ausdaueruebungen" :key="ausdaueruebung.id">
              <td v-if="ausdaueruebung.confirm">{{ ausdaueruebung.name }}</td>
              <td v-if="ausdaueruebung.confirm">{{ ausdaueruebung.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>No confirmed exercises available.</p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ExerciseList',
  data() {
    return {
      kraftuebungen: [],
      ausdaueruebungen: [],
    };
  },
  mounted() {
    this.loadKraftuebungen();
    this.loadAusdaueruebungen();
  },
  methods: {
    loadKraftuebungen() {
      const endpoint = 'http://localhost:8080/kraftuebungen';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.kraftuebungen = result;
        })
        .catch((error) => console.log('error', error));
    },
    loadAusdaueruebungen() {
      const endpoint = 'http://localhost:8080/ausdaueruebungen';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.ausdaueruebungen = result;
        })
        .catch((error) => console.log('error', error));
    },
  },
};
</script>

<style scoped>
/* Styles for ExerciseList component */
</style>
