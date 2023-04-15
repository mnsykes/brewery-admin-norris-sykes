const show = document.getElementsByClassName('show')


// Show the element
show.style.opacity = 1;

// Wait for 5 seconds, then hide the element
setTimeout(function() {
  element.style.opacity = 0;
  show.setAttribute('d-none')
}, 5000);

