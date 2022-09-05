// user inputs
const employForm = document.querySelector('.employform');
const fName = document.querySelector('#fname');
const lName = document.querySelector('#lname');
const eMail = document.querySelector('#email');
const phoneNum = document.querySelector('#phone');
const teamOpt = document.querySelector('#team');
const positionOpt = document.querySelector('#position');


// NEXT PAGE BTN

const defaultNextPg = document.querySelector(".defaultnextpgbtn");


function defaultNextPgActive() {
    defaultNextPg.click();
}




const token = '14f081835655d6f1928f6eca41afd35b';
//get
const myHeaders = new Headers();
const teams_url = 'https://pcfy.redberryinternship.ge/api/teams';
const positions_url = 'https://pcfy.redberryinternship.ge/api/positions';
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', '14f081835655d6f1928f6eca41afd35b');


//post

const formsPostUrl = 'https://pcfy.redberryinternship.ge/api/laptop/create'
const employFormData = new FormData(employForm);
const postHeaders = new Headers();
const teamsId = teamOpt.getAttribute('id');
const positionsId = positionOpt.getAttribute('id');
postHeaders.append('Content-Type', 'multipart/form-data');
postHeaders.append('Authorization', '14f081835655d6f1928f6eca41afd35b');
employFormData.append('team_id', teamOpt.value);
employFormData.append('position_id', positionOpt.value);
// თიმის მონაცემები

// async function getTeams(){
//     const response = await fetch(teams_url, {
//         method: 'get',
//         headers: myHeaders,
//     });
//     const data = await response.json();
//     const teamsData = data.data;

//     for(let i = 0; i < teamsData.length; i++){
//         const options = document.createElement('option');
//         teamOpt.appendChild(options);
//         options.setAttribute('id', teamsData[i].id);
//         options.setAttribute('value', 'selected')
//         options.innerHTML = teamsData[i].name;
//     }
    

// }


// // პოზიციები
// async function getPositions() {
//     const response = await fetch(positions_url, {
//         method: 'get',
//         headers: myHeaders,
//     });
//     const data  = await response.json();
//     const positionsData = data.data;
//     console.log(positionsData)

//     for(let i = 0; i < positionsData.length; i++){
//         const options = document.createElement('option');
//         positionOpt.appendChild(options);
//         options.setAttribute('id', teamsData[i].id);
//         options.setAttribute('value', 'selected')
//         options.innerHTML = teamsData[i].name;
//     }
// }


// getPositions();

async function getOptions(elem, url) {
    const response = await fetch(url, {
        method: 'get',
        cache: 'no-cache',
        headers: myHeaders,
    });
    const data = await response.json();
    const optionsData = data.data;

    for(let i = 0; i < optionsData.length; i++){
        const options = document.createElement('option');
        elem.appendChild(options);
        options.setAttribute('id', optionsData[i].id);
        options.setAttribute('value', 'selected');
        options.innerHTML = optionsData[i].name;
    }
}

getOptions(teamOpt, teams_url);

getOptions(positionOpt, positions_url);



// fetch('https://pcfy.redberryinternship.ge/api/teams', {
//     method: 'get',
//     headers: myHeaders,
// })
// .then(response => response.json())
// .then(json => console.log(json))
// .catch(error => {
//     console.error(error);
// });

async function postFormsData() {
    try{
        const response = await fetch(formsPostUrl, {
            method: 'post',
            headers: postHeaders,
            body: employFormData,
            
        });

        let data = await response.json();
        return data;     
    }   catch(error){
        return error;
    }
    
}











// VALIDATIONS 

if(employForm) {
    fName.addEventListener('input', (evt) => updateDesign(fName, /[ა-ჰ]+/, evt));

    lName.addEventListener('input', (evt) => updateDesign(lName, /[ა-ჰ]+/, evt));

    eMail.addEventListener('input', (evt) => updateDesign(eMail, /^[a-zA-z]\w+@redberry.ge$/gi, evt));

    phoneNum.addEventListener('input', (evt) => updateDesign(phoneNum, /^\+9955\d+/gi, evt));
}

