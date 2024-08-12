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

function JPi18n() {
    return {
        translation: {
            headerUnion: {
                headerUnion: {
                    login: "ログイン"
                }
            },
            home: {
                home: {
                    skip: "スキップ",
                    next: "次へ",
                    back: "戻る",
                    last: "終了",
                    searchBarTour: "ここでは目的のサーバーを検索することができます。",
                    headerLoginTour: "管理しているサーバーをDiscordListに掲示する場合はここでログインしてください。",
                    popularTour: "ここではサーバーに使われているタグが人気順で表示されています。",
                    guildCardTour: "ここでもサーバーに使われているタグが見れます。",
                    guildCardDataTagTour: "ここはサーバーの重要な情報が表示されています。「更新」や「現在」のVCの接続人数が見れます。",
                    guildCardTitleTour1: "ここクリックするとサーバーのより詳細な情報が表示されます。",
                    guildCardTitleTour2: "さっそくハイライトを押してみましょう！",
                    updatedDataString: "更新："
                }
            },
            serverview: {
                serverView: {
                    serverDataMissing: "サーバー情報が不足しています。ダッシュボードの編集からサーバー情報を入力してください。",
                    failedToGetServerData: "サーバー情報の取得に失敗しました。再度お試しください。"
                }
            },
            dashboard: {
                dashboard: {
                    discordServer: "ディスコード サーバー"
                }
            },
            tagView: {
                tagView: {
                    currentVCConnectionNumber: "現在のVCの接続人数",
                    tagNotFound1: "タグ「",
                    tagNotFound2: "」の情報が見つかりませんでした。",
                }
            },
            searchresult: {
                searchResult: {
                    currentVCConnectionNumber: "現在のVCの接続人数",
                    searchInfoNotFount: "に一致する情報は見つかりませんでした。",
                    searchHint: "検索のヒント:",
                    checkMisspelling: "・ キーワードに誤字・脱字がないか確認します。",
                    checkOtherKeywords: "・ 別のキーワードを試してみます。",
                    checkMoreCommonKeywords: "・ もっと一般的なキーワードに変えてみます。",
                    reduceKeywordsNumber: "・ キーワードの数を減らしてみます。"
                }
            },
            serveredit: {
                serverEdit: {
                    doNotIncludeSpaces: "スペースを含むタグは選択できません。",
                    tooManyDescriptionLength1: "サーバー説明上限は5000文字です。現在 ",
                    tooManyDescriptionLength2: " 文字",
                    emptyDescription: "サーバー説明が未入力です",
                    tooManyTag1: "タグ数の上限は7個です。現在 ",
                    tooManyTag2: " 個",
                    emptyTag: "タグを最低１つ選択してください",
                    currentlyProcessing: "処理を実行中です。少々お待ちください。",
                    pending: "データを保存しています...",
                    success: "保存が完了しました",
                    error: "情報の保存に失敗しました",
                    edit1: "「",
                    edit2: "」 編集",
                    language: "言語",
                    jp: "日本語",
                    us: "英語",
                    tag: "タグ",
                    pleaseEnterTag: "タグを入力してください",
                    noOptionText: "該当するタグが見つかりませんでした",
                    serverDescription: "サーバー説明",
                    makeServerPublic: "サーバーを公開する",
                    saveModification: "変更を保存する"
                }
            },
            viewServerBodyUnion: {
                viewServerBody: {
                    tagTitle: "タグ",
                    descriptionTitle: "概要",
                    basicInfoTitle: "基本情報",
                    dailyInfoTitle: "日間情報",
                    weeklyInfoTitle: "週間情報",
                    monthlyInfoTitle: "月間情報",
                    vcConnectionGraphTitle: "VC 接続グラフ",
                },
                basicInfo: {
                    latestUpdatedDate: "最終更新日",
                    failedToGetData: "データ取得失敗",
                    vcConnectionNumber: "VC人数"
                },
                vcLogInfo: {
                    activeUser: "アクティブユーザー",
                    vcConnectionNumber: "VC接続回数",
                    avarageConnectionTime: "平均VC接続時間",
                    maxConnectionTime: "最高VC接続時間",
                }
            },
            vcLogChartTabs: {
                vcLogChartTabs: {
                    daily: "日間",
                    weekly: "週間",
                    monthly: "月間",
                },
                vCLogInfo: {
                    activeUser: "アクティブユーザー",
                    vcConnectionNumber: "VC接続回数",
                    avarageConnectionTime: "平均VC接続時間",
                    maxConnectionTime: "最高VC接続時間",
                },
                vcLogChart: {
                    dailyDataNotFound: "直近24時間のデータが存在しません",
                    weeklyDataNotFound: "直近7日間のデータが存在しません",
                    monthlyDataNotFound: "直近1カ月間のデータが存在しません",
                    connectionNumber: "接続数"
                }
            },
            bigSection: {
                bigTitle: {
                    title: "Discord Listへようこそ",
                    subtitle: "サーバーを検索して友達を見つけましょう！"
                }
            },
            sectionUnion: {
                tagListSection: {
                    title: "人気タグ一覧"
                },
                dashboardUserPanel: {
                    general: "全般",
                    dashboard: "ダッシュボード",
                    setting: "設定",
                    logout: "ログアウト"
                }
            },
            conversion: {
                guildCard: {
                    joinServer: "サーバーに参加する"
                }
            },
            viewServerHeaderUnion: {
                viewServerHeader: {
                    joinServer: "サーバーに参加"
                }
            },
            button: {
                serverPanelButtons: {
                    view: "表示",
                    edit: "編集",
                    addToDiscord: "ディスコードに追加"
                }
            },
            DateCalc: {
                timeDiff: {
                    yearAgo: "年前",
                    yearsAgo: "年前",
                    monthAgo: "ヶ月前",
                    dayAgo: "日前",
                    daysAgo: "日前",
                    hourAgo: "時間前",
                    hoursAgo: "時間前",
                    minuteAgo: "分前",
                    minutesAgo: "分前",
                    secondAgo: "秒前",
                    secondsAgo: "秒前",
                }
            }
        }
    };
}


export default JPi18n();