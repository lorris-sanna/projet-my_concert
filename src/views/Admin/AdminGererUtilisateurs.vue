<template>
    <ion-page>
      <header-component page-title="Gestion des utilisateurs" page-default-back-link="/admin"></header-component>
  
        <ion-content :fullscreen="true">
  
          <ion-button class="logout-button" color="danger" @click="handleLogout()">Déconnexion
            <ion-icon :icon="logOut" slot="start"></ion-icon>
          </ion-button>
          <ion-button class="add-button" color="success" :router-link="`/admin/utilisateurs/create`">Ajouter un utilisateur
            <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
          </ion-button>
  
          <p align="center" style="margin-top: 4em; font-size: large;"><b>Retrouvez la liste de tous les utilisateurs ci-dessous</b></p>
  
          <ion-list>
              <ion-item v-for="utilisateur in utilisateurs" v-bind:key="utilisateur.id">
                <ion-card class="ion-card" color="light">
                  <ion-card-header>
                    <ion-card-title align="center">{{ utilisateur.login }}</ion-card-title><br/>
                  </ion-card-header>

                  <ion-button class="delete-button" color="danger" @click="deleteUtilisateur(utilisateur.id)">Supprimer
                    <ion-icon :icon="trash" slot="start"></ion-icon>
                  </ion-button>

                </ion-card>
              </ion-item>
            </ion-list>
  
        </ion-content>
  
    </ion-page>
  </template>
  
  <script>

  import HeaderComponent from "../../components/HeaderComponent.vue";

  import { IonContent, IonPage, IonList, IonItem, IonButton, IonIcon, IonCard, alertController } from '@ionic/vue';

  //Importation des IonIcons nécessaires pour styliser les boutons
  import { logOut, calendarNumber, time, eye, trash, addCircleOutline, pricetags } from "ionicons/icons";
  
  import { useStore } from "../../store";
  import { useRouter } from "vue-router";
  
  import { defineComponent, computed } from 'vue';
  
  import {afficherToast} from "../../components/utils/toast.js";
  
  export default defineComponent ({
    name:"AdminGererUtilisateurs",
    
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
  
      //Récupération de tous les utilisateurs présents dans la base de données
      store.dispatch("getUsers");
    
      const utilisateurs = computed( () => {
          return store.getters.getAllUsers;
        });

      //On passe en paramètre l'id de l'utilisateur à supprimer
      const deleteUtilisateur = async (id) => {
      
        //On affiche une alerte permettant de revenir en arrière si l'admin ne veut plus supprimer l'utilisateur
        const alert = await alertController.create ({
          header:"Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
          buttons:[
            {
              text:"Annuler",
              role:"cancel"
            },
            {
              text:"Oui, je confirme la suppression",
              role:"confirm",

              //Si on veut supprimer l'utilisateur, on fait appel au store avec l'id en paramètre
              handler:() => {
                store.dispatch("deleteUser", id).then ((response) => {
                  if(response.statut === 200) {
                    //Redirection vers la page d'accueil admin
                    router.push("/admin");
                    afficherToast("Utilisateur supprimé avec succès", "success");
                  } else {
                    afficherToast("Erreur lors de la suppression de l'utilisateur", "danger");
                  }
                })
              },
            },
          ],
        });
        await alert.present();
      }
  
    return {handleLogout, logOut, calendarNumber, time, utilisateurs, eye, trash, addCircleOutline, pricetags, deleteUtilisateur};
  },
  
    data(){
      return { }},
    
    components: { HeaderComponent, IonContent, IonPage, IonList, IonItem, IonButton, IonIcon, IonCard }
  });
  
  </script>
  
  <style scoped>
  .logout-button {
    cursor: pointer;
    position: absolute;
    top: 62px;
    right: 5px;
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  
  .add-button {
    cursor: pointer;
    position: absolute;
    top: 62px;
    left: 5px;
    display: flex;
    align-items: center;
    font-size: 13px;
  }
  
  .ion-card {
    width: 100%;
  }
  
  .delete-button {
    cursor: pointer;
    font-size: 13px;
    margin-bottom: 3%;
    width: 50%;
    margin-left: 25%;
  }
  
  </style>