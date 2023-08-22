 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getFirestore, collection, enableIndexedDbPersistence, onSnapshot, deleteDoc, doc , addDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyB7TOfcm70J-h3D0OHZaFlABmIVkkK19S8",
    authDomain: "pwa-staffdetails.firebaseapp.com",
    projectId: "pwa-staffdetails",
    storageBucket: "pwa-staffdetails.appspot.com",
    messagingSenderId: "659003870258",
    appId: "1:659003870258:web:3f0ba61ec7c81411bc402b"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const locationsCol = collection(db,'staff');

  enableIndexedDbPersistence(db)
  .catch((err) => {
      console.log(err);
      if (err.code == 'failed-precondition') {
        console.log("Multiple tabs open,use only one tab");
      } else if (err.code == 'unimplemented') {
          console.log("IndexedDB not supported");
      }
  });
  
  const ss = onSnapshot(locationsCol,snapshot =>{
    snapshot.docChanges().forEach(change =>{
        console.log(change);
        console.log(change.doc.data(),change.doc.id);
        if(change.type === 'added'){
            renderLocation(change.doc.data(),change.doc.id);
        }
        if(change.type === 'removed'){
            removeLocation(change.doc.id);
        }
    })
})

const locationContainer = document.querySelector('.locations,.add-location');
const editform = document.querySelector('.edit-location form');
const editLocationModal = document.querySelector('#edit_location_modal');
let updateId = null;
locationContainer.addEventListener('click',evt=> {
  if(evt.target.textContent ==='delete_outline'){
    const id = evt.target.getAttribute('data-id');
    const docref = doc(db,"staff",id);
    deleteDoc(docref).then(()=>{
      alert("Details deleted successfully");
      console.log("document successfully deleted");
    }).catch(err=>{
      alert("Error deleting doc",err);
    })
  }
  if(evt.target.textContent === 'edit'){
    updateId = evt.target.parentElement.getAttribute('data-id');
    const location = document.querySelector(`.location[data-id=${updateId}]`);
    const name = location.querySelector('.name').innerHTML;
    const position = location.querySelector('.position').innerHTML;
    const email = location.querySelector('.email').innerHTML;
    const address = location.querySelector('.address').innerHTML;
    editform.name.value=name;
    editform.position.value=position;
    editform.email.value=email;
    editform.address.value=address;
  }
})

const form = document.querySelector('form');
form.addEventListener('submit',evt=>{
  evt.preventDefault();
  const location = {
    id: form.id.value,
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    dept: form.dept.value,
    position: form.position.value,
    bloodgroup: form.bloodgroup.value,
    address: form.address.value,
  };
  addDoc(locationsCol,location).then(data=>{
    console.log(data);
    alert("New staff details added successfully");
  })
  form.id.value='';
  form.name.value='';
  form.email.value='';
  form.phone.value='';
  form.departmentt.value='';
  form.position.value='';
  form.bloodgroup.value='';
  form.address.value='';

});


editform.addEventListener('submit', evt => {
  // evt.preventDefault();
  const docref = doc(db,"staff",updateId);
  const location = {        
        name: editform.name.value,
        email: editform.email.value,     
        position: editform.position.value,
        address: editform.address.value
      };
      updateDoc(docref,location).then(docref => {
        console.log("data");
        alert("Updated");
        editform.reset();
        var instance = M.Modal.getInstance(editLocationModal);
        instance.close();
        // e  ditform.querySelector('.error').textContent='error';
      })
})
setTimeout(() => {
  const loadingElement = document.getElementById("loading");
  if (loadingElement) {
  loadingElement.style.display = "none";
  }
}, 1000);


// const editform = document.querySelector('modal');
// editform.addEventListener('submit',evt=>{
//   evt.preventDefault();
//   const location = {
//     start: form.start.value,
//     end: form.end.value,
//     distance: form.distance.value,
//     vname: form.vname.value
//   };
//   addDoc(locationsCol,location).then(data=>{
//     console.log(data);
//     alert("New location '"+location.start + "'added with id:"+data.id);
//   })
//   form.start.value='';
//   form.end.value='';
//   form.distance.value='';
//   form.vname.value='';

// });