/******************************************
*   Robert Koteles
*   Senior Web developer
*   July 2018
*   JSON Application, test
******************************************/


/*****************************
*  DATA MANAGEMENT FUNCTIONS
******************************/

let handleDatas = {
    initialize: function () {
        let self = this;
        
        self.readExternalJSON();

    },
    readExternalJSON: function () {
    	//
	    // Read data stored in external JSON file
	    // --------------------------------------------------------------------------
    	let self = this,
    			requestURL = 'data/test.json',
    			request = new XMLHttpRequest();
    	
    	// set the nature of request
    	request.open('GET', requestURL);
    	request.responseType = 'json';
			request.send();

			// when it's loaded from external, start processing
			request.onload = function() {
			  testJsonString = request.response;
			  self.processData(testJsonString);
			}

    },
    processData: function (jsonObj) {
    	//
	    // Processing data coming from JSON object. 
	    // --------------------------------------------------------------------------
    	let self = this;

    	// get path
    	commentLink = jsonObj.commentLink;
    	filmLink = jsonObj.filmLink;
    	imagePath = jsonObj.imagePath;

    	// convert object into array
 			outputArray = Object.keys(jsonObj.reviewList.reviewArticles).map(function(key) {
			  return [jsonObj.reviewList.reviewArticles[key]];
			});

 			console.debug(outputArray);

    	self.populateData();
    },
    populateData: function ( element, index ) {
    	//
	    // Populating data coming from JSON object. 
	    // --------------------------------------------------------------------------
    	let self = this;

    	// building DOM tree
			outputArray.map(manipulateDom.appendToDom);
    }
    
};


/*****************************
*  DOM MANIPULATOR FUNCTIONS
******************************/

let manipulateDom = {
    appendToDom: function ( datas, index ) {
    	//
	    // Adding data into DOM
	    // --------------------------------------------------------------------------
 			
 			console.debug(datas);

 			let newParentDiv = document.createElement('div');

 			newParentDiv.classList.add('listitem');
 			
 	  	datas.map(function(element, index) { 

 	  		let newChild = '';
 	  		
 	  		// ==========================================================================
 	  		// Adding title
 	  		// ==========================================================================	
				newChild = document.createElement('a');
				newChild.classList.add('listitem-title');
				newChild.href = filmLink + element.reviewLink;
				newChild.textContent = element.reviewTitle;
				newParentDiv.appendChild(newChild);

 	  		// ==========================================================================
 	  		// Adding image
 	  		// ==========================================================================
				let newImageDiv = document.createElement('div');
 				newImageDiv.classList.add('listitem-image');


				newChild = document.createElement('img');
				newChild.classList.add('listitem-thumb');
				if ( !element.reviewImage ) {
 					newChild.src = 'icons/telegraph.svg';
 				} else {
 					newChild.src = imagePath + element.reviewImage;
 				}
				newImageDiv.appendChild(newChild);
				
				newParentDiv.appendChild(newImageDiv);

				// ==========================================================================
				// Adding description
				// ==========================================================================
				let newDescriptionDiv = document.createElement('div');
 				newDescriptionDiv.classList.add('listitem-content');

 	  		
				// adding type	
				newChild = document.createElement('span');
				newChild.classList.add('listitem-type');
				newChild.textContent = 'TV';
				newDescriptionDiv.appendChild(newChild);


				
				// adding summary	
				newChild = document.createElement('span');
				newChild.classList.add('listitem-summary');

				if ( element.reviewAuthor ) {
					let newChildAuthor = document.createElement('span');
					newChildAuthor.classList.add('listitem-author');
					newChildAuthor.textContent = element.reviewAuthor + ':';
					newChild.appendChild(newChildAuthor);
				}

				let newChildSummary = document.createElement('span');
				newChildSummary.textContent = element.reviewSummary;
				newChild.appendChild(newChildSummary);
				
				newDescriptionDiv.appendChild(newChild);

				// adding rating
				newChild = document.createElement('span');
				newChild.classList.add('listitem-rating');
				newChild.classList.add('listitem-rating-' + parseInt(element.reviewRating) );
				//newChild.textContent = element.reviewRating;
				newDescriptionDiv.appendChild(newChild);

				// adding reviews
				newChild = document.createElement('a');
				newChild.classList.add('listitem-reviews');
				newChild.href = commentLink;
				newChild.textContent = 'Comment';
				newDescriptionDiv.appendChild(newChild);

				/*
				// adding review date
				newChild = document.createElement('span');
				newChild.classList.add('listitem-reviewdate');
				newChild.textContent = element.reviewRating;
				newDescriptionDiv.appendChild(reviewDate);
				*/

				newParentDiv.appendChild(newDescriptionDiv);

			});

 	  	// adding the entire row to DOM
			loadToSection.appendChild(newParentDiv);
    }
};


/*********************
*  LOADER
*********************/

var testJsonString,
		outputArray,
		commentLink,
		filmLink,
		imagePath,
		loadToSection = document.getElementById('data-container');

window.onload = function () {
    'use strict';

    handleDatas.initialize();
}