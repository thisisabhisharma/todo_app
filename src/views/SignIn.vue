<template>
  <div class="signin">
    <h1>This is an sign-in page</h1>
    <facebook-login
      class="button"
      appId="529086384442607"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded"
    >
    </facebook-login>
  </div>
  
</template>

<script>
import facebookLogin from "facebook-login-vuejs";

export default {
  name: "SignIn",
  components: {
    facebookLogin,
  },
  methods: {
    getUserData() {
      this.FB.api(
        "/me",
        "GET",
        { fields: "id,name,email,picture" },
        (userInformation) => {
          console.warn("User profile data", userInformation);
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
          this.photo = userInformation.picture;
        }
      );
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
      alert("You have successfully Logged In");
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
</style>
