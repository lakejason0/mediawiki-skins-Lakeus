<template>
	<!--
		A fragment, not a wrapper element. The host this mounts into is already the
		<fieldset>, so rendering another one nested them and duplicated its id.
	-->
	<legend class="lakeus-theme-designer-title">
		{{ legend }}
	</legend>
	<color-item
		v-for="item in items"
		:key="item.name"
		:name="item.name"
		:allow-alpha="item.allowAlpha"
		:value="item.value"
		:alpha="item.alpha"
	/>
</template>

<script>
const ColorItem = require( './ColorItem.vue' );

module.exports = {
	name: 'LakeusThemeDesignerFieldset',
	components: { ColorItem },
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
