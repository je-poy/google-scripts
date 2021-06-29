function LMS_IRR(loan_amount, ma, tenure_months) {
  var _max_epsilon = 0.0000000000001,
      result_rate = 0.0000000000001,
      _max_iteration = 50,
      iteration = 0,
      continue_loop = true,
      initial_value = (loan_amount * (-1)),
      irr;
  
  while (continue_loop && (iteration < _max_iteration)) {
    var result_value = initial_value,
        first_derivation = 0,
        term = 1,
        new_rate, epsilon_rate;
    
    while(term  <= tenure_months) {
      result_value += (ma / (Math.pow((1 + result_rate), term)));
      first_derivation -= (term * ma) / (Math.pow((1 + result_rate), (term + 1)));
//      result_value += rnd((ma / (Math.pow((1 + result_rate), term))));
//      result_value = rnd(result_value, 9);
//      first_derivation -= rnd((term * ma) / (Math.pow((1 + result_rate), (term + 1))));
//      first_derivation = rnd(first_derivation,9);
      term++;
    }
    new_rate = result_rate - result_value / first_derivation;
    epsilon_rate = Math.abs(new_rate - result_rate);
    result_rate = new_rate;
    
    continue_loop = (epsilon_rate > _max_epsilon) && (Math.abs(result_value) > _max_epsilon);
    
    iteration++;
  }
  
  irr = result_rate * 100;
  return rnd(irr, 12);
}

function rnd(value, places) {
  places = places ? places : 10;
  return Number(value.toFixed(places));
}
