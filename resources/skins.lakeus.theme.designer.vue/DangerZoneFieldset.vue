<template>
	<!-- A fragment: the host is already the <fieldset>. -->
	<legend class="lakeus-theme-designer-title">
		{{ legend }}
	</legend>
	<!--
		The click handlers live on the panel root as delegated handlers and match
		these ids, so rendering the buttons here does not need to bind anything.
	-->
	<button
		v-for="action in actions"
		:key="action.id"
		type="button"
		:id="action.id"
		class="lakeus-theme-designer-action-button lakeus-theme-designer-action-button-danger"
	>{{ labelFor( action ) }}</button>
	<label>
		<input
			type="checkbox"
			id="lakeus-theme-designer-color-picker-fallback-checkbox"
		>
		{{ fallbackLabel }}
	</label>
</template>

<script>
module.exports = {
	name: 'LakeusThemeDesignerDangerZoneFieldset',
	data() {
		return {
			actions: [
				{ id: 'lakeus-theme-designer-reset-theme-button', message: 'lakeus-theme-designer-reset-theme' },
				{ id: 'lakeus-theme-designer-reload-button', message: 'lakeus-theme-designer-reload' },
				{ id: 'lakeus-theme-designer-invert-auto-calculate-selection-button', message: 'lakeus-theme-designer-invert-auto-calculate-selection' },
				{ id: 'lakeus-theme-designer-unselect-do-not-generate-selection-button', message: 'lakeus-theme-designer-unselect-do-not-generate-selection' }
			]
		};
	},
	computed: {
		legend() {
			return this.$i18n( 'lakeus-theme-designer-danger-zone' ).text();
		},
		fallbackLabel() {
			return this.$i18n( 'lakeus-theme-designer-color-picker-fallback' ).text();
		}
	},
	methods: {
		/**
		 * @param {Object} action
		 * @return {string}
		 */
		labelFor( action ) {
			return this.$i18n( action.message ).text();
		}
	}
};
</script>
