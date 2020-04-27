<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>

import Header from './components/layout/Header'
// const HeaderKey = "Pz6WbvhZAQGsUtAxRJK3vtXCrJDW6kb3yMwtnGKu2kpfT9PRVUg8RuYqFWfvFptqftcF87mBbV7pJWmPCPR5fZentc3qQVTtGLbqbjvGquT5B8UT2Kvjk7BCUm7hqtkqmJ3yR6fMFdWkWwvjTjrtSZjs52TdKC5Xazvp6b22pKNQSybvNb4mAwwuzXQFLKM7Pq5htpNNg8ZJ9dZJUF8gqc3aFXywYvaFLMXWdNUfErL8GEgUR3sEpNajEXbUcLLh";

export default {
  name:"app",
  components: {
    Header
  }
}
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
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(182,28,209,1) 50%, rgba(2,0,36,1) 100%);
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
