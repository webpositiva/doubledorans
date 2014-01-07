$(document).ready(function(){
	$("#partida_ativa .pa_pesquisar").click(function(){
		var pa_servidor = $("#partida_ativa select[name=pa_servidor]").val();
		var pa_invocador = $("#partida_ativa input[name=pa_invocador]").val();
		$.mobile.loading('show');
		$.ajax({
			url: "https://community-league-of-legends.p.mashape.com/api/v1.0/"+pa_servidor+"/summoner/retrieveInProgressSpectatorGameInfo/"+pa_invocador,
			type: "GET",
			beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Authorization', '0PMwcbjih9s7WQQXMpRExRw4vIU2q8A7');},
			success: function(data){
				if(data.success=="false"){
					$.mobile.loading('hide');
					alert("Erro: Talvez o jogador digitado ("+pa_invocador+") não esteja em uma partida ativa.");
				}
				else{
					$.mobile.loading('hide');
					$("#resultado_partida_ativa .summoners").html("");
					$.mobile.changePage($("#resultado_partida_ativa"));
					
					var to = data.game.teamOne.array;
					
					$.each (to, function () {
					
						if(this.summonerName==pa_invocador){
							$("#resultado_partida_ativa .titulo").html(this.summonerName);
						}

						var team_append = '<tr class="team_one">'+
							'<th>Teste</th>'+
							'<td>'+this.summonerName+'</td>'+
							'<td>Teste</td>'+
							'</tr>';
						$("#resultado_partida_ativa .summoners").append(team_append);

					});
					
					var tt = data.game.teamTwo.array;
					$.each (tt, function () {
						if(this.summonerName==pa_invocador){
							$("#resultado_partida_ativa .titulo").html(this.summonerName);
						}
						var team_append = '<tr class="team_two">'+
							'<th>Teste</th>'+
							'<td>'+this.summonerName+'</td>'+
							'<td>Teste</td>'+
							'</tr>';
						$("#resultado_partida_ativa .summoners").append(team_append);
					});
				}
			},
			error: function(xhr, textStatus, errorThrown){
				$.mobile.loading('hide');
				alert('Erro: O invocador digitado ('+pa_invocador+') não está em uma partida ativa.');
			}
		});
	});
	
})