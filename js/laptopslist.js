// GET LAPTOPS
const laptopsBox = document.querySelector('.laptopslistbox');
const allLaptopsUrl = 'https://pcfy.redberryinternship.ge/api/laptops'
const token = '14f081835655d6f1928f6eca41afd35b';

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', '14f081835655d6f1928f6eca41afd35b');



async function getOptions(elem, url) {
    const response = await fetch(url, {
        method: 'get',
        cache: 'no-cache',
        headers: myHeaders,
    });
    const data = await response.json();
    const allLaptopsData = data.data;

    for(let i = 0; i < allLaptopsData.length; i++){
        const laptopsContainers = document.createElement('div');
        elem.appendChild(laptopsContainers);
        // laptop info
        const laptopsData = allLaptopsData[i].laptop;
        const laptopImg = document.createElement('img').setAttribute('href', laptopsData.image);
        const laptopName = document.createElement('p').appendChild(laptopsData.name);
        const laptopId = laptopsData.id;
        laptopsContainers.setAttribute('id', laptopId);
        // user info
        const userData = allLaptopsData[i].user;
        const userNames = userData.name;
        const userSurnames = userData.surname;
        const userInfo = document.createElement('h5');
        userInfo.appendChild(userNames + ' ' + userSurnames );
        // text containers
        const infoContainers = document.createElement('div');
        infoContainers.appendChild(userInfo);
        infoContainers.appendChild(laptopName);
        const moreInfo = document.createElement('a').innerHTML('მეტის ნახვა');
        infoContainers.appendChild(moreInfo);
        infoContainers.classList.add('infocontainers');
        // main containers
        laptopsContainers.appendChild(laptopImg);
        laptopsContainers.appendChild(infoContainers);
        laptopsContainers.classList.add('laptopsContainers');
    }
}

getOptions(laptopsBox, allLaptopsUrl);