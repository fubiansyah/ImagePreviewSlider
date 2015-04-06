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
		//Get width
		this.elWidth		 = this.el.width();
		this.itemCount   = this.items.length;
		this.itemWidth   = this.items.width();
		this.sliderWidth = this.itemCount * this.itemWidth;
		this.handle.width( this.sliderWidth );
		this.slider.width( this.itemWidth );
		
		//
		//Add index to each item
		var index = 0;
		$( this.items ).each( function()
		{
			$(this).attr( 'data-index', index );
			index++;
		});
		
		//
		//Get active item
		this.index = Math.ceil( this.itemCount/2 ) - 1;
		this.itemActive = this.items[this.index];
		$(this.itemActive).addClass( 'active' );
		
		//
		//
		//Init dragdealer
		this._initDragDealer();
		
		//
		//
		//Init item nav
		this._initNavigation();
	};

	/**
	 * init dragDealer
	 */
	imagePreviewSlider.prototype._initDragDealer = function() 
	{
		var self = this;
		var xPos = (1/(this.itemCount-1))*(this.index);
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
		this.items.removeClass( 'active' );
		this.index = this.dd.getStep()[0] - 1;
		this.current = this.items[this.index];
		$( this.current ).addClass( 'active' );
	};

	/**
	 * init navigation
	 */
	imagePreviewSlider.prototype._initNavigation = function() 
	{
		var self = this;
		$( this.items ).each( function()
		{
			$(this).click( function()
			{
				self._itemNavigate( $(this) );
				return false;
			});
		});
	};

	/**
	 * init navigate handler
	 */
	imagePreviewSlider.prototype._itemNavigate = function( item ) 
	{
		this.items.removeClass( 'active' );
		item.addClass( 'active' );
		
		var index 	 = item.data( 'index' );
		this.index   = index;
		this.current = this.items[index];
		
		this.dd.setStep( this.index+1,0 );
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
 