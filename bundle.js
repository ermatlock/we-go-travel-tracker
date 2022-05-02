/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allDestinationsData": () => (/* binding */ allDestinationsData),
/* harmony export */   "allTravelersData": () => (/* binding */ allTravelersData),
/* harmony export */   "allTripsData": () => (/* binding */ allTripsData),
/* harmony export */   "currentDate": () => (/* binding */ currentDate),
/* harmony export */   "currentTraveler": () => (/* binding */ currentTraveler),
/* harmony export */   "formatter": () => (/* binding */ formatter),
/* harmony export */   "newTrip": () => (/* binding */ newTrip)
/* harmony export */ });
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_wego_logo_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~ */






/* ~~~~~~~~~~~~~~~~~~Image Imports~~~~~~~~~~~~~~~~~~~~~ */


/* ~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~ */
let allTravelersData,
  allTripsData,
  allDestinationsData,
  currentTraveler,
  newTrip;
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
/* travelerTrips, newTripId, currentTrip, userList */
let currentDate = dayjs__WEBPACK_IMPORTED_MODULE_2___default()().format("dddd, MMM D, YYYY");
// let now = dayjs()


/* ~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~ */
const createTraveler = (id) => {
  currentTraveler = new _Traveler__WEBPACK_IMPORTED_MODULE_4__["default"](
    allTravelersData.find((traveler) => traveler.id === id)
  );
};

const getAllData = (id) => {
  Promise.all([
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.getData)("travelers"),
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.getData)("trips"),
    (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.getData)("destinations"),
  ]).then((data) => {
    allTravelersData = data[0].travelers;
    allTripsData = data[1].trips;
    allDestinationsData = data[2].destinations;
    createTraveler(id);
    currentTraveler.getMyTrips(allTripsData);
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].greetUser(currentTraveler);
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].updateTravelerScr(
      currentTraveler,
      allTripsData,
      allDestinationsData
    );
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].displayTrips(currentTraveler, allDestinationsData);
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].populateOptions(allDestinationsData);
  });
};

const submitTrip = () => {
  if (!inputDate.value || !inputDestination.value) {
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].showError("Please enter all information before continuing");
  } else if (parseInt(inputTravelers.value) < 1 || parseInt(inputDuration.value) < 1) {
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].showError("Please enter a number greater than zero");
  } else {
    newTrip = {
      id: Date.now(),
      userID: currentTraveler.id,
      destinationID: parseInt(inputDestination.value),
      travelers: parseInt(inputTravelers.value),
      date: dayjs__WEBPACK_IMPORTED_MODULE_2___default()(inputDate.value).format("YYYY/MM/DD"),
      duration: parseInt(inputDuration.value),
      status: "pending",
      suggestedActivities: [],
    };
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].showNewTripRequest(newTrip, allDestinationsData);
  }
};

const addNewTrip = (e) => {
  e.preventDefault;
  _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].hide(newTripModal);
  (0,_api_calls__WEBPACK_IMPORTED_MODULE_1__.postData)("trips", newTrip);
  currentTraveler.trips.push(newTrip);
  _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].updateTravelerScr(
    currentTraveler,
    allTripsData,
    allDestinationsData
  );
  _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].displayTrips(currentTraveler, allDestinationsData);
  _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].showNewTripCost(newTrip, currentTraveler, allDestinationsData);
  _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].clearForm(allDestinationsData)
};

const verifyLogIn = (e) => {
  e.preventDefault();
  let userLogin = inputUserName.value.slice(0, 8);
  let currentId = inputUserName.value.slice(8);
  if (userLogin === "traveler" && inputPassword.value === "travel") {
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].loginSubmit();
    getAllData(parseInt(currentId));
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].displayTodayDate(currentDate);
  } else {
    _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].showError(
      "Sorry, your user ID or password is invalid. please try again"
    );
    inputUserName.value = "";
    inputPassword.value = "";
  }
};

