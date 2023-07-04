<template>
  <div class="Ausdaueruebungen">
    <h1>Welche Ausdauerübung möchtest du gerne machen?</h1>
    <ul class="exercise-list">
      <li v-for="exercise in exercises" :key="exercise.id" class="exercise-item">
        <div class="exercise-content">
          <img :src="exercise.imageUrl" :alt="exercise.name" class="exercise-image">
          <a :href="exercise.youtubeLink" target="_blank" class="exercise-name">{{ exercise.name }}</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exercises: [
        { id: 1, name: 'Laufen', youtubeLink: 'https://www.youtube.com/watch?v=_kGESn8ArrU', imageUrl: 'https://traum-deutung.de/wp-content/uploads/2015/02/traumdeutung-rennen.jpg' },
        { id: 2, name: 'Radfahren', youtubeLink: 'https://www.youtube.com/watch?v=UOg1hHmGIQQ', imageUrl: 'https://img.welt.de/img/sport/fitness/mobile146461657/9882504107-ci102l-w1024/Caucasian-woman-riding-bicycle-near-beac.jpg' },
        { id: 3, name: 'Schwimmen', youtubeLink: 'https://www.youtube.com/watch?v=pFN2n7CRqhw', imageUrl: 'https://media.tag24.de/951x634/6/7/67rgvyv45zxnl54ge7nzgl2j3sshatt8.jpg' },
        { id: 4, name: 'Seilspringen', youtubeLink: 'https://www.youtube.com/watch?v=adveRqlOByc', imageUrl: 'https://www.fitforfun.de/files/images/202005/1/abnehmen-durch-seilspringen,425256_1x1_xl.jpg' },
        { id: 5, name: 'HIIT-Training', youtubeLink: 'https://www.youtube.com/watch?v=5O1TTduK6mw', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWU9n91uqaxHdNMYeLdSyMpY5YxY7EbXedvA&usqp=CAU' }
      ]
    };
  }
}
</script>

<style scoped>
.Kraftuebungen {
  text-align: center;
}

.exercise-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.exercise-item {
  display: flex;
  justify-content: center; /* Hinzugefügt: Zentriert den Inhalt horizontal */
  padding: 10px;
  margin-bottom: 5px;
  font-size: 18px;
}

.exercise-content {
  display: flex;
  align-items: center;
}

.exercise-image {
  width: 400px; /* Vergrößert das Bild um das Vierfache */
  height: 400px; /* Vergrößert das Bild um das Vierfache */
  margin-right: 10px;
}

.exercise-name {
  font-weight: bold;
  font-size: 24px;
}

.exercise-item:hover {
  background-color: #ddd;
  cursor: pointer;
}
</style>
