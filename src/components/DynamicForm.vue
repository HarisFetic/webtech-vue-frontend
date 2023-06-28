<template>
  <div class="centered-container">
    <h1 class="title">Fitnesstracker</h1>
    <div class="form-container">
      <input v-model="nameField" placeholder="Name" type="text" ref="nameInput" class="input-field">
      <div v-if="nameError" class="validation-message">{{ nameError }}</div>
      <input v-model="repeatField" placeholder="Repeat" @keyup.enter="save()" class="input-field">
      <div v-if="repeatError" class="validation-message">{{ repeatError }}</div>
      <input v-model="weightField" placeholder="Weight" @keyup.enter="save()" class="input-field">
      <div v-if="weightError" class="validation-message">{{ weightError }}</div>
      <button type="button" @click="save()" class="save-button">Save</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Repeat</th>
            <th>Weight</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kraftuebung in kraftuebungen" :key="kraftuebung.id">
            <td>{{ kraftuebung.name }}</td>
            <td>{{ kraftuebung.repeat }}</td>
            <td>{{ kraftuebung.weight }}</td>
            <td><button @click="editKraftuebung(kraftuebung)">Edit</button></td>
            <td><button @click="deleteKraftuebung(kraftuebung.id)">x</button></td>
            <td>
              <button v-if="!kraftuebung.confirmed" @click="confirmKraftuebung(kraftuebung)">Confirm</button>
              <span v-else>Confirmed</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="stopwatch-container">
      <h3>Stoppuhr</h3>
      <p>{{ running ? stopwatchTime : formattedTime }}</p>
      <div class="stopwatch">
        <button @click="toggleStopwatch">{{ running ? 'Stop' : 'Start' }}</button>
        <button @click="resetStopwatch">Reset</button>
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
      editingKraftuebung: null,
      running: false,
      stopwatchTime: '00:00:00',
      stopwatchInterval: null,
      startTime: 0,
      nameError: '',
      repeatError: '',
      weightError: ''
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
          console.log(result);
          this.kraftuebungen = result;
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
            this.loadKraftuebungen();
          } else {
            throw new Error('Failed to delete Kraftuebung');
          }
        })
        .catch(error => console.log('Error:', error));
    },
    save() {
      this.clearValidationErrors();

      if (this.validateForm()) {
        if (this.editingKraftuebung) {
          this.updateKraftuebung();
        } else {
          this.createKraftuebung();
        }
      }
    },
    createKraftuebung() {
      const endpoint = 'http://localhost:8080/kraftuebungen';
      const data = {
        name: this.nameField,
        repeat: this.repeatField,
        weight: this.weightField,
        confirmed: false
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
          this.clearFormFields();
          this.loadKraftuebungen();
        })
        .catch(error => console.log('error', error));
    },
    updateKraftuebung() {
      if (!this.editingKraftuebung) return;
      const endpoint = `http://localhost:8080/kraftuebungen/${this.editingKraftuebung.id}`;
      const data = {
        name: this.nameField,
        repeat: this.repeatField,
        weight: this.weightField,
        confirmed: this.editingKraftuebung.confirmed
      };
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          this.clearFormFields();
          this.editingKraftuebung = null;
          this.loadKraftuebungen();
        })
        .catch(error => console.log('error', error));
    },
    editKraftuebung(kraftuebung) {
      this.editingKraftuebung = kraftuebung;
      this.nameField = kraftuebung.name;
      this.repeatField = kraftuebung.repeat;
      this.weightField = kraftuebung.weight;
    },
    clearFormFields() {
      this.nameField = '';
      this.repeatField = '';
      this.weightField = '';
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

      return isValid;
    },
    clearValidationErrors() {
      this.nameError = '';
      this.repeatError = '';
      this.weightError = '';
    },
    async toggleStopwatch() {
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
      clearInterval(this.stopwatchInterval);
      this.stopwatchInterval = null;
    },
    resetStopwatch() {
      this.stopStopwatch();
      this.stopwatchTime = '00:00:00';
      this.running = false;
      this.startTime = 0;
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
      return number.toString().padStart(2, '0');
    }
  },
  mounted() {
    this.loadKraftuebungen();
  }
};
</script>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 10px;
  padding: 5px;
}

.validation-message {
  color: red;
  margin-bottom: 8px;
}

.save-button {
  font-size: 15px;
  margin-top: 10px;
  width: 50px;
  padding: 5px;
  background-color: #4caf50; /* Ändere die Hintergrundfarbe auf Grün */
  color: white;
  border: none;
  cursor: pointer;
}

.table-container {
  margin-bottom: 20px;
}

.stopwatch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stopwatch-button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>
