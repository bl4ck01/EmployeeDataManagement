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

var startDateTemp;
$('#submit').on('click', function() {
    var employeeName = $('#employeeName').val().trim();
    var role = $('#role').val().trim();
    var startDate = $('#startDate').val().trim();
    var monthlyRate = $('#monthlyRate').val().trim();

    startDateTemp = new Date($('#startDate').val());
    console.log(startDateTemp);

    //database.push({
    database.push({
        'employeeName': employeeName,
        'role': role,
        'startDate': startDate,
        'monthlyRate': monthlyRate,
    });
    //database.set({});
});

function dateDifference(date) {
    return moment().diff(date, 'months');
}

$('#clearDatabase').on('click', function() {
    database.set({});
    location.reload();
});

function generateNewRow(sv) {
    var startDate = new Date(sv.startDate).getTime();
    var dateDiff = dateDifference(startDate);
    console.log('Date difference: ' + dateDiff);
    var totalBilled = parseInt(dateDiff) * parseInt(sv.monthlyRate);
    console.log('Total billed: ' + totalBilled);

    var newTBody = $('<tbody>');
    var newRow = $('<tr>');

    newRow.append('<td>' + sv.employeeName + '</td>');
    newRow.append('<td>' + sv.role + '</td>');
    newRow.append('<td>' + sv.startDate + '</td>');
    newRow.append('<td>' + dateDiff + '</td>');
    newRow.append('<td>$' + sv.monthlyRate + '</td>');
    newRow.append('<td>$' + totalBilled + '</td>');

    newTBody.html(newRow);
    $('#employeeTable').append(newTBody);
}

//database.orderByChild('startDate').limitToLast(1).on('child_added', function(snapshot) {
//database.orderByChild('startDate').limitToLast(1).on('value', function(snapshot) {
database.on('child_added', function(snapshot) {
    var sv = snapshot.val();
    console.log(sv);
    console.log(sv.employeeName);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthlyRate);

    generateNewRow(sv);
}, function(err) {
    console.log("Error handled" + err.code);
});

