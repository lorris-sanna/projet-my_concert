<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-button class="logout-button" color="danger" @click="handleLogout()">Déconnexion
          <ion-icon :icon="logOut" slot="start"></ion-icon>
      </ion-button>

      <ion-img style="margin-top: 3.5em;" src="../../assets/illustration.png"></ion-img>

      <p align="center" style="margin-top: 1.5em; font-size: large;"><b>Bienvenue sur l'application MyConcert</b></p>

      <ion-button class="buttons" color="success" router-link="/user/concerts/create">Créer un concert
          <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
      </ion-button>

      <ion-button class="buttons" color="primary" router-link="/user/concerts">Gérer mes concerts
          <ion-icon :icon="reorderThree" slot="start"></ion-icon>
      </ion-button>

    </ion-content>
  </ion-page>
</template>

<script>

  import { IonContent, IonPage, IonIcon, IonButton } from '@ionic/vue';

  //Importation des IonIcons nécessaires pour styliser les boutons
  import { logOut, reorderThree, addCircleOutline } from "ionicons/icons";

  import { defineComponent } from 'vue';

  import { useStore } from "../../store";
  import { useRouter } from "vue-router";

  import {afficherToast} from "../../components/utils/toast.js";

  export default defineComponent({
  name:"UserHome",
  setup() {
    const store = useStore();
    const router = useRouter();

    //Récupération du login depuis localStorage pour la déconnexion
    const login = localStorage.getItem('login');

    //Fonction permettant de se déconnecter
    function handleLogout() {
      store.dispatch("logoutUser", login).then ((response) => {
                if (response.statut === 200) {
                    afficherToast("Déconnecté avec succès", "success");
                    router.push("/home");
                } else {
                    afficherToast("Erreur lors de la déconnexion", "danger");
                }

            });
    }

    return {handleLogout, logOut, reorderThree, addCircleOutline};
  },

  data(){
    return { }},
  components: { IonContent, IonPage, IonIcon, IonButton },

  });

</script>

<style scoped>
.logout-button {
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  font-size: 15px;
}

.buttons {
  cursor: pointer;
  margin-top: 2em;
  font-size: 14px;
  font-weight: bold;
  width: 75%;
  margin-left: 12.5%;
  display: block;
}
</style>