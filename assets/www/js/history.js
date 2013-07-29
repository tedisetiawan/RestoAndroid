

$(document).ready(function() {
	$('#loading_panel').show();
	
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTHistory.php?id='+localStorage.getItem("IDUser"),
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
							$('#tampilData').show();
							$.each(GetData, function(index, loaddata) {
							var diskon = eval((loaddata.harga*loaddata.diskon)/100);
							var harga_jual = eval(loaddata.harga-diskon-loaddata.promo);	
							$('#sispakList').append(
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><a href="detail_pesanan.html?id=' + loaddata.key_pesanan + '" data-ajax="false">' +
								'' + loaddata.waktu + '</a><h5>Nomor Meja : ' + loaddata.no_meja + '</h5><h5>Total Harga : ' + loaddata.total + '</h5></li>');
							});
							$('#sispakList').listview('refresh');
						}
				},
				error : function(){
					$('#loading_panel').hide();
					$('#conn_failed').show();
				}
		});
});


