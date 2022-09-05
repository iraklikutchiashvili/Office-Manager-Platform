const laptopForm = document.querySelector('.laptopForm');
// IMAGE UPLOAD BUTTON


const defaultBtn = document.querySelector('#default-btn');

const customBtn = document.querySelector('#custom-btn');

const uploadImg = document.querySelector('#img');

const cancelBtn = document.querySelector('.cancel-btn');

const imageError = document.querySelector('.content');

// SAVE BUTTONS


const defaultSaveBtn = document.querySelector('.defaultSavebtn');

const customSaveBtn = document.querySelector('.saveBtn');


// USER INPUTS

const lapName = document.querySelector('#lapname');

const lapBrand = document.querySelector('#brand');

const lapCpu = document.querySelector('#cpu');

const cpuCores = document.querySelector('#cpucores');

const cpuThreads = document.querySelector('#cputhreads');

const ssd = document.querySelector('#ssd');

const hdd = document.querySelector('#hdd');

const memoryType = document.querySelector('.radio');

const price = document.querySelector('#price');

const date = document.querySelector('#date');

const stateNew =  document.querySelector('#new');

const stateUsed = document.querySelector('#used');

const state = document.querySelector('.state');

const ram = document.querySelector('#ram');


// get brands and cpu data


const token = '14f081835655d6f1928f6eca41afd35b';
//get
const myHeaders = new Headers();
const brands_url = 'https://pcfy.redberryinternship.ge/api/brands';
const cpus_url = 'https://pcfy.redberryinternship.ge/api/cpus';
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', '14f081835655d6f1928f6eca41afd35b');

// LAPTOPS POST DATA
const formsPostUrl = 'https://pcfy.redberryinternship.ge/api/laptop/create'
const laptopFormData = new FormData(laptopForm);
const postHeaders = new Headers();

postHeaders.append('Content-Type', 'multipart/form-data');
postHeaders.append('Authorization', token);

// IMAGE POST

const imageData = uploadImg.files;
laptopFormData.append('laptop_image', imageData);

// brand id
const brandId = lapBrand.getAttribute('id');
laptopFormData.append('brand_id', brandId);

// Token
laptopFormData.append('token', token);


// function for get

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

getOptions(lapBrand, brands_url);

getOptions(lapCpu, cpus_url);




// VALIDATIONS

