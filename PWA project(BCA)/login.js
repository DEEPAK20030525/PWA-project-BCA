// setting up firebase with our website
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB7TOfcm70J-h3D0OHZaFlABmIVkkK19S8",
    authDomain: "pwa-staffdetails.firebaseapp.com",
    projectId: "pwa-staffdetails",
    storageBucket: "pwa-staffdetails.appspot.com",
    messagingSenderId: "659003870258",
    appId: "1:659003870258:web:3f0ba61ec7c81411bc402b"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


// Sign In function
const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log(user);
        window.location.href = "create.html"; // Redirect to create.html page
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage); // Show error message to user
    });

}


setTimeout(() => {
    const loadingElement = document.getElementById("loading");
    if (loadingElement) {
    loadingElement.style.display = "none";
    }
    }, 1000);