<template>
    <ion-page>
      
      <header-component page-title="Détails d'un concert" page-default-back-link="/user/concerts"></header-component>
    
        <ion-content :fullscreen="true" id="container" v-if="concert">

            <ion-button class="logout-button" color="danger" @click="handleLogout()">Déconnexion
                <ion-icon :icon="logOut" slot="start"></ion-icon>
            </ion-button>

            <ion-img style="margin-top: 10.5%;" :src="concert.image"></ion-img>
            <h1 align="center">{{ concert.nom }}</h1>
            <p align="center">
                <ion-icon :icon="pricetags" slot="start"></ion-icon>{{ concert.categorie.libelle }}
            </p>

            <ion-grid>
                <ion-row>

                    <ion-col>
                        <h3 align="center">
                            <ion-icon :icon="calendarNumber" slot="start"></ion-icon>{{ formattedDate }}
                        </h3>
                    </ion-col>

                    <ion-col>
                        <h3 align="center">
                            <ion-icon :icon="time" slot="start"></ion-icon>{{ concert.heure.slice(0, -3) }}
                        </h3>
                    </ion-col>

                </ion-row>
            </ion-grid>

            <p class="description"><u>Description :</u> {{ concert.description }}</p>
    
            <ion-button class="buttons" color="warning" :router-link="`/user/concerts/edit/${concert.id}`" > Modifier
                <ion-icon :icon="create" slot="start"></ion-icon>
            </ion-button>

            <ion-button class="buttons" color="danger" @click="deleteConcert(concert.id)">Supprimer
                  <ion-icon :icon="trash" slot="start"></ion-icon>
            </ion-button>

        </ion-content>
        <ion-content v-else>
            <h1>Aucun concert n'a été trouvé</h1>
        </ion-content>
    
      </ion-page>
    
    </template>

<script>

import { IonContent, IonPage, IonImg, IonButton, alertController } from '@ionic/vue';

//Importation des IonIcons nécessaires pour styliser les boutons
import { logOut, calendarNumber, time, eye, create, trash, addCircleOutline, pricetags } from "ionicons/icons";

import { defineComponent, computed } from 'vue';
import {useRoute, useRouter} from "vue-router";
import {useStore} from "@/store";

//Importation de date-fns pour formatter la date dans le format dd/MM/yyyy
import { format, parseISO } from 'date-fns';

import {afficherToast} from "../../components/utils/toast.js";

export default defineComponent({
  name:"UserDetailsConcert",

  setup() {

    const store = useStore();

    const route = useRoute();
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

    //On récupère l'id du concert depuis l'url
    const concertId = parseInt(route.params.id);

    //On récupère les infos du concert depuis le store en passant en paramètre son id
    const concert = computed(() => {
      return store.getters.getConcertById(concertId);
    });

    //On formatte la date dans le bon format
    const formattedDate = computed(() => format(parseISO(concert.value.date), "dd/MM/yyyy"));

    const deleteConcert = async (id) => {

        //On affiche une alerte permettant de revenir en arrière si l'utilisateur ne veut plus supprimer le concert
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
                    //Redirection vers la page de gestion des concerts
                    router.push("/user/concerts");
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

    return {handleLogout, concert, deleteConcert, logOut, calendarNumber, time, eye, create, trash, addCircleOutline, pricetags, formattedDate};
  },

  components: { IonContent, IonPage, IonImg, IonButton }
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

.buttons {
  cursor: pointer;
  font-size: 13px;
  width: 40%;
  margin-left: 6.7%;
  margin-top: 3%;
  margin-bottom: 7%;
}

.description {
    margin: 5%;
}

</style>