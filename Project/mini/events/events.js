const holidays = [{
        hdate: "01-05-2024",
        holiday: "May Day",
        link: "https://www.google.com"
    },
    {
        hdate: "01-05-2024",
        holiday: "Some Day",
        link: "https://www.google.com"
    }

];
const calendar = document.querySelector("#calendar");
const monthBanner = document.querySelector("#month");
let navigation = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function loadCalendar() {
    const dt = new Date();

    if (navigation != 0) {
        dt.setMonth(new Date().getMonth() + navigation);
    }
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;
    calendar.innerHTML = "";
    const dayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const dateText = firstDayofMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    const dayString = dateText.split(", ")[0];
    const emptyDays = weekdays.indexOf(dayString);

    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");
        const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
        const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
        const dateText = `${dateVal}-${monthVal}-${year}`;
        if (i > emptyDays) {
            dayBox.innerText = i - emptyDays;
            //Event Day
            const eventOfTheDay = events.find((e) => e.date == dateText);
            //Holiday
            const holidayOfTheDay = holidays.find((e) => e.hdate == dateText);

            if (i - emptyDays === day && navigation == 0) {
                dayBox.id = "currentDay";
            }

            if (eventOfTheDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerText = eventOfTheDay.title;
                dayBox.appendChild(eventDiv);
            }
            if (holidayOfTheDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.classList.add("holiday");
                eventDiv.innerText = holidayOfTheDay.holiday;
                var createA = document.createElement('a');
                createA.setAttribute('href', holidayOfTheDay.link);
                eventDiv.appendChild(createA);
                dayBox.appendChild(eventDiv);
            }

            dayBox.addEventListener("click", () => {
                showModal(dateText);
            });
        } else {
            dayBox.classList.add("plain");
        }
        calendar.append(dayBox);
    }
}

function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");
    const btnDelete = document.querySelector("#btnDelete");
    const btnSave = document.querySelector("#btnSave");
    const closeButtons = document.querySelectorAll(".btnClose");
    const txtTitle = document.querySelector("#txtTitle");

    btnBack.addEventListener("click", () => {
        navigation--;
        loadCalendar();
    });
    btnNext.addEventListener("click", () => {
        navigation++;
        loadCalendar();
    });
    modal.addEventListener("click", closeModal);
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", closeModal);
    });
    btnDelete.addEventListener("click", function() {
        events = events.filter((e) => e.date !== clicked);
        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
    });

    btnSave.addEventListener("click", function() {
        if (txtTitle.value) {
            txtTitle.classList.remove("error");
            events.push({
                date: clicked,
                title: txtTitle.value.trim(),
            });
            txtTitle.value = "";
            localStorage.setItem("events", JSON.stringify(events));
            closeModal();
        } else {
            txtTitle.classList.add("error");
        }
    });
}

const modal = document.querySelector("#modal");
const viewEventForm = document.querySelector("#viewEvent");
const addEventForm = document.querySelector("#addEvent");


function showModal(dateText) {
    clicked = dateText;
    const eventList = []
    holidays.forEach(x => {
        if (x.hdate == dateText) {
            eventList.push({ name: x.holiday, link: x.link })
        }
    })

    console.log(eventList)
    removeusingSet(eventList)
    console.log(eventList)
    if (eventList.length > 0) {

        var eventText = document.querySelector("#eventText")
        eventText.classList.add("event");
        eventList.forEach(x => {
            var eventSpan = document.createElement('a');
            eventSpan.classList.add("link")
            eventSpan.setAttribute('href', x.link);
            eventSpan.textContent = x.name;
            eventText.appendChild(eventSpan);
        })
        viewEventForm.style.display = "block";
    }
    modal.style.display = "block";
}

function removeElements(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
    }
}

function removeusingSet(arr) {
    let outputArray = Array.from(new Set(arr))
    return outputArray
}
//Close Modal
function closeModal() {

    viewEventForm.style.display = "none";
    addEventForm.style.display = "none";
    modal.style.display = "none";
    clicked = null;
    loadCalendar();
}

buttons();
loadCalendar();

/*
1. Add Event     
3. Update Local Storage
*/