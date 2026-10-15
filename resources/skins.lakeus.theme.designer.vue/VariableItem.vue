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
				Colour and text are separate branches rather than one input with a
				computed type, because the panel's own "colour picker fallback"
				checkbox flips the colour inputs' type attribute and branching on that
				attribute once made colour values collapse to raw strings.
			-->
			<template v-if="kind === 'color'">
				<!--
					`disabled` is BOUND from the model, not written imperatively.
					syncVariableUiState() did write it, but Vue re-renders from the
					model and drops attributes it does not know about, so an
					auto-calculated variable's field silently became editable again -
					which the golden scenarios caught, as twelve of them stopped
					reporting "no editable field".
				-->
				<input
					type="color"
					class="lakeus-theme-designer-input-color"
					list="lakeus-theme-designer-preset-colors"
					:name="name"
					:id="'lakeus-theme-designer-input-' + name"
					:disabled="autoOn"
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
					:disabled="autoOn"
					:value="alphaValue"
				>
			</template>
			<textarea
				v-else-if="kind === 'textarea'"
				class="lakeus-theme-designer-input-textarea"
				:name="name"
				:id="'lakeus-theme-designer-input-' + name"
				:disabled="autoOn"
			>{{ textValue }}</textarea>
			<input
				v-else
				type="text"
				class="lakeus-theme-designer-input-text"
				:name="name"
				:id="'lakeus-theme-designer-input-' + name"
				:disabled="autoOn"
				:value="textValue"
			>
			<!--
				Both boxes are BOUND, not written imperatively. Writing `checked`
				from syncVariableUiState() looked like it worked and did not: Vue
				re-renders from the model and drops attributes it does not know
				about, so all 78 auto-calculate boxes came back unticked while the
				generated stylesheet stayed correct. The panel was lying about the
				state it was in - the same trap `disabled` fell into.
			-->
			<div class="lakeus-theme-designer-vue-checkboxes">
				<label v-if="hasAutoBox" class="lakeus-theme-designer-vue-checkbox">
					<input
						type="checkbox"
						class="lakeus-theme-designer-auto-calculate-checkbox"
						:name="'auto-calculate-' + name"
						:id="'lakeus-theme-designer-input-auto-calculate-' + name"
						:checked="autoOn"
					>
					{{ autoCalculateLabel }}
				</label>
				<label class="lakeus-theme-designer-vue-checkbox">
					<input
						type="checkbox"
						class="lakeus-theme-designer-do-not-generate-checkbox"
						:name="'do-not-generate-' + name"
						:id="'lakeus-theme-designer-input-do-not-generate-' + name"
						:checked="skipped"
					>
					{{ doNotGenerateLabel }}
				</label>
			</div>
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
// template at all.
module.exports = {
	name: 'LakeusThemeDesignerVariableItem',
	components: { CdxField },
	props: {
		name: { type: String, required: true },
		kind: { type: String, default: 'color' },
		allowAlpha: { type: Boolean, default: false },
		hasAutoBox: { type: Boolean, default: false },
		// Bound onto the checkboxes and the inputs. Writing these imperatively
		// looked like it worked and did not, because Vue re-renders from the model
		// and drops attributes it does not know about - which is how all 78
		// auto-calculate boxes came back unticked, and how an auto-calculated field
		// once came back editable.
		autoOn: { type: Boolean, default: false },
		skipped: { type: Boolean, default: false },
		// Whether the rule, not the author, is in charge of this value. Bound onto
		// the inputs rather than written imperatively: Vue re-renders from the model
		// and would drop an attribute it does not know about.
		autoOn: { type: Boolean, default: false },
		value: { type: String, default: '' },
		alpha: { type: Number, default: 1 }
	},
	computed: {
		label() {
			return this.$i18n( 'lakeus-theme-designer-' + this.name ).text();
		},
		doNotGenerateLabel() {
			return this.$i18n( 'lakeus-theme-designer-do-not-generate' ).text();
		},
		autoCalculateLabel() {
			return this.$i18n( 'lakeus-theme-designer-auto-calculate' ).text();
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
		},
		textValue() {
			return this.value;
		}
	}
};
</script>

<style lang="less">
// CdxField renders its class onto THIS element, so these are its own margins.
// The first attempt used `.lakeus-theme-designer-vue-item .cdx-field`, a
// descendant selector that matched nothing, so Codex's 16px top margin stayed.
.lakeus-theme-designer-vue-item {
	margin: 0 0 0.35em;
}

// Codex spaces a field out as if it stood alone: 4px of label padding, 4px of
// label margin on each side, and a help-text row. Stacked 99 deep that is most of
// the panel's height in whitespace.
.lakeus-theme-designer-vue-item .cdx-field__label.cdx-label {
	padding-bottom: 1px !important;
}

.lakeus-theme-designer-vue-item .cdx-label .cdx-label__label {
	margin: 0 !important;
}

.lakeus-theme-designer-vue-item .cdx-field__help-text {
	margin-top: 0;
}

.lakeus-theme-designer-vue-item .cdx-field__help-text:empty {
	display: none;
}

.lakeus-theme-designer-vue-controls {
	display: flex;
	align-items: center;
	gap: 0.35em 0.75em;
	flex-wrap: wrap;
	min-width: 0;
}

// The panel's width is driven by its contents, so these have to be FIXED widths.
// `width: 100%` looked reasonable and made the panel collapse to a narrow strip:
// each field shrank to fit a container that was itself shrinking to fit them.
.lakeus-theme-designer-input-color {
	width: 3em;
	flex: none;
}

.lakeus-theme-designer-input-text,
.lakeus-theme-designer-input-textarea {
	width: 12em;
	max-width: 100%;
	min-width: 0;
}

// The colour-picker fallback rewrites a swatch's type attribute to `text`, which
// makes it a text field needing a text field's width. This is why the width
// cannot be decided by class alone.
.lakeus-theme-designer-input-color[type="text"] {
	width: 12em;
	max-width: 100%;
}

.lakeus-theme-designer-input-alpha {
	width: 4.5em;
	min-width: 0;
}

// A row of its own, so a long variable name cannot leave one box next to the
// swatch and the other wrapped onto the following line.
.lakeus-theme-designer-vue-checkboxes {
	flex-basis: 100%;
	display: flex;
	align-items: center;
	gap: 0.35em 1em;
	flex-wrap: wrap;
}

.lakeus-theme-designer-vue-checkbox {
	display: inline-flex;
	align-items: center;
	gap: 0.35em;
	// Codex gives every label a 4px vertical margin; these sit inside a row of
	// their own already.
	margin: 0;
}
</style>
