/**
 * 
 */
var USER_BASE_URL = 'http://localhost:8080/api/user/';

function login() {
	var email = $('#inputEmail').val();
	var password = $('#inputPassword').val();

	if (email == null || email == '' || !isValidEmailAddress) {
		alert("Invalid Email");
		$('#inputEmail').focus();
	} else if (password == null || email == '') {
		alert("Invalid Password");
		$('#inputPassword').focus();
	} else {
		$.ajax({
			type : 'GET',
			url : USER_BASE_URL + 'validateLogin',
			dataType : 'json',
			data : {
				'email' : email,
				'password' : password
			},
			success : function(data) {
				if(data != null){
					$('#signinForm').hide();
					$('#headerInfo').show();
					$('#name').html("Welcome : " + data.firstName + data.lastName);
					if(data.role == 'ADMIN'){
						$('#user').show();
						$('#books').show();
						$('#category').show();
						$('#aboutUs').show();
						$('#contactUs').show();
					}else{
						$('#user').hide();
						$('#books').hide();
						$('#category').hide();
						$('#aboutUs').show();
						$('#contactUs').show();
					}
				}
			}
		});
	}
}

function listUser(){
	$('#signinForm').hide();
	$('#home').removeClass('active');
	$.ajax({
		type : 'GET',
		url : USER_BASE_URL + 'list',
		dataType : 'json',
		success : function(data){
			if(data != null){
				console.log(JSON.stringify(data, undefined, 4));

				var userInfo = "";
				for(var index = 0; index < data.length; index++){
					userInfo += '<tr><td>' + data[index].firstName + " " + data[index].lastName + '</td><td>' + data[index].email + '</td><td>' + data[index].role + '</td><td><a href="#" class="btn btn-primary" onClick="viewUser(\''+ data[index].id +'\')" style="padding: 3px 7px;">View</a></td></tr>';
				}
				$('#userInfo').append(userInfo);
				
				 // Display data in the dataTable
				//  "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                var table = $('#userTableInfo').DataTable({
                    "bDestroy": true,
                    "bAutoWidth": false,
                    "bFilter": true,
                    "bSort": true,
                    "aaSorting": [[0]],
                    "aoColumns": [
                        { "sWidth": '25%', "bSortable": true },
                        { "sWidth": '25%', "bSortable": true },
                        { "sWidth": '25%', "bSortable": true },
                        { "sWidth": '3%', "bSortable": false }
                    ]
                });
                $('#user').addClass('active');
				$('#userInformation').show();
			}
		}
	});
}