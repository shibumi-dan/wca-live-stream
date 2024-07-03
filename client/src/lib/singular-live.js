import { average } from './attempt-result';

export function SendResults(timebase) {

    const results = [];
    results.push(getResult(timebase.current_results[0]));
    results.push(getResult(timebase.current_results[1]));
    results.push(getResult(timebase.current_results[2]));
    results.push(getResult(timebase.current_results[3]));
    results.push(getResult(timebase.current_results[4]));
    
    const dnCount = results.filter(r=>r < 0).length;
    const solvesRemaining = results.filter(r=>r === "").length;
    
    const eventId = timebase.current_results[0] !== null && timebase.current_results[0] !== undefined ? timebase.current_results[0].event_id : "333";
    const avg = average(results, eventId);
    const best = solvesRemaining === 1 ? average(results.filter(r=>r !== "").concat(0.01), eventId) : "--";
    const worst = solvesRemaining === 1 ? average(results.filter(r=>r !== "").concat(-1), eventId) : "--";

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
                }
            ]
        },
        "payload": {
          "p1Name": timebase.name,
          "p1Score1": results[0] !== "" ? results[0] / 100 : "",
          "p1Score2": results[1] !== "" ? results[1] / 100 : "",
          "p1Score3": results[2] !== "" ? results[2] / 100 : "",
          "p1Score4": results[3] !== "" ? results[3] / 100 : "",
          "p1Score5": results[4] !== "" ? results[4] / 100 : "",
          "p1Count": dnCount,
          "p1Remaining": solvesRemaining,
          "p1Mean": avg !== 0 ? avg / 100 : "--",
          "p1Best": best,
          "p1Average": avg !== 0 ? avg / 100 : "--",
          "p1Worst": worst
        }
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
    
    return Math.trunc(result.result * 100);
}