/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
submitTripBtn.addEventListener("click", addNewTrip);
letsGoBtn.addEventListener("click", submitTrip);
cancelBtn.addEventListener("click", function () {
  _dom_updates__WEBPACK_IMPORTED_MODULE_3__["default"].undisplay(newTripModal);
});
loginBtn.addEventListener("click", verifyLogIn);




/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* This is an example of how to import a partial scss file*/\n/*\n  Josh's Custom CSS Reset\n  https://www.joshwcomeau.com/css/custom-css-reset/\n*/\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n}\n\nhtml, body {\n  height: 100%;\n}\n\nbody {\n  font-family: \"Comfortaa\", cursive;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\n\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\n\ninput, button, textarea, select {\n  font: inherit;\n}\n\np, h1, h2, h3, h4, h5, h6 {\n  overflow-wrap: break-word;\n}\n\n#root, #__next {\n  isolation: isolate;\n}\n\n.hidden {\n  display: none !important;\n}\n\n/*~~~~~~~END RESET~~~~~~~*/\n/*~~~~~~~GENERAL LAYOUT~~~~~~~*/\nbody {\n  background: url(https://cdn.dribbble.com/users/318729/screenshots/7172924/media/7de9e74f013af9125e54eab222feca4b.png) no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n}\n\nheader {\n  display: flex;\n  height: 18vh;\n  width: 100%;\n  background-color: #ffffffd5;\n  justify-content: space-evenly;\n  align-items: center;\n  flex-wrap: nowrap;\n}\n\n/* ~~~~~~~~~~~~LOGIN~~~~~~~~~~~~~ */\n.login-page {\n  background-color: #ffffff;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n\n.login-logo {\n  width: 40em;\n}\n\n.login {\n  width: 360px;\n  padding: 8% 0 0;\n  margin: auto;\n  z-index: 1;\n}\n\n.form {\n  position: absolute;\n  z-index: 1;\n  max-width: 47vw;\n  margin-top: 52vh;\n  padding: 45px;\n  text-align: center;\n}\n\n.form input {\n  outline: 0;\n  background: #f2f2f2;\n  width: 100%;\n  border: 0;\n  border-radius: 10px;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  font-size: large;\n}\n\n.form input:focus {\n  background: #dbdbdb;\n}\n\n.form button {\n  text-transform: uppercase;\n  outline: 0;\n  background: #4b6cb7;\n  width: 100%;\n  border: 0;\n  border-radius: 10px;\n  padding: 15px;\n  color: #FFFFFF;\n  font-size: 14px;\n  -webkit-transition: all 0.3 ease;\n  transition: all 0.3 ease;\n  cursor: pointer;\n}\n\n.form button:active {\n  background: #395591;\n}\n\n.form span {\n  font-size: 75px;\n  color: #4b6cb7;\n}\n\n.header-logo {\n  width: 16vw;\n}\n\n.form-section {\n  display: flex;\n  border-radius: 30px;\n  background-color: #ffffffd5;\n  width: 96vw;\n  height: 6vh;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.3);\n  justify-content: space-between;\n  margin-top: 1vh;\n}\n\n.container {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n}\n\n/* ~~~~~~~~~~~~TRIP FORM~~~~~~~~~~~~~ */\ninput {\n  border-style: none;\n  margin-left: 1%;\n  height: 83%;\n  border-radius: 5px;\n}\n\nlabel {\n  margin-left: 2%;\n}\n\n.date {\n  width: 14%;\n}\n\n.number {\n  width: 4%;\n}\n\n.dest {\n  width: 22vw;\n  margin-left: 1%;\n}\n\n.trips-section {\n  flex-wrap: wrap;\n  display: grid;\n  grid-template-columns: repeat(4, 24vw [col-start]);\n  grid-template-rows: repeat(1, 66vh [row-start]);\n  justify-items: center;\n  align-items: center;\n}\n\n.trip-img {\n  height: 15vh;\n  width: 20vw;\n}\n\n/* ~~~~~~~~~~~~MODALS~~~~~~~~~~~~~ */\n.modal {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: black;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n.modal-content {\n  display: flex;\n  border-radius: 50px;\n  background-color: #ffffffd5;\n  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.3);\n  margin: 15% auto;\n  padding: 19px;\n  border: none;\n  width: 66%;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n}\n\n.new-trip {\n  display: flex;\n  width: min-content;\n  border-radius: 19px;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n  font-size: larger;\n  font-weight: bolder;\n}\n\n.close {\n  color: black;\n  float: right;\n  margin-left: 50px;\n  font-size: 33px;\n}\n\n.close:hover,\n.close:focus {\n  display: flex;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nmodal-button-row {\n  display: flex;\n}\n\n/* ~~~~~~~~~~~~CARD~~~~~~~~~~~~ */\n.card {\n  margin: 11px;\n  background-color: #ffffffd5;\n  border-radius: 13px;\n  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.3);\n  overflow: hidden;\n  width: 21vw;\n  transition: transform 0.3s;\n  /* Animation */\n}\n\n.card:hover {\n  transform: scale(1.2);\n}\n\n.card-no-hover {\n  margin: 11px;\n  background-color: #ffffffd5;\n  border-radius: 13px;\n  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.3);\n  overflow: hidden;\n  width: 21vw;\n}\n\n.card-header img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n\n.card-body {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  padding: 6%;\n  min-height: 32vh;\n}\n\n.tag {\n  background: #cccccc;\n  border-radius: 50px;\n  font-size: 2vh;\n  margin: 0;\n  color: #fff;\n  padding: 2px 10px;\n  text-transform: uppercase;\n}\n\n.tag-teal {\n  background-color: #007c8a;\n}\n\n.tag-purple {\n  background-color: #5e76bf;\n}\n\n.tag-pink {\n  background-color: #d71499;\n}\n\n.card-body p {\n  font-size: initial;\n  font-weight: 700;\n}\n\n.user {\n  display: flex;\n  margin-top: auto;\n}\n\n.user img {\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  margin-right: 10px;\n}\n\n.user-info h5 {\n  margin: 0;\n}\n\n.user-info small {\n  color: #545d7a;\n}\n\n/* BUTTON */\n.button-62 {\n  background: linear-gradient(to bottom right, #ef4261, #fe0be1);\n  border: 0;\n  border-radius: 50px;\n  color: #FFFFFF;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 1.2rem;\n  font-weight: 700;\n  height: 100%;\n  outline: transparent;\n  padding: 0px 1rem;\n  text-align: center;\n  text-decoration: none;\n  transition: box-shadow 0.2s ease-in-out;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  white-space: nowrap;\n}\n\n.button-62:not([disabled]):focus {\n  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5), -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5), 0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);\n}\n\n.button-62:not([disabled]):hover {\n  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5), -0.125rem -0.125rem 1rem rgba(239, 71, 101, 0.5), 0.125rem 0.125rem 1rem rgba(255, 154, 90, 0.5);\n}\n\n/* ~~~~~~~~~ANIMATIONS~~~~~~~~~~~ */\n.puff-in-center {\n  -webkit-animation: puff-in-center 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) both;\n  animation: puff-in-center 0.7s cubic-bezier(0.47, 0, 0.745, 0.715) both;\n}\n\n/* ----------------------------------------------\n * Generated by Animista on 2022-3-8 21:43:17\n * Licensed under FreeBSD License.\n * See http://animista.net/license for more info. \n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n/**\n * ----------------------------------------\n * animation puff-in-center\n * ----------------------------------------\n */\n@-webkit-keyframes puff-in-center {\n  0% {\n    -webkit-transform: scale(2);\n    transform: scale(2);\n    -webkit-filter: blur(4px);\n    filter: blur(4px);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    -webkit-filter: blur(0px);\n    filter: blur(0px);\n    opacity: 1;\n  }\n}\n@keyframes puff-in-center {\n  0% {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5);\n    -webkit-filter: blur(4px);\n    filter: blur(4px);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    -webkit-filter: blur(0px);\n    filter: blur(0px);\n    opacity: 1;\n  }\n}\n.fade-in {\n  -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;\n  animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;\n}\n\n/* ----------------------------------------------\n * Generated by Animista on 2022-3-8 21:45:15\n * Licensed under FreeBSD License.\n * See http://animista.net/license for more info. \n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n/**\n * ----------------------------------------\n * animation fade-in\n * ----------------------------------------\n */\n@-webkit-keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n.fade-out {\n  -webkit-animation: fade-out 1s ease-out both;\n  animation: fade-out 1s ease-out both;\n}\n\n/* ----------------------------------------------\n * Generated by Animista on 2022-3-9 2:30:3\n * Licensed under FreeBSD License.\n * See http://animista.net/license for more info. \n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n/**\n * ----------------------------------------\n * animation fade-out\n * ----------------------------------------\n */\n@-webkit-keyframes fade-out {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fade-out {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss","webpack://./src/css/_variables.scss"],"names":[],"mappings":"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","sourcesContent":["/* This is an example of how to import a partial scss file*/\n@import \"./_variables\";\n\n/*\n  Josh's Custom CSS Reset\n  https://www.joshwcomeau.com/css/custom-css-reset/\n*/\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n* {\n  margin: 0;\n}\nhtml, body {\n  height: 100%;\n}\nbody {\n  font-family: 'Comfortaa', cursive;\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\ninput, button, textarea, select {\n  font: inherit;\n}\np, h1, h2, h3, h4, h5, h6 {\n  overflow-wrap: break-word;\n}\n#root, #__next {\n  isolation: isolate;\n}\n\n.hidden {\n  display: none !important;\n}\n/*~~~~~~~END RESET~~~~~~~*/\n\n/*~~~~~~~GENERAL LAYOUT~~~~~~~*/\nbody {\n  background: url(https://cdn.dribbble.com/users/318729/screenshots/7172924/media/7de9e74f013af9125e54eab222feca4b.png) no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n}\n\n// main {\n//   display: flex;\n//   flex-direction: column;\n//   justify-content: flex-start;\n//   align-items: center;\n//   flex-wrap: nowrap;\n// }\n\nheader {\n  display: flex;\n  height: 18vh;\n  width: 100%;\n  background-color: $tsp-white;\n  justify-content: space-evenly;\n  align-items: center;\n  flex-wrap: nowrap;\n}\n\n\n\n/* ~~~~~~~~~~~~LOGIN~~~~~~~~~~~~~ */\n.login-page {\n  background-color: #ffffff;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: center;\n}\n\n.login-logo {\n  width: 40em;\n}\n\n\n.login {\n  width: 360px;\n  padding: 8% 0 0;\n  margin: auto;\n  z-index: 1;\n}\n\n.form {\n  position: absolute;\n  z-index: 1;\n  max-width: 47vw;\n  margin-top: 52vh;\n  padding: 45px;\n  text-align: center;\n}\n\n.form input {\n  outline: 0;\n  background: #f2f2f2;\n  width: 100%;\n  border: 0;\n  border-radius: 10px;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  font-size: large;\n}\n\n.form input:focus {\n  background: #dbdbdb;\n}\n\n.form button {\n  text-transform: uppercase;\n  outline: 0;\n  background: #4b6cb7;\n  width: 100%;\n  border: 0;\n  border-radius: 10px;\n  padding: 15px;\n  color: #FFFFFF;\n  font-size: 14px;\n  -webkit-transition: all 0.3 ease;\n  transition: all 0.3 ease;\n  cursor: pointer;\n}\n\n.form button:active {\n  background: #395591;\n}\n\n.form span {\n  font-size: 75px;\n  color: #4b6cb7;\n}\n\n.header-logo {\n  width: 16vw;\n}\n\n.form-section {\n  display: flex;\n  border-radius: 30px;\n  background-color: $tsp-white;\n  width: 96vw;\n  height: 6vh;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center;\n  box-shadow: $drop-shadow;\n  justify-content: space-between;\n  margin-top: 1vh;\n  \n}\n\n.container {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n}\n\n// .sticky {\n//   display: flex;\n//   flex-direction: column;\n//   position: fixed;\n//   z-index: 1;\n//   align-items: center;\n//   justify-content: space-around;\n// }\n\n// .scroll {\n//   scroll-behavior: smooth;\n//   overflow: auto\n// }\n\n/* ~~~~~~~~~~~~TRIP FORM~~~~~~~~~~~~~ */\ninput {\n  border-style: none;\n  margin-left: 1%;\n  height: 83%;\n  border-radius: 5px;\n}\n\nlabel {\n  margin-left: 2%;\n}\n\n.date {\n  width: 14%;\n}\n.number {\n  width: 4%;\n}\n.dest {\n  width: 22vw;\n  margin-left: 1%;\n}\n\n.trips-section {\n  flex-wrap: wrap;\n  display: grid;\n  grid-template-columns: repeat(4, 24vw [col-start]);\n  grid-template-rows: repeat(1, 66vh [row-start]);\n  justify-items: center;\n  align-items: center;\n}\n\n.trip-img {\n  height: 15vh;\n  width: 20vw;\n}\n\n/* ~~~~~~~~~~~~MODALS~~~~~~~~~~~~~ */\n.modal {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 1;\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  background-color: rgb(0, 0, 0);\n  background-color: rgba(0, 0, 0, 0.4);\n}\n\n.modal-content {\n  display: flex;\n  border-radius: 50px;\n  background-color: #ffffffd5;\n  box-shadow: 0 3px 20px rgb(0 0 0 / 30%);\n  margin: 15% auto;\n  padding: 19px;\n  border: none;\n  width: 66%;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n}\n\n.new-trip {\n  display: flex;\n  width: min-content;\n  border-radius: 19px;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n  font-size: larger;\n  font-weight: bolder;\n}\n\n.close {\n  color: rgb(0, 0, 0);\n  float: right;\n  margin-left: 50px;\n  font-size: 33px;\n}\n\n.close:hover,\n.close:focus {\n  display: flex;\n  text-decoration: none;\n  cursor: pointer;\n}\n\nmodal-button-row {\n  display: flex;\n}\n\n/* ~~~~~~~~~~~~CARD~~~~~~~~~~~~ */\n.card {\n  margin: 11px;\n  background-color: $tsp-white;\n  border-radius: 13px;\n  box-shadow: $drop-shadow;\n  overflow: hidden;\n  width: 21vw;\n  transition: transform .3s; /* Animation */\n}\n\n.card:hover {\n  transform: scale(1.2);\n}\n\n.card-no-hover {\n  margin: 11px;\n  background-color: $tsp-white;\n  border-radius: 13px;\n  box-shadow: $drop-shadow;\n  overflow: hidden;\n  width: 21vw;\n}\n\n.card-header img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n.card-body {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  padding: 6%;\n  min-height: 32vh;\n}\n\n.tag {\n  background: #cccccc;\n  border-radius: 50px;\n  font-size: 2vh;\n  margin: 0;\n  color: #fff;\n  padding: 2px 10px;\n  text-transform: uppercase;\n}\n.tag-teal {\n  background-color: #007c8a;\n}\n.tag-purple {\n  background-color: #5e76bf;\n}\n.tag-pink {\n  background-color: #d71499;\n}\n\n.card-body p {\n  font-size: initial;\n  font-weight: 700;\n}\n.user {\n  display: flex;\n  margin-top: auto;\n}\n\n.user img {\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  margin-right: 10px;\n}\n.user-info h5 {\n  margin: 0;\n}\n.user-info small {\n  color: #545d7a;\n}\n\n/* BUTTON */\n.button-62 {\n  background: linear-gradient(to bottom right, #ef4261, #fe0be1);\n  border: 0;\n  border-radius: 50px;\n  color: #FFFFFF;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 1.2rem;\n  font-weight: 700;\n  height: 100%;\n  outline: transparent;\n  padding: 0px 1rem;\n  text-align: center;\n  text-decoration: none;\n  transition: box-shadow 0.2s ease-in-out;\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  white-space: nowrap;\n}\n\n.button-62:not([disabled]):focus {\n  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);\n}\n\n.button-62:not([disabled]):hover {\n  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);\n}\n\n/* ~~~~~~~~~ANIMATIONS~~~~~~~~~~~ */\n.puff-in-center {\n\t-webkit-animation: puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;\n\t        animation: puff-in-center 0.7s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;\n}\n/* ----------------------------------------------\n * Generated by Animista on 2022-3-8 21:43:17\n * Licensed under FreeBSD License.\n * See http://animista.net/license for more info. \n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n\n/**\n * ----------------------------------------\n * animation puff-in-center\n * ----------------------------------------\n */\n @-webkit-keyframes puff-in-center {\n  0% {\n    -webkit-transform: scale(2);\n            transform: scale(2);\n    -webkit-filter: blur(4px);\n            filter: blur(4px);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    -webkit-filter: blur(0px);\n            filter: blur(0px);\n    opacity: 1;\n  }\n}\n@keyframes puff-in-center {\n  0% {\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n    -webkit-filter: blur(4px);\n            filter: blur(4px);\n    opacity: 0;\n  }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    -webkit-filter: blur(0px);\n            filter: blur(0px);\n    opacity: 1;\n  }\n}\n\n.fade-in {\n\t-webkit-animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1s both;\n\t        animation: fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) 1s both;\n}\n\n/* ----------------------------------------------\n * Generated by Animista on 2022-3-8 21:45:15\n * Licensed under FreeBSD License.\n * See http://animista.net/license for more info. \n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n\n/**\n * ----------------------------------------\n * animation fade-in\n * ----------------------------------------\n */\n @-webkit-keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n.fade-out {\n\t-webkit-animation: fade-out 1s ease-out both;\n\t        animation: fade-out 1s ease-out both;\n}\n\n/* ----------------------------------------------\n * Generated by Animista on 2022-3-9 2:30:3\n * Licensed under FreeBSD License.\n * See http://animista.net/license for more info. \n * w: http://animista.net, t: @cssanimista\n * ---------------------------------------------- */\n\n/**\n * ----------------------------------------\n * animation fade-out\n * ----------------------------------------\n */\n @-webkit-keyframes fade-out {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fade-out {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n\n","$primary-background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);\n\n$tsp-white: #ffffffd5;\n\n$drop-shadow: 0 3px 20px rgb(0 0 0 / 30%);"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const getData = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error.message);
      _dom_updates__WEBPACK_IMPORTED_MODULE_0__["default"].showError(
        "Sorry, we were unable to retrieve your data. Please contact @nikseif to file a complaint"
      );
    });
};

