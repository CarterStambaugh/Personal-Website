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

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/923a261fc45c3dc3bd9880b06693b19e/${lat},${long}`;
            //const api = `https://api.darksky.net/forecast/923a261fc45c3dc3bd9880b06693b19e/${lat},${long}`;


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

Barbra.Pjax.start();
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};
