$(document).ready(function() {
	$('#loading_panel').show();
	
	var idData = getUrlVars()["id"];
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTPaketDetail.php?id='+idData,
				async: true,
				beforeSend: function(x) {
					if(x && x.overrideMimeType) {
      					 x.overrideMimeType("application/j-son;charset=UTF-8");
      				}
				},
				dataType : 'json',
				success : function(data){
						var GetData = data.items;
						if(GetData==''){
							$('#loading_panel').hide();
							$('#not_found').show();
						}else{
							
							$('#loading_panel').hide();
							$('#allData').show();
							
							$.each(GetData, function(index, loaddata) {
							var diskon = eval((loaddata.harga*loaddata.diskon)/100);
							var harga_jual = eval(loaddata.harga-diskon-loaddata.promo);
								$('#nama').text(loaddata.nama);
								$('#jenis').text(loaddata.jenis);
								$('#harga').text(loaddata.harga);
								$('#diskon').text(loaddata.diskon);
								$('#promo').text(loaddata.promo);
								$('#harga_jual').text(harga_jual);
								$('#id_paket').val(loaddata.id_paket);
								$('#id_pesanan').val(localStorage.getItem("Key"));
							});
						}
				},
				error : function(){
					$('#loading_panel').hide();
					$('#conn_failed').show();
				}
		});
});

function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

