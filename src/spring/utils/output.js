function error(newProblems) {
    console.group("%c" + 'Error!', "color: #999933;")
    console.log("%c" + newProblems, "color:red;");
    console.groupEnd();
}

function warning(newProblems) {
    console.group("%c" + 'Warning!', "color: #999933;")
    console.log("%c" + newProblems, "color:red;");
    console.groupEnd();
}

export default { error, warning };