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
                    failedToGetServerData: "获取服务器信息失败。请再试一次。",
                    joinServer: "加入服务器",
                    serverNotPublic: "私人",
                }
            },
            dashboard: {
                dashboard: {
                    dashboardTitle: "仪表板",
                    serverContainerTour: "在这里，您将看到自己作为管理员所拥有的服务器。",
                    serverPanelButtonEditTour: "未设置初始服务器信息的服务器无法出现在 Discord 列表中。 请务必编辑服务器。",
                    serverPanelButtonViewTour: "您可以检查服务器的发布状态。 如果显示错误，则说明存在未配置的项目。 请检查服务器设置。"
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
                    jp: "日本語",
                    us: "English",
                    ko: "한국",
                    cn: "中文",
                    es: "español",
                    fr: "Français",
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
                    remain: "剩余",
                    hour: "小时",
                    minute: "分钟",
                    second: "秒",
                    ableToUp: "后可以再次更新服务器！",
                    serverUpdateSuccess: "服务器更新成功",

                    setting: "设置",
                    update: "更新服务器显示顺序",
                    addToDiscord: "添加到Discord List",
                    mightLackOfInfo: "服务器未注册或设置不足的可能性",
                    notDisplaying: "该服务器未在Discord List显示。",
                    updatingServer: "服务器正在更新。"
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
            },
            serverStepper: {
                serverStepper: {
                    addToServer: "连接服务器",
                    registerInviteURL: "注册邀请链接",
                    inputServerInfo: "输入服务器信息",
                    finalConfirmation: "最终确认",
                    botNotAddedToServer: "服务器未添加bot",
                    checkServer: "检查服务器",
                    back: "返回",
                    end: "结束",
                    next: "下一步"
                },
                step4panel: {
                    congratulations: "恭喜！您已完成Discord List的注册！",
                    checkView: "现在，让我们去查看一下您注册的服务器在Discord List上的显示情况吧！",
                    check: "查看"
                },
                step2panel: {
                    botNotAdded: "DList未添加到服务器",
                    inviteURLSettingIncomplete: "邀请链接未设置",
                    inviteURLSettingComplete: "邀请链接设置完成",
                    description1: "邀请链接是连接『Discord List』和『Discord』的桥梁。",
                    description2: "创建邀请链接后，对您的服务器感兴趣的Discord List用户就可以加入您创建邀请链接的文本频道。请按照以下步骤创建邀请链接！",
                    title1: "1. 选择服务器成员的着陆点",
                    title1Description1: "在Discord中，您可以设置用户加入服务器时首先看到的文本频道。",
                    title1Description2: "通常，最好设置一个专门的文本频道来欢迎新用户（例如，“规则”、“你好”、“欢迎”）。",
                    title2: "2. 在着陆点操作DList机器人",
                    title2Description1: "确定了着陆点后，剩下的就简单了！",
                    title2Description2: "在着陆点的聊天中，输入以“/invite”（斜杠/）开头的命令给DList机器人（Discord List机器人）。您会看到一个带有Discord List图标和/invite文字的按钮。点击它即可在着陆点创建邀请链接。",
                    title3: "3. 点击“确认”按钮",
                    check: "确认"
                },
                step1panel: {
                    botNotAdded: "DList未添加到服务器",
                    botAdded: "DList机器人注册完成",
                    description1: "要在Discord List注册Discord服务器，需要将DList机器人（Discord List机器人）添加到您打算引入Discord List的服务器。请按照以下步骤开始使用Discord List！",
                    title1: "1. 点击“添加”按钮",
                    title1Description1: "将DList机器人添加到您的服务器！",
                    title2: "2. 点击“确认”按钮",
                    title2Description1: "确认DList机器人是否已添加到您的服务器！",
                    title3: "3. DList机器人已成功引入！",
                    title3Description1: "屏幕右下角会显示“下一步”按钮。",
                    title4: "4. 点击“下一步”按钮",
                    add: "添加",
                    check: "确认"
                }
            }
        }
    };
}


export default CNi18n();