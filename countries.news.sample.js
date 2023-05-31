var model = {
  countries: [],
  article: [],
  currentCountry: null,
};

var controller = {
  init: function () {
    this.getAllCountries();

    eventsMediator.on("countries.loaded", function (data) {
      model.countries = data;
      countriesView.render();
    });

    eventsMediator.on("articles.loaded", function (data) {
      model.articles = data.articles;
      articlesView.render();
    });

    eventsMediator.on("country.set", function (data) {});
  },
  getCountries() {
    return model.countries;
  },
  fetchAllCountries() {
    $.ajax("url", {
      success: function (data) {
        eventsMediator.emit("countries.loaded", data);
      },
      error: function () {},
    });
  },

  fetchCurrentCountryArticles() {
    $.ajax("url&country=" + this.getCurrentCountry().isoCode, {
      success: function (data) {
        eventsMediator.emit("articles.loaded", data);
      },
      error: function () {},
    });
  },
};

var countriesView = {
  init: function () {
    this.bindEvent();
  },
  render: function () {
    var countries = controller.getCountries();

    function setCurrentCountry(coutnry) {
      controller.setCurrentCountry(country.isoCode);
      eventsMediator.emit("country.set", country);
    }

    for (let i = 0; i < countries.length; i++) {
      addEventListener("click", function () {
        setCurrentCountry(countries[i]);
      });
    }
    setCurrentCountry.bind;
    //rendering login
  },
  bindEvent: function () {
    $(document).on("click", ".flag-img", function (e) {});
  },
};

var articlesViewc = {
  render: function () {},
};
