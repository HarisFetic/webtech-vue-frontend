<template>
  <div class="centered-container">
    <h1 class="title">Fitnesstracker</h1>
    <div class="form-container">
      <label for="exercise-type">Auswählen:</label>
      <select id="exercise-type" v-model="exerciseType" @change="clearFormFields">
        <option value="kraftuebung">Kraftübung</option>
        <option value="ausdaueruebung">Ausdauerübung</option>
      </select>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="nameField" />
      <span class="validation-message">{{ nameError }}</span>
      <label v-if="exerciseType === 'kraftuebung'" for="repeat">Repeat:</label>
      <input v-if="exerciseType === 'kraftuebung'" type="text" id="repeat" v-model="repeatField" />
      <span  v-if="exerciseType === 'kraftuebung'" class="validation-message">{{ repeatError }}</span>
      <label v-if="exerciseType === 'kraftuebung'" for="weight">Weight:</label>
      <input v-if="exerciseType === 'kraftuebung'" type="text" id="weight" v-model="weightField" />
      <span  v-if="exerciseType === 'kraftuebung'" class="validation-message">{{ weightError }}</span>
      <label v-if="exerciseType === 'ausdaueruebung'" for="time">Time:</label>
      <input v-if="exerciseType === 'ausdaueruebung'" type="text" id="time" v-model="timeField" />
      <span  v-if="exerciseType === 'ausdaueruebung'" class="validation-message">{{ timeError }}</span>
      <button class="save-button" @click="save">Save</button>
    </div>
    <div>
      <h2>Kraftübungen</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Repeat</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kraftuebung in kraftuebungen" :key="kraftuebung.id">
            <td>{{ kraftuebung.name }}</td>
            <td>{{ kraftuebung.repeat }}</td>
            <td>{{ kraftuebung.weight }}</td>
            <td>
              <button @click="editKraftuebung(kraftuebung)">Edit</button>
              <button @click="deleteKraftuebung(kraftuebung.id)">Delete</button>
              <button v-if="!kraftuebung.confirm" @click="confirmKraftuebung(kraftuebung)">Confirm</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>Ausdauerübungen</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ausdaueruebung in ausdaueruebungen" :key="ausdaueruebung.id">
            <td>{{ ausdaueruebung.name }}</td>
            <td>{{ ausdaueruebung.time }}</td>
            <td>
              <button @click="editAusdaueruebung(ausdaueruebung)">Edit</button>
              <button @click="deleteAusdaueruebung(ausdaueruebung.id)">Delete</button>
              <button v-if="!ausdaueruebung.confirm" @click="confirmAusdaueruebung(ausdaueruebung)">Confirm</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>Stopwatch:</h2>
      <div class="stopwatch">
        <div class="stopwatch-time">{{ formatTime(stopwatchTime) }}</div>
        <button @click="toggleStopwatch">{{ running ? 'Stop' : 'Start' }}</button>
        <button @click="resetStopwatch">Reset</button>
      </div>
    </div>
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
      nameField: '',
      repeatField: '',
      weightField: '',
      timeField: '',
      kraftuebungen: [],
      ausdaueruebungen: [],
      editingKraftuebung: null,
      stopwatchTime: 0,
      stopwatchInterval: null,
      running: false,
      startTime: 0,
      nameError: '',
      repeatError: '',
      weightError: '',
      timeError: '',
    };
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
    deleteKraftuebung(id) {
      const endpoint = `http://localhost:8080/kraftuebungen/${id}`;
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
      };
      fetch(endpoint, requestOptions)
        .then((response) => {
          if (response.ok) {
            console.log('Kraftuebung deleted successfully');
            this.loadKraftuebungen();
          } else {
            throw new Error('Failed to delete Kraftuebung');
          }
        })
        .catch((error) => console.log('Error:', error));
    },
    deleteAusdaueruebung(id) {
      const endpoint = `http://localhost:8080/ausdaueruebungen/${id}`;
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
      };
      fetch(endpoint, requestOptions)
        .then((response) => {
          if (response.ok) {
            console.log('Ausdaueruebung deleted successfully');
            this.loadAusdaueruebungen();
          } else {
            throw new Error('Failed to delete Ausdaueruebung');
          }
        })
        .catch((error) => console.log('Error:', error));
    },
    saveAusdaueruebung() {

  this.clearValidationErrors();

  if (this.validateForm()) {
    if (this.editingAusdaueruebung) {
      this.updateAusdaueruebung();
    } else {
      this.createAusdaueruebung();
    }
  }
},
save() {
  this.clearValidationErrors();

  if (this.validateForm()) {
    if (this.exerciseType === 'kraftuebung') {
      if (this.editingKraftuebung) {
        this.updateKraftuebung();
      } else {
        this.createKraftuebung();
      }
    } else if (this.exerciseType === 'ausdaueruebung') {
      if (this.editingAusdaueruebung) {
        this.updateAusdaueruebung();
      } else {
        this.createAusdaueruebung();
      }
    }
  }
},
    createKraftuebung() {
      const endpoint = 'http://localhost:8080/kraftuebungen';
      const data = {
        name: this.nameField,
        repeat: this.repeatField,
        weight: this.weightField,
        confirm: false,
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          this.clearFormFields();
          this.loadKraftuebungen();
        })
        .catch((error) => console.log('error', error));
    },
    createAusdaueruebung() {
      const endpoint = 'http://localhost:8080/ausdaueruebungen';
      const data = {
        name: this.nameField,
        time: this.timeField,
        confirm: false,
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          this.clearFormFields();
          this.loadAusdaueruebungen();
        })
        .catch((error) => console.log('error', error));
    },
    updateKraftuebung() {
      if (!this.editingKraftuebung) return;
      const endpoint = `http://localhost:8080/kraftuebungen/${this.editingKraftuebung.id}`;
      const data = {
        name: this.nameField,
        repeat: this.repeatField,
        weight: this.weightField,
        confirm: this.editingKraftuebung.confirm,
      };
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          this.clearFormFields();
          this.editingKraftuebung = null;
          this.loadKraftuebungen();
        })
        .catch((error) => console.log('error', error));
    },
    updateAusdaueruebung() {
      if (!this.editingAusdaueruebung) return;
      const endpoint = `http://localhost:8080/ausdaueruebungen/${this.editingAusdaueruebung.id}`;
      const data = {
        name: this.nameField,
        time: this.timeField,
        confirm: this.editingAusdaueruebung.confirm,
      };
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          this.clearFormFields();
          this.editingAusdaueruebung = null;
          this.loadAusdaueruebungen();
        })
        .catch((error) => console.log('error', error));
    },
    editKraftuebung(kraftuebung) {
      this.editingKraftuebung = kraftuebung;
      this.nameField = kraftuebung.name;
      this.repeatField = kraftuebung.repeat;
      this.weightField = kraftuebung.weight;
    },
    editAusdaueruebung(ausdaueruebung) {
      this.editingAusdaueruebung = ausdaueruebung;
      this.nameField = ausdaueruebung.name;
      this.timeField = ausdaueruebung.time;
    },
    confirmKraftuebung(kraftuebung) {
  const endpoint = `http://localhost:8080/kraftuebungen/${kraftuebung.id}`;
  const data = {
    name: kraftuebung.name,
    repeat: kraftuebung.repeat,
    weight: kraftuebung.weight,
    confirm: true, // Set confirm to true
  };
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      // Update the local data with confirm set to true
      kraftuebung.confirm = true;
      this.loadKraftuebungen(); // Update the list of kraftuebungen
    })
    .catch((error) => console.log('error', error));
},

