/**
 * Named derivation rules for the Theme Designer's variable table.
 *
 * The table used to carry 99 anonymous `calculate` closures that each repeated a
 * long expression such as
 *
 *     return i || Lakeus.changeColorBrightnessByContrast(
 *         Lakeus.variablesList[ this.calculateFrom[ 0 ] ].value,
 *         Lakeus.calculateRGBAActualValue(
 *             Lakeus.variablesList[ this.calculateFrom[ 1 ] ].value,
 *             Lakeus.variablesList[ this.calculateFrom[ 2 ] ].value
 *         ),
 *         1, 1
 *     );
 *
 * Nothing in that says what the rule MEANS; you had to read it and work it out.
 * The same rule now reads
 *
 *     calculate: derive.nudge(
 *         colour.of( 'color-link' ),
 *         colour.of( 'background-color-content' ).flattenOver( colour.of( 'background-color-body' ) ),
 *         { brightenIfDark: 1, darkenIfLight: 1 }
 *     )
 *
 * Two things make that work:
 *
 *  - `colour.*` expressions are lazy values that also know WHICH variables they
 *    read, so `calculateFrom` no longer has to be maintained separately. The old
 *    positional `this.calculateFrom[ 0 ]` coupling is gone: renaming a variable in
 *    a rule cannot silently reorder anything.
 *  - every rule carries its sources on `.sources`, which is what
 *    Lakeus.sourceFingerprint() reads to decide whether a derived value is still
 *    up to date.
 *
 * @param {Object} Lakeus The shared namespace.
 * @param {Function} chroma The vendored chroma.js factory.
 * @return {Object} `{ colour, derive }`.
 */
