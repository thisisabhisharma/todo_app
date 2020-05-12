<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
  </div>
</template>

<script>
import Todos from '../components/Todo'
import AddTodo from '../components/AddTodo'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Todos,
    AddTodo
  },
  created(){
    console.log('home mounted');
    
    // localStorage.setItem('age', '23');
  },
  data() {
    return{
      todos: []
    }
  },
  methods: {
    deleteTodo(id){
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    
    addTodo(newTodo) {
      setTimeout(() => {
      const { title, completed } = newTodo;
        axios({
          title,
          completed,
          method: 'post',
          url: 'http://localhost:5000/todo/api/create-todo/',
          headers: {'Authorization': 'Bearer '+this.$store.state.token}
        })
        .then(res => {
          console.log('create todo req '. res.data);
          this.todo = [...this.todos, res.data]
        })
        .catch(err => console.log('error: ', err));
      }, 2000)
    },
},

    // addTodo(newTodo) {


    //     axios.post('https://jsonplaceholder.typicode.com/todos', {
    //       title,
    //       completed
    //     })
    //     .then(res => this.todos = [...this.todos, res.data])
    //     .catch(err => console.log('errror while post req', err));
    //   }
}


  // created() {
  //       console.log('before api get request sent ')
  //       axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //         .then(response =>{
  //           console.log('api get request sent ',response.data)
  //           this.todos = response.data;
  //         })
  //         .catch(err => console.log('this is the error in api',err));
  //     },
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}
.btn:hover {
  background: #666;
}
</style>
