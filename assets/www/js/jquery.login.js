$(document).ready(function() {
	
	$("#login").click(function(e){
		$('#formlogin').hide();
		
        e.preventDefault();
		var username	= document.getElementById('username').value
		var password	= document.getElementById('password').value
		var dataString	= 'username='+ username + '&password=' + password

		if(username=="" && password=="")
		{
			$('#wrong_password').show();
			return false;
		}

		$('#infologin').show();

		$.ajax({
			url:rootServiceURL+'/REST/RESTLogin.php',
			dataType:'jsonp',
			timeout: 15000,
			cache: false,
			data: dataString,
			success:function(response){
				$('#infologin').hide();
				
				
					var st,id_user,nama_user,username,email,alamat,id_region,level = "";
					st			= response.ST;
					id_user		= response.ID_USER;
					nama_user	= response.NAMA_USER;
					username	= response.USERNAME;
					email		= response.EMAIL;
					alamat		= response.ALAMAT;
					id_region	= response.ID_REGION;
					level		= response.LEVEL;
						
					if(response.ST=="-")
					{
						$('#wrong_password').show();
					}
					else
					{
						localStorage.setItem('STLOGIN',"LoggedIn");
						localStorage.setItem('IDUser',id_user);
						localStorage.setItem('Nama',nama_user);
						localStorage.setItem('Username',username);
						localStorage.setItem('Email',email);
						localStorage.setItem('Alamat',alamat);
						localStorage.setItem('IDRegion',id_region);
						localStorage.setItem('Level',level);
						localStorage.setItem('Key',makeid());

						$.mobile.changePage($(document.location.href="dashboard.html"), 'slide');
					} 
				
				
					
			},
			error: function (xhr, ajaxOptions, thrownError) {
				if(thrownError==="timeout") {
					$('#infologin').hide();
					$('#connection_failed').show();
				} else {
					$('#infologin').hide();
					$('#connection_failed').show();
				}
			}
		}); //Tutup Ajax
	
	
	}); //Tutup Button Click
	
}); //Tutup Document Ready
