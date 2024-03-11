<template>
  <fs-page>
    <fs-crud ref="crudRef">
      <template #cell_url="scope">
        <el-tag size="small">{{ scope.row.url }}</el-tag>
      </template>
    </fs-crud>

    <permission ref="rolePermission"></permission>
  </fs-page>
</template>