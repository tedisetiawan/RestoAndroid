	function checkLogin()
	{
		RestDataSetup();
		TampilDataSetup();
		CekKey();
		
		if(localStorage.getItem("STLOGIN")==null)
		{
			window.location = "index.html";
		}
	}