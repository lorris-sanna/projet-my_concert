<template>

  <ion-page>
  
    <ion-content :fullscreen="true">

      <ion-img src="../../assets/illustration.png"></ion-img>

      <login-form :login_prop="user" @submit-form="verifyLogin"></login-form>
      
    </ion-content>

  </ion-page>

</template>

<script>

  //Importation du formulaire de connexion
  import LoginForm from "../components/LoginForm.vue";

  import { IonContent, IonPage, IonImg } from '@ionic/vue';

  import { useStore } from "../store";
  import { useRouter } from "vue-router";

  //Importation du fichier toast.js pour afficher des toasts
  import {afficherToast} from "../components/utils/toast.js";

  export default {
    name:"HomePage",

  setup() {
    const store = useStore();
    const router = useRouter();

    const user = {
      login: "",
      password: ""
    };

    //Fonction permettant de valider ou non la connexion en fonction des identifiants rentrés dans le formulaire
    function verifyLogin(loginEmit) {
            store.dispatch("loginUser", loginEmit).then ((response) => {
                if (response.statut === 200) {
                    afficherToast("Connecté avec succès", "success");

                    //Stockage du token de connexion, de l'id et du login de l'utilisateur connecté avec localStorage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user_id', response.data.id);
                    localStorage.setItem('login', response.data.login);

                    //Redirection vers la page admin pour les utilisateurs admin, user pour les utilisateurs simples
                    if (response.data.role === "admin") {
                      router.push("/admin");
                    } else if (response.data.role === "user") {
                      router.push("/user");
                    }

                } else {
                    afficherToast("Erreur lors de la connexion", "danger");
                }

            });
        }
        return {verifyLogin, user}
  },

  components: {
    LoginForm,
    IonContent,
    IonPage,
    IonImg
  },
};

</script>