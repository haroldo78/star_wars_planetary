var PlanetListView = function(container, sortableColumnHeaders, unsortableColumnHeaders){
  this.container = container
  this.sortableColHeaders = sortableColumnHeaders
  this.unsortableColHeaders = unsortableColumnHeaders
  this.planetList 
}

PlanetListView.prototype = {
  populateList: function(planetList){
    //CLEAR ANY PREVIOUS DATA
    while (this.container.hasChildNodes()){
      this.container.removeChild(this.container.firstChild)
    }
    //RENDER NEW DATA
    this.createTable(planetList)
  },

  //CLEARS ALL OF THE DATA ROWS OUT OF THE TABLE, LEAVING THE HEADER
  clearDataTable: function(table){
    while(table.childNodes.length > 2){
      table.removeChild(table.lastChild)
    }
  },

  //CALLED WHEN THE USER CLICKS TO SORT PLANETS 
  refreshWithSortedData: function(planetList){
    //first clears the table
    var table = document.querySelector('#planet-flex-grid')
    this.clearDataTable(table)

    //refresh the data rows in the new order
    planetList.planets.forEach(function(planet, index){
      var planetRow = this.createPlanetDataRow(planet, index)
      table.appendChild(planetRow)
    }.bind(this))

    //allocate the 'final-row' class to ensure proper styling
    table.lastChild.classList.add('final-row')
  },

  createStandardHeadingRow: function(){
    var headingRow = document.createElement('div')
    headingRow.classList.add('row')
    headingRow.classList.add('heading')

    this.sortableColHeaders.forEach(function(colHeader){
      var heading = document.createElement('p')
      heading.innerText = colHeader
      heading.classList.add('asc-false')
      heading.classList.add('sortable')
      this.addSortingEventListeners(heading)
      headingRow.appendChild(heading) 
    }.bind(this))

    this.unsortableColHeaders.forEach(function(colHeader){
      var heading = document.createElement('p')
      heading.innerText = colHeader
      headingRow.appendChild(heading) 
    }.bind(this))

    return headingRow
  },

  createAlternativeHeadingRow: function(){
    var altHeading = document.createElement('div')
    altHeading.classList.add('alt-heading')
    altHeadingText = document.createElement('p')
    altHeadingText.innerText = 'PLANETS'
    altHeading.appendChild(altHeadingText)
    return altHeading
  },

  createMobileHeader: function(){
    //create a header row
    var mobileHeader = document.createElement('div')
    mobileHeader.classList.add('mobile-header')

    //attach the non-list item headers
    this.sortableColHeaders.forEach(function(element){
      this.createPTagAndAppend(element, mobileHeader)
    }.bind(this))

    //attach the list item headers individually, so that they can be given inidvidual ids to help with styling
    this.createPTagAndAppend('terrain', mobileHeader, 'terrain-mobile-heading')
    this.createPTagAndAppend('films', mobileHeader, 'films-mobile-heading')
    return mobileHeader
  },

  //CREATES THE WHOLE TABLE FROM THE PLANETLIST
  createTable: function(planetList){
    this.planetList = planetList
    var table = document.createElement('div')
    table.id = 'planet-flex-grid'

    //creates the standard (larger screen size) header row first, and also the alternative heading for mobile layour
    var headingRow = this.createStandardHeadingRow()
    var altHeading = this.createAlternativeHeadingRow()
    
    //appends both headings and adds the table to the overall page section
    table.appendChild(headingRow)
    table.appendChild(altHeading)
    this.container.appendChild(table)

    //adds all of the data cells to the table
    this.addPlanetDataCellsToTable(table)
    
    //gives the last row of the table a class to allow it to be styled differently
    table.lastChild.lastChild.classList.add('final-row')
    
  },

  addPlanetDataCellsToTable: function(table){
    this.planetList.planets.forEach(function(planet, index){
      //create the div that holds the mobile header and the data row
      //(creating in a div together to allow for a side-by-side flexbox styling on mobile views)
      var headerAndDataDiv = document.createElement('div')
      headerAndDataDiv.classList.add('header-and-data')

      // create a mobile header
      var mobileHeader = this.createMobileHeader()
      //create the planet data row
      var planetRow = this.createPlanetDataRow(planet, index)
      
      //append both elements to the header and data div, and then append the whole header/data div to the table
      headerAndDataDiv.appendChild(mobileHeader)
      headerAndDataDiv.appendChild(planetRow)
      table.appendChild(headerAndDataDiv)
    }.bind(this))
  },

  //CREATES THE DATA ROWS FOR EACH PLANET
  createPlanetDataRow: function(planet, index){
    //creates the row element
    var planetRow = document.createElement('div')
    planetRow.classList.add('row')
    //adds planet details to each row
    this.createPTagAndAppend(planet.name, planetRow)
    this.createPTagAndAppend(planet.population, planetRow)
    this.createPTagAndAppend(planet.diameter, planetRow)
    this.createPTagAndAppend(planet.rotationPeriod, planetRow)
    this.createPTagAndAppend(planet.orbitalPeriod, planetRow)
    this.createListAndAppend(planet.terrains, planetRow)
    this.createListAndAppend(planet.films, planetRow)
    //applies class to ensure contrasting row colours
    if (index % 2 === 0){
      planetRow.classList.add('contrast-color')
    } else {
      planetRow.classList.add('no-contrast')
    }

    return planetRow
  },

  //ADDs EVENT LISTENERS FOR SORTING
  addSortingEventListeners: function(heading){
    heading.addEventListener('click', function(){

      if (heading.classList.toggle('asc-false')){
        this.planetList.sortDescending(heading.innerText.toLowerCase())
        this.refreshWithSortedData(this.planetList)
      } else {
        this.planetList.sortAscending(heading.innerText.toLowerCase())
        this.refreshWithSortedData(this.planetList)
      } 

    }.bind(this))
  },


  //TAKES A SET OF ITEMS, CREATES A LIST AND APPENDS TO THE ROW GIVEN
  createListAndAppend: function(items, planetRow){
    var ul = document.createElement('ul')
    items.forEach(function(item){
      var li = document.createElement('li')
      li.innerText = item
      ul.appendChild(li)
    })
    planetRow.appendChild(ul)
  },


  //TAKES TEXT, CREATES A <P> ELEMENT AND APPENDS TO THE ROW GIVEN
  createPTagAndAppend: function(text, planetRow, optionalId){
    var pTag = document.createElement('p')
    pTag.innerText = text
    if (optionalId){
      pTag.id = optionalId
    }
    planetRow.appendChild(pTag)
  }

}

module.exports = PlanetListView