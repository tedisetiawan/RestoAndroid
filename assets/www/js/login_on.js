	function checkLogin()
	{
		RestDataSetup();
		TampilDataSetup();
		if(localStorage.getItem("STLOGIN")!=null)
		{
			window.location = "dashboard.html";
		}
	}