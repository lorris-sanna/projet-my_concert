<template>
  <ion-page>
    <header-component page-title="Gestion des catégories" page-default-back-link="/admin"></header-component>

      <ion-content :fullscreen="true">

        <ion-button class="logout-button" color="danger" @click="handleLogout()">Déconnexion
          <ion-icon :icon="logOut" slot="start"></ion-icon>
        </ion-button>
        <ion-button class="add-button" color="success" :router-link="`/admin/categories/create`">Ajouter une catégorie
          <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
        </ion-button>

        <p align="center" style="margin-top: 4em; font-size: large;"><b>Retrouvez la liste de toutes les catégories ci-dessous</b></p>

        <ion-list>
            <ion-item v-for="categorie in categories" v-bind:key="categorie.id">
              <ion-card class="ion-card" color="light">
                <ion-card-header>
                  <ion-card-title align="center">{{ categorie.libelle }}</ion-card-title><br/>
                </ion-card-header>

                <ion-button class="buttons" color="warning" :router-link="`/admin/categories/edit/${categorie.id}`">Modifier
                  <ion-icon :icon="create" slot="start"></ion-icon>
                </ion-button>
                <ion-button class="buttons" color="danger" @click="deleteCategorie(categorie.id)">Supprimer
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
  import { logOut, calendarNumber, time, eye, create, trash, addCircleOutline, pricetags } from "ionicons/icons";
  
  import { useStore } from "../../store";
  import { useRouter } from "vue-router";
  
  import { defineComponent, computed } from 'vue';
  
  import {afficherToast} from "../../components/utils/toast.js";
  
  export default defineComponent ({
    name:"AdminGererCategories",
    
    setup() {
  
      const store = useStore();
      const router = useRouter();

      //Récupération du login depuis localStorage pour la déconnexion
      const login = localStorage.getItem('login');

      //Fonction permettant de se déconnecter
      function handleLogout() {
          store.dispatch("logoutUser", login).then ((response) => {
              if (response.statut === 200) {
                  router.push("/home");
                  afficherToast("Déconnecté avec succès", "success");
              } else {
                  afficherToast("Erreur lors de la déconnexion", "danger");
              }
          });
        }

  //Récupération de toutes les catégories présentes dans la base de données
  store.dispatch("getCategories");

  const categories = computed( () => {
      return store.getters.getAllCategories;
    });
  
  //On passe en paramètre l'id de la catégorie à supprimer
  const deleteCategorie = async (id) => {
  
    //On affiche une alerte permettant de revenir en arrière si l'admin ne veut plus supprimer la catégorie
    const alert = await alertController.create ({
      header:"Êtes-vous sûr de vouloir supprimer cette catégorie ?",
      buttons:[
        {
          text:"Annuler",
          role:"cancel"
        },
        {
          text:"Oui, je confirme la suppression",
          role:"confirm",

          //Si on veut supprimer le concert, on fait appel au store avec l'id en paramètre
          handler:() => {
            store.dispatch("deleteCategorie", id).then ((response) => {
              if(response.statut === 200) {
                //Redirection vers la page d'accueil admin
                router.push("/admin");
                afficherToast("Catégorie supprimée avec succès", "success");
              } else {
                afficherToast("Erreur lors de la suppression de la catégorie", "danger");
              }
            })
          },
        },
      ],
    });
    await alert.present();
  }
    return {handleLogout, logOut, calendarNumber, time, categories, eye, create, trash, addCircleOutline, pricetags, deleteCategorie};
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
  
  .buttons {
    cursor: pointer;
    font-size: 13px;
    margin-bottom: 3%;
    width: 45%;
    margin-left: 3.5%;
  }
  
  </style>