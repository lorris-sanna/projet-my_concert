<template>

    <form @submit.prevent="submitForm">

        <ion-list>

            <ion-item>
                <ion-label>Libellé de la catégorie : </ion-label>
                <ion-input type="text" v-model="categorie.libelle"></ion-input>
            </ion-item>

        </ion-list>

        <ion-button class="login-button" color="success" type="submit" @click="handleClick">Enregistrer
            <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
        </ion-button>
    
    </form>
    
</template>

<script>
    
    import { IonList, IonItem, IonInput, IonButton, IonIcon, IonLabel } from '@ionic/vue';

    import { toRef } from 'vue';

    //Importation des IonIcons nécessaires pour styliser les boutons
    import { addCircleOutline, logOut } from "ionicons/icons";
    
    export default {
        name: "CategorieForm",
        props: ["categorie_prop"],
        emits: ["submitForm"],

        setup(props, context) {
    
            const categorie = toRef(props, 'categorie_prop');

            function submitForm() {
                context.emit("submitForm", this.categorie);
            }
    
            return {submitForm, categorie, addCircleOutline, logOut}
            },

            components: {
            IonList,
            IonItem,
            IonInput,
            IonButton,
            IonIcon,
            IonLabel,
        },

    };
    
</script>

<style scoped>

.login-button {
    cursor: pointer;
    position: relative;
    align-items: center;
    font-size: 17px;
    width: 75%;
    margin-top: 1.5em;
    margin-left: 12.5%;
    display: block;
}
</style>