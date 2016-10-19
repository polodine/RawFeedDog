function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

///////////////////////////////
//   dog name page
///////////////////////////////

function startButtonOnClickListener() {
  window.location.replace("../steps/step1.html");
}

function stepOneOnClickListener() {
  var dogName = document.getElementById("dog-name-input").value;
  if (dogName) {
    createDogProfile(dogName);
    window.location.replace("../steps/step2.html");
  } else {
    alert('wrong name');
  }
}

function createDogProfile(dogName) {
  var dogInfo = {};
  dogInfo.name = dogName;
  setCookie('nonSignedInfo', JSON.stringify(dogInfo), 30);
}

///////////////////////////////
//   all dog settings pages
///////////////////////////////

function appendSetting(settingName, settingValue) {
  var dogInfoText = getCookie('nonSignedInfo');
  var dogInfo = {};
  if (dogInfoText) {
    try {
      dogInfo = JSON.parse(dogInfoText);
    } catch (err) {}
  }
  dogInfo[settingName] = settingValue;
  setCookie('nonSignedInfo', JSON.stringify(dogInfo), 30);
}

function stepTwoOnClickListener() {
  var dogSettings = {};
  dogSettings.meat = document.getElementById("meat-input").value;
  dogSettings.bones = document.getElementById("bones-input").value;
  dogSettings.organ1 = document.getElementById("organ1-input").value;
  dogSettings.organ2 = document.getElementById("organ2-input").value;

  if (dogSettings.meat && dogSettings.bones && dogSettings.organ1 && dogSettings.organ2
    && (+dogSettings.meat + +dogSettings.bones + +dogSettings.organ1 + +dogSettings.organ2) == 100) {
    appendSetting('meat', +dogSettings.meat);
    appendSetting('bones', +dogSettings.bones);
    appendSetting('organ1', +dogSettings.organ1);
    appendSetting('organ2', +dogSettings.organ2);
    window.location.replace("../steps/step3.html");
  } else {
    alert('wrong setts');
  }
}

///////////////////////////////
//   dog weight page
///////////////////////////////

var currentUnitInit = 0;

function stepThreeOnClickListener() {
  var weightMajorUnit = document.getElementById("weight-major-unit").value;
  var weightMinorUnit = document.getElementById("weight-minor-unit").value;

  if (weightMajorUnit && weightMinorUnit) {
    var dogWeight;

    if (currentUnitInit) {
      dogWeight = +weightMajorUnit * 16 + +weightMinorUnit;
      dogWeight *= 28.3495;
    } else {
      dogWeight = +weightMajorUnit * 1000 + +weightMinorUnit;
    }
    appendSetting('weight', dogWeight);
    appendSetting('unit', currentUnitInit);
    window.location.replace("../steps/step4.html");
  } else {
    alert('wrong setts');
  }
}

function imperialUnitInitOnClickListener(td) {
  currentUnitInit = 1;
  document.querySelector('.body__table-metric_item-active').classList.remove('body__table-metric_item-active');
  td.classList.add('body__table-metric_item-active');
  document.getElementById('major-unit').innerHTML = 'lbs';
  document.getElementById('minor-unit').innerHTML = 'oz';
  document.getElementById("weight-minor-unit").maxLength = "2";
}

function metricUnitInitOnClickListener(td) {
  currentUnitInit = 0;
  document.querySelector('.body__table-metric_item-active').classList.remove('body__table-metric_item-active');
  td.classList.add('body__table-metric_item-active');
  document.getElementById('major-unit').innerHTML = 'kg';
  document.getElementById('minor-unit').innerHTML = 'g';
  document.getElementById("weight-minor-unit").maxLength = "3";
}

///////////////////////////////
//   final step page
///////////////////////////////

function stepFourOnClickListener() {
  var ratio = document.getElementById("ratio-input").value;
  if (ratio) {
    appendSetting('ratio', +ratio);
  }

  var currentSettingsText = getCookie('nonSignedInfo');
  var currentSettings;

  if (currentSettingsText) {
    try {
      currentSettings = JSON.parse(currentSettingsText);
    } catch (err) {}
  }

  if (currentSettings && Object.keys(currentSettings).length == 8) {
    saveDogProfile(currentSettings);
    // window.location.replace("../results/sharik.html");
  } else {
    alert('wrong setts');
  }
}

