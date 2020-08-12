var selectedRow = null;
function onFormsubmit(){
  var formData = readFromData();
  if(selectedRow == null)
   insertNewRecord(formData);
   else {
     udateRecord(formData);
   }

  resetForm();

}


function  readFromData(){
  var formData = {};
  formData['userName'] = document.getElementById('userName').value;

  //Calcluation of age from DOB

  var today = new Date();
  var dateInput = document.getElementById('DOB').value;
  var birthDate = new Date(dateInput);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
  formData['DOB'] = age;


  //Choosing gender
  if (document.getElementById('genderMale').checked) {
      formData['gender']= document.getElementById('genderMale').value;
   }
  else{
      formData['gender']= document.getElementById('genderFemale').value;
   }


  formData['Skills'] = document.getElementById('Skills').value;


  //Selectig Hobby

  if (document.getElementById('hobbyCricket').checked && document.getElementById('hobbyTennis').checked) {
       //formData['checks'] = document.getElementById('hobbyCricket').value.outerHTML + document.getElementById('hobbyTennis').value.outerHTML
       var a = document.getElementById('hobbyCricket').value;
       var b =document.getElementById('hobbyTennis').value;
       formData['checks'] = a+', '+b;
   }
   else if (document.getElementById('hobbyCricket').checked) {
      formData['checks']= document.getElementById('hobbyCricket').value;

   }
   else{
     formData['checks']= document.getElementById('hobbyTennis').value;
   }



  return formData;
}

function insertNewRecord(data) {
  var table = document.getElementById('userList').getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.userName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.DOB;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.gender;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.Skills;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.checks;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<input type="submit" name="esubmit" value="Edit" onClick = "onEdit(this)">
                    <input type="submit" name="dsubmit" value="Delete" onClick = "onDelete(this)">`;

}

function resetForm(){
  document.getElementById('userName').value="";
  document.getElementById('DOB').value;
  document.getElementById('genderMale').value;
  document.getElementById('Skills').value;
  document.getElementById('hobbyCricket').value;
  selectedRow = null;

}

function onEdit(td){
  selectedRow = td.parentElement.parentElement;
  document.getElementById('userName').value = selectedRow.cells[0].innerHTML;
  document.getElementById('DOB').value = selectedRow.cells[1].innerHTML;
  document.getElementById('genderMale').value = selectedRow.cells[2].innerHTML;
  document.getElementById('Skills').value = selectedRow.cells[3].innerHTML;
  document.getElementById('hobbyCricket').value = selectedRow.cells[4].innerHTML;

}

function udateRecord(formData){
  selectedRow.cells[0].innerHTML = formData.userName;
  selectedRow.cells[1].innerHTML = formData.DOB;
  selectedRow.cells[2].innerHTML = formData.gender;
  selectedRow.cells[3].innerHTML = formData.Skills;
  selectedRow.cells[4].innerHTML = formData.checks;

}

function onDelete(td){
  row = td.parentElement.parentElement;
  document.getElementById('userList').deleteRow(row.rowIndex);
  resetForm();

}
