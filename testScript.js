

// let clickable = document.getElementsByClassName("click")[0];

// clickable.addEventListener('click', theFunction);
window.addEventListener('load', requestSnowfallData);
//document.onload(requestSnowfallData);

let httpRequest;

function requestSnowfallData() {
    httpRequest = new XMLHttpRequest();

    // httpRequest.onreadystatechange = parseGetResponse;

   // httpRequest.open('GET', '/test', true);
   // httpRequest.send();
}


let snowData;

snowData = {"solitudeToDate": "168",
    "brightonToDate": "192",
    "altaToDate": "194",
    "snowbirdToDate": "174",
    "brightonBase": "78",
    "solitudeBase": "68",
    "snowbirdBase": "74",
    "altaBase": "82",
    "brightonOvernight": "8",
    "solitudeOvernight": "6",
    "snowbirdOvernight": "7",
    "altaOvernight": "9",
    "brighton24Hours": "17",
    "solitude24Hours": "14",
    "snowbird24Hours": "13",
    "alta24Hours": "17"
};


parseGetResponse();

function parseGetResponse(){
    parseSnowData(snowData);
    renderChart();
    appendSnowfallDataToDom();
}

// function parseGetResponse(){
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//         if (httpRequest.status === 200) {
//             console.log("200, success");
//             //console.log("text: " + httpRequest.responseText);
//             //snowData = JSON.parse(httpRequest.responseText);
//             //snowDataKeys = Object.keys(snowData);
//             // snowDataValues = Object.values(snowData);
//             // console.log("parsed: " + snowDataKeys[2] + ": " + snowDataValues[2]);
//             parseSnowData(snowData);
//             renderChart();
//             appendSnowfallDataToDom();
//         } else {
//             console.log("err");
//         }
//     }
// }

let base = document.getElementById('base');
let overnight = document.getElementById('overnight');
let day = document.getElementById('24hour');

base.addEventListener("click", renderChart);
overnight.addEventListener("click", renderOvernight);
day.addEventListener("click", renderDay);

function parseSnowData(snowDataJson){
    // iterate through all key value pairs
    for (let key in snowDataJson) {
        // console.log("f: " + key);
        // some 0" snowfall is recorded as "" and stored that way in the mongodb
        // correct it to "0" to render with apex charts
        if (snowDataJson[key] == ""){
           snowData[key] = "0";
        }
        // console.log("f2: " + snowDataJson[key]);
    }
    //brighton24Hours = Object.values(snowDataJson)[3];
    //solitude24Hours = Object.values(snowDataJson)[8];
}


function renderChart() {
    var options = {
        series: [{
            name: 'YTD Snowfall',
            data: [snowData["brightonToDate"], snowData["solitudeToDate"], snowData["snowbirdToDate"], snowData["altaToDate"]]
        }, {
            name: 'Current Base Total',
            data: [snowData["brightonBase"], snowData["solitudeBase"], snowData["snowbirdBase"], snowData["altaBase"]]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Brighton', 'Solitude', 'Snowbird', "Alta"],
        },
        yaxis: {
            title: {
                text: 'Snowfall (Inches)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " Inches"
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}


function renderOvernight() {
    var options = {
        series: [{
            name: 'Overnight Snowfall',
            data: [snowData["brightonOvernight"], snowData["solitudeOvernight"], snowData["snowbirdOvernight"], snowData["altaOvernight"]]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Brighton', 'Solitude', 'Snowbird', "Alta"],
        },
        yaxis: {
            title: {
                text: 'Snowfall (Inches)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " Inches"
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}



function renderDay() {
    var options = {
        series: [{
            name: '24 Hour Snowfall',
            data: [snowData["brighton24Hours"], snowData["solitude24Hours"], snowData["snowbird24Hours"], snowData["alta24Hours"]]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Brighton', 'Solitude', 'Snowbird', "Alta"],
        },
        yaxis: {
            title: {
                text: 'Snowfall (Inches)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " Inches"
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

// append the json snowfall data to matching html elements by id == json key
function appendSnowfallDataToDom(){
    for (let key in snowData) {
        let append = document.getElementById(key);
        let textNode = document.createTextNode("" + snowData[key] + "\"");
        let br = document.createElement("br");
        if (append != null) {
            append.appendChild(br);
            append.appendChild(textNode);
        }
    }
}