import {createStore, Store, useStore as baseUseStore, GetterTree, ActionTree, MutationTree} from "vuex"
import {InjectionKey} from "vue";
import axios from "axios";

const URL_API = "http://localhost:8082/api";

export type User = {id:number, login:string, password:string, role:string, createdAt?:string, updatedAt?:string}
export type Categorie = {id:number, libelle:string, user_id?:number, createdAt?:string, updatedAt?:string}
export type Concert = {id:number, nom:string, description:string, image:string, date:string, heure:string, categorie_id:number, user_id:number, createdAt?:string, updatedAt?:string}

export type State = {users:User[], concerts:Concert[], categories:Categorie[]}

const state: State = {

    //Initialisation des state

    users: [],
    concerts: [],
    categories: []
}

const getters: GetterTree<State, State> = {

  //Initialisation des getters

  getAllConcerts: (state) => {
    return state.concerts
    },

  getConcertById: (state) => (id:number) => state.concerts.find(concert => concert.id === id),


  getAllCategories: (state) => {
    return state.categories
    },

  getCategorieById: (state) => (id:number) => state.categories.find(categorie => categorie.id === id),


  getAllUsers: (state) => {
    return state.users
    },

  getUserById: (state) => (id:number) => state.users.find(user => user.id === id)

}

const actions : ActionTree<State, State> = {

  //Requêtes connexion et déconnexion

  loginUser(context, loginUser) {
    return axios.post(URL_API+"/user/login",loginUser).then((response) => {
      if (response.status === 200) {
        context.commit("loginUser", response.data)
      }
      return {"statut":response.status, "message":response.statusText, "data":response.data}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },

  logoutUser(context, login) {
    return axios.post(URL_API+"/user/logout",login).then((response) => {
      if (response.status === 200) {
        context.commit("logoutUser", response.data)
      }
      return {"statut":response.status, "message":response.statusText, "data":response.data}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },

  //Requêtes concerts

  addConcert(context, newConcert) {

    return axios.post(URL_API+"/concerts",newConcert).then((response) => {
      if (response.status === 200) {
        context.commit("addConcert", response.data);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },

  editConcert(context, editConcert) {
    return axios.put(URL_API+"/concerts/"+editConcert.id,editConcert).then((response) => {
      if (response.status === 200) {
        context.commit("editConcert", editConcert);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },


  deleteConcert(context, concert_id) {
    return axios.delete(URL_API+"/concerts/"+concert_id).then((response) => {
      if (response.status === 200) {
        context.commit("deleteConcert", concert_id);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },

  async getConcerts(state, user_id) {
    const concerts = await axios.get(URL_API+"/concerts",user_id);
    state.commit("GET_CONCERT", concerts.data);
  },

  //Requêtes categories

  addCategorie(context, newCategorie) {

    return axios.post(URL_API+"/categories",newCategorie).then((response) => {
      if (response.status === 200) {
        context.commit("addCategorie", response.data);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },

  editCategorie(context, editCategorie) {
    return axios.put(URL_API+"/categories/"+editCategorie.id,editCategorie).then((response) => {
      if (response.status === 200) {
        context.commit("editCategorie", editCategorie);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },

  deleteCategorie(context, categorie_id) {
    return axios.delete(URL_API+"/categories/"+categorie_id).then((response) => {
      if (response.status === 200) {
        context.commit("deleteCategorie", categorie_id);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },

  async getCategories(state) {
    const categories = await axios.get(URL_API+"/categories");
    state.commit("GET_CATEGORIE", categories.data);
  },

  //Requêtes utilisateurs

  addUser(context, newUser) {

    return axios.post(URL_API+"/user/register",newUser).then((response) => {
      if (response.status === 200) {
        context.commit("addUser", response.data);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },
  
  editUser(context, editUser) {
    return axios.put(URL_API+"/user/"+editUser.id,editUser).then((response) => {
      if (response.status === 200) {
        context.commit("editUser", editUser);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },
  
  deleteUser(context, user_id) {
    return axios.delete(URL_API+"/user/"+user_id).then((response) => {
      if (response.status === 200) {
        context.commit("deleteUser", user_id);
      }
      return {"statut":response.status, "message":response.statusText}
    }).catch((error) => {
      console.log(error);
      return {"statut":error.status, "message":error}
    })
  },
  
  async getUsers(state) {
    const users = await axios.get(URL_API+"/user");
    state.commit("GET_USER", users.data);
  },

}

const mutations: MutationTree<State> = {

  //Initialisation des mutations

  addConcert(state, newConcert) {
    state.concerts.push(newConcert);
  },

  editConcert(state, editConcert) {
    const index = state.concerts.findIndex ( concert => concert.id === editConcert.id )
    state.concerts[index] = editConcert;
  },

  deleteConcert(state, concert_id) {
    const index = state.concerts.findIndex ( concert => concert.id === concert_id )
    state.concerts.splice(index, 1);
  },

  GET_CONCERT(state, concerts) {
    state.concerts = concerts;
  },

  addCategorie(state, newCategorie) {
    state.categories.push(newCategorie);
  },

  editCategorie(state, editCategorie) {
    const index = state.categories.findIndex ( categorie => categorie.id === editCategorie.id )
    state.categories[index] = editCategorie;
  },

  deleteCategorie(state, categorie_id) {
    const index = state.categories.findIndex ( categorie => categorie.id === categorie_id )
    state.categories.splice(index, 1);
  },

  GET_CATEGORIE(state, categories) {
    state.categories = categories;
  },

  addUser(state, newUser) {
    state.users.push(newUser);
  },

  editUser(state, editUser) {
    const index = state.users.findIndex ( user => user.id === editUser.id )
    state.users[index] = editUser;
  },

  deleteUser(state, user_id) {
    const index = state.users.findIndex ( user => user.id === user_id )
    state.users.splice(index, 1);
  },

  GET_USER(state, users) {
    state.users = users;
  },

}

export const store = createStore<State>({state, getters, actions, mutations});

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
    return baseUseStore(key);
}