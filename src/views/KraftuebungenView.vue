<template>
  <div class="Kraftuebungen">
    <h1>Welche Kraftübungen möchtest du gerne machen?</h1>
    <div class="exercise-container">
      <div class="exercise-list-wrapper">
        <ul class="exercise-list">
          <li v-for="exercise in exercises" :key="exercise.id" class="exercise-item">
            <div class="exercise-content">
              <img :src="exercise.imageUrl" :alt="exercise.name" class="exercise-image">
              <a :href="exercise.youtubeLink" target="_blank" class="exercise-name">{{ exercise.name }}</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="dynamic-form-wrapper">
        <DynamicForm />
      </div>
    </div>
  </div>
</template>

<script>
import DynamicForm from '@/components/DynamicForm.vue' // Pfade können je nach Dateistruktur variieren

export default {
  name: 'KraftuebungenView',
  components: {
    DynamicForm
  },
  data() {
    return {
      exercises: [
        { id: 1, name: 'Kniebeugen', youtubeLink: 'https://www.youtube.com/watch?v=qyN9AdPFYzc', imageUrl: 'https://www.fitforfun.de/files/images/201703/1/2,243320_m_n.jpg' },
        { id: 2, name: 'Bankdrücken', youtubeLink: 'https://www.youtube.com/watch?v=2qOOGrcxuTE', imageUrl: 'https://www.80-20.fit/fileadmin/_processed_/f/0/csm_bankdruecken-langhantel-uebung_8bbe9fd03d.png' },
        { id: 3, name: 'Klimmzüge', youtubeLink: 'https://www.youtube.com/watch?v=tu2N9LgzmmI', imageUrl: 'https://www.gewichtsweste.org/wp-content/uploads/2017/01/Klimmzuege.jpg' },
        { id: 4, name: 'Liegestütze', youtubeLink: 'https://www.youtube.com/watch?v=uOSLQ_7E17M', imageUrl: 'https://fitsportclub.files.wordpress.com/2015/08/liegestc3bctz.jpg' },
        { id: 5, name: 'Kreuzheben', youtubeLink: 'https://www.youtube.com/watch?v=RzDwYJWVOmY', imageUrl: 'https://gymbox.de/wp-content/uploads/smashbell-training-back-legs-deadlift-ex-web2.jpg' }
      ]
    };
  }
}
</script>

<style scoped>
.Kraftuebungen {
  text-align: center;
}

.exercise-container {
  display: flex;
  justify-content: center;
}

.exercise-list-wrapper {
  flex: 1;
  max-height: calc(100vh - 100px); /* Ändere die maximale Höhe entsprechend deiner Anforderungen */
  overflow-y: auto;
}

.dynamic-form-wrapper {
  position: sticky;
  top: 0;
  align-self: flex-start;
  margin-left: 20px; /* Passe den Abstand zwischen den Übungen und dem Formular nach Bedarf an */
}

.exercise-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.exercise-item {
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 5px;
  font-size: 18px;
}

.exercise-content {
  display: flex;
  align-items: center;
}

.exercise-image {
  width: 400px;
  height: 400px;
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