const postData = (address, inputData) => {
  return fetch(`http://localhost:3001/api/v1/${address}`, {
    method: "POST",
    body: JSON.stringify(inputData),
    headers: { "Content-Type": "application/json" },
  }).catch((error) => {
    console.warn(error.message);
    _dom_updates__WEBPACK_IMPORTED_MODULE_0__["default"].showError(
      "Sorry, we were unable to record your data. Please contact @hfaerber to file a complaint"
    );
  });
};



/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

/*~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~*/
const errorModal = document.getElementById("errorModal");
const newTripModal = document.getElementById("newTripModal");
const newTripContent = document.getElementById("newTripContent");
const span = document.getElementsByClassName("close")[0];
const errorMessage = document.getElementById("errorMessage");
const welcome = document.getElementById("welcome");
const today = document.getElementById("today");
const annualSpent = document.getElementById("annualSpent");
const tripsList = document.getElementById("tripsList");
const tripForm = document.getElementById("tripForm");
const inputDate = document.getElementById("inputDate")
const inputDuration = document.getElementById("inputDuration");
const inputTravelers = document.getElementById("inputTravelers");
const inputDestination = document.getElementById("inputDestination");
const letsGoBtn = document.getElementById("letsGoBtn");
const submitTripBtn = document.getElementById("submitTripBtn");
const cancelBtn = document.getElementById("cancelBtn");
const loginPage = document.querySelector(".login-page");
const dashboard = document.querySelector(".dashboard");
const loginBtn = document.getElementById("login");
const formSection = document.querySelector(".form-section");
const inputUserName = document.getElementById("userName");
const inputPassword = document.getElementById("inputPassword");
const header = document.querySelector(".header");
let now = new Date().toISOString().split('T')[0];
document.getElementsByName("setTodaysDate")[0].setAttribute('min', now);

