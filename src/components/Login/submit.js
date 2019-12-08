import axios from 'axios';
import { browserHistory } from "react-router"

var apiURL = "https://swapi.co/api/people";
export var loginSuccess = false;
export var loginStatus = false;
import user1 from "./SubmitValidationForm"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


function submit(values, state) {
  return sleep(1000).then(() => { // simulate server latency
    apiURL = `https://swapi.co/api/planets/?search=${values.username}`;
    loginStatus = true;
    user1.isWaiting = true;
    getDetail(values);

    function getDetail(userData) {
      axios.get(apiURL).then(function (response) {
        showDetail(response.data, userData);
      });
    }

    function showDetail(data, userData) {
      var nameArray = [];
      for (var i = 0; i < data.results.length; i++) {
        nameArray.push(data.results[i].name);
      }
      if (nameArray.includes(userData.username)) {
        var namePos = nameArray.indexOf(userData.username);
        if (data.results[namePos].birth_year === userData.password) {
          loginSuccess = true;
          loginStatus = false;
          user1.isWaiting = false;
          browserHistory.push('/search')
          return;
        }
        else {
          loginSuccess = false;
          loginStatus = false;
          user1.isWaiting = false;
          window.alert("Wrong Password")
          window.alert(loginStatus)
          return;
        }


      }
      else {
        apiURL = data.next;
        if (apiURL != null) {
          getDetail(userData);
        }
        else {
          loginSuccess = false;
          loginStatus = false;
          window.alert('Wrong Username!! Please Check And Try Again');
          return;
        }

      }
    }
  });
}
export default submit;