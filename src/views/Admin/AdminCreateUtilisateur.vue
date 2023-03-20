<template>
    <ion-page>

        <header-component page-title="Création d'un utilisateur"  page-default-back-link="/admin/utilisateurs"></header-component>

            <ion-content :fullscreen="true">

                <utilisateur-form :utilisateur_prop="utilisateur" @submit-form="saveUtilisateur"></utilisateur-form>

            </ion-content>

    </ion-page>
    
</template>

<script>

import HeaderComponent from "../../components/HeaderComponent.vue";

//On importe le formulaire
import UtilisateurForm from "../../components/UtilisateurForm.vue";

import { IonContent, IonPage } from '@ionic/vue';

import {useRouter} from "vue-router";
import {useStore} from "../../store";

import {afficherToast} from "../../components/utils/toast.js";

export default {
    name:"AdminCreateUtilisateur.vue",

    setup() {

        const store = useStore();
        const router = useRouter();

        const utilisateur = {
                login: "",
                password: "",
                role: ""
            }

        //On ajoute l'utilisateur à la base de données en passant par le store
        function saveUtilisateur(utilisateurEmit) {
                store.dispatch("addUser", utilisateurEmit).then ((response) => {
                    if (response.statut ===! 200) {
                        afficherToast("Erreur lors de l'ajout de l'utilisateur", "danger");
                    } else {
                        //Redirection vers la page d'accueil admin
                        router.push("/admin");
                        afficherToast("Utilisateur ajouté avec succès", "success");
                    }
                });
            }
    return {saveUtilisateur, utilisateur}
    },
    
    components: {
        IonContent,
        IonPage,
        HeaderComponent,
        UtilisateurForm
    }
}
</script>