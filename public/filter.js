const categoryDropdown = document.querySelectorAll('.category-option');
const styleDropdown = document.querySelectorAll('.name-option');
const option = document.querySelectorAll('option')
console.log(categoryDropdown.length)
console.log(styleDropdown.length)
for(var i = 0; i < categoryDropdown.length; i ++) {
    console.log(categoryDropdown[i].value)

    if(categoryDropdown[i].addEventListener('click', () => {
        option[i].categoryDropdown.classList.add('selected')
    }
    ))



categoryDropdown[i].addEventListener('click', () => {
console.log('clicked')
  const selectedCategory = categoryDropdown.value;
  // remove the "selected" class from all options
  categoryDropdown.querySelectorAll('option').forEach((option) => {
    option.classList.remove('selected');
  });
  // add the "selected" class to the selected option
  categoryDropdown.querySelector(`option[value="${selectedCategory}"]`).classList.add('selected');
});

}