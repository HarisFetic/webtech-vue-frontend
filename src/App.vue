<template>
  <div id="app">
    <nav class="navbar">
      <img src="./assets/logo.jpg" class="logo">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/Kraftuebungen" class="nav-link">Kraftübungen</router-link>
      <router-link to="/Ausdaueruebungen" class="nav-link">Ausdauerübungen</router-link>
      <router-link to="/Done" class="nav-link">Erledigte Übungen</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #283593; /* Dunkles Blau */
  color: #ffffff; /* Weiße Schrift */
}

.navbar img.logo {
  width: 50px;
  margin-right: 10px;
}

.navbar .nav-link {
  font-weight: bold;
  color: #ffffff; /* Weiße Schrift */
  text-decoration: none;
  margin-right: 10px;
}

.navbar .nav-link.router-link-exact-active {
  color: #ffffff; /* Weiße Schrift */
}
</style>
