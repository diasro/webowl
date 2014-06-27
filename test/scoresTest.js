var assert = chai.assert;

describe('Scoring a bowling game', function(){
  it('Perfect game!', function(){
	 var score = [[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,10,10]];
	 var values = calcScore(score);
	 assert.equal(values[9], 300);
  });
  
  it('Some spares!', function(){
	 var score = [[5,5],[5,0],[6,4],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[5,5,5]];
	 var values = calcScore(score);
	 assert.equal(values[9], 45);
  });
  
  it('No bonuses at all', function(){
	 var score = [[5,3],[5,0],[0,4],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,3,0]];
	 var values = calcScore(score);
	 assert.equal(values[9], 22);
  });
});
