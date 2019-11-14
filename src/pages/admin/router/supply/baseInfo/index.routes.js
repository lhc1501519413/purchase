export default [
    {
        path: '/enterlist',
        name: 'enterlist',
        component: () =>
            import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/enterlist'),
        meta: {
            title: '基本信息管理',
            permission: true
        }
    },
    {
        path: '/supplierInfo',
        name: 'supplierInfo',
        component: () =>
            import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/supplierInfo'),
        meta: {
            title: '基本信息管理',
            permission: true
        },
        children: [{
                path: '/basic_info',
                name: 'basic_info',
                component: () =>
                    import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/components/baseInfo'),
                meta: {
                    title: '基本信息',
                    permission: true
                }
            },
            {
                path: '/nature_info',
                name: 'nature_info',
                component: () =>
                    import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/components/natureInfo'),
                meta: {
                    title: '基本资质',
                    permission: true
                }
            },
            {
                path: '/special_nature_info',
                name: 'special_nature_info',
                component: () =>
                    import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/components/specialNatureInfo'),
                meta: {
                    title: '特殊资质',
                    permission: true
                }
            },
            {
                path: '/credit_info',
                name: 'credit_info',
                component: () =>
                    import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/components/creditInfo'),
                meta: {
                    title: '信用信息',
                    permission: true
                }
            },
            {
                path: '/investment_info',
                name: 'investment_info',
                component: () =>
                    import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/components/investmentInfo'),
                meta: {
                    title: '出资信息',
                    permission: true
                }
            },
            {
                path: '/financial_info',
                name: 'financial_info',
                component: () =>
                    import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/components/financialInfo'),
                meta: {
                    title: '财务信息',
                    permission: true
                }
            },
            {
                path: '/people_info',
                name: 'people_info',
                component: () =>
                    import ( /*webpackChunkName:supply*/ '@admin/views/supply/baseInfoManage/components/peopleInfo'),
                meta: {
                    title: '人员信息',
                    permission: true
                }
            }
        ]
    },
]