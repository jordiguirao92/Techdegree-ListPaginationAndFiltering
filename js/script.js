/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Selecting studentList.
const studentList = document.querySelectorAll('.student-item');
const studentsPerPage = 10;

//Creating HTML elements for pageNumbers.
const pageTotal = document.querySelector('.page');
const pageNumberDiv = document.createElement('div');
pageNumberDiv.className = 'pagination';
pageTotal.appendChild(pageNumberDiv);
const pageNumberUl = document.createElement('ul');
pageNumberDiv.appendChild(pageNumberUl);

//Creating HTML elements for searching bar.
const pageDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
searchDiv.className = 'student-search';
searchInput.placeholder = 'Search a student profile...';
searchDiv.appendChild(searchInput);
pageDiv.appendChild(searchDiv);

//Creating the No result message if there are no stundents in the searchstudent.
const noresultDiv = document.createElement('div');
noresultDiv.textContent = 'Your student search has failed. There are not students with this name.';
noresultDiv.style.fontFamily = 'Arial';
noresultDiv.style.fontSize = '20px';
noresultDiv.style.margin = '4rem';
noresultDiv.style.textAlign = 'center';
noresultDiv.style.color = 'red';
noresultDiv.style.display = 'none';
pageTotal.appendChild(noresultDiv);

//Creating varaible for search student function
let searchStudentList = [];
let stringInput = '';

//Other function way: const displayPage = (list, page) => {}; 
//Function to display a list.  
function displayPage (list, page) {

let startIndex = (page * studentsPerPage) - studentsPerPage;
let endIndex = (page * studentsPerPage)-1;

//Setting the page with out students. 
for(let i = 0; i < studentList.length; i++) {
   studentList[i].style.display = 'none';
}

if (list.length === 0) {
   noresultDiv.style.display = 'block';
   console.log('No result');
} else { 
   //Set the page with students. 
   for (let i = startIndex; i <= endIndex && i < list.length; i++) {
      list[i].style.display = 'block';
   }
   noresultDiv.style.display = 'none';
}

console.log(startIndex);
console.log(endIndex);
};


//Other function way: const appendPageLink = (list) => {}; 
//Function to create the numbers page bar 
function appendPageLink (list) {
   let numberStudents = list.length;
   let numberPages = Math.ceil(numberStudents / studentsPerPage);
   let selNumberPage = 1;
   pageNumberUl.innerHTML = '';

   displayPage(list, selNumberPage);

   //Loop to create the correct number of pages.
   for (let i = 0; i < numberPages; i++) {
      let pageNumberLi = document.createElement('li');
      let pageNumberA = document.createElement('a');
      pageNumberA.href = '#';
      pageNumberA.textContent = i + 1;
      
      //Assaing the className active to the first button page. 
      if (i === 0) {
         pageNumberA.className = 'active';
      }
      
      //Adding chilndrens to HMTL elements.
      pageNumberLi.appendChild(pageNumberA);
      pageNumberUl.appendChild(pageNumberLi);
   }

   pageNumberUl.addEventListener('click', (e) => {
      let preNumberPage = document.querySelector('.active');
      preNumberPage.className = '';
      //Giving to the new target the className active. 
      e.target.className = 'active';
      selNumberPage = parseInt(e.target.textContent);
      displayPage(list, selNumberPage);
   });

};


//Other function way: const searchStudent = () => {}; 
//Search student name function
function searchStudent () {
   searchStudentList = [];

   if (stringInput.length === 0){
      appendPageLink(studentList);

   } else {

      for (i = 0; i < studentList.length; i++) {
         let studentName = studentList[i].querySelector('h3').textContent;
         
         if (studentName.includes(stringInput)) {
            searchStudentList.push(studentList[i]);
         }
   
      }
      appendPageLink(searchStudentList);
   }
};

//Event listener to the search input. 
searchInput.addEventListener('input', () => {
   stringInput = searchInput.value;
   searchStudent();
});


appendPageLink(studentList);




