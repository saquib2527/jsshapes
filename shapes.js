/**************************************************
 *  Author: Nazmus Saquib                         *
 *  Email: saquib2527@gmail.com                   *
 *  Description:                                  *
 *  	simple library for drawing shapes         *
 *  	in HTML5 canvas                           *
 *  Last Modified: 22/07/2014                     *
 **************************************************/

function Shape(c){
	/**
	 * @var {2dCanvasContext} c 2d context to draw on
	 */
	this.c = c || {};

	/**
	 * @desc set context to draw
	 * @param {2dCanvasContext} c 2d context for canvas
	 */
	this.setContext = function(c){
		this.c = c;
	};

	/**
	 * @desc set context from passed id
	 * @param {String} id id of canvas
	 */
	this.setContextFromId = function(id){
		var canvas = document.getElementById(id);
		var context = canvas.getContext("2d");
		this.c = context;
	};

	/**
	 * @desc generates a radial gradient
	 * @param {Number} x0 x coordinate of starting circle of the gradient
	 * @param {Number} y0 y coordinate of starting circle of the gradient
	 * @param {Number} r0 radius of starting circle
	 * @param {Number} x1 x coordinate of ending circle of the gradient
	 * @param {Number} y1 y coordinate of ending circle of the gradient
	 * @param {Number} r1 radius of starting circle
	 * @param {String} stopCol0 color to display at stop position
	 * @param {Number} stopPos0 value between 0.0 and 1.0 representing position between start and end in a gradient
	 * @param {String} stopCol1 color to display at stop position
	 * @param {Number} stopPos1 value between 0.0 and 1.0 representing position between start and end in a gradient
	 * @return {GradientObject} grd gradient object
	 */
	this.generateRadialGradient = function(x0, y0, r0, x1, y1, r1, stopCol0, stopPos0, stopCol1, stopPos1){
		var grd = this.c.createRadialGradient(x0, y0, r0, x1, y1, r1);
		grd.addColorStop(stopPos0, stopCol0);
		grd.addColorStop(stopPos1, stopCol1);
		return grd;
	};
	
	/**
	 * @desc generates a linear gradient
	 * @param {Number} x0 x coordinate of starting point of the gradient
	 * @param {Number} y0 y coordinate of starting point of the gradient
	 * @param {Number} x1 x coordinate of ending point of the gradient
	 * @param {Number} y1 y coordinate of ending point of the gradient
	 * @param {String} stopCol0 color to display at stop position
	 * @param {Number} stopPos0 value between 0.0 and 1.0 representing position between start and end in a gradient
	 * @param {String} stopCol1 color to display at stop position
	 * @param {Number} stopPos1 value between 0.0 and 1.0 representing position between start and end in a gradient
	 * @return {GradientObject} grd gradient object
	 */
	this.generateLinearGradient = function(x0, y0, x1, y1, stopCol0, stopPos0, stopCol1, stopPos1){
		var grd = this.c.createLinearGradient(x0, y0, x1, y1);
		grd.addColorStop(stopPos0, stopCol0);
		grd.addColorStop(stopPos1, stopCol1);
		return grd;
	};

	/**
	 * @desc set styling properties
	 * @param {Object} props styling properties
	 */
	this.setStylingProperties = function(props){
		for(var p in props){
			switch(p){
				case "lineWidth":
					this.c.lineWidth = props[p];
					break;
				case "strokeStyle":
					this.c.strokeStyle = props[p];
					break;
				case "fillStyle":
					this.c.fillStyle = props[p];
					break;
				case "lineCap":
					this.c.lineCap = props[p];
					break;
				case "font":
					this.c.font = props[p];
					break;
				case "textBaseline":
					this.c.textBaseline = props[p];
					break;
				case "textAlign":
					this.c.textAlign = props[p];
					break;
			}
		}
	};
	
	/**
	 * @desc draws a line
	 * @param {Number} x1 x coordinate for starting point
	 * @param {Number} y1 y coordinate for starting point
	 * @param {Number} x2 x coordinate for end point
	 * @param {Number} y2 y coordinate for end point
	 * @param {Object} props styling properties
	 */
	this.line = function(x1, y1, x2, y2, props){
		this.c.beginPath();
		props = props || {};
		this.setStylingProperties(props);
		this.c.moveTo(x1, y1);
		this.c.lineTo(x2, y2);
		this.c.stroke();
		this.c.closePath();
	};

	/**
	 * @desc draws an arc
	 * @param {Number} x x coordinate of center
	 * @param {Number} y y coordinate of center
	 * @param {Number} radius radius of the arc
	 * @param {Number} startAngle start angle in radian
	 * @param {Number} endAngle end angle in radian
	 * @param {Boolean} counterClockwise if true arc drawn counter clockwise
	 * @param {Object} props styling properties
	 */
	this.arc = function(x, y, radius, startAngle, endAngle, counterClockwise, props){
		this.c.beginPath();
		props = props || {};
		this.setStylingProperties(props);
		this.c.arc(x, y, radius, startAngle, endAngle, counterClockwise);
		this.c.stroke();
		this.c.closePath();
	};

	/**
	 * @desc draws a rectangle
	 * @param {Number} x x coordinate of upper left corner
	 * @param {Number} y y coordinate of upper left corner
	 * @param {Number} width width of rectangle
	 * @param {Number} height height of rectangle
	 * @param {Object} props styling properties
	 */
	this.rect = function(x, y, width, height, props){
		this.c.beginPath();
		props = props || {};
		this.setStylingProperties(props);
		this.c.rect(x, y, width, height);
		if(props.hasOwnProperty("fillStyle")) this.c.fill();
		this.c.stroke();
		this.c.closePath();
	};

	/**
	 * @desc draws a circle
	 * @param {Number} x x coordinate of center
	 * @param {Number} y y coordinate of center
	 * @param {Number} radius radius of circle
	 * @param {Boolean} fill if true circle filled with fillStyle
	 * @param {Object} props styling properties
	 */
	this.circle = function(x, y, radius, props){
		this.c.beginPath();
		props = props || {};
		this.setStylingProperties(props);
		this.c.arc(x, y, radius, 0, Math.PI * 2, false);
		if(props.hasOwnProperty("fillStyle")) this.c.fill();
		this.c.stroke();
		this.c.closePath();
	};

	/**
	 * @desc draws a circle with text
	 * @param {Number} x x coordinate of center
	 * @param {Number} y y coordinate of center
	 * @param {Number} radius radius of circle
	 * @param {String} text text to write
	 * @param {String} textFill color to fill the text
	 * @param {Object} props styling properties
	 */
	this.circleWithText = function(x, y, radius, text, textFill, props){
		this.c.beginPath();
		props = props || {};
		this.setStylingProperties(props);
		this.c.arc(x, y, radius, 0, Math.PI * 2, false);
		if(props.hasOwnProperty("fillStyle")) this.c.fill();
		this.c.fillStyle = textFill;
		this.c.fillText(text, x, y);
		this.c.stroke();
		this.c.closePath();
	};

	/**
	 * @desc draws sequence of numbers inside circle
	 * @param {Array} seq sequence of text to be printed on circles
	 * @param {Number} x x coordinate of the first circle
	 * @param {Number} y y coordinate of the first circle
	 * @param {Number} radius radius of the circle
	 * @param {String} textFill color to fill the text
	 * @param {Object} props styling properties
	 * @return {Number} x coordinate of the next circle
	 */
	this.sequenceOfCircles = function(seq, x, y, radius, textFill, props){
		var seqGap = 3;
		for(var i = 0; i < seq.length; i++, x += seqGap * radius){
			if(seq[i] == "?"){
				this.circleWithText(x, y, radius, seq[i], "red", {
					lineWidth: 3,
					strokeStyle: "red",
					font: "20px Georgia"	
				});
			}else{
				this.circleWithText(x, y, radius, seq[i], textFill, props);
			}
		}
		return x;
	};

	/**
	 * @desc draws an inverted pyramid of circles with text inside
	 * @param {Array} seq jagged array containing the pyramid
	 * @param {Number} x x coordinate of the center of the first circle of first row
	 * @param {Number} y y coordinate of the center of the first circle of firsl row
	 * @param {Number} radius radius of the circle
	 * @param {String} textFill color to fill the text
	 * @param {Object} props styling properties
	 */
	this.pyramidOfCircles = function(seq, x, y, radius, textFill, props){
		var seqGap = 3;
		for(var row = 0; row < seq.length; row++){
			this.sequenceOfCircles(seq[row], x, y, radius, textFill, props);
			x = x + ((r * seqGap) / 2);
			y = y + r * (seqGap - 1);
		}
	};
}

var dShape = new Shape();
