	
	var rootServiceURL = "http://resto.gedelumbung.com/";
	
	
	function GetLogout()
	{
		localStorage.clear();
		RestDataSetup();
		TampilDataSetup();
		window.location = "index.html";
	}
	
	function GetProfil()
	{
		window.location = "profil.html";
	}
	
	function GetMakanan()
	{
		window.location = "makanan.html";
	}
	
	function GetMinuman()
	{
		window.location = "minuman.html";
	}
	
	function GetPesanan()
	{
		window.location = "pesanan.html";
	}
	
	function GetHistory()
	{
		window.location = "history.html";
	}
	

    function TampilDataSignIn() {
        $.getJSON(rootServiceURL+'/REST/RESTRegion.php', function(data) {
            dataSignIn = data.items;
            $.each(dataSignIn, function(index, dtTampil) {
            
                var combo = document.getElementById("Region");
                var option = document.createElement("option");
                option.text = dtTampil.nama_region;
                option.value = dtTampil.id_region;
                try {
                    combo.add(option, null); //untuk semua browser
                }catch(error) {
                    combo.add(option); // buat IE yg kovok :p
                }
                
            });
        });
    }
	

    function RestDataSetup() {
        $.getJSON(rootServiceURL+'/REST/RESTSetup.php', function(data) {
            dataSignIn = data.items;
            $.each(dataSignIn, function(index, dtTampil) {
            	localStorage.setItem(dtTampil.tipe,dtTampil.content_setting);
                
            });
        });
    }
	

    function CekKey() {
        $.getJSON(rootServiceURL+'/REST/RESTCekKey.php?id='+localStorage.getItem("Key"), function(data) {
            dataSignIn = data.items;
            $.each(dataSignIn, function(index, dtTampil) {
            
            	if(dtTampil.jum==0)
            	{
            		SimpanKey(localStorage.getItem("Key"),localStorage.getItem("IDUser"));
            	}
                
            });
        });
    }
    
    function makeid()
	{
    	var text = "";
    	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    	for( var i=0; i < 20; i++ )
        	text += possible.charAt(Math.floor(Math.random() * possible.length));

    	return text;
	}
	
	function SimpanKey(key,id_user){
	
            $.ajax({
                        type : 'GET',
                        url : rootServiceURL+'/REST/POSTKey.php',
                        async: true,
                        data: {
                            strKey: key,
                            strIdUser: id_user
                        },
                        beforeSend: function(x) {
                            if(x && x.overrideMimeType) {
                                 x.overrideMimeType("application/j-son;charset=UTF-8");
                            }
                        },
                        dataType : 'json',
                        success : function(data){
                                var cek = data.result;
                                if(cek=='Sukses'){}
                        },
                        error: function(jqXHR, exception) {
                        }
                }); 
        }
	

    function TampilDataSetup() {
        $("#st-judul").html(localStorage.getItem("site_title"));
        $("#st-footer").html(localStorage.getItem("site_footer"));
    }
	