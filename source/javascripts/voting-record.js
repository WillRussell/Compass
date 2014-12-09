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
         "iDisplayLength": 15,
        "bLengthChange": false,
         "data": bigDataArray,
            "columns": [
            { date: "date" },
            { billDesc: "billDesc" },
            { vote: "Vote" }
        ]
    });
};

// if ( $.fn.dataTable.isDataTable( '#voting-record' ) ) {
//     table = $('#voting-record').DataTable();
// }
// else {
//     table = $('#voting-record').DataTable({
//         paging: false
//     });
// }

// table = $('#voting-record').DataTable( {
//     retrieve: true,
//     paging: false
// } );