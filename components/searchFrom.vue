<template>
  <b-nav-form @submit="onSubmit" class="h-100">
    <b-form-input v-model="formSearchWord" required class="my-sm-0 w-75" size="lg" placeholder="キーワードを入力して下さい"></b-form-input>
    <b-button class="my-sm-0 w-25" size="lg" type="submit">
      <font-awesome-icon :icon="['fas', 'search']" />
    </b-button>
  </b-nav-form>
</template>

<script>
export default {
    
};
</script>

<style>
#__layout > div > nav {
  color: #fff;
  background-color: #000 !important;
}

form > input {
  height: 100%;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0.3rem;
}

form > input::placeholder {
  font-size: 0.6em;
}

/* SP用のCSS */
@media only screen and (max-device-width: 480px) {
  #__layout > div > nav > a {
    margin: 0 auto !important;
    font-family: Georgia,Times,serif; 
  }
  div > nav > li {
    width: 100% !important;
  }
  div > nav > li > form{
    margin: 0 auto !important;
    width: 100% !important;
  }
}

div > nav > li > form > button {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0px !important;
}
</style>