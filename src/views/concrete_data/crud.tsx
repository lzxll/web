import * as api from './api';
import { dict, useCompute, PageQuery, AddReq, DelReq, EditReq, CrudExpose, CrudOptions } from '@fast-crud/fast-crud';
import tableSelector from '/@/components/tableSelector/index.vue';
import { shallowRef, computed, ref, inject } from 'vue';
import manyToMany from '/@/components/manyToMany/index.vue';
import { auth } from '/@/utils/authFunction'
const { compute } = useCompute();

interface CreateCrudOptionsTypes {
    crudOptions: CrudOptions;
}

export const createCrudOptions = function ({ crudExpose, tabActivted }: { crudExpose: CrudExpose; tabActivted: any }): CreateCrudOptionsTypes {
    const pageRequest = async (query: PageQuery) => {
        // if (tabActivted.value === 'receive') {
        //     return await api.GetSelfReceive(query);
        // }
        //  else if (tabActivted.value === 'send') {
        //     return await api.GetAllDatabase(query);
        // }
        // 下面把所有的if补充完整
        return await api.GetList(query);
    };
    const editRequest = async ({ form, row }: EditReq) => {
        form.id = row.id;
        return await api.UpdateObj(form);
    };
    const delRequest = async ({ row }: DelReq) => {
        return await api.DelObj(row.id);
    };
    const addRequest = async ({ form }: AddReq) => {
        return await api.AddObj(form);
    };

    const viewRequest = async ({ row }: { row: any }) => {
        return await api.GetObj(row.id);
    };

    const IsReadFunc = computed(() => {
        return tabActivted.value === 'receive';
    });

    // const crudOptions1 = ref({
    //     request: {
    //         pageRequest,
    //         addRequest,
    //         editRequest,
    //         delRequest,
    //     },
    //     actionbar: {
    //         buttons: {
    //             add: {
    //                 show: computed(() => {
    //                     return tabActivted.value !== 'receive' && auth('messageCenter:Create');
    //                 })
    //             },
    //         }
    //     },
    //     rowHandle: {
    //         fixed: 'right',
    //         width: 150,
    //         buttons: {
    //             edit: {
    //                 show: false,
    //             },
    //             view: {
    //                 text: "查看",
    //                 type: 'text',
    //                 iconRight: 'View',
    //                 show: auth("messageCenter:Search"),
    //                 click({ index, row }) {
    //                     crudExpose.openView({ index, row });
    //                     if (tabActivted.value === 'receive') {
    //                         viewRequest({ row });
    //                         crudExpose.doRefresh();
    //                     }
    //                 },
    //             },
    //             remove: {
    //                 iconRight: 'Delete',
    //                 type: 'text',
    //                 show: auth('messageCenter:Delete')
    //             },
    //         },
    //     },
    //     columns: {
    //         id: {
    //             title: 'id',
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         title: {
    //             title: '标题',
    //             search: {
    //                 show: true,
    //             },
    //             type: ['text', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             form: {
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //                 component: { span: 24, placeholder: '请输入标题' },
    //             },
    //         },
    //         is_read: {
    //             title: '是否已读',
    //             type: 'dict-select',
    //             column: {
    //                 show: IsReadFunc.value,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { label: '已读', value: true, color: 'success' },
    //                     { label: '未读', value: false, color: 'danger' },
    //                 ],
    //             }),
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         target_type: {
    //             title: '目标类型',
    //             type: ['dict-radio', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { value: 0, label: '按用户' },
    //                 ]
    //             }),
    //         },
    //     },
    // });
    // const crudOptions2 = ref({
    //     request: {
    //         pageRequest,
    //         addRequest,
    //         editRequest,
    //         delRequest,
    //     },
    //     actionbar: {
    //         buttons: {
    //             add: {
    //                 show: computed(() => {
    //                     return tabActivted.value !== 'receive' && auth('messageCenter:Create');
    //                 })
    //             },
    //         }
    //     },
    //     rowHandle: {
    //         fixed: 'right',
    //         width: 150,
    //         buttons: {
    //             edit: {
    //                 show: false,
    //             },
    //             view: {
    //                 text: "查看",
    //                 type: 'text',
    //                 iconRight: 'View',
    //                 show: auth("messageCenter:Search"),
    //                 click({ index, row }) {
    //                     crudExpose.openView({ index, row });
    //                     if (tabActivted.value === 'receive') {
    //                         viewRequest({ row });
    //                         crudExpose.doRefresh();
    //                     }
    //                 },
    //             },
    //             remove: {
    //                 iconRight: 'Delete',
    //                 type: 'text',
    //                 show: auth('messageCenter:Delete')
    //             },
    //         },
    //     },
    //     columns: {
    //         id: {
    //             title: 'id',
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         title: {
    //             title: '标题',
    //             search: {
    //                 show: true,
    //             },
    //             type: ['text', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             form: {
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //                 component: { span: 24, placeholder: '请输入标题' },
    //             },
    //         },
    //         is_read: {
    //             title: '是否已读',
    //             type: 'dict-select',
    //             column: {
    //                 show: IsReadFunc.value,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { label: '已读', value: true, color: 'success' },
    //                     { label: '未读', value: false, color: 'danger' },
    //                 ],
    //             }),
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         target_type: {
    //             title: '目标类型',
    //             type: ['dict-radio', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { value: 0, label: '按用户' },
    //                     { value: 1, label: '按角色' },
    //                     {
    //                         value: 2,
    //                         label: '按部门',
    //                     },
    //                     { value: 3, label: '通知公告' },
    //                 ],
    //             }),
    //             form: {
    //                 component: {
    //                     optionName: 'el-radio-button',
    //                 },
    //                 rules: [
    //                     {
    //                         required: true,
    //                         message: '必选项',
    //                         // @ts-ignore
    //                         trigger: ['blur', 'change'],
    //                     },
    //                 ],
    //             },
    //         },
    //         target_user: {
    //             title: '目标用户',
    //             search: {
    //                 disabled: true,
    //             },
    //             form: {
    //                 component: {
    //                     name: shallowRef(tableSelector),
    //                     vModel: 'modelValue',
    //                     displayLabel: compute(({ row }) => {
    //                         if (row) {
    //                             return row.user_info;
    //                         }
    //                         return null;
    //                     }),
    //                     tableConfig: {
    //                         url: '/api/system/user/',
    //                         label: 'name',
    //                         value: 'id',
    //                         isMultiple: true,
    //                         columns: [
    //                             {
    //                                 prop: 'name',
    //                                 label: '用户名称',
    //                                 width: 120,
    //                             },
    //                             {
    //                                 prop: 'phone',
    //                                 label: '用户电话',
    //                                 width: 120,
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 show: compute(({ form }) => {
    //                     return form.target_type === 0;
    //                 }),
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //             },
    //             column: {
    //                 show: false,
    //                 component: {
    //                     name: shallowRef(manyToMany),
    //                     vModel: 'modelValue',
    //                     bindValue: compute(({ row }) => {
    //                         return row.user_info;
    //                     }),
    //                     displayLabel: 'name',
    //                 },
    //             },
    //         },
    //         target_role: {
    //             title: '目标角色',
    //             search: {
    //                 disabled: true,
    //             },
    //             width: 130,
    //             form: {
    //                 component: {
    //                     name: shallowRef(tableSelector),
    //                     vModel: 'modelValue',
    //                     displayLabel: compute(({ row }) => {
    //                         if (row) {
    //                             return row.role_info;
    //                         }
    //                         return null;
    //                     }),
    //                     tableConfig: {
    //                         url: '/api/system/role/',
    //                         label: 'name',
    //                         value: 'id',
    //                         isMultiple: true,
    //                         columns: [
    //                             {
    //                                 prop: 'name',
    //                                 label: '角色名称',
    //                             },
    //                             {
    //                                 prop: 'key',
    //                                 label: '权限标识',
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 show: compute(({ form }) => {
    //                     return form.target_type === 1;
    //                 }),
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //             },
    //             column: {
    //                 show: false,
    //                 component: {
    //                     name: shallowRef(manyToMany),
    //                     vModel: 'modelValue',
    //                     bindValue: compute(({ row }) => {
    //                         return row.role_info;
    //                     }),
    //                     displayLabel: 'name',
    //                 },
    //             },
    //         },
    //         target_dept: {
    //             title: '目标部门',
    //             search: {
    //                 disabled: true,
    //             },
    //             width: 130,
    //             type: 'table-selector',
    //             form: {
    //                 component: {
    //                     name: shallowRef(tableSelector),
    //                     vModel: 'modelValue',
    //                     displayLabel: compute(({ form }) => {
    //                         return form.target_dept_name;
    //                     }),
    //                     tableConfig: {
    //                         url: '/api/system/dept/all_dept/',
    //                         label: 'name',
    //                         value: 'id',
    //                         isTree: true,
    //                         isMultiple: true,
    //                         columns: [
    //                             {
    //                                 prop: 'name',
    //                                 label: '部门名称',
    //                             },
    //                             {
    //                                 prop: 'status_label',
    //                                 label: '状态',
    //                             },
    //                             {
    //                                 prop: 'parent_name',
    //                                 label: '父级部门',
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 show: compute(({ form }) => {
    //                     return form.target_type === 2;
    //                 }),
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //             },
    //             column: {
    //                 show: false,
    //                 component: {
    //                     name: shallowRef(manyToMany),
    //                     vModel: 'modelValue',
    //                     bindValue: compute(({ row }) => {
    //                         return row.dept_info;
    //                     }),
    //                     displayLabel: 'name',
    //                 },
    //             },
    //         },
    //         content: {
    //             title: '内容',
    //             column: {
    //                 width: 300,
    //                 show: false,
    //             },
    //             type: ['editor-wang5', 'colspan'],
    //             form: {
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //                 component: {
    //                     disabled: true,
    //                     id: '1', // 当同一个页面有多个editor时，需要配置不同的id
    //                     editorConfig: {
    //                         // 是否只读
    //                         readOnly: compute((context) => {
    //                             const { mode } = context;
    //                             if (mode === 'add') {
    //                                 return false;
    //                             }
    //                             return true;
    //                         }),
    //                     },
    //                     uploader: {
    //                         type: 'form',
    //                         buildUrl(res: any) {
    //                             return res.url;
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // });

    return {
        crudOptions: {

            request: {
                pageRequest,
                addRequest,
                editRequest,
                delRequest,
            },
            actionbar: {
                buttons: {
                    add: {
                        show: computed(() => {
                            return tabActivted.value !== 'receive' && auth('messageCenter:Create');
                        })
                    },
                }
            },
            rowHandle: {
                fixed: 'right',
                width: 150,
                buttons: {
                    edit: {
                        show: false,
                    },
                    view: {
                        text: "查看",
                        type: 'text',
                        iconRight: 'View',
                        show: auth("messageCenter:Search"),
                        click({ index, row }) {
                            crudExpose.openView({ index, row });
                            if (tabActivted.value === 'receive') {
                                viewRequest({ row });
                                crudExpose.doRefresh();
                            }
                        },
                    },
                    remove: {
                        iconRight: 'Delete',
                        type: 'text',
                        show: auth('messageCenter:Delete')
                    },
                },
            },
            form: {
                formItem: {
                    labelCol: { // 演示antdv版设置label宽度 
                        style: {
                            // 配置label的宽度，并且超出部分隐藏
                            width: '100px',
                            overflow: 'hidden',
                        }
                    },
                }
            },
            columns: {
                id: {
                    title: 'id',
                    // search: {
                    //     show: true,
                    // },
                    form: {
                        show: false,
                    },
                    column: {
                        fixed: "left",
                        width: 150,
                        minWidth: 20,
                    },
                },
                concrete_strength: {
                    title: '混凝土强度',
                    search: {
                        show: true,
                    },
                    type: 'text',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: { span: 10, placeholder: '请输入混凝土强度' },
                    },
                },
                cement: {
                    title: '水泥表索引编号',
                    type: 'text',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // type: 'dict-select',
                    // column: {
                    //     show: IsReadFunc.value,
                    // },
                    // dict: dict({
                    //     data: [
                    //         { label: '已读', value: true, color: 'success' },
                    //         { label: '未读', value: false, color: 'danger' },
                    //     ],
                    // }),
                    // form: {
                    //     show: false,
                    // },
                },
                water_content: {
                    title: '水用量(kg/m3)',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // type: ['dict-radio', 'colspan'],
                    // column: {
                    //     minWidth: 120,
                    // },
                    // dict: dict({
                    //     data: [
                    //         { value: 0, label: '按用户' },
                    //         { value: 1, label: '按角色' },
                    //         {
                    //             value: 2,
                    //             label: '按部门',
                    //         },
                    //         { value: 3, label: '通知公告' },
                    //     ],
                    // }),
                    // form: {
                    //     component: {
                    //         optionName: 'el-radio-button',
                    //     },
                    //     rules: [
                    //         {
                    //             required: true,
                    //             message: '必选项',
                    //             // @ts-ignore
                    //             trigger: ['blur', 'change'],
                    //         },
                    //     ],
                    // },
                },
                water_ratio: {
                    title: '水胶比/水灰比',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // search: {
                    //     disabled: true,
                    // },
                    // form: {
                    //     component: {
                    //         name: shallowRef(tableSelector),
                    //         vModel: 'modelValue',
                    //         displayLabel: compute(({ row }) => {
                    //             if (row) {
                    //                 return row.user_info;
                    //             }
                    //             return null;
                    //         }),
                    //         tableConfig: {
                    //             url: '/api/system/user/',
                    //             label: 'name',
                    //             value: 'id',
                    //             isMultiple: true,
                    //             columns: [
                    //                 {
                    //                     prop: 'name',
                    //                     label: '用户名称',
                    //                     width: 120,
                    //                 },
                    //                 {
                    //                     prop: 'phone',
                    //                     label: '用户电话',
                    //                     width: 120,
                    //                 },
                    //             ],
                    //         },
                    //     },
                    //     show: compute(({ form }) => {
                    //         return form.target_type === 0;
                    //     }),
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    // },
                    // column: {
                    //     show: false,
                    //     component: {
                    //         name: shallowRef(manyToMany),
                    //         vModel: 'modelValue',
                    //         bindValue: compute(({ row }) => {
                    //             return row.user_info;
                    //         }),
                    //         displayLabel: 'name',
                    //     },
                    // },
                },
                water_res: {
                    title: '减水剂表索引编号',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // search: {
                    //     disabled: true,
                    // },
                    // width: 130,
                    // form: {
                    //     component: {
                    //         name: shallowRef(tableSelector),
                    //         vModel: 'modelValue',
                    //         displayLabel: compute(({ row }) => {
                    //             if (row) {
                    //                 return row.role_info;
                    //             }
                    //             return null;
                    //         }),
                    //         tableConfig: {
                    //             url: '/api/system/role/',
                    //             label: 'name',
                    //             value: 'id',
                    //             isMultiple: true,
                    //             columns: [
                    //                 {
                    //                     prop: 'name',
                    //                     label: '角色名称',
                    //                 },
                    //                 {
                    //                     prop: 'key',
                    //                     label: '权限标识',
                    //                 },
                    //             ],
                    //         },
                    //     },
                    //     show: compute(({ form }) => {
                    //         return form.target_type === 1;
                    //     }),
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    // },
                    // column: {
                    //     show: false,
                    //     component: {
                    //         name: shallowRef(manyToMany),
                    //         vModel: 'modelValue',
                    //         bindValue: compute(({ row }) => {
                    //             return row.role_info;
                    //         }),
                    //         displayLabel: 'name',
                    //     },
                    // },
                },
                ad_content: {
                    title: '外加剂用量(%)',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // search: {
                    //     disabled: true,
                    // },
                    // width: 130,
                    // type: 'table-selector',
                    // form: {
                    //     component: {
                    //         name: shallowRef(tableSelector),
                    //         vModel: 'modelValue',
                    //         displayLabel: compute(({ form }) => {
                    //             return form.target_dept_name;
                    //         }),
                    //         tableConfig: {
                    //             url: '/api/system/dept/all_dept/',
                    //             label: 'name',
                    //             value: 'id',
                    //             isTree: true,
                    //             isMultiple: true,
                    //             columns: [
                    //                 {
                    //                     prop: 'name',
                    //                     label: '部门名称',
                    //                 },
                    //                 {
                    //                     prop: 'status_label',
                    //                     label: '状态',
                    //                 },
                    //                 {
                    //                     prop: 'parent_name',
                    //                     label: '父级部门',
                    //                 },
                    //             ],
                    //         },
                    //     },
                    //     show: compute(({ form }) => {
                    //         return form.target_type === 2;
                    //     }),
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    // },
                    // column: {
                    //     show: false,
                    //     component: {
                    //         name: shallowRef(manyToMany),
                    //         vModel: 'modelValue',
                    //         bindValue: compute(({ row }) => {
                    //             return row.dept_info;
                    //         }),
                    //         displayLabel: 'name',
                    //     },
                    // },
                },
                aea: {
                    title: '引气剂表索引编号',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // column: {
                    //     width: 300,
                    //     show: false,
                    // },
                    // type: ['editor-wang5', 'colspan'],
                    // form: {
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    //     component: {
                    //         disabled: true,
                    //         id: '1', // 当同一个页面有多个editor时，需要配置不同的id
                    //         editorConfig: {
                    //             // 是否只读
                    //             readOnly: compute((context) => {
                    //                 const { mode } = context;
                    //                 if (mode === 'add') {
                    //                     return false;
                    //                 }
                    //                 return true;
                    //             }),
                    //         },
                    //         uploader: {
                    //             type: 'form',
                    //             buildUrl(res: any) {
                    //                 return res.url;
                    //             },
                    //         },
                    //     },
                    // },
                },
                gas_ratio: {
                    title: '含气量(%)',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                agregate_coarse: {
                    title: '粗骨料表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                agregate_fine: {
                    title: '细骨料表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                admixture: {
                    title: '掺合料表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                pore_characteristics: {
                    title: '孔隙特征表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, carbonization: {
                    title: '碳化表征表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, frost_resistancer: {
                    title: '抗冻性表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, impermeability: {
                    title: '氯离子抗渗性能表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, paper: {
                    title: '文献信息表索引编号',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
            },
        }
    };
};
export const createCrudOptions1 = function ({ crudExpose, tabActivted }: { crudExpose: CrudExpose; tabActivted: any }): CreateCrudOptionsTypes {
    const pageRequest = async (query: PageQuery) => {
        // if (tabActivted.value === 'receive') {
        //     return await api.GetSelfReceive(query);
        // }
        //  else if (tabActivted.value === 'send') {
        //     return await api.GetAllDatabase(query);
        // }
        // 下面把所有的if补充完整
        return await api.GetList(query);
    };
    const editRequest = async ({ form, row }: EditReq) => {
        form.id = row.id;
        return await api.UpdateObj(form);
    };
    const delRequest = async ({ row }: DelReq) => {
        return await api.DelObj(row.id);
    };
    const addRequest = async ({ form }: AddReq) => {
        return await api.AddObj(form);
    };

    const viewRequest = async ({ row }: { row: any }) => {
        return await api.GetObj(row.id);
    };

    const IsReadFunc = computed(() => {
        return tabActivted.value === 'receive';
    });

    // const crudOptions1 = ref({
    //     request: {
    //         pageRequest,
    //         addRequest,
    //         editRequest,
    //         delRequest,
    //     },
    //     actionbar: {
    //         buttons: {
    //             add: {
    //                 show: computed(() => {
    //                     return tabActivted.value !== 'receive' && auth('messageCenter:Create');
    //                 })
    //             },
    //         }
    //     },
    //     rowHandle: {
    //         fixed: 'right',
    //         width: 150,
    //         buttons: {
    //             edit: {
    //                 show: false,
    //             },
    //             view: {
    //                 text: "查看",
    //                 type: 'text',
    //                 iconRight: 'View',
    //                 show: auth("messageCenter:Search"),
    //                 click({ index, row }) {
    //                     crudExpose.openView({ index, row });
    //                     if (tabActivted.value === 'receive') {
    //                         viewRequest({ row });
    //                         crudExpose.doRefresh();
    //                     }
    //                 },
    //             },
    //             remove: {
    //                 iconRight: 'Delete',
    //                 type: 'text',
    //                 show: auth('messageCenter:Delete')
    //             },
    //         },
    //     },
    //     columns: {
    //         id: {
    //             title: 'id',
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         title: {
    //             title: '标题',
    //             search: {
    //                 show: true,
    //             },
    //             type: ['text', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             form: {
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //                 component: { span: 24, placeholder: '请输入标题' },
    //             },
    //         },
    //         is_read: {
    //             title: '是否已读',
    //             type: 'dict-select',
    //             column: {
    //                 show: IsReadFunc.value,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { label: '已读', value: true, color: 'success' },
    //                     { label: '未读', value: false, color: 'danger' },
    //                 ],
    //             }),
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         target_type: {
    //             title: '目标类型',
    //             type: ['dict-radio', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { value: 0, label: '按用户' },
    //                 ]
    //             }),
    //         },
    //     },
    // });
    // const crudOptions2 = ref({
    //     request: {
    //         pageRequest,
    //         addRequest,
    //         editRequest,
    //         delRequest,
    //     },
    //     actionbar: {
    //         buttons: {
    //             add: {
    //                 show: computed(() => {
    //                     return tabActivted.value !== 'receive' && auth('messageCenter:Create');
    //                 })
    //             },
    //         }
    //     },
    //     rowHandle: {
    //         fixed: 'right',
    //         width: 150,
    //         buttons: {
    //             edit: {
    //                 show: false,
    //             },
    //             view: {
    //                 text: "查看",
    //                 type: 'text',
    //                 iconRight: 'View',
    //                 show: auth("messageCenter:Search"),
    //                 click({ index, row }) {
    //                     crudExpose.openView({ index, row });
    //                     if (tabActivted.value === 'receive') {
    //                         viewRequest({ row });
    //                         crudExpose.doRefresh();
    //                     }
    //                 },
    //             },
    //             remove: {
    //                 iconRight: 'Delete',
    //                 type: 'text',
    //                 show: auth('messageCenter:Delete')
    //             },
    //         },
    //     },
    //     columns: {
    //         id: {
    //             title: 'id',
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         title: {
    //             title: '标题',
    //             search: {
    //                 show: true,
    //             },
    //             type: ['text', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             form: {
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //                 component: { span: 24, placeholder: '请输入标题' },
    //             },
    //         },
    //         is_read: {
    //             title: '是否已读',
    //             type: 'dict-select',
    //             column: {
    //                 show: IsReadFunc.value,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { label: '已读', value: true, color: 'success' },
    //                     { label: '未读', value: false, color: 'danger' },
    //                 ],
    //             }),
    //             form: {
    //                 show: false,
    //             },
    //         },
    //         target_type: {
    //             title: '目标类型',
    //             type: ['dict-radio', 'colspan'],
    //             column: {
    //                 minWidth: 120,
    //             },
    //             dict: dict({
    //                 data: [
    //                     { value: 0, label: '按用户' },
    //                     { value: 1, label: '按角色' },
    //                     {
    //                         value: 2,
    //                         label: '按部门',
    //                     },
    //                     { value: 3, label: '通知公告' },
    //                 ],
    //             }),
    //             form: {
    //                 component: {
    //                     optionName: 'el-radio-button',
    //                 },
    //                 rules: [
    //                     {
    //                         required: true,
    //                         message: '必选项',
    //                         // @ts-ignore
    //                         trigger: ['blur', 'change'],
    //                     },
    //                 ],
    //             },
    //         },
    //         target_user: {
    //             title: '目标用户',
    //             search: {
    //                 disabled: true,
    //             },
    //             form: {
    //                 component: {
    //                     name: shallowRef(tableSelector),
    //                     vModel: 'modelValue',
    //                     displayLabel: compute(({ row }) => {
    //                         if (row) {
    //                             return row.user_info;
    //                         }
    //                         return null;
    //                     }),
    //                     tableConfig: {
    //                         url: '/api/system/user/',
    //                         label: 'name',
    //                         value: 'id',
    //                         isMultiple: true,
    //                         columns: [
    //                             {
    //                                 prop: 'name',
    //                                 label: '用户名称',
    //                                 width: 120,
    //                             },
    //                             {
    //                                 prop: 'phone',
    //                                 label: '用户电话',
    //                                 width: 120,
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 show: compute(({ form }) => {
    //                     return form.target_type === 0;
    //                 }),
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //             },
    //             column: {
    //                 show: false,
    //                 component: {
    //                     name: shallowRef(manyToMany),
    //                     vModel: 'modelValue',
    //                     bindValue: compute(({ row }) => {
    //                         return row.user_info;
    //                     }),
    //                     displayLabel: 'name',
    //                 },
    //             },
    //         },
    //         target_role: {
    //             title: '目标角色',
    //             search: {
    //                 disabled: true,
    //             },
    //             width: 130,
    //             form: {
    //                 component: {
    //                     name: shallowRef(tableSelector),
    //                     vModel: 'modelValue',
    //                     displayLabel: compute(({ row }) => {
    //                         if (row) {
    //                             return row.role_info;
    //                         }
    //                         return null;
    //                     }),
    //                     tableConfig: {
    //                         url: '/api/system/role/',
    //                         label: 'name',
    //                         value: 'id',
    //                         isMultiple: true,
    //                         columns: [
    //                             {
    //                                 prop: 'name',
    //                                 label: '角色名称',
    //                             },
    //                             {
    //                                 prop: 'key',
    //                                 label: '权限标识',
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 show: compute(({ form }) => {
    //                     return form.target_type === 1;
    //                 }),
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //             },
    //             column: {
    //                 show: false,
    //                 component: {
    //                     name: shallowRef(manyToMany),
    //                     vModel: 'modelValue',
    //                     bindValue: compute(({ row }) => {
    //                         return row.role_info;
    //                     }),
    //                     displayLabel: 'name',
    //                 },
    //             },
    //         },
    //         target_dept: {
    //             title: '目标部门',
    //             search: {
    //                 disabled: true,
    //             },
    //             width: 130,
    //             type: 'table-selector',
    //             form: {
    //                 component: {
    //                     name: shallowRef(tableSelector),
    //                     vModel: 'modelValue',
    //                     displayLabel: compute(({ form }) => {
    //                         return form.target_dept_name;
    //                     }),
    //                     tableConfig: {
    //                         url: '/api/system/dept/all_dept/',
    //                         label: 'name',
    //                         value: 'id',
    //                         isTree: true,
    //                         isMultiple: true,
    //                         columns: [
    //                             {
    //                                 prop: 'name',
    //                                 label: '部门名称',
    //                             },
    //                             {
    //                                 prop: 'status_label',
    //                                 label: '状态',
    //                             },
    //                             {
    //                                 prop: 'parent_name',
    //                                 label: '父级部门',
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 show: compute(({ form }) => {
    //                     return form.target_type === 2;
    //                 }),
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //             },
    //             column: {
    //                 show: false,
    //                 component: {
    //                     name: shallowRef(manyToMany),
    //                     vModel: 'modelValue',
    //                     bindValue: compute(({ row }) => {
    //                         return row.dept_info;
    //                     }),
    //                     displayLabel: 'name',
    //                 },
    //             },
    //         },
    //         content: {
    //             title: '内容',
    //             column: {
    //                 width: 300,
    //                 show: false,
    //             },
    //             type: ['editor-wang5', 'colspan'],
    //             form: {
    //                 rules: [
    //                     // 表单校验规则
    //                     {
    //                         required: true,
    //                         message: '必填项',
    //                     },
    //                 ],
    //                 component: {
    //                     disabled: true,
    //                     id: '1', // 当同一个页面有多个editor时，需要配置不同的id
    //                     editorConfig: {
    //                         // 是否只读
    //                         readOnly: compute((context) => {
    //                             const { mode } = context;
    //                             if (mode === 'add') {
    //                                 return false;
    //                             }
    //                             return true;
    //                         }),
    //                     },
    //                     uploader: {
    //                         type: 'form',
    //                         buildUrl(res: any) {
    //                             return res.url;
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // });

    return {
        crudOptions: {

            request: {
                pageRequest,
                addRequest,
                editRequest,
                delRequest,
            },
            actionbar: {
                buttons: {
                    add: {
                        show: computed(() => {
                            return tabActivted.value !== 'receive' && auth('messageCenter:Create');
                        })
                    },
                }
            },
            rowHandle: {
                fixed: 'right',
                width: 150,
                buttons: {
                    edit: {
                        show: false,
                    },
                    view: {
                        text: "查看",
                        type: 'text',
                        iconRight: 'View',
                        show: auth("messageCenter:Search"),
                        click({ index, row }) {
                            crudExpose.openView({ index, row });
                            if (tabActivted.value === 'receive') {
                                viewRequest({ row });
                                crudExpose.doRefresh();
                            }
                        },
                    },
                    remove: {
                        iconRight: 'Delete',
                        type: 'text',
                        show: auth('messageCenter:Delete')
                    },
                },
            },
            form: {
                formItem: {
                    labelCol: { // 演示antdv版设置label宽度 
                        style: {
                            // 配置label的宽度，并且超出部分隐藏
                            width: '100px',
                            overflow: 'hidden',
                        }
                    },
                }
            },
            columns: {
                id: {
                    title: 'id',
                    // search: {
                    //     show: true,
                    // },
                    form: {
                        show: false,
                    },
                    column: {
                        fixed: "left",
                        width: 150,
                        minWidth: 20,
                    },
                },
                concrete_strength: {
                    title: '混凝土强度',
                    search: {
                        show: true,
                    },
                    type: ['text', 'colspan'],
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                    form: {
                        rules: [
                            // 表单校验规则
                            {
                                required: true,
                                message: '必填项',
                            },
                        ],
                        component: { span: 10, placeholder: '请输入混凝土强度' },
                    },
                },
                cement_id: {
                    title: '水泥表索引编号',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // type: 'dict-select',
                    // column: {
                    //     show: IsReadFunc.value,
                    // },
                    // dict: dict({
                    //     data: [
                    //         { label: '已读', value: true, color: 'success' },
                    //         { label: '未读', value: false, color: 'danger' },
                    //     ],
                    // }),
                    // form: {
                    //     show: false,
                    // },
                },
                water_content: {
                    title: '水用量(kg/m3)',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // type: ['dict-radio', 'colspan'],
                    // column: {
                    //     minWidth: 120,
                    // },
                    // dict: dict({
                    //     data: [
                    //         { value: 0, label: '按用户' },
                    //         { value: 1, label: '按角色' },
                    //         {
                    //             value: 2,
                    //             label: '按部门',
                    //         },
                    //         { value: 3, label: '通知公告' },
                    //     ],
                    // }),
                    // form: {
                    //     component: {
                    //         optionName: 'el-radio-button',
                    //     },
                    //     rules: [
                    //         {
                    //             required: true,
                    //             message: '必选项',
                    //             // @ts-ignore
                    //             trigger: ['blur', 'change'],
                    //         },
                    //     ],
                    // },
                },
                water_ratio: {
                    title: '水胶比/水灰比',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // search: {
                    //     disabled: true,
                    // },
                    // form: {
                    //     component: {
                    //         name: shallowRef(tableSelector),
                    //         vModel: 'modelValue',
                    //         displayLabel: compute(({ row }) => {
                    //             if (row) {
                    //                 return row.user_info;
                    //             }
                    //             return null;
                    //         }),
                    //         tableConfig: {
                    //             url: '/api/system/user/',
                    //             label: 'name',
                    //             value: 'id',
                    //             isMultiple: true,
                    //             columns: [
                    //                 {
                    //                     prop: 'name',
                    //                     label: '用户名称',
                    //                     width: 120,
                    //                 },
                    //                 {
                    //                     prop: 'phone',
                    //                     label: '用户电话',
                    //                     width: 120,
                    //                 },
                    //             ],
                    //         },
                    //     },
                    //     show: compute(({ form }) => {
                    //         return form.target_type === 0;
                    //     }),
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    // },
                    // column: {
                    //     show: false,
                    //     component: {
                    //         name: shallowRef(manyToMany),
                    //         vModel: 'modelValue',
                    //         bindValue: compute(({ row }) => {
                    //             return row.user_info;
                    //         }),
                    //         displayLabel: 'name',
                    //     },
                    // },
                },
                water_res_ID: {
                    title: '减水剂表索引编号',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // search: {
                    //     disabled: true,
                    // },
                    // width: 130,
                    // form: {
                    //     component: {
                    //         name: shallowRef(tableSelector),
                    //         vModel: 'modelValue',
                    //         displayLabel: compute(({ row }) => {
                    //             if (row) {
                    //                 return row.role_info;
                    //             }
                    //             return null;
                    //         }),
                    //         tableConfig: {
                    //             url: '/api/system/role/',
                    //             label: 'name',
                    //             value: 'id',
                    //             isMultiple: true,
                    //             columns: [
                    //                 {
                    //                     prop: 'name',
                    //                     label: '角色名称',
                    //                 },
                    //                 {
                    //                     prop: 'key',
                    //                     label: '权限标识',
                    //                 },
                    //             ],
                    //         },
                    //     },
                    //     show: compute(({ form }) => {
                    //         return form.target_type === 1;
                    //     }),
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    // },
                    // column: {
                    //     show: false,
                    //     component: {
                    //         name: shallowRef(manyToMany),
                    //         vModel: 'modelValue',
                    //         bindValue: compute(({ row }) => {
                    //             return row.role_info;
                    //         }),
                    //         displayLabel: 'name',
                    //     },
                    // },
                },
                AD_content: {
                    title: '外加剂用量(%)',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // search: {
                    //     disabled: true,
                    // },
                    // width: 130,
                    // type: 'table-selector',
                    // form: {
                    //     component: {
                    //         name: shallowRef(tableSelector),
                    //         vModel: 'modelValue',
                    //         displayLabel: compute(({ form }) => {
                    //             return form.target_dept_name;
                    //         }),
                    //         tableConfig: {
                    //             url: '/api/system/dept/all_dept/',
                    //             label: 'name',
                    //             value: 'id',
                    //             isTree: true,
                    //             isMultiple: true,
                    //             columns: [
                    //                 {
                    //                     prop: 'name',
                    //                     label: '部门名称',
                    //                 },
                    //                 {
                    //                     prop: 'status_label',
                    //                     label: '状态',
                    //                 },
                    //                 {
                    //                     prop: 'parent_name',
                    //                     label: '父级部门',
                    //                 },
                    //             ],
                    //         },
                    //     },
                    //     show: compute(({ form }) => {
                    //         return form.target_type === 2;
                    //     }),
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    // },
                    // column: {
                    //     show: false,
                    //     component: {
                    //         name: shallowRef(manyToMany),
                    //         vModel: 'modelValue',
                    //         bindValue: compute(({ row }) => {
                    //             return row.dept_info;
                    //         }),
                    //         displayLabel: 'name',
                    //     },
                    // },
                },
                AEA_ID: {
                    title: '引气剂表索引编号',
                    column: {
                        width: 150,
                        minWidth: 25,
                    },
                    // column: {
                    //     width: 300,
                    //     show: false,
                    // },
                    // type: ['editor-wang5', 'colspan'],
                    // form: {
                    //     rules: [
                    //         // 表单校验规则
                    //         {
                    //             required: true,
                    //             message: '必填项',
                    //         },
                    //     ],
                    //     component: {
                    //         disabled: true,
                    //         id: '1', // 当同一个页面有多个editor时，需要配置不同的id
                    //         editorConfig: {
                    //             // 是否只读
                    //             readOnly: compute((context) => {
                    //                 const { mode } = context;
                    //                 if (mode === 'add') {
                    //                     return false;
                    //                 }
                    //                 return true;
                    //             }),
                    //         },
                    //         uploader: {
                    //             type: 'form',
                    //             buildUrl(res: any) {
                    //                 return res.url;
                    //             },
                    //         },
                    //     },
                    // },
                },
                gas_ratio: {
                    title: '含气量(%)',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                agregate_coarse_ID: {
                    title: '粗骨料表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                agregate_fine_ID: {
                    title: '细骨料表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                admixture_ID: {
                    title: '掺合料表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
                pore_characteristics_ID: {
                    title: '孔隙特征表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, carbonization_ID: {
                    title: '碳化表征表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, frost_resistancer_ID: {
                    title: '抗冻性表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, impermeability_ID: {
                    title: '氯离子抗渗性能表索引项',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                }, paper_ID: {
                    title: '文献信息表索引编号',
                    column: {
                        width: 150,
                        minWidth: 20,
                    },
                },
            },
        }
    };
};