function updateDesign(elem, regex, evt) {
    if(!regex.test(evt.target.value)) {
        elem.parentElement.classList.add('error');
    }else {
        elem.parentElement.classList.remove('error');
    }
}


// FORM SUBMIT
employForm.addEventListener("submit", (event) =>{

    validateForm();

    if(checkValidity() == true) {
        postFormsData();
    }else{
        event.preventDefault();
    }

} );
// VALIDATIONS
function checkValidity() {
    const containers = employForm.querySelectorAll('.formcolumn');
    let result = true;
    containers.forEach((container) => {
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

function validateForm() {

    //FIRSTNAME
    if(fName.value.trim()=='') {
        setError(fName, 'შეავსე სახელის ველი');
    }else if(fName.value.trim().length < 2) {
        setError(fName, 'მინიმუმ ორი სიმბოლო');
    }else if(!isNamesValid(fName.value)){
        setError(fName, 'გამოიყენე ქართული ასოები');
    }else{
        setSuccess(fName);
    }
    //LASTNAME
    if(lName.value.trim()=='') {
        setError(lName, 'შეავსე გვარის ველი');
    }else if(lName.value.trim().length < 2) {
        setError(lName, 'მინიმუმ ორი სიმბოლო');
    }else if(!isNamesValid(lName.value)){
        setError(lName, 'გამოიყენე ქართული ასოები');
    }else{
        setSuccess(lName);
    }
    //TEAM
    if(teamOpt.value == ''){
        setError(teamOpt);
    }else{
        setSuccess(teamOpt);
    }
    //POSITION
    if(positionOpt.value == ''){
        setError(positionOpt);
    }else{
        setSuccess(positionOpt);
    }
    //EMAIL
    if(eMail.value.trim()==''){
        setError(eMail, 'შეავსე იმეილის ველი');
    }else if(!isEmailValid(eMail)){
        setError(eMail, 'უნდა მთავრდებოდეს @redberry.ge - თი');
    }else{
        setSuccess(eMail);
    }
    //PHONENUM
    if(phoneNum.value.trim()==''){
        setError(phoneNum, 'შეავსე ნომრის ველი');
    }else if(phoneNum.value.trim().length=!13 || !isPhoneNumValid(phoneNum)){
        setError(phoneNum, 'ქართული მობილური ნომრის ფორმატი')
    }else{
        setSuccess(phoneNum);
    }
}

function setError(elem, errorMsg){
    const parent = elem.parentElement;
    if(parent.classList.contains('success')){
        parent.classList.remove('success');
    } 
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMsg;
    
}

function setSuccess(elem) {
    const parent = elem.parentElement;
    if(parent.classList.contains('error')){
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

function isNamesValid(elem) {
    const geoRegex = /[ა-ჰ]+/gi;
    return geoRegex.test(elem);
}

function isEmailValid(elem) {
    const mailRegex = /^[a-zA-z]\w+@redberry.ge$/gi;
    return mailRegex.test(elem.value);
}

function isPhoneNumValid(elem) {
    const phoneRegex = /^\+9955\d+/gi;
    return phoneRegex.test(elem.value);
}






// ინფორმაციის დამახსოვრება დარეფრეშებისას რომ არ დაიკარგოს

function populateStorage() {

    localStorage.setItem('firstname', fName.value);
    localStorage.setItem('lastname', lName.value);
    localStorage.setItem('email', eMail.value);
    localStorage.setItem('phone', phoneNum.value);


    getData();
}

function getData() {

    var currentFName = localStorage.getItem('firstname');

    var currentLName = localStorage.getItem('lastname');

    var currentEmail = localStorage.getItem('email');

    var currenPhone = localStorage.getItem('phone');


    fName.value = currentFName;

    lName.value = currentLName;

    eMail.value = currentEmail;

    phoneNum.value = currenPhone;

}