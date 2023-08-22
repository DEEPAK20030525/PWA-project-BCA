const locations = document.querySelector('.locations')
document.addEventListener('DOMContentLoaded', function() {
  
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});

  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});
const renderLocation = (data,id)=>{
  const html = `<div class="card-panel location white row" data-id="${id}">
  <div class="location-details">
    <div class="name">${data.name}</div>
    <div class="email">${data.email}</div>
    <div class="phone">${data.phone}</div>
    <div class="dept">${data.dept}</div>
    <div class="position">${data.position}</div>
    <div class="bloodgroup">${data.bloodgroup}</div>
    <div class="address">${data.address}</div>
  </div>
    <i style="position:absolute; right:10px; top:10px; cursor:pointer;" class="material-icons modal-trigger" href="#edit_location_modal">edit</i>

  <div class="location-delete">
    <i class="material-icons" data-id="${id}">delete_outline</i>
  </div>
</div>`;
    locations.innerHTML += html;
    
    
}
const removeLocation = (id)=>{
  const locations = document.querySelector(`.location[data-id=${id}]`);
  locations.remove();
}