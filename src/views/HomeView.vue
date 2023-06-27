<template>
  <div class="home">
  <h1>Mithilfe dieser App können Sie ganz einfach ihre Fitness auswählen und tracken.</h1>
    <DynamicForm msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DynamicForm from '@/components/DynamicForm.vue'

export default {
  name: 'HomeView',
  components: {
    DynamicForm
  }
}
</script>
