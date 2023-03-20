<template>

    <form @submit.prevent="submitForm">

        <ion-list>

            <ion-item>
                <ion-input type="text" placeholder="Nom d'utilisateur" v-model="user.login"></ion-input>
            </ion-item>

            <ion-item>
                <ion-input type="password" placeholder="Mot de passe" v-model="user.password"></ion-input>
            </ion-item>

        </ion-list>

        <ion-button class="login-button" type="submit">Connexion
            <ion-icon :icon="logIn" slot="start"></ion-icon>
        </ion-button>
    
    </form>
    
</template>
    
<script>
    
    import { IonList, IonItem, IonInput, IonButton, IonIcon } from '@ionic/vue';
    import { toRef } from 'vue';

    import { logIn } from "ionicons/icons";
    
    export default {
        name: "LoginForm",
        props: ["login_prop"],
        emits: ["submitForm"],
        setup(props, context) {
    
            const user = toRef(props, 'login_prop');
    
            //On passe en paramètres les valeurs rentrées dans le formulaire
            function submitForm() {
                context.emit("submitForm", this.user);
                user.value.login = "";
                user.value.password = "";
            }
    
            return {submitForm, user, logIn}
    
            },
            components: {
            IonList,
            IonItem,
            IonInput,
            IonButton,
            IonIcon
        },
    };
    
</script>

<style scoped>
.login-button {
    cursor: pointer;
    margin-top: 2em;
    font-size: 14px;
    font-weight: bold;
    width: 75%;
    margin-left: 12.5%;
    display: block;
}
</style>
    