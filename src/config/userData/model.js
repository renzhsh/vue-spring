export default {
    // 常规设置
    General: {
        esriInitOption: {
            apiUrl: "http://static.mascj.com:81/arcgis_api/4.7/init.js",
            cssUrl: "http://static.mascj.com:81/arcgis_api/4.7/esri/css/main.css",
            modules: [
                "esri/widgets/LayerList"
            ],
            corsServers: [
                "static.mascj.com:81",
                "arcgis.mascj.com:81",
                "jx.mascj.com:81"
            ],
            infoWindow: {
                position: {
                    right: "44px",
                    top: "20px"
                }
            },
            toolKits: {
                mode: "vertical", //"vertical",horizontal
                tipDirection: "left",
                position: {
                    right: "16px",
                    top: "220px"
                },
                printOption: {
                    printUrl: "http://192.168.1.60:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
                    tipInfo: "地图仅供内部使用，严禁外泄",
                    copyrightInfo: "制图单位：马鞍山市靓马航空科技有限公司"
                },
                list: ["print", "measure", "zoom", "home"]
            },
            // 视图初始化配置
            viewOption: {
                constraints: {
                    // 禁止旋转
                    rotationEnabled: false
                }
            }
        },
        mapHost: "http://192.168.1.60:6080",
        apiHost: "http://192.168.1.50:8087",
        // logo图片 地址
        logoSrc: "/static/images/logo.png",
        // 网站名称
        siteTitle: "太白镇 控违管家",
        // 网站short icon
        siteIcon: "/static/images/favicon.ico",
        //入口菜单
        EnterOption: {
            enterMenus: [{
                    title: "控违管家",
                    url: "/kongwei/main",
                    mask: "kw"
                },
                {
                    title: "征迁管理",
                    url: "/zqian/main",
                    mask: "zq"
                },
                {
                    title: "党建之家",
                    url: "/dangjian/main",
                    mask: "dj"
                }
            ],
            enterUnit: "主办单位: 当涂县太白镇人民政府",
            enterBgImg: "/static/images/enter/ebg.png",
            enterTextImg: "/static/images/enter/text.png"
        }
    },
    // 高清数据底本
    HDConfig: {
        mapOption: {
            // 底图
            basemaps: [{
                title: "马鞍山天地图",
                tag: "basemap",
                ltype: "tile",
                url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOM/MapServer"
            }, {
                title: "无人岛影像图",
                tag: "basemap",
                ltype: "tile",
                url: "/arcgis/rest/services/YXDT/JXZ_wurendao/MapServer"
            }],
            layers: [
                // 注记层
                {
                    title: "马鞍山注记图",
                    tag: "anno",
                    ltype: "tile",
                    url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOMAnno/MapServer"
                },
                // 边界
                {
                    title: "太白镇界限",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    url: "/arcgis/rest/services/taibai/TBZ/MapServer"
                },
                {
                    title: "太白镇行政村",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["XZQMC"],
                    url: "/arcgis/rest/services/taibai/TBZXZC/MapServer/0"
                }
            ]
        },
        layers: [
            // 太白镇9月份影像图
            {
                title: "9月份新增建筑物影像图",
                tag: "hdmap",
                ltype: "tile",
                url: "/arcgis/rest/services/YXDT/JXZ_9/MapServer"
            },
            {
                //  太白镇轮廓图
                ltype: "feature",
                tag: "hdmap",
                queryEnable: true,
                searchFields: ["MC"],
                url: "/arcgis/rest/services/taibai/DTFW/MapServer/0"
            }
        ],
        // 初始定位
        initLocation: {
            // 定位时的搜索关键字
            searchWords: "江心乡",
            // 缩放等级
            zoom: 3
        }
    },
    DjianConfig: {
        mapOption: {
            // 底图
            basemaps: [{
                title: "马鞍山天地图",
                tag: "basemap",
                ltype: "tile",
                url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOM/MapServer"
            }, {
                title: "无人岛影像图",
                tag: "basemap",
                ltype: "tile",
                url: "/arcgis/rest/services/YXDT/JXZ_wurendao/MapServer"
            }],
            layers: [
                // 注记层
                {
                    title: "马鞍山注记图",
                    tag: "anno",
                    ltype: "tile",
                    url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOMAnno/MapServer"
                },
                // 边界
                {
                    title: "太白镇界限",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/TBZ/MapServer"
                },
                {
                    title: "太白镇行政村",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["XZQMC"],
                    url: "/arcgis/rest/services/taibai/TBZXZC/MapServer/0"
                },
                // 太白镇9月份影像图
                {
                    title: "9月份新增建筑物影像图",
                    tag: "dangjian",
                    ltype: "tile",
                    url: "/arcgis/rest/services/YXDT/JXZ_9/MapServer"
                },
                // 太白镇轮廓
                {
                    title: "太白镇轮廓",
                    tag: "boundary",
                    ltype: "feature",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/DTFW/MapServer/0"
                },
                // 太白镇党建矢量图
                {
                    title: "党建",
                    ltype: "feature",
                    tag: "dangjian",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/SLDT/DJ/MapServer"
                }
            ]
        },
        // 初始定位
        initLocation: {
            // 定位时的搜索关键字
            searchWords: "江心乡",
            // 缩放等级
            zoom: 2
        },
        commonCharacter: {
            contrast: "江心乡新增建筑物对比分析统计表",
            report: "江心乡控违信息"
        }
    },
    ExpandConfig: {
        mapOption: {
            // 底图
            basemaps: [{
                title: "马鞍山天地图",
                tag: "basemap",
                ltype: "tile",
                url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOM/MapServer"
            }, {
                title: "无人岛影像图",
                tag: "basemap",
                ltype: "tile",
                url: "/arcgis/rest/services/YXDT/JXZ_wurendao/MapServer"
            }],
            layers: [
                // 注记层
                {
                    title: "马鞍山注记图",
                    tag: "anno",
                    ltype: "tile",
                    url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOMAnno/MapServer"
                },
                // 边界
                {
                    title: "太白镇界限",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/TBZ/MapServer"
                },
                {
                    title: "太白镇行政村",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["XZQMC"],
                    url: "/arcgis/rest/services/taibai/TBZXZC/MapServer/0"
                },
                // 太白镇9月份影像图
                {
                    title: "9月份新增建筑物影像图",
                    tag: "dangjian",
                    ltype: "tile",
                    url: "/arcgis/rest/services/YXDT/JXZ_9/MapServer"
                },
                // 太白镇轮廓
                {
                    title: "太白镇轮廓",
                    tag: "boundary",
                    ltype: "feature",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/DTFW/MapServer/0"
                }
            ]
        },
        // 初始定位
        initLocation: {
            // 定位时的搜索关键字
            searchWords: "江心乡",
            // 缩放等级
            zoom: 1
        },
        commonCharacter: {
            contrast: "江心乡新增建筑物对比分析统计表",
            report: "江心乡控违信息"
        }
    },
    ZqianConfig: {
        mapOption: {
            // 底图
            basemaps: [{
                title: "马鞍山天地图",
                tag: "basemap",
                ltype: "tile",
                url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOM/MapServer"
            }, {
                title: "无人岛影像图",
                tag: "basemap",
                ltype: "tile",
                url: "/arcgis/rest/services/YXDT/JXZ_wurendao/MapServer"
            }],
            layers: [
                // 注记层
                {
                    title: "马鞍山注记图",
                    tag: "anno",
                    ltype: "tile",
                    url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOMAnno/MapServer"
                },
                // 边界
                {
                    title: "太白镇界限",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/TBZ/MapServer"
                },
                {
                    title: "太白镇行政村",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["XZQMC"],
                    url: "/arcgis/rest/services/taibai/TBZXZC/MapServer/0"
                },
                // 太白镇轮廓
                {
                    title: "太白镇轮廓",
                    tag: "boundary",
                    ltype: "feature",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/DTFW/MapServer/0"
                }
            ]
        },
        timeNodes: [{
                title: "征迁8月份影像图",
                time: "2018.08",
                tileLayer: {
                    title: "征迁8月份影像图",
                    ltype: "tile",
                    tag: "zqian",
                    url: "/arcgis/rest/services/YXDT/JXZ_20180605/MapServer"
                },
                featureLayer: {
                    title: "征迁8月份新增建筑物矢量图",
                    ltype: "feature",
                    tag: "zqian",
                    queryEnable: true,
                    searchFields: ["XMMC"],
                    url: "/arcgis/rest/services/SLDT/ZQSL_HWL/MapServer"
                }
            },
            {
                title: "征迁9月份新增建筑物影像图",
                time: "2018.09",
                active: true,
                tileLayer: {
                    title: "征迁9月份新增建筑物影像图",
                    ltype: "tile",
                    tag: "zqian",
                    url: "/arcgis/rest/services/YXDT/JXZ_9/MapServer"
                },
                featureLayer: {
                    title: "征迁9月份新增建筑物矢量图",
                    ltype: "feature",
                    tag: "zqian",
                    queryEnable: true,
                    searchFields: ["XMMC"],
                    url: "/arcgis/rest/services/SLDT/ZQSL_HWL/MapServer"
                }
            }
        ],
        // 初始定位
        initLocation: {
            // 定位时的搜索关键字
            searchWords: "江心乡",
            // 缩放等级
            zoom: 2
        },
        commonCharacter: {
            project: "江心乡重点项目统计表",
            report: "江心乡控违信息"
        }
    },
    // 控违
    KongweiConfig: {
        mapOption: {
            // 底图
            basemaps: [{
                title: "马鞍山天地图",
                tag: "basemap",
                ltype: "tile",
                url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOM/MapServer"
            }, {
                title: "无人岛影像图",
                tag: "basemap",
                ltype: "tile",
                url: "/arcgis/rest/services/YXDT/JXZ_wurendao/MapServer"
            }],
            layers: [
                // 注记层
                {
                    title: "马鞍山注记图",
                    tag: "anno",
                    ltype: "tile",
                    url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOMAnno/MapServer"
                },
                // 边界
                {
                    title: "太白镇界限",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/TBZ/MapServer"
                },
                {
                    title: "太白镇行政村",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["XZQMC"],
                    url: "/arcgis/rest/services/taibai/TBZXZC/MapServer/0"
                },
                // 太白镇轮廓
                {
                    title: "太白镇轮廓",
                    tag: "boundary",
                    ltype: "feature",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/DTFW/MapServer/0"
                }
            ]
        },
        timeNodes: [{
                title: "太白镇8月份新增建筑物影像图",
                time: "2018.08",
                tileLayer: {
                    title: "太白镇8月份新增建筑物影像图",
                    ltype: "tile",
                    tag: "kongwei",
                    url: "/arcgis/rest/services/YXDT/JXZ_20180605/MapServer"
                },
                featureLayer: {
                    title: "8月份新增建筑物矢量图",
                    ltype: "feature",
                    tag: "kongwei",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/SLDT/JXZ_KW201806/MapServer"
                }
            },
            {
                title: "9月份新增建筑物",
                time: "2018.09",
                active: true,
                tileLayer: {
                    title: "9月份新增建筑物影像图",
                    ltype: "tile",
                    tag: "kongwei",
                    url: "/arcgis/rest/services/YXDT/JXZ_9/MapServer"
                },
                featureLayer: {
                    title: "9月份新增建筑物矢量图",
                    ltype: "feature",
                    tag: "kongwei",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/SLDT/JXZ_KW201806/MapServer"
                }
            }
        ],
        // 初始定位
        initLocation: {
            // 定位时的搜索关键字
            searchWords: "江心乡",
            // 缩放等级
            zoom: 2
        },
        commonCharacter: {
            contrast: "江心乡新增建筑物对比分析统计表",
            report: "江心乡控违信息"
        }
    },
    // 国土
    GuotuConfig: {
        mapOption: {
            // 底图
            basemaps: [{
                title: "马鞍山天地图",
                tag: "basemap",
                ltype: "tile",
                url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOM/MapServer"
            }, {
                title: "无人岛影像图",
                tag: "basemap",
                ltype: "tile",
                url: "/arcgis/rest/services/YXDT/JXZ_wurendao/MapServer"
            }],
            layers: [
                // 注记层
                {
                    title: "马鞍山注记图",
                    tag: "anno",
                    ltype: "tile",
                    url: "http://tdtmap.mas.gov.cn/arcgis/rest/services/MASDOMAnno/MapServer"
                },
                // 边界
                {
                    title: "太白镇界限",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/TBZ/MapServer"
                },
                {
                    title: "太白镇行政村",
                    tag: "boundary",
                    ltype: "feature",
                    visible: false,
                    queryEnable: true,
                    searchFields: ["XZQMC"],
                    url: "/arcgis/rest/services/taibai/TBZXZC/MapServer/0"
                },
                // 太白镇轮廓
                {
                    title: "太白镇轮廓",
                    tag: "boundary",
                    ltype: "feature",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/taibai/DTFW/MapServer/0"
                }
            ]
        },
        timeNodes: [{
                title: "太白镇8月份新增动土影像图",
                time: "2018.08",
                tileLayer: {
                    title: "太白镇8月份新增动土影像图",
                    ltype: "tile",
                    tag: "guotu",
                    url: "/arcgis/rest/services/YXDT/JXZ_20180605/MapServer"
                },
                featureLayer: {
                    title: "8月份新增动土矢量图",
                    ltype: "feature",
                    tag: "guotu",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/SLDT/JXZ_KW201806/MapServer"
                }
            },
            {
                title: "9月份新增动土影像图",
                time: "2018.09",
                active: true,
                tileLayer: {
                    title: "9月份新增动土影像图",
                    ltype: "tile",
                    tag: "guotu",
                    url: "/arcgis/rest/services/YXDT/JXZ_9/MapServer"
                },
                featureLayer: {
                    title: "9月份新增动土矢量图",
                    ltype: "feature",
                    tag: "guotu",
                    queryEnable: true,
                    searchFields: ["MC"],
                    url: "/arcgis/rest/services/SLDT/JXZ_KW201806/MapServer"
                }
            }
        ],
        // 初始定位
        initLocation: {
            // 定位时的搜索关键字
            searchWords: "江心乡",
            // 缩放等级
            zoom: 2
        },
        commonCharacter: {
            contrast: "江心乡新增动土对比分析统计表",
            report: "江心乡国土监察信息"
        }
    },
    // 导航菜单
    NaviMenus: {
        menus: [{
                title: "主页",
                url: "/entrance"
            },
            {
                title: "高清数据底本",
                url: "/hdmap/main"
            },
            {
                title: "控违管家",
                url: "/kongwei/main",
                children: [{
                        title: "新增建筑物对比",
                        url: "/kongwei/main?sub=1",
                        sub: 1
                    },
                    {
                        title: "定点巡查",
                        url: "/kongwei/main?sub=4",
                        sub: 4
                    },
                    {
                        title: "图表分析",
                        url: "/kongwei/main?sub=2",
                        sub: 3
                    },
                    {
                        title: "排名考核",
                        url: "/kongwei/main?sub=3",
                        sub: 3
                    }
                ]
            },
            {
                title: "国土监察",
                url: "/guotu/main",
                children: [{
                        title: "新增动土对比",
                        url: "/guotu/main?sub=1",
                        sub: 1
                    },
                    {
                        title: "定点巡查",
                        url: "/guotu/main?sub=4",
                        sub: 4
                    },
                    {
                        title: "图表分析",
                        url: "/guotu/main?sub=2",
                        sub: 2
                    },
                    {
                        title: "图表分析",
                        url: "/guotu/main?sub=2",
                        sub: 3
                    }
                ]
            },
            {
                title: "征迁管理",
                url: "/zqian/main",
                children: [{
                        title: "拆迁分析",
                        url: "/zqian/main?sub=1",
                        sub: 1
                    },
                    {
                        title: "重点项目",
                        url: "/zqian/main?sub=2",
                        sub: 2
                    }
                ]
            },
            {
                title: "党建之家",
                url: "/dangjian/main"
            },
            {
                title: "更多服务",
                url: "/expand/main",
                children: [{
                    title: "产品说明",
                    url: "/expand/main?sub=1",
                    sub: 1
                }]
            },
        ]
    }
};