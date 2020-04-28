<template>
  <div id="divid" class="signin">
    <h1>This is an sign-in page</h1>

    <facebook-login
      @click="loginClick()"
      class="button"
      appId="529086384442607"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded"
    >
    </facebook-login>
    <button @click="postReq()">
      post req
    </button>

    <div id="userProfile"></div>
    <div id="userProfile2">
      <img
        @click="getUserData()"
        :src="userIcon"
        id="userPic"
        width="50px"
        alt=""
      />
      <p>{{ this.$store.state.profile.name }}</p>
      <p>{{ this.$store.state.profile.email }}</p>
      <p></p>
    </div>
  </div>
</template>

<script>
import facebookLogin from "facebook-login-vuejs";
import axios from "axios";

export default {
  name: "SignIn",
  components: {
    facebookLogin,
  },

  data() {
    return {
      userIcon: [this.$store.state.profile.pic],
    };
  },

  methods: {

    getImgUrl(pic) {
      return require(this.$store.state.profile.pic + pic);
    },

    imgClick() {
      console.log("logo onclick fired");
      var x = document.getElementById("userProfile2");
      console.log("this is x in img = " + x.style.display);
      if (x.style.display == "none") {
        console.log("img if condition fired ");
        x.style.display = "block";
      } else {
        console.log("img else fired ");
        console.log("");
        x.style.display = "none";
      }
    },

    loginClick() {
      console.log(" login onclick fired");
      var x = document.getElementById("userProfile");
      console.log("this is x in login = " + x.style.display);
      if (x.style.display == "none") {
        console.log("login inside if ");

        x.style.display = "block";
      } else {
        console.log("login inside else ");

        x.style.display = "none";
      }
    },
     getUserData() {
        this.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email,picture" },
        (userInformation) => {
          console.log("User profile data", userInformation);
          this.$store.state.profile.employee_id = userInformation.id;
          this.$store.state.profile.email = userInformation.email;
          this.$store.state.profile.name = userInformation.name;
          this.$store.state.profile.pic = userInformation.picture.data.url;
        }
      )
    
      },
    sdkLoaded(payload,) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();

    },
    

    postReq() {
      setTimeout(() => {
                const baseURL = 'http://127.0.0.1:5000/todo/api/'
      axios({
          method: 'post',
          url: baseURL + 'login/',
          headers: {
        'key' : "Pz6WbvhZAQGsUtAxRJK3vtXCrJDW6kb3yMwtnGKu2kpfT9PRVUg8RuYqFWfvFptqftcF87mBbV7pJWmPCPR5fZentc3qQVTtGLbqbjvGquT5B8UT2Kvjk7BCUm7hqtkqmJ3yR6fMFdWkWwvjTjrtSZjs52TdKC5Xazvp6b22pKNQSybvNb4mAwwuzXQFLKM7Pq5htpNNg8ZJ9dZJUF8gqc3aFXywYvaFLMXWdNUfErL8GEgUR3sEpNajEXbUcLLh",
      },
          data: {
            name: this.$store.state.profile.name,
            email: this.$store.state.profile.email,
            photo: this.$store.state.profile.pic
          }
        })
        .then((response) => {
          var profile = response.data;
          console.log("response is ", profile);
        })
        .catch((error) => {
          console.log("error is: ", error);
        });
      }, 1000)
    },

    onLogin(callback) {
      this.isConnected = true;
      this.getUserData();
      alert("You have successfully Logged In");
      this.postReq()
      callback();
      this.loginClick();
    },
    onLogout() {
      this.isConnected = false;
      alert("You have successfully Logged Out");
    },

  },
};
</script>

<style scoped>
#sign-in-btn {
  margin-top: 9rem;
  margin: auto;
  width: 10%;
  margin-top: 9rem;
}
#userPic {
  margin-top: -4rem;
  margin-right: 1rem;
  border: 3px solid #3b55a0;
  border-radius: 30px;
  float: right;
}
#userProfile {
  display: none;
}
#userProfile2 {
  /* display: none; */
  border: 3px solid #3b55a0;
  float: right;
  color: white;
}
</style>
