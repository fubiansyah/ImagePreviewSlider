/**
 * imagepreviewslider.js v0.0.1
 * http://www.iznyn.io
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, iznyn
 * http://www.iznyn.io
 */
;( function($) {

	'use strict';

	/**
	 * Inherit function
	 */
	function inherit( proto ) 
	{
		function F() {}
		F.prototype = proto
		return new F
	}
	
	/**
	 * extend obj function
	 */
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * imagePreviewSlider function
	 */
	function imagePreviewSlider( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	/**
	 * imagePreviewSlider options
	 */
	imagePreviewSlider.prototype.options = 
	{
		slidesClass : '_slides',
		itemClass : '_item'
	};

	/**
	 * init function
	 */
	imagePreviewSlider.prototype._init = function() 
	{
		this.slider = $( '.'+this.options.slidesClass, this.el );
		this.handle = $( '<div class="_slides_handle handle clearfix"></div>' ).append( this.slider.html() );
		this.slider.html( this.handle );
		this.items  = $( '.'+this.options.itemClass, this.el );

		//
		//Styling 
		this.items.css( 'float', 'left' );
		this.el.css( 'overflow', 'hidden' );
		this.slider.css( 'display', 'inline-block' );
		
		//
		//Get width
		this.elWidth		 = this.el.width();
		this.itemCount   = this.items.length;
		this.itemWidth   = this.items.width();
		this.sliderWidth = this.itemCount * this.itemWidth;
		this.handle.width( this.sliderWidth );
		this.slider.width( this.itemWidth );
		
		//
		//Get active item
		this.index = Math.ceil( this.itemCount/2 ) - 1;
		this.itemActive = this.items[this.index];
		$(this.itemActive).addClass( 'active' );
		
		//
		//
		//Init dragdealer
		this._initDragDealer();
	};

	/**
	 * init dragDealer
	 */
	imagePreviewSlider.prototype._initDragDealer = function() 
	{
		var self = this;
		var xPos = (1/(this.itemCount-1))*(this.index);
		console.log( xPos );
		this.dd = new Dragdealer( this.slider[0], {
			steps: this.itemCount,
			speed: 0.4,
			loose: true,
			x: xPos,
			requestAnimationFrame : true,
			callback: function( x, y ) {
				self._navigate( x, y );
			}
		});
	};

	/**
	 * navigate preview item
	 */
	imagePreviewSlider.prototype._navigate = function( x, y ) 
	{
		console.log(x);
	};

	/**
	 * add to global namespace
	 */
	window.imagePreviewSlider = imagePreviewSlider;
	
	/**
	 * JQuery plugin
	 */
	$.fn.imagePreviewSlider = function( options ){
		var el = $(this);
		var slider = new imagePreviewSlider( el, options );
	};
	
	$(document).ready(function() {
		$( '.preview-slider' ).imagePreviewSlider();
	});
})(jQuery); 
 