function getRawFedDogsObject() {
  var rawFedDogsValueText = getCookie('rawFedDogs');
  if (rawFedDogsValueText) {
    var rawFedDogsValue;
    try {
      rawFedDogsValue = JSON.parse(rawFedDogsValueText);
    } catch (err) {}
    if (rawFedDogsValue) {
      return rawFedDogsValue;
    }
  }

  return null;
}

function saveDogProfile(settings) {
  if (settings === null || settings === undefined) {
    return;
  }
  var rawFedDogsValue = getRawFedDogsObject();
  if (rawFedDogsValue === null || rawFedDogsValue === undefined) {
    rawFedDogsValue = {};
    rawFedDogsValue.profiles = {};
  }
  rawFedDogsValue.profiles[settings.name] = settings;
  rawFedDogsValue.selectedUser = settings.name;

  try {
    setCookie('rawFedDogs', JSON.stringify(rawFedDogsValue));
    window.location.replace("../results/sharik.html");
  } catch (err) {}

  document.cookie = "nonSignedInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

///////////////////////////////
//   calc page
///////////////////////////////

var currentUnit = {
  "unit": 0,
  "majorUnit": "kg",
  "minorUnit": "g"
};

var currentIndex = 1;

var currentUser = {name:"", meat:0, bones:0, organ1:0, organ2:0,
  weight:0, ratio:0, unit:0};

function renderTotalMealWeight(majorValue, minorValue) {
  var totalWeightContainer = document.getElementById("total-meal-weight");
  totalWeightContainer.innerHTML = "";

  if (majorValue) {
    var kgSpan = document.createElement('span');
    kgSpan.className = "body__results_number-text";
    kgSpan.innerHTML = currentUnit.majorUnit;
    totalWeightContainer.innerHTML = majorValue;
    totalWeightContainer.appendChild(kgSpan);
  }

  if (minorValue) {
    var gSpan = document.createElement('span');
    gSpan.className = "body__results_number-text";
    gSpan.innerHTML = currentUnit.minorUnit;
    totalWeightContainer.innerHTML += "\u00A0" + minorValue;
    totalWeightContainer.appendChild(gSpan);
  }
}

function renderMealClassWeight(id, majorValue, minorValue) {
  var mealWeightContainer = document.getElementById(id);
  mealWeightContainer.innerHTML = "";

  if (majorValue) {
    var kgValueSpan = document.createElement('span');
    var kgSpan = document.createElement('span');
    kgValueSpan.className = "list-number";
    kgSpan.className = "list-number_text";
    kgValueSpan.innerHTML = " " + majorValue;
    kgSpan.innerHTML = currentUnit.majorUnit;
    mealWeightContainer.appendChild(kgValueSpan);
    mealWeightContainer.appendChild(kgSpan);
  }

  if (minorValue) {
    var gValueSpan = document.createElement('span');
    var gSpan = document.createElement('span');
    gValueSpan.className = "list-number";
    gSpan.className = "list-number_text";
    gValueSpan.innerHTML = " " + minorValue;
    gSpan.innerHTML = currentUnit.minorUnit;
    mealWeightContainer.appendChild(gValueSpan);
    mealWeightContainer.appendChild(gSpan);
  }
}

function calculateMeal(multiplicationIndex) {
  currentIndex = multiplicationIndex;

  var dogWeight = currentUser.weight;
  var mealWeight = (dogWeight * currentUser.ratio) / 100;

  if (currentUnit.unit) {
    // imperial
    mealWeight = mealWeight / 28.3495;
    var meat = multiplicationIndex * +((mealWeight * currentUser.meat) / 100).toFixed(2);
    var bones = multiplicationIndex * +((mealWeight * currentUser.bones) / 100).toFixed(2);
    var organ1 = multiplicationIndex * +((mealWeight * currentUser.organ1) / 100).toFixed(2);
    var organ2 = multiplicationIndex * +((mealWeight * currentUser.organ2) / 100).toFixed(2);
  } else {
    var meat = multiplicationIndex * Math.round((mealWeight * currentUser.meat) / 100);
    var bones = multiplicationIndex * Math.round((mealWeight * currentUser.bones) / 100);
    var organ1 = multiplicationIndex * Math.round((mealWeight * currentUser.organ1) / 100);
    var organ2 = multiplicationIndex * Math.round((mealWeight * currentUser.organ2) / 100);
  }

  mealWeight = meat + bones + organ1 + organ2;

  if (currentUnit.unit) {
    // imperial
    var mealMajor = Math.floor(mealWeight / 16);
    var mealMinor = +((mealWeight / 16 - mealMajor) * 16).toFixed(2);;

    var meatMajor = Math.floor(meat / 16);
    var bonesMajor = Math.floor(bones / 16);
    var organ1Major = Math.floor(organ1 / 16);
    var organ2Major = Math.floor(organ2 / 16);

    var meatMinor = +((meat / 16 - meatMajor) * 16).toFixed(2);
    var bonesMinor = +((bones / 16 - bonesMajor) * 16).toFixed(2);
    var organ1Minor = +((organ1 / 16 - organ1Major) * 16).toFixed(2);
    var organ2Minor = +((organ2 / 16 - organ2Major) * 16).toFixed(2);
  } else {
    // metric
    var mealMajor = Math.floor(mealWeight / 1000);
    var mealMinor = mealWeight % 1000;

    var meatMajor = Math.floor(meat / 1000);
    var bonesMajor = Math.floor(bones / 1000);
    var organ1Major = Math.floor(organ1 / 1000);
    var organ2Major = Math.floor(organ2 / 1000);

    var meatMinor = meat % 1000;
    var bonesMinor = bones % 1000;
    var organ1Minor = organ1 % 1000;
    var organ2Minor = organ2 % 1000;
  }

  renderTotalMealWeight(mealMajor, mealMinor);

  renderMealClassWeight("meat-weight", meatMajor, meatMinor);
  renderMealClassWeight("bones-weight", bonesMajor, bonesMinor);
  renderMealClassWeight("organ1-weight", organ1Major, organ1Minor);
  renderMealClassWeight("organ2-weight", organ2Major, organ2Minor);
}

function dailyOnClickListener(td) {
  (document.querySelector('.body__table-day_item-active')).classList.remove('body__table-day_item-active');
  td.classList.add('body__table-day_item-active');
  calculateMeal(1);
}

function weeklyOnClickListener(td) {
  (document.querySelector('.body__table-day_item-active')).classList.remove('body__table-day_item-active');
  td.classList.add('body__table-day_item-active');
  calculateMeal(7);
}

function monthlyOnClickListener(td) {
  (document.querySelector('.body__table-day_item-active')).classList.remove('body__table-day_item-active');
  td.classList.add('body__table-day_item-active');
  calculateMeal(30);
}

function getCurrentUser() {
  var rawFedDogsValue = getRawFedDogsObject();
  if (rawFedDogsValue) {
    var selectedUser = rawFedDogsValue.selectedUser;
    var profiles = rawFedDogsValue.profiles;
    if (selectedUser && profiles) {
      return profiles[selectedUser];
    }
  }

  return {};
}

function setCurrentUser(name) {
  var rawFedDogsValue = getRawFedDogsObject();
  if (rawFedDogsValue && rawFedDogsValue.profiles) {
    if (rawFedDogsValue.profiles[name]) {
      rawFedDogsValue.selectedUser = name;
      setCookie('rawFedDogs', JSON.stringify(rawFedDogsValue));
      currentUser = rawFedDogsValue.profiles[name];
      document.querySelector('.body__table-metric_item-active').classList.remove('body__table-metric_item-active');
      if (currentUser.unit) {
        document.getElementById('imperial-unit-button').classList.add('body__table-metric_item-active');
        currentUnit.unit = 1;
        currentUnit.majorUnit = "lbs";
        currentUnit.minorUnit = "oz";
      } else {
        document.getElementById('metric-unit-button').classList.add('body__table-metric_item-active');
        currentUnit.unit = 0;
        currentUnit.majorUnit = "kg";
        currentUnit.minorUnit = "g";
      }
      document.getElementById('meat-percent').innerHTML = currentUser.meat + "%";
      document.getElementById('bones-percent').innerHTML = currentUser.bones + "%";
      document.getElementById('organ1-percent').innerHTML = currentUser.organ1 + "%";
      document.getElementById('organ2-percent').innerHTML = currentUser.organ2 + "%";
    }
  }

  calculateMeal(currentIndex);
}

function renderProfiles() {
  var currentProfile = document.getElementById("current-profile")
  var profilesContainer = document.getElementById("other-profiles");
  profilesContainer.innerHTML = "";

  var rawFedDogsValue = getRawFedDogsObject();
  if (rawFedDogsValue && rawFedDogsValue.profiles) {
    currentProfile.innerHTML = rawFedDogsValue.selectedUser;
    var headerButton = document.querySelector('.header__button');
    headerButton.innerHTML = "<a href='#'><li>" + rawFedDogsValue.selectedUser + " <img height=16 width=16 class='arrow_right' src='../src/img/arrowPink.svg'/></li></a>";

    for (var name in rawFedDogsValue.profiles) {
      if (name !== currentUser.name) {
        var item = document.createElement('li');
        item.className = "aside__list-item_small aside__list-item_small";
        item.innerHTML = "<a tabindex='-1' onclick='selectProfile(this)'>" + name + "</a>";
        profilesContainer.insertBefore(item, profilesContainer.childNodes[0]);
      }
    }
  }
}

function selectProfile(id) {
  setCurrentUser(id.innerHTML);
  renderProfiles();
}

function deleteUser() {
  var rawFedDogsValue = getRawFedDogsObject();
  if (rawFedDogsValue && rawFedDogsValue.profiles) {
    var selectedUser = rawFedDogsValue.selectedUser;
    if (selectedUser) {
      if (rawFedDogsValue.profiles[selectedUser]) {
        delete rawFedDogsValue.profiles[selectedUser];

        if (Object.keys(rawFedDogsValue.profiles).length) {
          rawFedDogsValue.selectedUser = Object.keys(rawFedDogsValue.profiles)[0];
          setCookie('rawFedDogs', JSON.stringify(rawFedDogsValue));
          window.location.replace("../results/sharik.html");
        } else {
          setCookie('rawFedDogs', JSON.stringify(rawFedDogsValue));
          window.location.replace("../start/start.html");
        }
      }
    }
  }
}

function imperialUnitOnClickListener(td) {
  (document.querySelector('.body__table-metric_item-active')).classList.remove('body__table-metric_item-active');
  td.classList.add('body__table-metric_item-active');

  currentUnit.unit = 1;
  currentUnit.majorUnit = "lbs";
  currentUnit.minorUnit = "oz";

  calculateMeal(currentIndex);
}

function metricUnitOnClickListener(td) {
  (document.querySelector('.body__table-metric_item-active')).classList.remove('body__table-metric_item-active');
  td.classList.add('body__table-metric_item-active');

  currentUnit.unit = 0;
  currentUnit.majorUnit = "kg";
  currentUnit.minorUnit = "g";

  calculateMeal(currentIndex);
}

///////////////////////
//   profile
///////////////////////

function renderDogProfile() {
  document.querySelector('.body__table-metric_item-active').classList.remove('body__table-metric_item-active');

  var dogWeight = userProfile.weight;

  if (currentUnitProfile) {
    // imperial
    dogWeight /= 28.3495;
    var weightMajor = Math.floor(dogWeight / 16);
    var weightMinor = +((dogWeight / 16 - weightMajor) * 16).toFixed(1);
    if (weightMajor) {
      document.getElementById("profile-weight").innerHTML = weightMajor + " lbs ";
    }
    if (weightMinor) {
      document.getElementById("profile-weight").innerHTML += weightMinor + " oz";
    }
    document.getElementById('imperial-unit-button').classList.add('body__table-metric_item-active');
  } else {
    // metric
    var weightMajor = Math.floor(dogWeight / 1000);
    var weightMinor = Math.round(dogWeight % 1000);
    if (weightMajor) {
      document.getElementById("profile-weight").innerHTML = weightMajor + " kg ";
    }
    if (weightMinor) {
      document.getElementById("profile-weight").innerHTML += weightMinor + " g";
    }
    document.getElementById('metric-unit-button').classList.add('body__table-metric_item-active');
  }

  document.getElementById("profile-name").innerHTML = userProfile.name;
  document.getElementById("profile-meal-ratio").innerHTML = userProfile.meat + "/" + userProfile.bones + "/" + userProfile.organ1 + "/" + userProfile.organ2;
  document.getElementById("profile-weight-ratio").innerHTML = userProfile.ratio + " %";
}

function renderProfileEditor() {
  document.querySelector('.body__table-metric_item-active').classList.remove('body__table-metric_item-active');

  var dogWeight = userProfile.weight;

  if (currentUnitProfile) {
    // imperial
    dogWeight /= 28.3495;
    var weightMajor = Math.floor(dogWeight / 16);
    var weightMinor = +((dogWeight / 16 - weightMajor) * 16).toFixed(1);
    document.getElementById('imperial-unit-button').classList.add('body__table-metric_item-active');
    document.getElementById("major-unit").innerHTML = " lbs ";
    document.getElementById("minor-unit").innerHTML = " oz";
  } else {
    // metric
    var weightMajor = Math.floor(dogWeight / 1000);
    var weightMinor = Math.round(dogWeight % 1000);
    document.getElementById('metric-unit-button').classList.add('body__table-metric_item-active');
    document.getElementById("major-unit").innerHTML = " kg ";
    document.getElementById("minor-unit").innerHTML = " g";
  }

  document.getElementById("major-weight").value = weightMajor;
  document.getElementById("minor-weight").value = weightMinor;

  document.getElementById("dog-name").value = userProfile.name;
  document.getElementById("meat-ratio").value = userProfile.meat;
  document.getElementById("bones-ratio").value = userProfile.bones;
  document.getElementById("organ1-ratio").value = userProfile.organ1;
  document.getElementById("organ2-ratio").value = userProfile.organ2;
  document.getElementById("weight-ratio").value = userProfile.ratio;
}

function updateUser() {
  var rawFedDogsValue = getRawFedDogsObject();
  if (rawFedDogsValue && rawFedDogsValue.profiles) {
    var selectedUser = rawFedDogsValue.selectedUser;
    if (selectedUser) {
      if (rawFedDogsValue.profiles[selectedUser]) {
        rawFedDogsValue.profiles[selectedUser].meat = document.getElementById("meat-ratio").value;
        rawFedDogsValue.profiles[selectedUser].bones = document.getElementById("bones-ratio").value;
        rawFedDogsValue.profiles[selectedUser].organ1 = document.getElementById("organ1-ratio").value;
        rawFedDogsValue.profiles[selectedUser].organ2 = document.getElementById("organ2-ratio").value;
        rawFedDogsValue.profiles[selectedUser].ratio = document.getElementById("weight-ratio").value;

        var weightMajor = document.getElementById("major-weight").value;
        var weightMinor = document.getElementById("minor-weight").value;

        var dogWeight;

        if (currentUnitProfile) {
          dogWeight = +weightMajor * 16 + +weightMinor;
          dogWeight *= 28.3495;
        } else {
          dogWeight = +weightMajor * 1000 + +weightMinor;
        }

        rawFedDogsValue.profiles[selectedUser].weight = dogWeight;

        if (rawFedDogsValue.profiles[selectedUser].name !== document.getElementById("dog-name").value) {
          rawFedDogsValue.profiles[selectedUser].name = document.getElementById("dog-name").value;
          rawFedDogsValue.selectedUser = document.getElementById("dog-name").value;
          rawFedDogsValue.profiles[document.getElementById("dog-name").value] = rawFedDogsValue.profiles[selectedUser];
          delete rawFedDogsValue.profiles[selectedUser];
        }
        setCookie('rawFedDogs', JSON.stringify(rawFedDogsValue));
      }
    }
  }
}

function cancelProfileEditing() {
  window.location.replace("../results/profile.html");
}

var userProfile = getCurrentUser();
var currentUnitProfile = userProfile.unit;

function imperialUnitProfileOnClickListener(td) {
  currentUnitProfile = 1;
  renderDogProfile();
}

function metricUnitProfileOnClickListener(td) {
  currentUnitProfile = 0;
  renderDogProfile();
}

function imperialUnitProfileEditorOnClickListener(td) {
  currentUnitProfile = 1;
  renderProfileEditor();
}

function metricUnitProfileEditorOnClickListener(td) {
  currentUnitProfile = 0;
  renderProfileEditor();
}






function check() {
  var str = "   ";

  for (var i = 0, len = str.length; i < len; i++) {
    alert(str[i]);
  }
}
