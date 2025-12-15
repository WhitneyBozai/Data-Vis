async function loadData() {
    const response = await fetch('./data.json');
    const data = await response.json();

    return {
        labels: data.nationalities,
        values: data.numbers
    };
}

async function createChart() {
    const { labels, values } = await loadData();

    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    // 🎨 COLORS FOR EACH BAR
    const barColors = [
        "#FF6F91", "#FF9671", "#FFC75F", "#F9F871",
        "#7AE582", "#4D96FF", "#9A6AFF", "#E161FF",
        "#6A0572", "#FF9A8B", "#88E1F2", "#7FDEFF",
        "#A0FFB0", "#FFB3BA", "#B5B9FF", "#C5FFFD",
        "#FFD6FF", "#D5AAFF", "#7F7CFF", "#6FA8DC"
    ];

    // BACKGROUND PLUGIN
    const backgroundPlugin = {
        id: "customBackground",
        beforeDraw(chart, args, options) {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;

            const bgGradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            bgGradient.addColorStop(0, "rgba(240, 250, 255, 1)");
            bgGradient.addColorStop(1, "rgba(220, 230, 255, 1)");

            ctx.save();
            ctx.fillStyle = bgGradient;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
            ctx.restore();
        }
    };

    // CLICK EVENT
    function handleBarClick(evt, elements, chart) {
        if (elements.length === 0) return;
        const index = elements[0].index;

        const nationality = labels[index];
        const number = values[index];

        alert(`🎨 Nationality: ${nationality}\n👥 Number of Artists: ${number}`);
    }

    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: 'The Number of Artists',
                data: values,

                //  use different colors
                backgroundColor: barColors.slice(0, values.length),
                borderColor: "#ffffff",
                borderWidth: 1,

                hoverBackgroundColor: "white",
                hoverBorderColor: "#333",
                hoverBorderWidth: 2
            }]
        },
        options: {
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
            scales: {
                x: {
                    grid: { color: "rgba(0,0,0,0.1)" }
                },
                y: {
                    grid: { color: "rgba(0,0,0,0.1)" },
                    beginAtZero: true
                }
            }
        },
        plugins: [backgroundPlugin]
    });
}

createChart();
