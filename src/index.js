import tz from "tz-lookup";
import moment from "moment-timezone";

async function timeZone(city) {
  console.log("api called");
  let response = await fetch(
    `https://nominatim.openstreetmap.org/?addressdetails=1&q=${city}&format=json&limit=1`
  );
  let data = await response.json();
  let timeZone = tz(data[0].lat, data[0].lon);
  let time = moment.tz(new Date(), timeZone).format();
  // console.log("moment", moment.tz(new Date(), timeZone));
  return time;
}

const btn = document.getElementById("tz");

btn.addEventListener("click", async function () {
  // setTimeout(function () {
  console.log("button clicked");
  const city1 = document.getElementById("city1").value;
  const city2 = document.getElementById("city2").value;
  if (city1 === "" || city2 === "") {
    alert("Name of places can not be empty");
    return false;
  }
  let t1 = await timeZone(city1);
  let t2 = await timeZone(city2);
  console.log("t1 is" + t1 + " " + "t2 is" + t2);

  const diffHrs = Math.abs(t1.charAt(t1.length - 4) - t2.charAt(t2.length - 4));
  console.log("diffHrs", diffHrs);
  const diffmins = Math.abs(
    (t1.slice(-2) == "" ? 0 : t1.slice(-2)) -
      (t2.slice(-2) == "" ? 0 : t2.slice(-2))
  );

  const output = document.getElementById("diff");
  output.style.display = "flex";

  output.innerText = `The difference between time zones of above places is: ${diffHrs} : ${diffmins} Hrs`;
  // }, 100);
});
