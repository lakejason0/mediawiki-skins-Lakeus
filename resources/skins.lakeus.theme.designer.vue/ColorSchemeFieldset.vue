<template>
	<!-- A fragment: the host is already the <fieldset>. -->
	<legend class="lakeus-theme-designer-title">
		{{ legend }}
	</legend>
	<label v-for="scheme in schemes" :key="scheme">
		<input
			type="radio"
			class="lakeus-theme-designer-color-scheme-radio"
			name="lakeus-theme-designer-color-scheme"
			:value="scheme"
			:checked="scheme === current"
		>
		{{ labelFor( scheme ) }}
	</label>
</template>

<script>
module.exports = {
	name: 'LakeusThemeDesignerColorSchemeFieldset',
	props: {
		schemes: { type: Array, default: () => [] },
		// Which scheme is being edited. Bound, not written imperatively: Vue drops
		// attributes it does not know about when it re-renders from props, which is
		// how the auto-calculate inputs once came back editable.
		current: { type: String, default: 'light' }
	},
	computed: {
		legend() {
			return this.$i18n( 'lakeus-theme-designer-color-scheme' ).text();
		}
	},
	methods: {
		/**
		 * @param {string} scheme
		 * @return {string}
		 */
		labelFor( scheme ) {
			return this.$i18n( 'lakeus-theme-designer-color-scheme-' + scheme ).text();
		}
	}
};
</script>