function updateDesign(elem, regex, evt) {
    if(!regex.test(evt.target.value)) {
        elem.parentElement.classList.add('error');
    }else {
        elem.parentElement.classList.remove('error');
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

function checkValidity() {
    const containers = laptopForm.querySelectorAll('.formcolumn');
    let result = true;
    containers.forEach((container) => {
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

function checkImageValidity(){
    let result = true;
    const parent = imageError.parentElement;
    if(parent.classList.contains('error')){
        result = false;
    }
    return result;
}

function isLapNameValid(elem) {
    const lapNameRegex = /\w*[!@#$%^&*()_+-]?/gi;
    lapNameRegex.test(elem.value);
    console.log(lapNameRegex.test(elem.value))
}


function validateForm() {
    //LaptopName
    if(lapName.value.trim()==''){
        setError(lapName, 'შეიყვანე ლეპტოპის სახელი');
    }else if(isLapNameValid(lapName)){
        setError(lapName, 'გამოიყენე ლათინური ასოები ან ციფრები');
    }else {
        setSuccess(lapName);
    }
    //Brand
    if(lapBrand.value == ''){
        setError(lapBrand);
    }else {
        setSuccess(lapBrand);
    }
    //Cpu
    if(lapCpu.value == ''){
        setError(lapCpu);
    }else{
        setSuccess(lapCpu);
    }
    //CpuCores
    if(cpuCores.value.trim()==''){
        setError(cpuCores, 'შეიყვანე მონაცემი');
    }else {
        setSuccess(cpuCores);
    }
    //CpuThreads
    if(cpuThreads.value.trim()==''){
        setError(cpuThreads, 'შეიყვანე მონაცემი');
    }else {
        setSuccess(cpuThreads);
    }
    //Ram
    if(ram.value.trim()==''){
        setError(ram, 'შეიყვანე მონაცემი');
    }else {
        setSuccess(ram);
    }
    //MemoryType
    if(ssd.checked == true || hdd.checked == true){
        setSuccess(memoryType);
    }else {
        setError(memoryType);
    }
    //Price
    if(price.value.trim()==''){
        setError(price, 'შეიყვანე მონაცემი');
    }else {
        setSuccess(price);
    }
    //Date
    if(date.value.trim()==''){
        setError(date, 'შეიყვანე მონაცემი');
    }else {
        setSuccess(date);
    }
    //State
    if(stateNew.checked == true || stateUsed.checked == true){
        setSuccess(state);
    }else {
        setError(state);
    }
    //IMAGE UPLOAD             
    if(!defaultBtn.files.length === 0){
        setSuccess(imageError);
    }else if(defaultBtn.files[0]){
        setSuccess(imageError);
    }else{
        setError(imageError, 'ჩააგდე ან ატვირთე ლეპტოპის ფოტო');
    }
}


// ლეპტოპის სახელი
lapName.addEventListener('input', (evt) => updateDesign(lapName, /\w+[!@#$%^&*()_+-]?/gi, evt));

defaultBtn.addEventListener('input', (event) => {
    if(imageError.parentElement.classList.contains('error') && event.target.files[0]){
        imageError.parentElement.classList.remove('error');
    }
})

// მარტო ციფრებიანის ვალიდაცია
function onlyNumReg(elem) {
    elem.addEventListener('input', (evt) => updateDesign(elem, /\d+/gi, evt));
}



onlyNumReg(cpuCores);
onlyNumReg(cpuThreads);
onlyNumReg(price);
onlyNumReg(date);
onlyNumReg(ram);




// POST LAPTOS DATA

async function postLaptopsData() {
    try{
        const response = await fetch(formsPostUrl, {
            method: 'post',
            headers: postHeaders,
            body: laptopFormData,
        });
        let data = response.json();
        return data;
    }   catch(error){
        return error;
    }
}

let postFormsDataVar = postLaptopsData();

// IMAGE POST DATA
async function postImage(){
    try{
        const response = await fetch(formsPostUrl, {
            method: 'post',
            headers: postImageHeaders,
            body: JSON.stringify(imageData),
        });
        let data = response.json();
        return data;
    }   catch(error){
        return error;
    }
}

let postImageDataVar = postImage();



// ლეპტოპის ფორმის შემოწმება და გაგზავნა
laptopForm.addEventListener('submit', (event) => {
    validateForm();

    if(checkValidity() == true && checkImageValidity() == true){
        postFormsDataVar.post();
        postImageDataVar.post();
    }else {
        event.preventDefault();
    }
});




// დამახსოვრების ღილაკი

function defaultSaveBtnActive() {
    defaultSaveBtn.click();
}





// IMAGE UPLOAD FILE


function defaultBtnActive () {
    defaultBtn.click();
}


function uploadFile(){

    let file = this.files[0];

    if(file) {

        let reader = new FileReader();

        reader.onload = function () {

            let result = reader.result;
            uploadImg.src = result;

            uploadImg.classList.remove('img-hidden');

            customBtn.classList.add('nobtn');

            cancelBtn.classList.add('active');

            cancelBtn.addEventListener('click', function () {

                uploadImg.src = '';

                cancelBtn.classList.remove('active');
                
                customBtn.classList.remove('nobtn');

                uploadImg.classList.add('img-hidden');
            })
        
        }
    
        reader.readAsDataURL(file);

    }

}


// ფოტოს ატვირთვის ღილაკი
defaultBtn.addEventListener('change', uploadFile);



