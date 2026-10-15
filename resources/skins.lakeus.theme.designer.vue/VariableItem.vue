<template>
	<cdx-field
		:is-fieldset="false"
		class="lakeus-theme-designer-vue-item"
		:class="{ 'lakeus-theme-designer-vue-item--stacked': isStacked }"
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
			<!--
				Text variables are a textarea, not a single-line input. Their values
				are long CSS - a font stack runs to a hundred characters - and a panel
				this narrow showed only the first few of them. A textarea uses the
				width it has by wrapping, and being taller is the point: with a
				sidebar this narrow, one of the two directions has to give.
			-->
			<textarea
				v-else
				:rows="textRows"
				class="lakeus-theme-designer-input-textarea"
				:name="name"
				:id="'lakeus-theme-designer-input-' + name"
				:disabled="autoOn"
			>{{ textValue }}</textarea>
			<!--
				Real Codex checkboxes, driven by the model. They are controlled
				components, so `modelValue` is the only way to set them - which is
				also what removes the old trap: `checked` used to be written
				imperatively by syncVariableUiState(), Vue re-renders from the model
				and drops attributes it does not know about, and all 78 auto-calculate
				boxes came back unticked while the generated stylesheet stayed
				correct. The panel was lying about the state it was in.
			-->
			<div class="lakeus-theme-designer-vue-checkboxes">
				<!--
					`name` is passed because CdxCheckbox declares it as a prop and puts
					it on its inner input, which makes it the one stable hook into the
					component from outside. `id` is not: CdxCheckbox generates its own
					and the id given to it lands on the wrapper div instead.
				-->
				<cdx-checkbox
					v-if="hasAutoBox"
					class="lakeus-theme-designer-auto-calculate-checkbox"
					:name="'auto-calculate-' + name"
					:model-value="autoOn"
					@update:model-value="$emit( 'update:autoOn', $event )"
				>
					{{ autoCalculateLabel }}
				</cdx-checkbox>
				<cdx-checkbox
					class="lakeus-theme-designer-do-not-generate-checkbox"
					:name="'do-not-generate-' + name"
					:model-value="skipped"
					@update:model-value="$emit( 'update:skipped', $event )"
				>
					{{ doNotGenerateLabel }}
				</cdx-checkbox>
			</div>
		</div>
	</cdx-field>
</template>

<script>
// CodexModule injects a virtual './codex.js' exposing exactly the components the
// module's codexComponents list names. There is no '@wikimedia/codex' module to
// depend on; CodexModule refuses it.
const { CdxField, CdxCheckbox } = require( './codex.js' );

// Must be module.exports, not export default: ResourceLoader appends
// `module.exports.template = <compiled template>` to whatever this evaluates to,
// so an ESM default export is silently ignored and the component mounts with no
// template at all.
module.exports = {
	name: 'LakeusThemeDesignerVariableItem',
	components: { CdxField, CdxCheckbox },
	// The two boxes are controlled Codex components, so their state leaves through
	// here and is written to the model by whoever owns it.
	emits: [ 'update:autoOn', 'update:skipped' ],
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
		},
		textRows() {
			// Two rows holds a font stack at this width; anything longer scrolls.
			return 2;
		},
		/**
		 * Whether the label goes above the control rather than beside it.
		 *
		 * A textarea needs the panel's full width, and beside a label it got about
		 * half of it. That is the bug the previous attempt at this hit: the item is
		 * a flex row, the label took half, and `flex: 1 1 100%` on the textarea
		 * resolved against the little that was left.
		 *
		 * @return {boolean}
		 */
		isStacked() {
			return this.kind === 'textarea' || this.kind === 'text';
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

/*
 * Label above, control across the full width. Without this the textarea sits beside
 * the label and gets roughly half the panel, which is too little to read a font
 * stack in.
 */
.lakeus-theme-designer-vue-item--stacked {
	flex-direction: column;
	align-items: stretch;
}

.lakeus-theme-designer-vue-item--stacked > .cdx-field__label.cdx-label {
	flex: 0 0 auto;
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
	/*
	 * `min-height` alone does not bring a native control down to Codex's height -
	 * 36px measured against a 30px Codex button. Something gives these inputs a
	 * taller intrinsic height, so the height is stated outright. The colour swatch
	 * does not need this and is 30px from `min-height` alone.
	 */
	height: 30px;
	min-height: 30px;
	box-sizing: border-box;
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