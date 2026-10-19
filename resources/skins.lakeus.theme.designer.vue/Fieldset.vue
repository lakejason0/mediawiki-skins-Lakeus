<template>
	<!--
		A fragment, not a wrapper element. The host this mounts into is already the
		<fieldset>, so rendering another one nested them and duplicated its id.
	-->
	<legend class="lakeus-theme-designer-title">
		{{ legend }}
	</legend>
	<variable-item
		v-for="item in items"
		:key="item.name"
		:name="item.name"
		:kind="item.kind"
		:allow-alpha="item.allowAlpha"
		:has-auto-box="item.hasAutoBox"
		:auto-on="item.autoOn"
		:skipped="item.skipped"
		:value="item.value"
		:alpha="item.alpha"
		@update:auto-on="setFlag( item.name, 'autoOn', $event )"
		@update:skipped="setFlag( item.name, 'skipped', $event )"
	/>
</template>

<script>
const VariableItem = require( './VariableItem.vue' );

module.exports = {
	name: 'LakeusThemeDesignerFieldset',
	components: { VariableItem },
	emits: [ 'update-flag' ],
	props: {
		fieldset: { type: String, required: true },
		variables: { type: Array, default: () => [] }
	},
	data() {
		return {
			// Filled by applyItems() right after mount and again whenever the
			// designer refreshes the form. Data rather than a prop: the designer
			// holds the values, and writing to a prop from outside is not allowed -
			// doing that threw under strict mode and took the whole form flush with
			// it.
			items: []
		};
	},
	computed: {
		legend() {
			return this.$i18n( this.fieldset ).text();
		}
	},
	methods: {
		/**
		 * A checkbox was toggled.
		 *
		 * The item is updated here as well as announced upwards, because these are
		 * controlled components: if the rendered copy kept the old value, Vue would
		 * put it straight back and the box would appear not to respond.
		 *
		 * @param {string} name
		 * @param {string} field 'autoOn' or 'skipped'.
		 * @param {boolean} value
		 */
		setFlag( name, field, value ) {
			const item = this.items.find( ( candidate ) => candidate.name === name );
			if ( item ) {
				item[ field ] = value;
			}
			this.$emit( 'update-flag', name, field, value );
		},
		/**
		 * @param {Array<Object>} items
		 */
		applyItems( items ) {
			this.items = items;
		}
	}
};
</script>

<style lang="less">
.lakeus-theme-designer-vue-item:last-child {
	margin-bottom: 0;
}
</style>
