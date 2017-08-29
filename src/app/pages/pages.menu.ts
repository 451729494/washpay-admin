export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'lacom',
        data: {
          menu: {
            title: 'general.menu.lacom',
            icon: 'ion-wrench',
            selected: false,
            expanded: false,
            order: 150,
          }
        },
        children: [
          {
            path: 'authority',
            data: {
              menu: {
                title: '系统角色'
              }
            }
          },
          {
            path: 'user',
            data: {
              menu: {
                title: '系统用户'
              }
            }
          },
          {
            path: 'module',
            data: {
              menu: {
                title: '功能菜单'
              }
            }
          },
          {
            path: 'corpmerch',
            data: {
              menu: {
                title: '商户管理'
              }
            }
          },
          {
            path: 'third',
            data: {
              menu: {
                title: '第三方账号'
              }
            }
          },
          {
            path: 'manageversion',
            data: {
              menu: {
                title: '资源版本管理'
              }
            }
          },
          {
            path: 'userevent',
            data: {
              menu: {
                title: '系统日志'
              }
            }
          },{
            path: 'busitype',
            data: {
              menu: {
                title: 'general.menu.larecruit_busitype'
              }
            }
          }
        ]
      },
      {
        path: 'lacorp',
        data: {
          menu: {
            title: 'general.menu.lacorp',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
        children: [
          {
            path: 'corpcustomer',
            data: {
              menu: {
                title: 'general.menu.lacorp_customer'
              }
            }
          },
          {
            path: 'managerole',
            data: {
              menu: {
                title: 'general.menu.lacorp_manage'
              }
            }
          },
          {
            path: 'corpmanage',
            data: {
              menu: {
                title: '业务管理员'
              }
            }
          },
          {
            path: 'employeequery',
            data: {
              menu: {
                title: '导入员工'
              }
            }
          },
          {
            path: 'employeeapproved',
            data: {
              menu: {
                title: '员工列表'
              }
            }
          },
          {
            path: 'employeeleave',
            data: {
              menu: {
                title: '离职-申请'
              }
            }
          },
          {
            path: 'employeeleaveapply',
            data: {
              menu: {
                title: '离职-审批'
              }
            }
          },
          {
            path: 'employeeleaveapproved',
            data: {
              menu: {
                title: '离职-已离职列表'
              }
            }
          }
        ]
      },
      {
        path: 'lacheck',
        data: {
          menu: {
            title: 'general.menu.lacheck',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 256,
          }
        },
        children: [
          {
            path: 'checktype',
            data: {
              menu: {
                title: 'general.menu.lacheck_checktype'
              }
            }
          }
        ]
      },
      {
        path: 'lablog',
        data: {
          menu: {
            title: 'general.menu.lablog',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
        children: [
          {
            path: 'category',
            data: {
              menu: {
                title: 'general.menu.lablog_category'
              }
            }
          },
          {
            path: 'blog',
            data: {
              menu: {
                title: '资讯-增加'
              }
            }
          },
          {
            path: 'blogapply',
            data: {
              menu: {
                title: '资讯-审核'
              }
            }
          },
          {
            path: 'blogapproved',
            data: {
              menu: {
                title: '资讯-已发布'
              }
            }
          }
        ]
      },
      {
        path: 'larecruit',
        data: {
          menu: {
            title: 'general.menu.larecruit',
            icon: 'ion-funnel',
            selected: false,
            expanded: false,
            order: 350,
          }
        },
        children: [

          {
            path: 'recruit',
            data: {
              menu: {
                title: '招聘-创建'
              }
            }
          },
          {
            path: 'recruitapply',
            data: {
              menu: {
                title: '招聘-审核'
              }
            }
          },
          {
            path: 'recruitapproved',
            data: {
              menu: {
                title: '招聘-已发布'
              }
            }
          }
        ]
      },
      {
        path: 'laads',
        data: {
          menu: {
            title: 'general.menu.laads',
            icon: 'ion-flag',
            selected: false,
            expanded: false,
            order: 350,
          }
        },
        children: [
          {
            path: 'adspos',
            data: {
              menu: {
                title: 'general.menu.laads_adspos'
              }
            }
          },
          {
            path: 'adslink',
            data: {
              menu: {
                title: 'general.menu.laads_adslink'
              }
            }
          }
        ]
      },
      {
        path: 'lamsg',
        data: {
          menu: {
            title: '消息管理',
            icon: 'ion-flag',
            selected: false,
            expanded: false,
            order: 450,
          }
        },
        children: [
          {
            path: 'msgtemplate',
            data: {
              menu: {
                title: '消息模版'
              }
            }
          },
          {
            path: 'msgpush',
            data: {
              menu: {
                title: '创建消息'
              }
            }
          }
        ]
      },
      {
        path: 'lafinance',
        data: {
          menu: {
            title: '财务管理',
            icon: 'ion-flag',
            selected: false,
            expanded: false,
            order: 350,
          }
        },
        children: [
          {
            path: 'accountconst',
            data: {
              menu: {
                title: '财务常量'
              }
            }
          },
          {
            path: 'accountitem',
            data: {
              menu: {
                title: '财务科目'
              }
            }
          },
          {
            path: 'accountposition',
            data: {
              menu: {
                title: '薪资岗位'
              }
            }
          },
          {
            path: 'expeseinvoice',
            data: {
              menu: {
                title: '费用管理-增加'
              }
            }
          },
          {
            path: 'expeseinvoiceapply',
            data: {
              menu: {
                title: '费用管理-审核'
              }
            }
          },
          {
            path: 'expeseinvoiceapproved',
            data: {
              menu: {
                title: '费用管理-费用列表'
              }
            }
          },
          {
            path: 'borrowinvoice',
            data: {
              menu: {
                title: '预支管理-预支单'
              }
            }
          },
          {
            path: 'borrowinvoiceapply',
            data: {
              menu: {
                title: '预支管理-审核'
              }
            }
          },
          {
            path: 'borrowinvoiceapproved',
            data: {
              menu: {
                title: '费用管理-预支列表'
              }
            }
          },
          {
            path: 'depositinvoice',
            data: {
              menu: {
                title: '会员押金管理'
              }
            }
          },
          {
            path: 'salaryinvoice',
            data: {
              menu: {
                title: '工资管理-新增工资单'
              }
            }
          },
          {
            path: 'salaryinvoiceapply',
            data: {
              menu: {
                title: '工资管理-审核'
              }
            }
          },
          {
            path: 'salaryinvoiceapproved',
            data: {
              menu: {
                title: '工资管理-已审核工资单'
              }
            }
          },
          {
            path: 'employeeworkday',
            data: {
              menu: {
                title: '员工考勤'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.pages',
            icon: 'ion-navicon-round',
            selected: false,
            expanded: false,
            order: 650,
          }
        },

        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'general.menu.login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'general.menu.register'
              }
            }
          }
        ]
      },

    ]
  }
];


