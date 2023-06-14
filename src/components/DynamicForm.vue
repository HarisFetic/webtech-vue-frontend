<template>
  <h3> Test </h3>
  <div>
    <input v-model="nameField" placeholder="Name" type="text" ref="nameInput">
    <input v-model="repeatField" placeholder="Repeat" @keyup.enter="save()">
    <button type="button" @click="save()">Save</button>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Repeat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kraftuebung in kraftuebungen" :key="kraftuebung.id">
          <td>{{ kraftuebung.name }}</td>
          <td>{{ kraftuebung.repeat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: ['title'],
  data() {
    return {
      kraftuebungen: [],
      nameField: '',
      repeatField: '',
    }
  },
  methods: {
    loadKraftuebungen() {
      const endpoint = 'http://localhost:8080/kraftuebungen';
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result); // Überprüfe, ob die Daten richtig empfangen werden
          this.kraftuebungen = result; // Setze die Liste der kraftuebungen neu
        })
        .catch(error => console.log('error', error));
    },
    save() {
      const endpoint = 'http://localhost:8080/kraftuebungen';
      const data = {
        name: this.nameField,
        repeat: this.repeatField,
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          this.nameField = ''; // Leere das Eingabefeld für den Namen
          this.repeatField = ''; // Leere das Eingabefeld für die Wiederholungen
          this.loadKraftuebungen(); // Lade die kraftuebungen nach dem Speichern neu
        })
        .catch(error => console.log('error', error));
    },
    async setup() {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getKraftuebungen();
      }
    }
  },
  async created() {
    await this.setup();
    this.loadKraftuebungen();
  },
  mounted() {}
}
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
}
button {
  color: blue;
}
</style>
