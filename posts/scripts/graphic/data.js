

function fetchData() {
    d3.csv("drate_unemp_merged.csv", function(csv) {

        var normalized=[];

        for (var i=0; i < csv.length; i++)  {
            var row=csv[i];

            for (var y=0; y < 1; y++) { //was 11 but keep it at 1 for correct display, it loops thru the year only once
              //if months are included, do y<12 or something
                row.year= +row.year,
                row.death_rate = +row.death_rate,
                row.unemployment_rate= +row.unemployment_rate,
                row.US_death_rate = +row.US_death_rate,
                row.US_unemployment_rate = +row.US_unemployment_rate,
                normalized.push(row);

            }
        }

        statesGrouped = d3.nest()
            .key(function(d) { return d.year; })
            .entries(normalized);

        //get death rate and unemploytment for each year

        // grouped by length of years, year counter starts at 0
        for (var y=0; y < statesGrouped.length; y++) {
            var yearGroup=statesGrouped[y];

            numDeath =  Number(yearGroup.values[0].US_death_rate); //national death rate for that year
            numUnemp = Number(yearGroup.values[0].US_unemployment_rate); //national unemployment rate for that year
            yearlyDeaths.push(numDeath);
            yearlyUnemp.push(numUnemp);
          }
            //for (var c=0; c < yearGroup.values.length; c++) {
              //   var state=yearGroup.values[c];
                 //numDeath =  Number(state[0].US_death_rate); //national death rate for that year
                 //numUnemp = Number(state[0].US_unemployment_rate); //national unemployment rate for that year

                //}

          //yearlyDeaths.push(numDeath);
          //yearlyUnemp.push(numUnemp);
          console.log(yearlyDeaths);



        //Start running
        run();
        refreshIntervalId = setInterval(run, delay);
        // run();

    });

}
