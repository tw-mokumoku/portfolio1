/*　書式
{
    translation:{
        js名:{
            関数名:{

            }
        }
    }
}
 */

function CNi18n() {
    return {
        translation: {
            headerUnion: {
                myVerticallyCenteredModal: {
                    changeLanguage: "改变语言"
                },
                headerUnion: {
                    login: "登录",
                    dashboard: "仪表板",
                    language: "语言",
                    ranking: "排行"
                }
            },
            home: {
                home: {
                    skip: "跳过",
                    next: "到下一个",
                    back: "返回",
                    last: "结尾",
                    searchBarTour: "在这里您可以搜索所需的服务器。",
                    headerLoginTour: "如果您想在 DiscordList 上发布您管理的服务器，请在此处登录。",
                    popularTour: "这里，服务器使用的标签按照受欢迎程度的顺序显示。",
                    guildCardTour: "您还可以在此处查看服务器使用的标签。",
                    guildCardDataTagTour: "此处显示重要的服务器信息。您可以查看“已更新”和“当前”连接的 VC 数量。",
                    guildCardTitleTour1: "单击此处查看有关服务器的更多详细信息。",
                    guildCardTitleTour2: "现在让我们按下亮点吧！",
                    updatedDataString: "更新：",
                    guildCardDisplayExplaination1: "目前以最新更新的顺序显示",
                    guildCardDisplayExplaination2: "如果你想以VC活跃人数顺序显示，请搜索或者点击标签"
                }
            },
            serverview: {
                serverView: {
                    serverDataMissing: "服务器信息丢失。请通过编辑仪表板输入服务器信息。",
                    failedToGetServerData: "获取服务器信息失败。请再试一次。"
                }
            },
            dashboard: {
                dashboard: {
                    dashboardTitle: "仪表板"
                }
            },
            setting: {
                setting: {
                    settingTitle: "设置"
                }
            },
            tagView: {
                tagView: {
                    currentVCConnectionNumber: "当前VC连接数",
                    tagNotFound1: "标签'",
                    tagNotFound2: "'未找到信息。",
                }
            },
            searchresult: {
                searchResult: {
                    currentVCConnectionNumber: "現在のVCの接続人数",
                    searchInfoNotFount: "没有找到匹配的信息。",
                    searchHint: "搜索提示:",
                    checkMisspelling: "・检查关键字是否有错别字或遗漏。",
                    checkOtherKeywords: "・ 尝试不同的关键字。",
                    checkMoreCommonKeywords: "・ 尝试更改为更通用的关键字。",
                    reduceKeywordsNumber: "・ 尝试减少关键字的数量。"
                }
            },
            serveredit: {
                serverEdit: {
                    doNotIncludeSpaces: "无法选择包含空格的标签。",
                    tooManyDescriptionLength1: "服务器描述限制为 5000 个字符。当前的",
                    tooManyDescriptionLength2: " 特点",
                    emptyDescription: "未输入服务器描述",
                    tooManyTag1: "标签的最大数量为 7。当前的 ",
                    tooManyTag2: " 件",
                    emptyTag: "请至少选择一个标签",
                    currentlyProcessing: "处理正在进行中。请稍等。",
                    pending: "正在保存数据...",
                    success: "保存完成",
                    error: "保存信息失败",
                    edit1: "'",
                    edit2: "' 编辑",
                    language: "语言",
                    jp: "日语",
                    us: "英语",
                    ko: "韩语",
                    cn: "中文",
                    es: "西班牙语",
                    fr: "法语",
                    tag: "标签",
                    pleaseEnterTag: "请输入标签",
                    noOptionText: "没有找到匹配的标签",
                    serverDescription: "服务器描述",
                    makeServerPublic: "发布服务器",
                    saveModification: "保存更改",
                    tooManyWordsInTag: "标签包含太多字符。请将其更改为 100 个字符以内，然后重试。"
                }
            },
            viewServerBodyUnion: {
                viewServerBody: {
                    tagTitle: "标签",
                    descriptionTitle: "概述",
                    basicInfoTitle: "基本信息",
                    dailyInfoTitle: "每日资讯",
                    weeklyInfoTitle: "每周资讯",
                    monthlyInfoTitle: "每月信息",
                    vcConnectionGraphTitle: "语音连接统计图",
                },
                basicInfo: {
                    latestUpdatedDate: "最后更新日期",
                    failedToGetData: "数据采集​​失败",
                    vcConnectionNumber: "语音聊天人数"
                },
                vcLogInfo: {
                    activeUser: "活跃用户",
                    vcConnectionNumber: "语音聊天连接数",
                    avarageConnectionTime: "平均语音聊天连接时间",
                    maxConnectionTime: "最大语音聊天连接时间",
                }
            },
            vcLogChartTabs: {
                vcLogChartTabs: {
                    daily: "每天",
                    weekly: "每周",
                    monthly: "每月",
                },
                vCLogInfo: {
                    activeUser: "活跃用户",
                    vcConnectionNumber: "语音聊天连接数",
                    avarageConnectionTime: "平均语音聊天连接时间",
                    maxConnectionTime: "最大语音聊天连接时间",
                },
                vcLogChart: {
                    dailyDataNotFound: "过去 24 小时内没有数据",
                    weeklyDataNotFound: "过去 7 天没有数据",
                    monthlyDataNotFound: "过去一个月的数据不存在",
                    connectionNumber: "连接数"
                }
            },
            bigSection: {
                bigTitle: {
                    title: "欢迎来到Discord List",
                    subtitle: "搜索服务器并寻找朋友！"
                },
                recommendPanel: {
                    dailyRanking: "每日排名",
                    weeklyRanking: "每周排名",
                    monthlyRanking: "每月排名",
                    rankText: "名",
                    clickToReadMore: "点击阅读更多",
                    featureRecommended: "注意力＆推荐"
                }
            },
            sectionUnion: {
                tagListSection: {
                    title: "热门标签列表"
                },
                dashboardUserPanel: {
                    general: "一般",
                    dashboard: "仪表板",
                    setting: "设置",
                    logout: "登出"
                }
            },
            conversion: {
                guildCard: {
                    joinServer: "加入服务器"
                }
            },
            viewServerHeaderUnion: {
                viewServerHeader: {
                    joinServer: "加入服务器"
                }
            },
            button: {
                serverPanelButtons: {
                    view: "详情",
                    edit: "编辑",
                    addToDiscord: "添加到Discord List"
                }
            },
            DateCalc: {
                timeDiff: {
                    yearAgo: "几年前",
                    yearsAgo: "几年前",
                    monthAgo: "几个月前",
                    dayAgo: "前一天",
                    daysAgo: "前一天",
                    hourAgo: "几小时前",
                    hoursAgo: "几小时前",
                    minuteAgo: "分钟前",
                    minutesAgo: "分钟前",
                    secondAgo: "几秒钟前",
                    secondsAgo: "几秒钟前",
                }
            }
        }
    };
}


export default CNi18n();