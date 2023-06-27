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
        { id: 2, name: 'Radfahren', youtubeLink: 'https://www.youtube.com/watch?v=2qOOGrcxuTE', imageUrl: 'https://www.80-20.fit/fileadmin/_processed_/f/0/csm_bankdruecken-langhantel-uebung_8bbe9fd03d.png' },
        { id: 3, name: 'Schwimmen', youtubeLink: 'https://www.youtube.com/watch?v=tu2N9LgzmmI', imageUrl: 'https://www.gewichtsweste.org/wp-content/uploads/2017/01/Klimmzuege.jpg' },
        { id: 4, name: 'Seilspringen', youtubeLink: 'https://www.youtube.com/watch?v=uOSLQ_7E17M', imageUrl: 'https://fitsportclub.files.wordpress.com/2015/08/liegestc3bctz.jpg' },
        { id: 5, name: 'HIIT-Training', youtubeLink: 'https://www.youtube.com/watch?v=RzDwYJWVOmY', imageUrl: 'https://gymbox.de/wp-content/uploads/smashbell-training-back-legs-deadlift-ex-web2.jpg' }
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