/*~~~~~~~~~~~~~~~EVENT LISTENERS~~~~~~~~~~~~~~~~~*/
span.onclick = function () {
  domUpdates.undisplay(errorModal);
};
window.onclick = function (event) {
  if (event.target == errorModal) {
    domUpdates.undisplay(errorModal);
  }
};

/*~~~~~~~~~~~~~~~DOM UPDATES~~~~~~~~~~~~~~~~~*/
const domUpdates = {
  display(element) {
    element.style.display = "block";
  },

  undisplay(element) {
    element.style.display = "none";
  },

  show(element) {
    element.classList.remove("hidden");
  },

  hide(element) {
    element.classList.add("hidden");
  },

  showError(message) {
    errorMessage.innerText = message;
    this.display(errorModal);
  },

  greetUser(currentTraveler) {
    welcome.innerText = `Welcome, ${currentTraveler.getFirstName()}!`;
  },

  displayTodayDate(currentDate) {
    today.innerText = currentDate;
  },

  displayTrips(currentTraveler, allDestinationsData) {
    tripsList.innerHTML = "";
    const sorted = currentTraveler.trips.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    sorted.forEach((trip) => {
      allDestinationsData.forEach((location) => {
        if (trip.destinationID === location.id) {
          let color = trip.status === "approved" ? "teal" : "pink";
          tripsList.innerHTML += `
          <div class="card" tabindex="0" id="${trip.id}">
            <div class="card-header">
              <img src=${location.image} alt=${location.alt}/>
            </div>
            <div class="card-body">
              <p class="tag font-med tag-${color}" >status: ${trip.status}</p>
              <p>${location.destination}</p>
              <p>Trip Date: ${trip.date}</p>
              <p>Travelers: ${trip.travelers}</p>
              <p>Days: ${trip.duration}</p>
            </div>
          </div>`;
        }
      });
    });
  },

  updateTravelerScr(currentTraveler, allTripsData, allDestinationsData) {
    const result = currentTraveler.getMyAnnualSpending(
      allTripsData,
      allDestinationsData
    );

    annualSpent.innerText = `You spent ${_scripts__WEBPACK_IMPORTED_MODULE_0__.formatter.format(result)} this year.`;
  },

  populateOptions(allDestinationsData) {
    inputDestination.innerHTML = `<option value="" disabled selected>--Select a destination--</option>`;
    allDestinationsData.forEach((location) => {
      inputDestination.innerHTML += `<option value="${location.id}" >${location.destination}</option>`;
    });
  },

  clearForm(allDestinationsData) {
    inputTravelers.value = "1";
    inputDuration.value = "1";
    inputDate.value = "";
    this.populateOptions(allDestinationsData);
  },

  showNewTripCost(newTrip, currentTraveler, allDestinationsData) {
    currentTraveler.getNewTrip(newTrip, allDestinationsData);
  },

  showNewTripRequest(trip, allDestinationsData) {
    const cost = _scripts__WEBPACK_IMPORTED_MODULE_0__.currentTraveler.getNewTrip(trip, allDestinationsData);
    this.display(newTripModal);
    allDestinationsData.forEach((location) => {
      if (trip.destinationID === location.id) {
        let color = trip.status === "approved" ? "teal" : "pink";
        newTripContent.innerHTML = `
        <p>Estimated Cost: ${_scripts__WEBPACK_IMPORTED_MODULE_0__.formatter.format(cost)}</p>
        <div class="card-no-hover" tabindex="0" id="${trip.id}">
          <div class="card-header">
            <img src=${location.image} alt=${location.alt}/>
          </div>
          <div class="card-body">
            <p class="tag tag-${color}" >status: ${trip.status}</p>
            <p>${location.destination}</p>
            <p>Trip Date: ${trip.date}</p>
            <p>Travelers: ${trip.travelers}</p>
            <p>Days: ${trip.duration}</p>
          </div>
        </div>`;
      }
    });
  },

  loginSubmit() {
    this.show(formSection);
    this.show(tripsList);
    this.show(header);
    this.hide(loginPage);
  },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);


