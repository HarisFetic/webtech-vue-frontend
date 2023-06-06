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
        <tr>
          <td>{{ nameField }}</td>
          <td>{{ repeatField }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DynamicForm',
    props: ['title'],
    data () {
      return {
        kraftuebungen: [],
        nameField: '',
        repeatField: '',
      }
    },
    methods: {
      loadKraftuebungen () {

        const endpoint = 'http://localhost:8080/kraftuebungen'
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
          // headers: {
          //   Authorization: 'Bearer ' + this.accessToken
          // }
        }
        fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(result => result.forEach(kraftuebung => {
            this.kraftuebungen.push(kraftuebung)
          }))
          .catch(error => console.log('error', error))
      },
      save () {
        const endpoint = 'http://localhost:8080/kraftuebungen'
        const data = {
          name: this.nameField,
          repeat: this.repeatField,
        }
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // Authorization: 'Bearer ' + this.accessToken
          },
          body: JSON.stringify(data)
        }
        fetch(endpoint, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data)
          })
          .catch(error => console.log('error', error))
      },
      async setup () {
        if (this.$root.authenticated) {
          this.claims = await this.$auth.getKraftuebungen()
          // this.accessToken = await this.$auth.getAccessToken()
        }
      }
    },
    async created () {
      await this.setup()
      this.loadKraftuebungen()
    },
    mounted () {
    }
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