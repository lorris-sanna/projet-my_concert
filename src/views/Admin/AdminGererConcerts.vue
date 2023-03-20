<template>
  <ion-page>
    <header-component page-title="Gestion des concerts" page-default-back-link="/admin"></header-component>

      <ion-content :fullscreen="true">

        <ion-button class="logout-button" color="danger" @click="handleLogout()">Déconnexion
          <ion-icon :icon="logOut" slot="start"></ion-icon>
        </ion-button>
        <ion-button class="add-button" color="success" :router-link="`/admin/concerts/create`">Ajouter un concert
          <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
        </ion-button>

        <p align="center" style="margin-top: 4em; font-size: large;"><b>Retrouvez la liste de tous les concerts ci-dessous</b></p>

        <ion-list>
            <ion-item v-for="concert in concerts" v-bind:key="concert.id">
              <ion-card class="ion-card" color="light">
                <ion-card-header>
                  <ion-grid>
                    <ion-row>
                      <ion-col>
                        <ion-card-title>{{ concert.nom }}</ion-card-title><br/>
                      </ion-col>

                      <ion-col>
                        <ion-item color="light">
                          <ion-icon :icon="pricetags" slot="start"></ion-icon>
                          <ion-card-subtitle>{{ concert.categorie.libelle }}</ion-card-subtitle>
                        </ion-item>
                      </ion-col>

                    </ion-row>
                    </ion-grid>

                  <ion-grid>
                  <ion-row>

                    <ion-col>
                      <ion-item color="light">
                        <ion-icon :icon="calendarNumber" slot="start"></ion-icon>
                        <ion-card-subtitle>{{ formatDate(concert.date) }}</ion-card-subtitle>
                      </ion-item>
                    </ion-col>

                    <ion-col>
                      <ion-item color="light">
                        <ion-icon :icon="time" slot="start"></ion-icon>
                        <ion-card-subtitle>{{ concert.heure.slice(0, 5) }}</ion-card-subtitle>
                      </ion-item>
                    </ion-col>

                  </ion-row>
                  </ion-grid>

                </ion-card-header>
                <ion-card-content><u>Description :</u>
                  {{ concert.description }}
                </ion-card-content>
                <ion-button class="buttons" color="tertiary" :router-link="`/admin/concerts/details/${concert.id}`">Voir
                  <ion-icon :icon="eye" slot="start"></ion-icon>
                </ion-button>
                <ion-button class="buttons" color="warning" :router-link="`/admin/concerts/edit/${concert.id}`">Modifier
                  <ion-icon :icon="create" slot="start"></ion-icon>
                </ion-button>
                <ion-button class="buttons" color="danger" @click="deleteConcert(concert.id)">Supprimer
                  <ion-icon :icon="trash" slot="start"></ion-icon>
                </ion-button>
            </ion-card>
            </ion-item>
          </ion-list>

      </ion-content>

  </ion-page>
</template>

<script>

  import { IonContent, IonPage, IonList, IonItem, IonButton, IonIcon, IonCard, IonCol, IonGrid, IonRow, alertController } from '@ionic/vue';

  //Importation des IonIcons nécessaires pour styliser les boutons
  import { logOut, calendarNumber, time, eye, create, trash, addCircleOutline, pricetags } from "ionicons/icons";

  import HeaderComponent from "../../components/HeaderComponent.vue";

  import { useStore } from "../../store";
  import { useRouter } from "vue-router";

  import { defineComponent, computed } from 'vue';

  //Importation de date-fns pour formatter la date dans le format dd/MM/yyyy
  import { format, parseISO } from 'date-fns';

  import {afficherToast} from "../../components/utils/toast.js";

  export default defineComponent ({
    name:"AdminGererConcerts",
    
    setup() {

      //Fonction permettant de formatter la date
      function formatDate(dateString) {
        const formattedDate = format(parseISO(dateString), "dd/MM/yyyy");
        return formattedDate;
      }

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

      //Récupération de tous les concerts présents dans la base de données
      store.dispatch("getConcerts");

      const concerts = computed( () => {
          return store.getters.getAllConcerts;
        });

      //On passe en paramètre l'id du concert à supprimer
      const deleteConcert = async (id) => {

      //On affiche une alerte permettant de revenir en arrière si l'admin ne veut plus supprimer le concert
      const alert = await alertController.create ({
        header:"Êtes-vous sûr de vouloir supprimer ce concert ?",
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
              store.dispatch("deleteConcert", id).then ((response) => {
                if(response.statut === 200) {
                  //Redirection vers la page d'accueil admin
                  router.push("/admin");
                  window.location.reload();
                  afficherToast("Concert supprimé avec succès", "success");
                } else {
                  afficherToast("Erreur lors de la suppression du concert", "danger");
                }
              })
            },
          },
        ],
      });
      await alert.present();
    }

    return {handleLogout, logOut, calendarNumber, time, concerts, eye, create, trash, addCircleOutline, pricetags, deleteConcert, formatDate};
  },

    data(){
      return { }},
    
    components: { HeaderComponent, IonContent, IonPage, IonList, IonItem, IonButton, IonIcon, IonCard, IonCol, IonGrid, IonRow }
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
  width: 29%;
  margin-left: 3%;
}

</style>