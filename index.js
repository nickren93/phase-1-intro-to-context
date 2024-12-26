// Your code here
function createEmployeeRecord(employeeArray){
    const employeeRecord = {}
    employeeRecord.firstName = employeeArray[0]
    employeeRecord.familyName = employeeArray[1]
    employeeRecord.title = employeeArray[2]
    employeeRecord.payPerHour = employeeArray[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []
    return employeeRecord
}


function createEmployeeRecords(employeeArrays){
    return employeeArrays.map(array => {
            return createEmployeeRecord(array)
    })
}

function createTimeInEvent(employeeRecord, dateStamp){
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    //find the exact day in the employee's record:
    const timeInTargetDate = findDayInTimeIn(employeeRecord, date)
    const timeOutTargetDate = findDayInTimeOut(employeeRecord, date)
    //return hour difference
    return (timeOutTargetDate.hour - timeInTargetDate.hour)/100
}

//-------------------------------------------------------
function findDayInTimeIn(employeeRecord, date){
    return employeeRecord["timeInEvents"].find(element => {
        return element.date === date
    })
}

function findDayInTimeOut(employeeRecord, date){
    return employeeRecord["timeOutEvents"].find(element => {
        return element.date === date
    })
}
//-------------------------------------------------------

function wagesEarnedOnDate(employeeRecord, date){
    const hours = hoursWorkedOnDate(employeeRecord, date)
    return hours*(employeeRecord.payPerHour)
}

function allWagesFor(employeeRecord){
    const allWorkingDays = []
    employeeRecord.timeInEvents.forEach(element => {
        allWorkingDays.push(element.date)
    })
    return allWorkingDays.reduce((wage, day) =>{
        return (wage + wagesEarnedOnDate(employeeRecord, day))
    }, 0)
}

function calculatePayroll(ArrayOfEmployeeRecords){
    return ArrayOfEmployeeRecords.reduce((payRoll, element) => {
        return (payRoll + allWagesFor(element))
    }, 0)
}