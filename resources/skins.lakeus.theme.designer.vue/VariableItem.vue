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
/*
 * CdxField lays a field out as a block: label, then control underneath. That is
 * right for a form page and wrong for ninety-nine of them in a sidebar, where it
 * cost 97px per variable against master's thirty-odd. Its APPEARANCE is kept -
 * the label styling, the control styling, all of it - and only the direction
 * changes, so the field reads as one row.
 */
.lakeus-theme-designer-vue-item {
	display: flex;
	align-items: center;
	gap: 0 0.6em;
	flex-wrap: wrap;
	// The gap between fields has to be clearly larger than the gap inside one, or
	// a title stops reading as belonging to the controls beside it. The inside gap
	// is the label's own padding plus the row gap above; this is the outside one.
	margin: 0 0 1.1em;
}

.lakeus-theme-designer-vue-item > .cdx-field__label.cdx-label {
	flex: 0 1 auto;
	padding-bottom: 0 !important;
}

.lakeus-theme-designer-vue-item > .cdx-field__label.cdx-label .cdx-label__label {
	margin: 0 !important;
}

.lakeus-theme-designer-vue-item > .cdx-field__control {
	flex: 1 1 auto;
	min-width: 0;
}

.lakeus-theme-designer-vue-item > .cdx-field__help-text {
	display: none;
}

.lakeus-theme-designer-vue-controls {
	display: flex;
	align-items: center;
	gap: 0.25em 0.6em;
	flex-wrap: wrap;
	min-width: 0;
}

/*
 * Native controls, sized to sit next to Codex's own. Codex has no colour input,
 * so the swatch stays native and has to be made to match - a 21px text field or a
 * 27px swatch beside a 30px Codex button reads as a mistake. `min-height` in px
 * rather than em because the font size differs between these elements (13.33px on
 * a colour input, 16px on a text one) and em would give two different heights.
 */
.lakeus-theme-designer-input-color {
	width: 3em;
	flex: none;
	min-height: 30px;
}

.lakeus-theme-designer-input-text,
.lakeus-theme-designer-input-textarea {
	width: 12em;
	max-width: 100%;
	min-width: 0;
	min-height: 30px;
}

/*
 * The colour-picker fallback rewrites a swatch's type attribute to `text`, which
 * makes it a text field needing a text field's width. This is why the width
 * cannot be decided by class alone. Codex has no colour input of its own, so this
 * stays a native one.
 */
.lakeus-theme-designer-input-color[type="text"] {
	width: 12em;
	max-width: 100%;
	min-height: 30px;
}

.lakeus-theme-designer-input-alpha {
	width: 4.5em;
	min-width: 0;
	min-height: 30px;
}

.lakeus-theme-designer-vue-checkboxes {
	display: flex;
	align-items: center;
	gap: 0.25em 0.9em;
	flex-wrap: wrap;
}

.lakeus-theme-designer-vue-checkbox {
	display: inline-flex;
	align-items: center;
	gap: 0.3em;
	margin: 0;
	white-space: nowrap;
}
</style>