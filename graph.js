
//Step1 ==> Fetch the data from CSV
const getData = async () => {
    const xlabel = [];
    const ylabel = [];

    const response = await fetch('ZonAnn.Ts+dSST.csv');  //Fetch the csv data
    const data = await response.text(); // Change the csv form into text form
    
    let table = data.split('\n').slice(1); // the changed text data form into array form with split
    console.log(table);
    
    // put each data into cols array
    table.forEach( row => {
        let cols = row.split(','),
        year = cols[0],
        temp = cols[1];
        xlabel.push(year);
        ylabel.push(parseFloat(temp) + 14);

    })
   
    return {xlabel,ylabel}
}

//Step2 ==> Make the graph when the data fetching is done
async function makeChart(){
    const {xlabel,ylabel} = await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabel,
            datasets: [{
                label: 'Average Global Temperature in C',
                data: ylabel,
                fill:false,
                backgroundColor: [
                    'red',
                    
                ],
                borderColor: [
                        'grey'
                    
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return value + '°';
                        }
                    }
                }
            }
        }
    });
}

makeChart();