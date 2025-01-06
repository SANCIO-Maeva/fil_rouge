<script setup>
import { ref } from "vue";
import axios from "axios";
// **Importation de useRouter pour la gestion des routes**
import { useRouter } from "vue-router"; 

// Données du formulaire
const form = ref({
  mail: "",
  password: "",
});

// Message d'erreur à afficher
const errorMessage = ref(null);

// **Accès au router**
const router = useRouter();  // Accès au router pour rediriger après la connexion

const submitForm = async () => {
  try {

    const response = await axios.post("http://localhost:3000/v1/auth/login", form.value);

    // alert("Connexion réussie !");
    console.log(response.data);

    // Stockage de l'utilisateur dans le localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // **Redirection vers la page d'accueil après la connexion réussie**
    router.push({ name: 'home' });  // **Redirection via router.push()** (remplacer 'home' par le nom de ta route d'accueil)

  } catch (error) {

    console.error(error);

    if (error.response) {
      console.error('Réponse du serveur :', error.response.data);
      errorMessage.value = `Erreur : ${error.response.data.message || "Une erreur est survenue"}`;
    } else if (error.request) {
      console.error('Aucune réponse du serveur:', error.request);
      errorMessage.value = "Impossible de se connecter au serveur. Veuillez réessayer plus tard.";
    } else {
      console.error('Erreur lors de la demande:', error.message);
      errorMessage.value = "Une erreur inconnue est survenue.";
    }
  }
};
</script>

<template>
  <h1 class="text-center">Bienvenue !</h1>
  <div class="col-7 position-absolute top-50 start-50 translate-middle">
    <p v-if="error">ERREUR !!!!!! :{{ error }}</p>

    <div class="mt-5 mb-3 justify-content-center">
      <div class="col-auto">
        <label class="col-form-label">Email :</label>
      </div>
      <div class="col-auto">
        <input type="text" class="form-control" v-model="form.email" />
      </div>
    </div>

    <div class="mb-3 justify-content-center">
      <div class="col-auto">
        <label class="col-form-label">Mot de passe :</label>
      </div>
      <div class="col-auto">
        <input type="password" class="form-control" v-model="form.password" />
      </div>
    </div>

    <p class="mt-4 d-grid col-9 mx-auto">
      <button class="btn btn-outline-success" @click="login">Connexion</button>
    </p>
    <p class="mt-5 text-center">
      Vous n'avez pas de compte ?
      <a href="/sign-up" class="link-success"> S'inscrire</a>
    </p>
  </div>
</template>

<style scoped>
/* Structure du container */
.full-screen-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* Section image */
.image-container {
  width: 70%; /* 75% de la largeur */
  height: 100%;
  background-image: url("../assets/login-pic.png");
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Section formulaire à droite (25%) */
.form-container {
  width: 70%; /* 25% de la largeur */
  height: 100%; /* Hauteur complète */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9); /* Légère transparence */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2; /* Placer au-dessus de l'image */
}

/* Nav bar au-dessus de l'image */
.navbar-transparent {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10; /* Superposer la nav bar devant l'image */
  box-shadow: none;
}

/* Navbar */
.navbar {
  padding: 2rem;
}

.nav-link {
  color: #043a3c;
  margin-right: 10px;
}

.btn-nav {
  border-top-right-radius: 2rem !important;
  border: none;
  background-color: #043a3c;
  font-weight: 500;
  color: white;
  width: 12rem;
  height: 3rem;
  border-radius: 0px;
}

/* Formulaire */
.form-content {
  width: 30rem;
}

/* Login button */
.form-content button {
  border-radius: 5px;
  border: none;
  background-color: #043a3c;
  font-weight: 500;
  color: white;
  width: 30rem;
  height: 3rem;
}

.form-content p {
  font-size: 24px;

  font-weight: 600;
}

input {
  background-color: #e5e5e5;
  height: 3.2rem;
}

hr {
  color: #959393;
}
</style>
