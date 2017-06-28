//Initialize Firebase
var config = {
    apiKey: "AIzaSyBrNo7Hmpg-pEJ_UDWBTr2qtEXXEJVSMWs",
    authDomain: "jac-employee-data-management.firebaseapp.com",
    databaseURL: "https://jac-employee-data-management.firebaseio.com",
    projectId: "jac-employee-data-management",
    storageBucket: "jac-employee-data-management.appspot.com",
    messagingSenderId: "614425613048"
};
firebase.initializeApp(config);

var database = firebase.database().ref();

$('#submit').on('click', function() {
    var employeeName = $('#employeeName').val().trim();
    var role = $('#role').val().trim();
    var startDate = $('#startDate').val().trim();
    var monthlyRate = $('#monthlyRate').val().trim();

    database.push({
        'employeeName': employeeName,
        'role': role,
        'startDate': startDate,
        'monthlyRate': monthlyRate,
    });
});

database.orderByChild('startDate').limitToLast(1).on('child_added', function(snapshot) {
    var sv = snapshot.val();
    console.log(sv);
    console.log(sv.employeeName);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthlyRate);
}, function(err) {
    console.log("Error handled" + err.code);
});
