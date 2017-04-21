var PlanetList = function(planetsArray){
  this.planets = planetsArray
}

PlanetList.prototype = {
  sortAscending: function(sortKey){

    switch (sortKey){
      case 'name':
        this.planets.sort(this.compareNamesAsc)
        break
      case 'population':
        this.planets.sort(function(a, b){
          return a.population - b.population
        })
        break
    }
     
  },

  sortDescending: function(sortKey){

    switch (sortKey){
      case 'name':
        this.planets.sort(this.compareNamesDesc)
        break
      case 'population':
        this.planets.sort(function(a, b){
          return b.population - a.population
        })
        break
    }
  
  },

  compareNamesAsc: function(a, b){
    var nameA = a.name.toLowerCase()
    var nameB = b.name.toLowerCase()
    if (nameA < nameB){
      return -1
    } else if (nameA > nameB){
      return 1
    } else {
      return 0
    }
  },

  compareNamesDesc: function(a, b){
    var nameA = a.name.toLowerCase()
    var nameB = b.name.toLowerCase()
    if (nameA < nameB){
      return 1
    } else if (nameA > nameB){
      return -1
    } else {
      return 0
    }
  }

}


module.exports = PlanetList