var assert = require('assert')
var Planet = require('../planet.js')

describe('Planet tests:', function(){

  var planet
  var unknownValuesPlanet

  beforeEach(function(){
    planet = new Planet({
      name: 'Tatooine',
      population: '200',
      diameter: '4500',
      rotation_period: '42',
      orbital_period: '321',
      terrain: 'rainforests, rivers, mountains',
      films: ['Clone Wars', 'A New Hope']
    })

    unknownValuesPlanet = new Planet({
      name: 'unknown',
      population: 'unknown',
      diameter: 'unknown',
      rotation_period: 'unknown',
      orbital_period: 'unknown',
      terrain: 'unknown',
      films: []
    })
  })

  it('has a name', function(){
    assert.strictEqual('Tatooine', planet.name)
  })

  it('has a population', function(){
    assert.strictEqual(200, planet.population)
  })

  it('reflects unknown population value if no numeric population given', function(){
    assert.strictEqual('unknown', unknownValuesPlanet.population)
  })

  it('has a diameter', function(){
    assert.strictEqual(4500, planet.diameter)
  })

  it('reflects unknown diameter value if no numeric diameter given', function(){
    assert.strictEqual('unknown', unknownValuesPlanet.diameter)
  })

  it('has a rotation period, if known', function(){
    assert.strictEqual(42, planet.rotationPeriod)
  })

  it('reflects unknown rotation period value if no value given', function(){
    assert.strictEqual('unknown', unknownValuesPlanet.rotationPeriod)
  })

  it('has an orbital period, if known', function(){
    assert.strictEqual(321, planet.orbitalPeriod)
  })

  it('reflects unknown oribital period if no value given', function(){
    assert.strictEqual('unknown', unknownValuesPlanet.orbitalPeriod)
  })

  it('can hold a terrain value', function(){
    assert.strictEqual('rainforests', planet.terrains[0])
  })

  it('holds multiple terrains in array', function(){
    assert.strictEqual(3, planet.terrains.length)
  })

  it('can hold mutliple film titles', function(){
    assert.strictEqual('A New Hope', planet.films[1])
  })

  it('checks if all attributes are unknown, and returns false if attributes are known', function(){
    assert.strictEqual(false, planet.checkAllAttributesUnknown())
  })

  it('checks if all attributes are unknown, and returns true if all are unknown', function(){
    assert.strictEqual(true, unknownValuesPlanet.checkAllAttributesUnknown())
  })

})