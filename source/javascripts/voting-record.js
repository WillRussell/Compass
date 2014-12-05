function votingRecord_function (voting_data){
    legislation = voting_data["legislators"][0]["most_recent_votes"];
    var bigDataArray = []
    for (var i = 0; i < legislation.length; i++){
        var smallDataArray = []
        var bill = new Object();
        bill.date = legislation[i].date;
        bill.vote = legislation[i].vote_value;
        bill.billDesc = legislation[i].vote_description;
        smallDataArray.push(bill.date);
        smallDataArray.push(bill.billDesc);
        smallDataArray.push(bill.vote);

        bigDataArray.push(smallDataArray);
    }
    $('#voting-record').dataTable({
        "order": [[ 0, "desc" ]],
         "data": bigDataArray,
            "columns": [
            { date: "date" },
            { billDesc: "billDesc" },
            { vote: "Vote" }
        ]
    });
};
