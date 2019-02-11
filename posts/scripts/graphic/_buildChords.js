
function buildChords(y) {

    states=statesGrouped[y].values;

    states.sort(function (a,b) {
        //Descending Sort
        if (a.death_rate > b.death_rate) return -1;
        else if (a.death_rate < b.death_rate) return 1;
        else return 0;
    });

    drate_states=states.slice(0,topStateCount);

    states.sort(function (a,b) {
        //Descending Sort
        if (a.unemployment_rate > b.unemployment_rate) return -1;
        else if (a.unemployment_rate < b.unemployment_rate) return 1;
        else return 0;
    });

    unemp_states=states.slice(0,topStateCount);

    var drate_matrix = [],
        unemp_matrix = [];

    d_buf_indexByName=d_indexByName;
    u_buf_indexByName=u_indexByName;

    d_indexByName=[];
    d_nameByIndex=[];
    u_indexByName=[];
    u_nameByIndex=[];
    n = 0;

    // Compute a unique index for each package name, creat rank index for each year as it updates
    totalDrates=0;
    drate_states.forEach(function(d) {
        totalDrates+= Number(d.death_rate);
        d = d.State;
        if (!(d in d_indexByName)) {
            d_nameByIndex[n] = d;
            d_indexByName[d] = n++;
        }
    });

    drate_states.forEach(function(d) {
        var source = d_indexByName[d.State],
            row = drate_matrix[source];
        if (!row) {
            row = drate_matrix[source] = [];
            for (var i = -1; ++i < n;) row[i] = 0;
        }
        row[d_indexByName[d.State]]= d.death_rate;
    });

    // Compute a unique index for each country name.
    n=0;
    totalUnemps=0;
    unemp_states.forEach(function(d) {
        totalUnemps+= Number(d.unemployment_rate);
        d = d.State;
        if (!(d in u_indexByName)) {
            u_nameByIndex[n] = d;
            u_indexByName[d] = n++;
        }
    });

    unemp_states.forEach(function(d) {
        var source = u_indexByName[d.State],
            row = unemp_matrix[source];
        if (!row) {
            row = unemp_matrix[source] = [];
            for (var i = -1; ++i < n;) row[i] = 0;
        }
        row[u_indexByName[d.State]]= d.unemployment_rate;
    });

    var drateRange=angleRange*(totalDrates/(totalDrates + totalUnemps));
    var unempRange=angleRange*(totalUnemps/(totalDrates + totalUnemps));
    drate_chord.startAngle(-(drateRange/2)) //2
        .endAngle((drateRange/2));

    unemp_chord.startAngle(180-(unempRange/2))
        .endAngle(180+(unempRange/2));

    unemp_chord.matrix(unemp_matrix);
    drate_chord.matrix(drate_matrix);

    var ds_groups = drate_chord.groups();
    var ds_chords = drate_chord.chords();
    ds_groups.sort(function(a,b) { return a.index - b.index; });
    ds_chords.sort(function(a,b) { return a.source.index - b.source.index; });
    for (var i=0; i < ds_groups.length; i++) {
        var d={}
        var g=ds_groups[i];
        var c=ds_chords[i];
        d.index=i;
        d.angle= (g.startAngle + g.endAngle) / 2;  //2
        d.label = d_nameByIndex[g.index];
        d.deathrates= c.source.value;

        // create a new object instead of overwriting
        // overwriting changes the data bound to d3 objects, which is not what
        // we want
        d_labels[i] = {};
        d_labels[i].angle = d.angle;
        d_labels[i].label = d.label;
        d_labels[i].index = i;
        d_labels[i].deathrates = d.deathrates;

        d_chords[i] = {};
        d_chords[i].index = i;
        d_chords[i].label = d.label;
        d_chords[i].source = c.source;
        d_chords[i].target = c.target;
        d_chords[i].deathrates = d.deathrates;
    }

    var us_groups = unemp_chord.groups();
    var us_chords = unemp_chord.chords();
    us_groups.sort(function(a,b) { return a.index - b.index; });
    us_chords.sort(function(a,b) { return a.source.index - b.source.index; });
    for (var i=0; i < us_groups.length; i++) {
        var d={}
        var g=unemp_chord.groups()[i];
        var c=unemp_chord.chords()[i];
        d.index=i;
        d.angle= (g.startAngle + g.endAngle) / 2; //2
        d.label = u_nameByIndex[g.index];
        d.unemployment_rates = c.source.value;

        // create a new object instead of overwriting
        // overwriting changes the data bound to d3 objects, which is not what
        // we want
        u_labels[i] = {};
        u_labels[i].angle = d.angle;
        u_labels[i].label = d.label;
        u_labels[i].unemployment_rates = d.unemployment_rates;
        u_labels[i].index = i;

        u_chords[i] = {};
        u_chords[i].index = i;
        u_chords[i].label = d.label;
        u_chords[i].source = c.source;
        u_chords[i].target = c.target;
        u_chords[i].unemployment_rates = d.unemployment_rates;
    }

    function getFirstIndex(index,indexes) {
        for (var i=0; i < topStateCount; i++) {
            var found=false;
            for (var y=index; y < indexes.length; y++) {
                if (i==indexes[y]) {
                    found=true;
                }
            }
            if (found==false) {
                return i;
                //  break;
            }
        }
             console.log("no available indexes");
    }

    function getLabelIndex(name) {
        for (var i=0; i < topStateCount; i++) {
            if (d_buffer[i].label==name) {
                return i;
                //   break;
            }
        }
        return -1;
    }


}
