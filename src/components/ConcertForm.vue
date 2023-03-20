<template>

    <form @submit.prevent="submitForm">

        <ion-list>

            <ion-item>
                <ion-label>Nom du concert : </ion-label>
                <ion-input type="text" v-model="concert.nom"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label>Description du concert : </ion-label>
                <ion-textarea rows="5" type="text" v-model="concert.description"></ion-textarea>
            </ion-item>

            <ion-item>
                <ion-label>Catégorie du concert : </ion-label>
                <ion-select v-model="concert.categorie_id" interface="popover" placeholder="Choisir une catégorie">
                    <ion-select-option v-for="categorie in categories" :key="categorie.id" :value="categorie.id">{{ categorie.libelle }}</ion-select-option>
                </ion-select>
            </ion-item>

            <ion-item>
                <ion-label>Image du concert (URL) : </ion-label>
                <ion-input type="url" v-model="concert.image"></ion-input>
            </ion-item>

            <ion-item>
                <ion-label>Date : </ion-label>
                <ion-modal :keep-contents-mounted="true">
                    <ion-datetime id="date" presentation="date" v-model="concert.date"></ion-datetime>
                </ion-modal>
                <ion-datetime-button datetime="date"></ion-datetime-button>
            </ion-item>

            <ion-item>
                <ion-label>Heure : </ion-label>
                <ion-modal :keep-contents-mounted="true">
                    <ion-datetime id="heure" presentation="time" v-model="concert.heure"></ion-datetime>
                </ion-modal>
                <ion-datetime-button datetime="heure"></ion-datetime-button>
            </ion-item>

        </ion-list>

        <ion-button class="login-button" color="success" type="submit" @click="handleClick">Enregistrer
            <ion-icon :icon="addCircleOutline" slot="start"></ion-icon>
        </ion-button>
    
    </form>
    
</template>

<script>
    
    import { IonList, IonItem, IonInput, IonButton, IonIcon, IonDatetime, IonDatetimeButton, IonModal, IonLabel, IonTextarea, IonSelect } from '@ionic/vue';

    import { useStore } from "../store";
    import { computed, toRef } from 'vue';

    //Importation de date-fns pour formatter la date dans le format yyyy-MM-dd avant de l'envoyer dans la base de données, et pour formatter l'heure dans le bon format
    import { format, parseISO } from 'date-fns';

    //Importation des IonIcons nécessaires pour styliser les boutons
    import { addCircleOutline, logOut } from "ionicons/icons";
    
    export default {
        name: "CreateConcertForm",
        props: ["concert_prop"],
        emits: ["submitForm"],

        setup(props, context) {
   
            const store = useStore();

            //On récupère toutes les catégories présentes dans la base de données
            store.dispatch("getCategories");

            const categories = computed( () => {
                return store.getters.getAllCategories;
            });
    
            const concert = toRef(props, 'concert_prop');

            function handleClick() {
                concert.value.date = format(parseISO(concert.value.date), "yyyy-MM-dd");
                concert.value.heure = format(parseISO(concert.value.heure), "HH:mm");

                //Récupération de l'id de l'utilisateur actuellement connecté avec localStorage
                concert.value.user_id = localStorage.getItem('user_id');
            }

            function submitForm() {
                context.emit("submitForm", this.concert);
            }
    
            return {submitForm, concert, categories, addCircleOutline, logOut, handleClick}
            },

            components: {
            IonList,
            IonItem,
            IonInput,
            IonButton,
            IonIcon,
            IonDatetime,
            IonDatetimeButton,
            IonModal,
            IonLabel,
            IonTextarea,
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