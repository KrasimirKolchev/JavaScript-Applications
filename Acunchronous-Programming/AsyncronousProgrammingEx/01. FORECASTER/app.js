import {fetchData} from "./data.js";

function attachEvents() {
    const html = {
        location: () => document.getElementById('location'),
        current: () => document.getElementById('current'),
        upcoming: () => document.getElementById('upcoming'),
        forecast: () => document.getElementById('forecast'),
        currentLabel: () => document.querySelector('#current div')
    };
    const weatherSymbol = {
        'sunny': "☀",
        'partly sunny': "⛅",
        'overcast': "☁",
        'rain': "☂",
        'degrees': "°"
    };

    document.getElementById('submit').addEventListener('click', function () {
        let location = html.location().value;

        weather().getLocations()
            .then((locations) => {
                const { name, code } = locations.find((l) => l.name === location);
                return Promise.all([
                    weather().getToday(code),
                    weather().getUpcoming(code)
                ]);
            })
            .then(([today, upcoming]) => {
                clearForecasts();
                html.forecast().style.display = 'block';
                html.currentLabel().textContent = 'Current conditions';
                showToday(today);
                showUpcoming(upcoming);
            })
            .catch(err => {
                clearForecasts();
                html.forecast().style.display = 'block';
                html.currentLabel().textContent = `Error: Missing/Wrong City`;
            });
    });

    function clearForecasts() {
        let el1 = Array.from(html.current().getElementsByTagName('div'))[1];
        if (typeof el1 !== 'undefined') {
            el1.remove();
        }

        let el2 = Array.from(html.upcoming().getElementsByTagName('div'))[1];
        if (typeof el2 !== 'undefined') {
            el2.remove();
        }
    }

    function showUpcoming(forecasts) {
        let div = creator('div', 'forecast-info');
        Object.values(forecasts.forecast).forEach(f => {
            let spanUp = creator('span', 'upcoming');
            let spanSy = creator('span', 'symbol');
            spanSy.textContent = weatherSymbol[f.condition.toLocaleLowerCase()];
            spanUp.appendChild(spanSy);

            let spanData = creator('span', 'forecast-data');
            spanData.textContent = `${f.low}${weatherSymbol.degrees}/${f.high}${weatherSymbol.degrees}`;
            spanUp.appendChild(spanData);

            let spanCond = creator('span', 'forecast-data');
            spanCond.textContent = f.condition;
            spanUp.appendChild(spanCond);
            div.appendChild(spanUp);
        });
        html.upcoming().appendChild(div);
    }

    function showToday(forecast) {
        let div = creator('div', 'forecasts');
        let spanSymbol = creator('span', 'condition symbol');
        spanSymbol.textContent = weatherSymbol[forecast.forecast.condition.toLocaleLowerCase()];
        div.appendChild(spanSymbol);
        let spanCond = creator('span', 'condition');
        let spanLocation = creator('span', "forecast-data");
        spanLocation.textContent = forecast.name;
        spanCond.appendChild(spanLocation);

        let spanTemp = creator('span', "forecast-data");
        spanTemp.textContent = `${forecast.forecast.low}${weatherSymbol.degrees}/${forecast.forecast.high}${weatherSymbol.degrees}`;
        spanCond.appendChild(spanTemp);

        let span = creator('span', "forecast-data");
        span.textContent = forecast.forecast.condition;
        spanCond.appendChild(span);

        div.appendChild(spanCond);
        html.current().appendChild(div);
    }

    function weather() {
        const root = 'https://judgetests.firebaseio.com/';
        const makeUrl = x => `${root}${x}/.json`;

        return {
            getLocations: () => fetchData(undefined, undefined, makeUrl("locations")),
            getToday: cityCode => fetchData(undefined, undefined, makeUrl(`forecast/today/${cityCode}`)),
            getUpcoming: cityCode => fetchData(undefined, undefined, makeUrl(`forecast/upcoming/${cityCode}`))
        };
    }

    html.location().value = "";

    function creator(el, name) {
        let node = document.createElement(el);
        node.classList = name;

        return node;
    }
}

attachEvents();