confirmAusdaueruebung(ausdaueruebung) {
  const endpoint = `http://localhost:8080/ausdaueruebungen/${ausdaueruebung.id}`;
  const data = {
    name: ausdaueruebung.name,
    time: ausdaueruebung.time,
    confirm: true, // Set confirm to true
  };
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  fetch(endpoint, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      // Update the local data with confirm set to true
      ausdaueruebung.confirm = true;
      this.loadAusdaueruebungen(); // Update the list of ausdaueruebungen
    })
    .catch((error) => console.log('error', error));
},
    clearFormFields() {
      //Die erste Methode um Fehler nicht auf Kraftuebungen zu übertragen und andersrum
      this.clearValidationErrors()
      this.nameField = '';
      this.repeatField = '';
      this.weightField = '';
      this.timeField = '';
    },
    async setup() {
      if (this.$root.authenticated) {
        this.claims = await this.$auth.getKraftuebungen();
      }
    },
    validateForm() {
      let isValid = true;

      if (!this.nameField) {
        this.nameError = 'Name is required.';
        isValid = false;
      }

      if (this.exerciseType === 'kraftuebung') {
        if (!this.repeatField) {
          this.repeatError = 'Repeat is required.';
          isValid = false;
        } else if (isNaN(this.repeatField)) {
          this.repeatError = 'Repeat must be a number.';
          isValid = false;
        }

        if (!this.weightField) {
          this.weightError = 'Weight is required.';
          isValid = false;
        } else if (isNaN(this.weightField)) {
          this.weightError = 'Weight must be a number.';
          isValid = false;
        }
      } else if (this.exerciseType === 'ausdaueruebung') {
        if (!this.timeField) {
          this.timeError = 'Time is required.';
          isValid = false;
        } else if (isNaN(this.timeField)) {
          this.timeError = 'Time must be a number.';
          isValid = false;
        }
      }

      return isValid;
    },
    clearValidationErrors() {
      this.nameError = '';
      this.repeatError = '';
      this.weightError = '';
      this.timeError = '';
    },
    
    toggleStopwatch() {
      if (this.running) {
        clearInterval(this.stopwatchInterval);
        this.running = false;
      } else {
        this.startTime = Date.now() - this.stopwatchTime;
        this.stopwatchInterval = setInterval(() => {
          this.stopwatchTime = Date.now() - this.startTime;
        }, 10);
        this.running = true;
      }
    },

    resetStopwatch() {
      this.stopwatchTime = 0;
      this.startTime = Date.now();
      clearInterval(this.stopwatchInterval);
      this.running = false;
    },

    formatTime(time) {
      const hours = Math.floor(time / 3600000)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor((time / 60000) % 60)
        .toString()
        .padStart(2, '0');
      const seconds = Math.floor((time / 1000) % 60)
        .toString()
        .padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {
    this.resetStopwatch();
  },
  created() {
    this.loadKraftuebungen();
    this.loadAusdaueruebungen();
  },
};

</script>

<style scoped></style>
