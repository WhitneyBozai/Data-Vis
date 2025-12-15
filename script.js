// load data from json file
async function loadData() {
    const response = await fetch('./data.json');
    const data = await response.json();
// return formatted data for chart
    return {
        labels: data.nationalities,
        values: data.numbers
    };
}

// create and render the chart
async function createChart() {
    const { labels, values } = await loadData();
// get canvas element and 2d context
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

     // define colors for each bar
    const barColors = [
        "#FF6F91", "#FF9671", "#FFC75F", "#F9F871",
        "#7AE582", "#4D96FF", "#9A6AFF", "#E161FF",
        "#6A0572", "#FF9A8B", "#88E1F2", "#7FDEFF",
        "#A0FFB0", "#FFB3BA", "#B5B9FF", "#C5FFFD",
        "#FFD6FF", "#D5AAFF", "#7F7CFF", "#6FA8DC"
    ];

// custom plugin to draw gradient background
    const backgroundPlugin = {
        id: "customBackground",
        beforeDraw(chart, args, options) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;
// create vertical gradient
            const bgGradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            bgGradient.addColorStop(0, "rgba(240, 250, 255, 1)");
            bgGradient.addColorStop(1, "rgba(220, 230, 255, 1)");
// draw background rectangle
            ctx.save();
            ctx.fillStyle = bgGradient;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
            ctx.restore();
        }
    };

    // CLICK EVENT
    function handleBarClick(evt, elements, chart) {
        // return if no bar is clicked
        if (elements.length === 0) return;
        // get index of clicked bar
        const index = elements[0].index;
        // get related data
        const nationality = labels[index];
        const number = values[index];
// show alert with information
        alert(`🎨 Nationality: ${nationality}\n👥 Number of Artists: ${number}`);
    }
// create chart instance
    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: 'The Number of Artists',
                data: values,

                // assign different colors to bars
                backgroundColor: barColors.slice(0, values.length),
                borderColor: "#ffffff",
                borderWidth: 1,
// style on hover
                hoverBackgroundColor: "white",
                hoverBorderColor: "#333",
                hoverBorderWidth: 2
            }]
        },
        options: {
            // click event listener
            onClick: (evt, elements) =>
                handleBarClick(evt, elements, ctx.chart),

            plugins: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'The Number of Various International Artists '
                },
                tooltip: {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    padding: 10
                }
            },
            // x axis grid style
            scales: {
                x: {
                    grid: { color: "rgba(0,0,0,0.1)" }
                },
                // y axis grid style and baseline
                y: {
                    grid: { color: "rgba(0,0,0,0.1)" },
                    beginAtZero: true
                }
            }
        },
        // register custom background plugin
        plugins: [backgroundPlugin]
    });
}
// initialize chart
createChart();
