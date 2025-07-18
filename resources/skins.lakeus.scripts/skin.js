/* scripts can go here */
window.Lakeus = window.Lakeus || {};
Lakeus.portletOutsideClose = function (id) {
    $(document).on('click', function (event) {
        var container = document.getElementById(id);
        if (container) {
            if (container !== event.target && !container.contains(event.target)) {
                $('#' + id + ' input[type="checkbox"]').prop('checked', false);
            }
        }
    })
}
Lakeus.stickyTOCAutoCollapse = function () {
    $(document).on('click', function (event) {
        var container = document.getElementById('lakeus-sticky-toc');
        if (container) {
            if ( Lakeus.isStickyTOCAutoCollapse ) {
                if ( $(event.target).is('.lakeus-sticky-toc-anchor') || $(event.target).is('.lakeus-sticky-toc-tocnumber') || $(event.target).is('.lakeus-sticky-toc-toctext') ) {
                    $('#lakeus-sticky-toc input[type="checkbox"]').prop('checked', false);
                }
            }
            if ( !$(event.target).closest('#lakeus-sticky-toc').length && !$(event.target).is('#lakeus-sticky-toc') ) {
                $('#lakeus-sticky-toc input[type="checkbox"]').prop('checked', false);
            }
        }
    })
}
$(function () {
    Lakeus.portletOutsideClose('p-personal');
    Lakeus.portletOutsideClose('p-cactions');
    Lakeus.portletOutsideClose('p-lang');
    Lakeus.portletOutsideClose('p-variants');
    Lakeus.portletOutsideClose('p-tb');
    Lakeus.stickyTOCAutoCollapse();
});

$.when(mw.loader.using(['user.options']), $.ready).then(function () {
    Lakeus.isStickyTOCAutoCollapse = !mw.user.options.get('lakeus-sticky-toc-donot-auto-collapse');

	if (mw.user.options.get('lakeus-smooth-scroll-behavior')) {
		$("html, body").addClass('lakeus-smooth-scrolling');
	}
});

