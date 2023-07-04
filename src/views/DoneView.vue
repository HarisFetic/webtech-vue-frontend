<template>
    <div>
      <h2>Kraftuebungen:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Repeat</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kraftuebung in filteredKraftuebungen" :key="kraftuebung.id">
            <td>{{ kraftuebung.name }}</td>
            <td>{{ kraftuebung.repeat }}</td>
            <td>{{ kraftuebung.weight }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>Ausdaueruebungen:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ausdaueruebung in filteredAusdaueruebungen" :key="ausdaueruebung.id">
            <td>{{ ausdaueruebung.name }}</td>
            <td>{{ ausdaueruebung.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import '../styles.css'; // Import der CSS-Datei
  
  export default {
    name: 'DynamicForm',
    props: ['title'],
    data() {
      return {
        exerciseType: 'kraftuebung',
        kraftuebungen: [],
        ausdaueruebungen: [],
      };
    },
    computed: {
      filteredKraftuebungen() {
        return this.kraftuebungen.filter((kraftuebung) => kraftuebung.confirmed);
      },
      filteredAusdaueruebungen() {
        return this.ausdaueruebungen.filter((ausdaueruebung) => ausdaueruebung.confirmed);
      },
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
    created() {
      this.loadKraftuebungen();
      this.loadAusdaueruebungen();
    },
  };
  </script>
  
  <style scoped></style>
  