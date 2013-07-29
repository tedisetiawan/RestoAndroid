

$(document).ready(function() {
	$('#loading_panel').show();
	
	var idData = localStorage.getItem("Key");
	
	$.ajax({
				type : 'GET',
				url : rootServiceURL+'/REST/RESTPesanan.php?id='+idData,
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
							var tombol = '<a href="edit_pesanan.html?id=' + loaddata.id_pesanan_detail + '" data-ajax="false"><div class="btn-crud">Edit</div></a><a href="hapus_pesanan.html?id='+loaddata.id_pesanan_detail+'" data-ajax="false""><div class="btn-crud">Hapus</div></a>';
							
							var diskon = eval((loaddata.harga*loaddata.diskon)/100);
							var harga_jual = eval(loaddata.harga-diskon-loaddata.promo);	
							$('#sispakList').append(
								'<li data-role="list-divider" data-theme="a" class="listview-custom"><a href="detail_paket.html?id=' + loaddata.id_paket + '" data-ajax="false"><h5>Jenis : '+loaddata.jenis+'</h5>' +
								'' + loaddata.nama + '</a><h5>Harga Normal : ' + loaddata.harga + '</h5><h5>Diskon : ' + loaddata.diskon + '%</h5><h5>Promo : ' + loaddata.promo + '</h5><h5>Harga Jual : ' + harga_jual + '</h5><h5>Jumlah : ' + loaddata.jumlah + '</h5><h5>Total Harga : ' + eval(harga_jual*loaddata.jumlah) + '</h5><p>'+tombol+'</p><div class="cleaner"></div></li>');
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