/* Experimental overflowing table scrolling, borrowed from Timeless */
mw.hook( 'wikipage.content' ).add( function ( $content ) {
	$content.find( 'div > table:not( table table )' ).wrap( '<div class="content-table-wrapper"><div class="content-table"></div></div>' );
	$content.find( '.content-table-wrapper' ).prepend( '<div class="content-table-left"></div><div class="content-table-right"></div>' );

	/**
	 * Set up borders for experimental overflowing table scrolling
	 *
	 * @param {jQuery} $table
	 */
	function setScrollClass( $table ) {
		var $tableWrapper = $table.parent(),
			$wrapper = $tableWrapper.parent(),
			// wtf browser rtl implementations
			scroll = Math.abs( $tableWrapper.scrollLeft() );

		// 1 instead of 0 because of weird rtl rounding errors or something
		if ( scroll > 1 ) {
			$wrapper.addClass( 'scroll-left' );
		} else {
			$wrapper.removeClass( 'scroll-left' );
		}

		if ( $table.outerWidth() - $tableWrapper.innerWidth() - scroll > 1 ) {
			$wrapper.addClass( 'scroll-right' );
		} else {
			$wrapper.removeClass( 'scroll-right' );
		}
	}

	$content.find( '.content-table' ).on( 'scroll', function () {
		setScrollClass( $( this ).children( 'table' ).first() );

		if ( $content.attr( 'dir' ) === 'rtl' ) {
			$( this ).find( 'caption' ).css( 'margin-right', Math.abs( $( this ).scrollLeft() ) + 'px' );
		} else {
			$( this ).find( 'caption' ).css( 'margin-left', $( this ).scrollLeft() + 'px' );
		}
	} );

	/**
	 * Mark overflowed tables for scrolling
	 */
	function unOverflowTables() {
		$content.find( '.content-table > table' ).each( function () {
			var $table = $( this ),
				$wrapper = $table.parent().parent();
			if ( $table.outerWidth() > $wrapper.outerWidth() ) {
				$wrapper.addClass( 'overflowed' );
				setScrollClass( $table );
			} else {
				$wrapper.removeClass( 'overflowed scroll-left scroll-right fixed-scrollbar-container' );
			}
		} );

		// Set up sticky captions
		$content.find( '.content-table > table > caption' ).each( function () {
			var $container, tableHeight,
				$table = $( this ).parent(),
				$wrapper = $table.parent().parent();

			if ( $table.outerWidth() > $wrapper.outerWidth() ) {
				$container = $( this ).parents( '.content-table-wrapper' );
				$( this ).width( $content.width() );
				tableHeight = $container.innerHeight() - $( this ).outerHeight();

				$container.find( '.content-table-left' ).height( tableHeight );
				$container.find( '.content-table-right' ).height( tableHeight );
			}
		} );
	}

	unOverflowTables();
	$( window ).on( 'resize', unOverflowTables );

	/**
	 * Sticky scrollbars maybe?!
	 */
	$content.find( '.content-table' ).each( function () {
		var $table, $tableWrapper, $spoof, $scrollbar;

		$tableWrapper = $( this );
		$table = $tableWrapper.children( 'table' ).first();

		// Assemble our silly crap and add to page
		$scrollbar = $( '<div>' ).addClass( 'content-table-scrollbar inactive' ).width( $content.width() );
		$spoof = $( '<div>' ).addClass( 'content-table-spoof' ).width( $table.outerWidth() );
		$tableWrapper.parent().prepend( $scrollbar.prepend( $spoof ) );
	} );

	/**
	 * Scoll table when scrolling scrollbar and visa-versa lololol wut
	 */
	$content.find( '.content-table' ).on( 'scroll', function () {
		// Only do this here if we're not already mirroring the spoof
		var $mirror = $( this ).siblings( '.inactive' ).first();

		$mirror.scrollLeft( $( this ).scrollLeft() );
	} );
	$content.find( '.content-table-scrollbar' ).on( 'scroll', function () {
		var $mirror = $( this ).siblings( '.content-table' ).first();

		// Only do this here if we're not already mirroring the table
		// eslint-disable-next-line no-jquery/no-class-state
		if ( !$( this ).hasClass( 'inactive' ) ) {
			$mirror.scrollLeft( $( this ).scrollLeft() );
		}
	} );

	/**
	 * Set active when actually over the table it applies to...
	 */
	function determineActiveSpoofScrollbars() {
		$content.find( '.overflowed .content-table' ).each( function () {
			var $scrollbar = $( this ).siblings( '.content-table-scrollbar' ).first(),
				tableTop, tableBottom, viewBottom, captionHeight;

			// Skip caption
			captionHeight = $( this ).find( 'caption' ).outerHeight();

			if ( !captionHeight ) {
				captionHeight = 0;
			} else {
				// Pad slightly for reasons
				captionHeight += 8;
			}

			tableTop = $( this ).offset().top;
			tableBottom = tableTop + $( this ).outerHeight();
			viewBottom = window.scrollY + document.documentElement.clientHeight;

			if ( tableTop + captionHeight < viewBottom && tableBottom > viewBottom ) {
				$scrollbar.removeClass( 'inactive' );
			} else {
				$scrollbar.addClass( 'inactive' );
			}
		} );
	}

	determineActiveSpoofScrollbars();
	$( window ).on( 'scroll resize', determineActiveSpoofScrollbars );

	/**
	 * Make sure tablespoofs remain correctly-sized?
	 */
	$( window ).on( 'resize', function () {
		$content.find( '.content-table-scrollbar' ).each( function () {
			var width = $( this ).siblings().first().find( 'table' ).first().width();
			$( this ).find( '.content-table-spoof' ).first().width( width );
			$( this ).width( $content.width() );
		} );
	} );
} );