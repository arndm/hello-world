//var ibmdb = require('ibm_db');


exports.listSysTables = function(ibmdb,connString) {
    return function(req, res) {

       ibmdb.open(connString, function(err, conn) {
            if (err ) {
             res.send("error occurred " + err.message);
            }
            else {
                conn.query("SELECT * from dash6433.EMPLOYEE ", function(err, tables, moreResultSets) {


                if ( !err ) {
                    res.render('tablelist', {
                        "tablelist" : tables

                     });

                     console.log(tablelist);
                } else {
                   res.send("error occurred " + err.message);
                }

                /*
                    Close the connection to the database
                    param 1: The callback function to execute on completion of close function.
                */
                conn.close(function(){
                    console.log("Connection Closed");
                    });
                });
            }
        } );

    }
}
