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
			}
		}else{
			if (resultMap[i][0] == 10){
				runningTotal += resultMap[i][1];
				runningTotal += resultMap[i][2];
			}
		}
		
		values[i] = runningTotal;
	}
	
	return values;
}