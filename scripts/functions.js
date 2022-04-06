function apiRequest(endpoint, data={}, asyncStat=true){
    let host = 'https://api-lok-live.leagueofkingdoms.com/api';
    let accessToken = document.getElementById("x-access-token").value;
    let result = $.ajax({
        type: "POST",
        url: host + endpoint,
        data: JSON.stringify(data),
        async: asyncStat,
        headers: {"Content-Type": "application/json", "x-access-token": accessToken},
        success: function (result) {
            console.log(result);
        },
        error: function (result, status) {
            console.log(result);
        }
    });
    if (!asyncStat)	return JSON.parse(result.responseText);	
};

function getFieldTroops(){
    deleteRows()
    let tBodyRef = document.getElementById('table2').getElementsByTagName('tbody')[0];
    data = {};
    let result = apiRequest('/kingdom/profile/troops', data, false);
    result = result.troops.field;
    result.forEach(element => {
        let button = document.createElement('button');
        button.innerText = "Recall Troops";
        button.id = 'recall';
        button.onclick = recallTroops;
        button.value = element._id;
        let res = [[element.toLoc[1],element.toLoc[2]] , element._id, element.endTime.substr(11, 8), button];
        let row = document.createElement('tr');
        Object.values(res).forEach(text => {
            let cell = document.createElement('td');
            cell.append(text);
            row.appendChild(cell);
        })
        tBodyRef.appendChild(row);		
    });
};

function recallTroops(){
	var moID = $(this).val();
	data = {"kingdomId":"","moId":moID};
    var result = apiRequest('/field/march/return', data, false);
	//table2.deleteRow($(this).closest("tr").index()+1)
    if (result["result"] == false) $(this).closest("tr").append(result["err"]["code"]);
	else $(this).closest("tr").append(result["result"]);
}

function deleteRows() {
    var rowCount = table2.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table2.deleteRow(i);
    };
};