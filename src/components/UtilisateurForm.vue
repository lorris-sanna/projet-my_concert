<template>

    <form @submit.prevent="submitForm">

        <ion-list>

            <ion-item>
                <ion-label>Nom d'utilisateur : </ion-label>
                <ion-input type="text" v-model="utilisateur.login"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label>Mot de passe : </ion-label>
                <ion-input type="password" v-model="utilisateur.password"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label>Rôle : </ion-label>
                <ion-select v-model="utilisateur.role" interface="popover" placeholder="Choisir un rôle">
                    <ion-select-option value="admin">Admin</ion-select-option>
                    <ion-select-option value="user">Utilisateur</ion-select-option>
                </ion-select>
            </ion-item>

        </ion-list>

        <ion-button class="login-button" color="success" type="submit" @click="submitForm">Enregistrer
            <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
        </ion-button>
    
    </form>
    
</template>

<script>
    
    import { IonList, IonItem, IonInput, IonButton, IonIcon, IonLabel, IonSelect } from '@ionic/vue';

    import { toRef } from 'vue';

    import { addCircleOutline, logOut } from "ionicons/icons";
    
    export default {
        name: "UtilisateurForm",
        props: ["utilisateur_prop"],
        emits: ["submitForm"],

        setup(props, context) {
    
            const utilisateur = toRef(props, 'utilisateur_prop');

            function submitForm() {
                context.emit("submitForm", this.utilisateur);
            }
    
            return {submitForm, utilisateur, addCircleOutline, logOut}
            },

            components: {
            IonList,
            IonItem,
            IonInput,
            IonButton,
            IonIcon,
            IonLabel,
            IonSelect
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