module.exports = function ( Lakeus, chroma ) {

	/**
	 * The current value of another variable.
	 *
	 * @param {string} name
	 * @return {*}
	 */
	function valueOf( name ) {
		return Lakeus.variablesList[ name ].value;
	}

	/**
	 * Build a lazy value that remembers which variables it reads.
	 *
	 * @param {string[]} sources
	 * @param {Function} get
	 * @return {Object}
	 */
	function expr( sources, get ) {
		const self = {
			sources,
			get,
			/**
			 * @param {number} amount
			 * @return {Object}
			 */
			brighten( amount ) {
				return expr( sources, () => get().brighten( amount ) );
			},
			/**
			 * @param {number} amount
			 * @return {Object}
			 */
			darken( amount ) {
				return expr( sources, () => get().darken( amount ) );
			},
			/**
			 * @param {number} amount
			 * @return {Object}
			 */
			fade( amount ) {
				return expr( sources, () => get().alpha( amount ) );
			},
			/**
			 * chroma's luminance, a NUMBER - used as the light/dark candidate of
			 * pickForBackground rather than as a colour.
			 *
			 * @param {number} amount
			 * @return {Object}
			 */
			luminance( amount ) {
				return expr( sources, () => get().luminance( amount ) );
			},
			/**
			 * @param {number} degrees
			 * @return {Object}
			 */
			hueShift( degrees ) {
				return expr( sources, () => get().set( 'hsl.h', '+' + degrees ) );
			},
			/**
			 * Composite this colour over another, resolving transparency the way
			 * the browser will. Called with nothing, it composites over white,
			 * which is what flattenColor() assumes by default.
			 *
			 * @param {Object} [over]
			 * @return {Object}
			 */
			flattenOver( over ) {
				if ( !over ) {
					return expr( sources, () => Lakeus.flattenColor( get() ) );
				}
				return expr(
					[ ...sources, ...over.sources ],
					() => Lakeus.flattenColor( get(), over.get() )
				);
			}
		};
		return self;
	}

	/**
	 * The value expressions a rule can be built from.
	 */
	const colour = {
		/**
		 * Another variable's value.
		 *
		 * @param {string} name
		 * @return {Object}
		 */
		of: ( name ) => expr( [ name ], () => valueOf( name ) ),

		/**
		 * A fixed colour.
		 *
		 * @param {string} hex
		 * @return {Object}
		 */
		constant: ( hex ) => expr( [], () => chroma( hex ) ),

		/**
		 * A plain value that is not a colour - a CSS filter string, for instance.
		 *
		 * @param {string} text
		 * @return {Object}
		 */
		text: ( text ) => expr( [], () => text ),

		/**
		 * The value that contrasts with a background, as a COLOUR.
		 *
		 * This is the value-level form of `derive.textOn`: it appears nested inside
		 * other rules, for instance as the reference colour of a nudge.
		 *
		 * With no candidates the built-in black/white pair is used and the result is
		 * wrapped in a colour; with candidates, whatever they produce is returned,
		 * which is how the icon filters pass CSS filter strings through.
		 *
		 * @param {Object} background
		 * @param {Object} [options]
		 * @param {Object} [options.onLight]
		 * @param {Object} [options.onDark]
		 * @return {Object}
		 */
		pickFor( background, options ) {
			const o = options || {};
			const usingCandidates = !!( o.onLight || o.onDark );
			const sources = [ ...background.sources ];
			if ( usingCandidates ) {
				sources.push( ...( o.onLight ? o.onLight.sources : [] ) );
				sources.push( ...( o.onDark ? o.onDark.sources : [] ) );
			}
			return expr( sources, () => usingCandidates ?
				Lakeus.pickForBackground(
					background.get(),
					o.onLight ? o.onLight.get() : undefined,
					o.onDark ? o.onDark.get() : undefined
				) :
				chroma( Lakeus.pickForBackground( background.get() ) ) );
		}
	};

	/**
	 * Attach the source list to a rule.
	 *
	 * @param {string[]} sources
	 * @param {Function} fn
	 * @return {Function}
	 */
	function rule( sources, fn ) {
		fn.sources = [ ...new Set( sources ) ];
		return fn;
	}

	const derive = {
		/**
		 * No derivation: the author's value is the value.
		 *
		 * @return {Function}
		 */
		manual: () => rule( [], ( i ) => i ),

		/**
		 * Take another variable's value; fall back to this one's own default if
		 * that variable is empty.
		 *
		 * @param {string} name
		 * @return {Function}
		 */
		inherit: ( name ) => rule( [ name ], function ( i, entry ) {
			return i || valueOf( name ) || entry.default;
		} ),

		/**
		 * Take another variable's value, with no fallback.
		 *
		 * @param {string} name
		 * @return {Function}
		 */
		alias: ( name ) => rule( [ name ], ( i ) => i || valueOf( name ) ),

		/**
		 * @param {string} name
		 * @param {number} amount
		 * @return {Function}
		 */
		brighten: ( name, amount ) => rule( [ name ], ( i ) => i || valueOf( name ).brighten( amount ) ),

		/**
		 * @param {string} name
		 * @param {number} amount
		 * @return {Function}
		 */
		darken: ( name, amount ) => rule( [ name ], ( i ) => i || valueOf( name ).darken( amount ) ),

		/**
		 * @param {string} name
		 * @param {number} amount
		 * @return {Function}
		 */
		fade: ( name, amount ) => rule( [ name ], function ( i, entry ) {
			return i || valueOf( name ).alpha( amount ) || entry.default;
		} ),

		/**
		 * @param {string} name
		 * @param {number} degrees
		 * @return {Function}
		 */
		hueShift: ( name, degrees ) => rule( [ name ], function ( i, entry ) {
			return i || valueOf( name ).set( 'hsl.h', '+' + degrees ) || entry.default;
		} ),

		/**
		 * A readable value on top of `background`.
		 *
		 * With no candidates, the built-in black/white pair is used and the result
		 * is a colour object. With candidates, whatever they produce is returned -
		 * which is why the icon filters can pass CSS filter strings here.
		 *
		 * @param {Object} background
		 * @param {Object} [options]
		 * @param {Object} [options.onLight] Used when the background is light.
		 * @param {Object} [options.onDark] Used when the background is dark.
		 * @param {number} [options.alpha]
		 * @return {Function}
		 */
		textOn( background, options ) {
			const o = options || {};
			const picked = colour.pickFor( background, o );
			return rule( picked.sources, ( i ) => {
				if ( i ) {
					return i;
				}
				const value = picked.get();
				return o.alpha === undefined ? value : value.alpha( o.alpha );
			} );
		},

		/**
		 * Move `colour` away from `background`'s brightness: brighten it when the
		 * background is dark, darken it when the background is light.
		 *
		 * The two amounts are separate because they are separately meaningful - most
		 * rules happen to pass the same number, but that is a coincidence of the
		 * current palette rather than the shape of the rule.
		 *
		 * @param {Object} colourExpr
		 * @param {Object} background
		 * @param {Object} amounts
		 * @param {number} amounts.brightenIfDark
		 * @param {number} amounts.darkenIfLight
		 * @param {number} [amounts.alpha] Fade the result, for translucent borders.
		 * @return {Function}
		 */
		nudge( colourExpr, background, amounts ) {
			return rule(
				[ ...colourExpr.sources, ...background.sources ],
				( i ) => {
					if ( i ) {
						return i;
					}
					const nudged = Lakeus.nudgeForContrast(
						colourExpr.get(),
						background.get(),
						amounts.brightenIfDark,
						amounts.darkenIfLight
					);
					return amounts.alpha === undefined ? nudged : nudged.alpha( amounts.alpha );
				}
			);
		}
	};

	return { colour, derive };
};