/***/ }),
/* 8 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_3__);




dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isBetween__WEBPACK_IMPORTED_MODULE_1___default()));
dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2___default()));
dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_3___default()));

class Traveler {
  constructor({ id, name, travelerType }) {
    this.id = id || 0;
    this.name = name || "not-submitted";
    this.travelerType = travelerType || "not-submitted";
    this.userLogin = `traveler${this.id}`;
    this.password = "travel";
    this.trips = [];
    this.pending = [];
    this.todayDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().format("YYYY/MM/DD");
  }

  getFirstName() {
    const firstName = this.name.split(" ")[0];
    return firstName;
  }

  getMyTrips(trips) {
    this.trips = trips.filter((trip) => trip.userID === this.id);
  }

  getMyAnnualSpending(trips, destinations) {
    const year = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().subtract(1, "year").format("YYYY/MM/DD");
    const annualTrips = this.trips.filter(
      (trip) => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(trip.date).format("YYYY") === dayjs__WEBPACK_IMPORTED_MODULE_0___default()().format("YYYY")
    );
    let subTotal = destinations.reduce((sum, location) => {
      annualTrips.forEach((trip) => {
        if (trip.destinationID === location.id) {
          let travelersPerRoom = Math.ceil(trip.travelers / 2);
          let lodging =
            location.estimatedLodgingCostPerDay *
            travelersPerRoom *
            trip.duration;
          let flights =
            location.estimatedFlightCostPerPerson * 2 * trip.travelers;
          sum += travelersPerRoom + lodging + flights;
        }
      });
      return sum;
    }, 0);
    let result = subTotal + subTotal * 0.1;
    return result;
  }

  getNewTrip(newTrip, destinations) {
    this.pending.push(newTrip);
    let subTotal = destinations.reduce((sum, location) => {
      if (newTrip.destinationID === location.id) {
        let travelersPerRoom = Math.ceil(newTrip.travelers / 2);
        let lodging =
          location.estimatedLodgingCostPerDay *
          travelersPerRoom *
          newTrip.duration;
        let flights =
          location.estimatedFlightCostPerPerson * 2 * newTrip.travelers;
        sum += travelersPerRoom + lodging + flights;
      }
      return sum;
    }, 0);
    let result = subTotal + subTotal * 0.1;
    return result;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);


/***/ }),
/* 10 */
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i,t){i.prototype.isBetween=function(e,i,s,f){var n=t(e),o=t(i),r="("===(f=f||"()")[0],u=")"===f[1];return(r?this.isAfter(n,s):!this.isBefore(n,s))&&(u?this.isBefore(o,s):!this.isAfter(o,s))||(r?this.isBefore(n,s):!this.isAfter(n,s))&&(u?this.isAfter(o,s):!this.isBefore(o,s))}}}));

/***/ }),
/* 11 */
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}));

/***/ }),
/* 12 */
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)}}}));

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/wego-logo.svg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map