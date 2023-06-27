<template>
  <div class="centered-container">
    <h1 class="title">Fitnesstracker</h1>
    <div class="form-container">
      <input v-model="nameField" placeholder="Name" type="text" ref="nameInput" class="input-field">
      <input v-model="repeatField" placeholder="Repeat" @keyup.enter="save()" class="input-field">
      <input v-model="weightField" placeholder="Weight" @keyup.enter="save()" class="input-field">
      <button type="button" @click="save()" class="save-button">Save</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Repeat</th>
            <th>Weight</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kraftuebung in kraftuebungen" :key="kraftuebung.id">
            <td>{{ kraftuebung.name }}</td>
            <td>{{ kraftuebung.repeat }}</td>
            <td>{{ kraftuebung.weight }}</td>
            <td><button @click="deleteKraftuebung(kraftuebung.id)">x</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="stopwatch-container">
      <h3>Stoppuhr</h3>
      <div class="stopwatch">
        <p v-if="!running">{{ formattedTime }}</p>
        <p v-else>{{ stopwatchTime }}</p>
        <button @click="toggleStopwatch">{{ running ? 'Stop' : 'Start' }}</button>
        <button @click="resetStopwatch" :disabled="!running && stopwatchTime === '00:00:00'">Reset</button>
      </div>
    </div>
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
      weightField: '',
      running: false,
      stopwatchTime: '00:00:00',
      stopwatchInterval: null,
      startTime: 0
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
    deleteKraftuebung(id) {
          const endpoint = `http://localhost:8080/kraftuebungen/${id}`;
          const requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };
          fetch(endpoint, requestOptions)
                  .then(response => {
                    if (response.ok) {
                      console.log('Kraftuebung deleted successfully');
                      this.loadKraftuebungen(); // Lade die kraftuebungen nach dem Löschen neu
                    } else {
                      throw new Error('Failed to delete Kraftuebung');
                    }
                  })
                  .catch(error => console.log('Error:', error));
              },
    save() {
      const endpoint = 'http://localhost:8080/kraftuebungen';
      const data = {
        name: this.nameField,
        repeat: this.repeatField,
        weight: this.weightField,
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
          this.weightField = '';
          this.loadKraftuebungen(); // Lade die kraftuebungen nach dem Speichern neu
        })
        .catch(error => console.log('error', error));
    },
    async setup() {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getKraftuebungen();
      }
    },
    toggleStopwatch() {
      if (this.running) {
        this.stopStopwatch();
      } else {
        this.startStopwatch();
      }
    },
    startStopwatch() {
      this.running = true;
      this.startTime = Date.now();
      this.stopwatchInterval = setInterval(() => {
        this.stopwatchTime = this.formatTime();
      }, 1000);
    },
    stopStopwatch() {
      this.running = false;
      clearInterval(this.stopwatchInterval);
    },
    resetStopwatch() {
      this.stopStopwatch();
      this.stopwatchTime = '00:00:00';
    },
    formatTime() {
      const milliseconds = Date.now() - this.startTime;
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
      const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

      return (
        this.padNumber(hours) +
        ':' +
        this.padNumber(minutes) +
        ':' +
        this.padNumber(seconds)
      );
    },
    padNumber(number) {
      return String(number).padStart(2, '0');
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
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  margin-bottom: 10px;
}

.save-button {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.table-container {
  margin-top: 20px;
}

.stopwatch-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stopwatch {
  display: flex;
  align-items: center;
}

</style>
