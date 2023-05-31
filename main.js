var peopleComponent = {
  data: [],

  init: function () {
    this.cacheElements();
    this.bindEvents();
    this.render();
  },
  fetchData: function () {
    return fetch("API_URL");
  },
  cacheElements: function () {
    this.$people = $("#people-module");
    this.$button = this.$people.find("button");
    this.$input = this.$people.find("input");
    this.$ul = this.$people.find("ul");
    this.template = $("#people-template").html();
  },
  bindEvents: function () {
    this.$button.on("click", this.addPerson.bind(this));
    this.$ul.on("click", "i.del", this.removePerson.bind(this));
  },
  removePerson: function (event) {
    var itemIndex = $(event.target).parent().index();
    this.data.splice(itemIndex, 1);
    eventsMediator.emit("people.decrement", this.data);
    this.render();
  },
  addPerson: function (text) {
    var inputText = text;

    if (inputText) {
      this.data.push(inputText);
      this.$input.val("");
      this.render();
    }

    eventsMediator.emit("people.increment", this.data);
  },
  render: function () {
    // eventsMediator.emit("people.change", this.data);
    this.$ul.html(Mustache.render(this.template, { people: this.data }));
  },
};

var statsModule = {
  peopleCount: 0,

  init: function () {
    this.cacheElements();
    this.bindEvents();
    this.render();
  },
  bindEvents: function () {
    eventsMediator.on("people.change", this.setPeopleCount.bind(this));
  },
  cacheElements: function () {
    this.$stats = $("#stats-module");
  },
  setPeopleCount: function (data) {
    this.peopleCount = data.length;
    this.render();
  },
  render() {
    this.$stats.html(
      Mustache.render("<b>{{.}} People Added</b>", this.peopleCount)
    );
  },
};

var footer = {
  data: [],
  init: function () {
    eventsMediator.on("people.increment", this.setData.bind(this));
    this.cacheElements();
    this.render();
  },
  cacheElements: function () {
    this.$footer = $("#footer");
  },
  setData(data) {
    this.data = data;
    this.render();
  },

  render: function () {
    this.$footer.html(Mustache.render("<b> Footer : {{.}}</b>", this.data));
  },
};

var eventsMediator = {
  events: {},
  on: function (eventName, callbackfn) {
    this.events[eventName] = this.events[eventName]
      ? this.events[eventName]
      : [];
    this.events[eventName].push(callbackfn);
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (callBackfn) {
        callBackfn(data);
      });
    }
  },
};

statsModule.init();
peopleComponent.init();
footer.init();
