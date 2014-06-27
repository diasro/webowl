function calcScore(resultMap){
	var runningTotal = 0;
	var values = [];
	for (var i in resultMap){
		runningTotal += resultMap[i][0];
		
		if (i < 9){
			//Strike
			if (resultMap[i][0] == 10){
				if (typeof resultMap[1.0*i+1] != 'undefined'){
					runningTotal += resultMap[1.0*i+1][0];
					if (resultMap[1.0*i+1][0] == 10){
						if (typeof resultMap[1.0*i+2] != 'undefined'){
							runningTotal += resultMap[1.0*i+2][0];
						}else{
							runningTotal += resultMap[1.0*i+1][1];
						}
					}
				}
			}else{
				runningTotal += resultMap[i][1];
				
				//Spare
				if (resultMap[i][1] + resultMap[i][0] == 10){
					if (typeof resultMap[1.0*i+1] != 'undefined'){
						runningTotal += resultMap[1.0*i+1][0];
					}
				}
			}
			
		}else{
			//10th frame
			//Strike
			if (resultMap[i][0] == 10){
				runningTotal += resultMap[i][1];
				runningTotal += resultMap[i][2];
			}else{
				runningTotal += resultMap[i][1];
				//Spare
				if (resultMap[i][1] + resultMap[i][0] == 10){
					runningTotal += resultMap[i][2];
				}
			}
		}
		
		values[i] = runningTotal;
	}
	
	return values;
}

function updateScoreboard(result, score, frame, ball){
	for (var i in result){
		$('#frame-' + i + '-ball-0').text(result[i][0]);
		$('#frame-' + i + '-ball-1').text(result[i][1]);
		if (typeof result[i][2] != 'undefined'){
			$('#frame-' + i + '-ball-2').text(result[i][2]);
		}
		$('#frame-' + i + '-score').text(score[i]);
	}
}