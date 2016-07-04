/*
	Full Page Image Zoom
	(c) 2015 daroldso
	Version: 1.0.0
	Sold exclusively on CodeCanyon
*/

if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}
(function( $, window, document, undefined ){

	var ImageZoom = {

		init: function( options, elem, et ){
			var self = this;
			self.elem = elem;
			self.$elem = $(elem);
			var modal = document.createElement('div');
			modal.className = 'fpimagezoom-modal';
			self.$modal = $(modal);

			self.options = $.extend({}, $.fn.fpImageZoom.options, options);

			var img = self._loadOriginalImage();

			img.onload = function(){
				self.image = this;
				self.$image = $(this);

				self._appendOriginalImageToBody(self.image);

				self.$preloader.fadeOut(100);
				
				self._setStage();

				self._panImage( et.clientY );

				self.$modal.on('click', function(){
					self._clearStage();
				});

				self.$modal.on('mousemove', function(evt){
					self._panImage.call( self, evt.clientY );
				});

				$(window).on('resize', function() {
					self._resizeImage();
				} );

			};

		},

		_loadOriginalImage: function() {
			var self = this;
			var preloader = document.createElement('div');
			var img = document.createElement('img');
			
			preloader.className = 'fpimagezoom-preloader';
			self.$preloader = $(preloader);

			if(!img.complete) self.$preloader.fadeIn(100);

			img.src = self.$elem.data('src');

			return img;
		},

		_appendOriginalImageToBody: function(img) {
			var self = this;
			self.$modal.append(img);
			$('body').append(self.$modal);
			$('body').append(self.$preloader);
		},

		_setStage: function() {
			var self = this,
				winWidth = $(window).width();
			self.$modal.fadeIn( 500 );
			self._resizeImage();
			$('html').css({
				'overflow' : 'hidden',
				'width' : winWidth
			});
		},

		_clearStage: function() {
			var self = this;
			self.$modal.fadeOut( 500, function(){
				self.$modal.empty().remove();
				self.$preloader.remove();
				$('html').css({
					'overflow' : 'visible',
					'width' : '100%'
				});
			});
		},

		_resizeImage: function() {
			var self = this;
			var winWidth = $(window).width();
			var winHeight = $(window).height();
			var imageNaturalWidth = self.image.naturalWidth;
			var imageNaturalHeight = self.image.naturalHeight;
			var minWidth = 990;
			var calculatedWidth = (winWidth > imageNaturalWidth) ? winWidth : imageNaturalWidth ;
			var calculatedHeight = (winHeight > imageNaturalHeight) ? winHeight : imageNaturalHeight ;
			var calculatedLeft = (winWidth > imageNaturalWidth) ? 0 : (winWidth - imageNaturalWidth)/2 ;

			this.$modal.css({
				'width': calculatedWidth,
				'left' : calculatedLeft
			});
		},

		_panImage: function( pageY ) {
			var self = this;
			var winHeight = $(window).height();
			self.$image.css({
				'top': -((self.$image.height() - winHeight) / winHeight) * pageY
			});
		}

	}

	$.fn.fpImageZoom = function( options ) {
		if(this.length){

			return this.find('img').addClass('fpimagezoom-image').wrap('<div class="fpimagezoom-item">').on('click', function(evt) {

				var imageZoom = Object.create(ImageZoom);
				imageZoom.init( options, this, evt );
				var obj =$.data(this, 'imageZoom', imageZoom);

			});

		}
	}

})( jQuery, window, document );