<template>
	<fs-page>
		<fs-crud ref="crudRef" v-bind="crudBinding">
			<template #header-middle>
				<el-tabs v-model="tabActivted" @tab-click="onTabClick">
					<el-tab-pane label="全息基因" name="send"></el-tab-pane>
					<el-tab-pane label="减水剂" name="receive"></el-tab-pane>
					<el-tab-pane label="引气剂" name="yinqi"></el-tab-pane>
					<el-tab-pane label="粗骨料" name="cugu"></el-tab-pane>
					<el-tab-pane label="细骨料" name="xigu"></el-tab-pane>
					<el-tab-pane label="掺合料" name="canhe"></el-tab-pane>
					<el-tab-pane label="粉煤灰" name="fenmei"></el-tab-pane>
					<el-tab-pane label="矿渣" name="kz"></el-tab-pane>
					<el-tab-pane label="超细矿渣" name="cxkz"></el-tab-pane>
					<el-tab-pane label="硅灰" name="gh"></el-tab-pane>
					<el-tab-pane label="石灰石" name="shs"></el-tab-pane>
					<el-tab-pane label="氧化物百分比" name="yhw"></el-tab-pane>
					<el-tab-pane label="孔隙特征" name="kxtz"></el-tab-pane>
					<el-tab-pane label="氯离子抗渗性能" name="llz"></el-tab-pane>
					<el-tab-pane label="碳化表征" name="thbz"></el-tab-pane>
					<el-tab-pane label="抗冻性" name="kdx"></el-tab-pane>
					<el-tab-pane label="文献信息" name="wxxx"></el-tab-pane>
				</el-tabs>
			</template>
		</fs-crud>
	</fs-page>
</template>
  
<script lang="ts" setup name="concrete_data">
import { ref, onMounted } from 'vue';
import { useExpose, useCrud } from '@fast-crud/fast-crud';
import { createCrudOptions } from './crud';
// crud组件的ref
const crudRef = ref();
// crud 配置的ref
const crudBinding = ref();
// 暴露的方法
const { crudExpose } = useExpose({ crudRef, crudBinding });
//tab选择

// const tabActivted = ref('send');
// // const crudOptions1 = ref({
// // 	/* 第一个表格的配置... */
// // });

// // const crudOptions2 = ref({
// // 	/* 第二个表格的配置... */
// // });

// let crudOptions1 = createCrudOptions({ crudExpose, tabActivted });
// // let crudOptions2 = createCrudOptions1({ crudExpose, tabActivted });
// // const crudBinding = ref(crudOptions1);
// // const { crudExpose } = useExpose({ crudRef, crudBinding });
// const onTabClick = (tab: any) => {
// 	if (tab.name === 'send') {
// 		crudBinding.value = crudOptions1;
// 		crudExpose.doRefresh();
// 	} else if (tab.name === 'receive') {
// 		// crudBinding.value = crudOptions2;
// 		crudExpose.doRefresh();
// 	}
// 	// 其他标签页...
// };

// const tabActivted = ref('send');
// const onTabClick = (tab: any) => {
// 	const { paneName } = tab;
// 	if (tabActivted.value === 'send') {
// 		const { crudOptions } = createCrudOptions({ crudExpose, tabActivted });
// 		const { resetCrudOptions } = useCrud({ crudExpose, crudOptions });
// 	}
// 	// else {
// 	// 	const { crudOptions } = createCrudOptions2({ crudExpose, tabActivted });
// 	// }
// 	tabActivted.value = paneName;
// 	crudExpose.doRefresh();
// };

const tabActivted = ref('send');
const onTabClick = (tab: any) => {
	const { paneName } = tab;
	tabActivted.value = paneName;
	crudExpose.doRefresh();
};
// 你的crud配置
let { crudOptions } = createCrudOptions({ crudExpose, tabActivted });
// // 初始化crud配置
const { resetCrudOptions } = useCrud({ crudExpose, crudOptions });

// 页面打开后获取列表数据
onMounted(() => {
	crudExpose.doRefresh();
});
</script>


<style scoped>
</style>
 