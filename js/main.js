function onLoad(){
    let vData = CSVtoJson();
    vData.forEach((value) =>{
        document.getElementById("virusData").innerHTML += `<tr><td>${value.country}</td><td>${value.newCases}</td><td>${value.activeCases}</td><td>${value.totalRecovered}</td><td>${value.totalDeath}</td><td>${value.totalCases}</td></tr>`;
    });
}

function CSVtoJson(){
    var lines=dataCases.split("\n");  
    var result = [];

    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline = CSVtoArray(lines[i]);
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
    }
  
    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
  }

function CSVtoArray(text) {
    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;

    var a = []; // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
        function(m0, m1, m2, m3) {

            // Remove backslash from \' in single quoted values.
            if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));

            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return ''; // Return empty string.
        });

    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
};
