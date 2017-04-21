var Planet = function(params){
  this.name = params.name
  this.population = parseInt(params.population) || 'unknown'
  this.diameter = parseInt(params.diameter) || 'unknown'
  this.rotationPeriod = parseInt(params.rotation_period) || 'unknown'
}

module.exports = Planet