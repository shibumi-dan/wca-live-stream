export function SendResults(player1, player2) {
    
    const data = {
          "model": {
            "fields": [
                {
                    "defaultValue": "Player 1 Name",
                    "id": "p1Name",
                    "title": "Player 1 Name",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Score1",
                    "title": "Player 1 Score 1",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Score2",
                    "title": "Player 1 Score 2",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Score3",
                    "title": "Player 1 Score 3",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Score4",
                    "title": "Player 1 Score 4",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Score5",
                    "title": "Player 1 Score 5",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Count",
                    "title": "Player 1 DNF Count",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Remaining",
                    "title": "Player 1 Remaining Solves",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Mean",
                    "title": "Player 1 Mean",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Best",
                    "title": "Player 1 Best",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Average",
                    "title": "Player 1 Average",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p1Worst",
                    "title": "Player 1 Worst",
                    "type": "text"
                },
                {
                    "defaultValue": "Player 2 Name",
                    "id": "p2Name",
                    "title": "Player 2 Name",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Score1",
                    "title": "Player 2 Score 1",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Score2",
                    "title": "Player 2 Score 2",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Score3",
                    "title": "Player 2 Score 3",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Score4",
                    "title": "Player 2 Score 4",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Score5",
                    "title": "Player 2 Score 5",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Count",
                    "title": "Player 2 DNF Count",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Remaining",
                    "title": "Player 2 Remaining Solves",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Mean",
                    "title": "Player 2 Mean",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Best",
                    "title": "Player 2 Best",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Average",
                    "title": "Player 2 Average",
                    "type": "text"
                },
                {
                    "defaultValue": "",
                    "id": "p2Worst",
                    "title": "Player 2 Worst",
                    "type": "text"
                }
            ]
        },
        "payload": {...formatResults(player1, 1), ...formatResults(player2, 2)}
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };
      
      fetch("https://app.singular.live/apiv1/datanodes/4uEqIEL6YSbGZbF4JwL5ac/data", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => {
          console.log('error', error)
        });
    
}

function getResult(result) {
    if(result === undefined || result === null) return "";
    if(result.penalty < 0) return "DNF";
    if(result.result === null) return "";
    return Math.trunc(result.result * 100);
}


export function GetTimeBaseStation(index, callback){
    let ret = {};

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch(`https://api.timebase.live/ping/${index}`, requestOptions)
        .then(response => response.text())
        .then(result => callback(result))
        .catch(error => {
          console.log('error', error)
        });
}



function formatResults(player1, index) {
    const item = {}
    item[`p${index}Name`] = ""
    item[`p${index}Score1`] = ""
    item[`p${index}Score2`] = ""
    item[`p${index}Score3`] = ""
    item[`p${index}Score4`] = ""
    item[`p${index}Score5`] = ""
    item[`p${index}Count`] = ""
    item[`p${index}Remaining`] = ""
    item[`p${index}Mean`] = "--"
    item[`p${index}Best`] = "--"
    item[`p${index}Average`] = "--"
    item[`p${index}Worst`] = "--"

    if(player1 === null) return item

    const player1Results = [];
    player1Results.push(getResult(player1.current_results[0]));
    player1Results.push(getResult(player1.current_results[1]));
    player1Results.push(getResult(player1.current_results[2]));
    player1Results.push(getResult(player1.current_results[3]));
    player1Results.push(getResult(player1.current_results[4]));
    
    const dnCount = player1Results.filter(r=>r < 0).length;
    const solvesRemaining = player1Results.filter(r=>r === "").length;
    
    const eventId = player1.current_results[0] !== null && player1.current_results[0] !== undefined ? player1.current_results[0].event_id : "333";
    let avg = formatSeconds(average(player1Results));
    if(avg < 0 && solvesRemaining === 0) avg = "DNF";
    if(solvesRemaining > 0) avg = "--";
    
    let best = solvesRemaining === 1 ? formatSeconds(bestAverage(player1Results)) : "--";
    if(best < 0) best = "DNF";
    
    const worst = solvesRemaining === 1 ? formatSeconds(worstAverage(player1Results)) : "--";
    if(worst < 0) worst = "DNF";
    
    item[`p${index}Name`] = player1.name
    item[`p${index}Score1`] = player1Results[0] !== "" ? formatSeconds(player1Results[0]) : ""
    item[`p${index}Score2`] = player1Results[1] !== "" ? formatSeconds(player1Results[1]) : ""
    item[`p${index}Score3`] = player1Results[2] !== "" ? formatSeconds(player1Results[2]) : ""
    item[`p${index}Score4`] = player1Results[3] !== "" ? formatSeconds(player1Results[3]) : ""
    item[`p${index}Score5`] = player1Results[4] !== "" ? formatSeconds(player1Results[4]) : ""
    item[`p${index}Count`] = dnCount
    item[`p${index}Remaining`] = solvesRemaining
    item[`p${index}Mean`] = avg 
    item[`p${index}Best`] = best
    item[`p${index}Average`] = avg 
    item[`p${index}Worst`] = worst

    return item
}

function formatSeconds(time) {
    const seconds = time / 100
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    if(hours > 0){
      return `${String(hours)}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds.toFixed(2)).padStart(2, '0')}`;
    }
    if(minutes > 0 && remainingSeconds > 9){
      return `${String(minutes)}:${String(remainingSeconds.toFixed(2)).padStart(2, '0')}`;
    }
    if(minutes > 0 && remainingSeconds < 10){
      return `${String(minutes)}:0${String(remainingSeconds.toFixed(2))}`;
    }

    return `${String(remainingSeconds.toFixed(2))}`;
}

function average(results){
    if(results.filter(r=>r === "").length > 0) return "--"
    if(results.filter(r=>r === "DNF").length > 1) return -1

    const values = results.filter(r=>r !== "DNF")
    if(results.length != values.length){
        values.sort((a, b) => b - a);
        return (values.slice(0, 3).reduce((sum, current) => sum + current, 0)) / 3;
    } else {
        values.sort((a, b) => a - b);
        return (values.slice(1, 4).reduce((sum, current) => sum + current, 0)) / 3;
    }
}

function bestAverage(results){
    if(results.filter(r=>r !== "").length !== 4) return "--"
    if(results.filter(r=>r === "DNF").length > 1) return -1

    const values = results.filter(r=>r !== "DNF" && r!=="")
    values.push(0)
    
    values.sort((a, b) => a - b);
    return (values.slice(1, 4).reduce((sum, current) => sum + current, 0)) / 3;
    
}


function worstAverage(results){
    if(results.filter(r=>r !== "").length !== 4) return "--"
    if(results.filter(r=>r === "DNF").length > 0) return -1

    const values = results.filter(r=>r !== "DNF" && r!=="")
    
    values.sort((a, b) => b - a);
    return (values.slice(0, 3).reduce((sum, current) => sum + current, 0)) / 3;
    
}