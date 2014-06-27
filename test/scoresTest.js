var assert = chai.assert;

describe('Scoring a bowling game', function(){
  it('Perfect game!', function(){
	 var score = [[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,10,10]];
	 var values = calcScore(score);
	 assert.equal(values[9], 300);
  });
});
