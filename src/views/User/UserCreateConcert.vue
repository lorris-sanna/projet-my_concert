<template>
    <ion-page>

        <header-component page-title="Création d'un concert"  page-default-back-link="/user"></header-component>

            <ion-content :fullscreen="true">

                <concert-form :concert_prop="concert" @submit-form="saveConcert"></concert-form>

            </ion-content>

    </ion-page>
    
</template>

<script>

    import HeaderComponent from "../../components/HeaderComponent.vue";

    //On importe le formulaire
    import ConcertForm from "../../components/ConcertForm.vue";

    import { IonContent, IonPage } from '@ionic/vue';

    import {useRouter} from "vue-router";
    import {useStore} from "../../store";

    import {afficherToast} from "../../components/utils/toast.js";

    export default {
        name:"UserCreateConcert.vue",

        setup() {

            const store = useStore();
            const router = useRouter();

            const concert = {
                    nom: "",
                    description: "",
                    categorie_id: "",
                    image: "",
                    date: "",
                    heure: "",
                    user_id: ""
                }

            //On ajoute le concert à la base de données en passant par le store
            function saveConcert(concertEmit) {
                    store.dispatch("addConcert", concertEmit).then ((response) => {
                        if (response.statut === 200) {
                            window.location.reload();
                            afficherToast("Concert ajouté avec succès", "success");
                        } else {
                            afficherToast("Erreur lors de l'ajout du concert", "danger");
                        }
                    });
                }
        return {saveConcert, concert}
        },
        
        components: {
            IonContent,
            IonPage,
            HeaderComponent,
            ConcertForm
        }
    }
</script>