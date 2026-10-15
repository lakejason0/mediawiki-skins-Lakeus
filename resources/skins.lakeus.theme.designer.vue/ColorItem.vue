<template>
	<cdx-field
		:is-fieldset="false"
		class="lakeus-theme-designer-vue-item"
	>
		<template #label>
			{{ label }}
		</template>
		<div class="lakeus-theme-designer-vue-controls">
			<!--
				`value` is both the initial state and the refreshed state. The panel
				also writes `.value` imperatively when it refreshes the form, and both
				directions read the same model, so they agree.
			-->
			<input
				type="color"
				class="lakeus-theme-designer-input-color"
				list="lakeus-theme-designer-preset-colors"
				:name="name"
				:id="'lakeus-theme-designer-input-' + name"
				:value="colorValue"
			>
			<input
				v-if="allowAlpha"
				type="number"
				step="0.01"
				min="0"
				max="1"
				class="lakeus-theme-designer-input-alpha"
				:placeholder="alphaPlaceholder"
				:name="name + '-alpha'"
				:id="'lakeus-theme-designer-input-' + name + '-alpha'"
				:value="alphaValue"
			>
			<!--
				Left uncontrolled on purpose: the panel's delegated change handler owns
				this checkbox and syncVariableUiState() writes it from the model, so
				binding `checked` here would make a third writer.
			-->
			<label class="lakeus-theme-designer-vue-checkbox">
				<input
					type="checkbox"
					class="lakeus-theme-designer-do-not-generate-checkbox"
					:name="'do-not-generate-' + name"
					:id="'lakeus-theme-designer-input-do-not-generate-' + name"
				>
				{{ doNotGenerateLabel }}
			</label>
		</div>
	</cdx-field>
</template>

<script>
// CodexModule injects a virtual './codex.js' exposing exactly the components the
// module's codexComponents list names. There is no '@wikimedia/codex' module to
// depend on; CodexModule refuses it.
const { CdxField } = require( './codex.js' );

// Must be module.exports, not export default: ResourceLoader appends
// `module.exports.template = <compiled template>` to whatever this evaluates to,
// so an ESM default export is silently ignored and the component mounts with no
// template.
module.exports = {
	name: 'LakeusThemeDesignerColorItem',
	components: { CdxField },
	props: {
		name: { type: String, required: true },
		allowAlpha: { type: Boolean, default: false },
		value: { type: String, default: '#000000' },
		alpha: { type: Number, default: 1 }
	},
	computed: {
		label() {
			return this.$i18n( 'lakeus-theme-designer-' + this.name ).text();
		},
		doNotGenerateLabel() {
			return this.$i18n( 'lakeus-theme-designer-do-not-generate' ).text();
		},
		alphaPlaceholder() {
			return this.$i18n( 'lakeus-theme-designer-alpha-channel' ).text();
		},
		colorValue() {
			// The native picker only accepts an opaque #rrggbb.
			return this.value.slice( 0, 7 );
		},
		alphaValue() {
			return this.alpha;
		}
	}
};
</script>

<style lang="less">
.lakeus-theme-designer-vue-item {
	margin-bottom: 0.75em;
}

.lakeus-theme-designer-vue-controls {
	display: flex;
	align-items: center;
	gap: 0.75em;
	flex-wrap: wrap;
}

.lakeus-theme-designer-vue-checkbox {
	display: inline-flex;
	align-items: center;
	gap: 0.35em;
}
</style>
