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
	<!--
		The designer edits the scheme picked here, but the page keeps whatever the
		appearance menu has chosen, so a theme for the other scheme cannot be judged
		until that menu matches. Without this the preview just looks wrong, and it
		is not obvious why.
	-->
	<p class="lakeus-theme-designer-vue-hint">
		{{ hint }}
	</p>
</template>

<script>
module.exports = {
	name: 'LakeusThemeDesignerColorSchemeFieldset',
	props: {
		schemes: { type: Array, default: () => [] },
		// Which scheme is being edited. Bound, not written imperatively: Vue drops
		// attributes it does not know about when it re-renders from props, which is
		// how the auto-calculate boxes once came back unticked.
		current: { type: String, default: 'light' }
	},
	computed: {
		legend() {
			return this.$i18n( 'lakeus-theme-designer-color-scheme' ).text();
		},
		hint() {
			return this.$i18n( 'lakeus-theme-designer-color-scheme-hint' ).text();
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

<style lang="less">
.lakeus-theme-designer-vue-hint {
	margin: 0.5em 0 0;
	font-size: 0.875em;
	opacity: 0.75;
}
</style>
