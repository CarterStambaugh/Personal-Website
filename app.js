window.addEventListener('load',()=> {

    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);

           // const proxy = 'https://cors-anywhere.herokuapp.com/'
            //const api = `${proxy}https://api.darksky.net/forecast/923a261fc45c3dc3bd9880b06693b19e/${lat},${long}`;
            const api = `https://api.darksky.net/forecast/923a261fc45c3dc3bd9880b06693b19e/${lat},${long}`;


        fetch(api)
        .then(response =>{
            return response.json();

        })
        .then(data => {
            console.log(data);
            const {temperature,summary,icon} = data.currently;
            //set DOM Elements from the API 
            temperatureDegree.textContent = temperature
            temperatureDescription.textContent = summary
            locationTimeZone.textContent = data.timezone
            //set Icon
            setIcons(icon,document.querySelector('.icon'));

            //change temp C/F
            let celsius = (temperature - 32) * (5/9);
            
            temperatureSection.addEventListener('click', () => {
                if (temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);

                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
                
            });






        });

    });

    } 

    function setIcons(icon, iconID){

            const skycons = new Skycons({color: "white" });
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
    }
  
});