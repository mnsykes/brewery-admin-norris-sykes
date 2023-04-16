const button = document.getElementById('on-tap-arrow');
const upNext = document.getElementById('up-next');
const onNow = document.getElementById('on-now');
const onTap = [onNow, upNext];

// function moveStyle() {
//     button.addEventListener('click', () => {
//       // Get the selected option
//       const selectedOptionNow = onNow[onNow.selectedIndex];
//       const selectedOptionNext = upNext[upNext.selectedIndex]

//       console.log('selected option now:' + selectedOptionNow.innerHTML)
//       console.log('selected option next:' + selectedOptionNext.innerHTML)
  
//       // Save selected option value to local storage
//       localStorage.setItem('onNow', selectedOptionNow.innerHTML);
      

//       // Switch selected option
//       selectedOptionNow.innerHTML = selectedOptionNext.innerHTML;
//       selectedOptionNext.innerHTML = 'Select';

//       localStorage.setItem('upNext', selectedOptionNext.innerHTML);

  
//     });
//   }

// moveStyle();

// // Retrieve saved styles from local storage on page load
// window.addEventListener('load', () => {
//     const savedOnNow = localStorage.getItem('onNow');
//     const savedUpNext = localStorage.getItem('upNext');
  
//     //if (savedOnNow && savedUpNext) {
//     //   onNow.innerHTML = savedOnNow;
//     //   upNext.innerHTML = savedUpNext;
//     // }
//   });