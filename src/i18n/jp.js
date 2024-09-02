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
                myVerticallyCenteredModal: {
                    changeLanguage: "言語を変更"
                },
                headerUnion: {
                    login: "ログイン",
                    dashboard: "ダッシュボード",
                    language: "言語",
                    ranking: "ランキング"
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
                    updatedDataString: "更新：",
                    guildCardDisplayExplaination1: "現在、最近の更新順で表示しています。",
                    guildCardDisplayExplaination2: "VCの人数順での表示が行う場合は検索又はタグをクリックしてください。"
                }
            },
            serverview: {
                serverView: {
                    serverDataMissing: "サーバー情報が不足しています。ダッシュボードの編集からサーバー情報を入力してください。",
                    failedToGetServerData: "サーバー情報の取得に失敗しました。再度お試しください。",
                    joinServer: "サーバーに参加"
                }
            },
            dashboard: {
                dashboard: {
                    dashboardTitle: "ダッシュボード",
                    serverContainerTour: "ここにはあなたが管理者として所有しているサーバーが表示されます。",
                    serverPanelButtonEditTour: "サーバーの初期情報が設定されていないサーバーはDiscord Listに表示することができません。必ずサーバーの編集を行ってください。",
                    serverPanelButtonViewTour: "サーバーの掲示状態を確認することができます。エラーが表示された場合は未設定項目が存在します。サーバー設定の見直しを行ってください。"
                }
            },
            setting: {
                setting: {
                    settingTitle: "設定"
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
                    us: "English",
                    ko: "한국",
                    cn: "中文",
                    es: "español",
                    fr: "Français",
                    tag: "タグ",
                    pleaseEnterTag: "タグを入力してください",
                    noOptionText: "該当するタグが見つかりませんでした",
                    serverDescription: "サーバー説明",
                    makeServerPublic: "サーバーを公開する",
                    saveModification: "変更を保存する",
                    tooManyWordsInTag: "タグの文字数が多すぎます。100文字以内に変更して再度お試しください。"
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
                },
                recommendPanel: {
                    dailyRanking: "日間ランキング",
                    weeklyRanking: "週間ランキング",
                    monthlyRanking: "月間ランキング",
                    rankText: "位",
                    clickToReadMore: "続きをクリックして読む",
                    featureRecommended: "注目＆おすすめ"
                }
            },
            sectionUnion: {
                tagListSection: {
                    title: "人気タグ一覧"
                },
                dashboardUserPanel: {
                    general: "全般",
                    profile: "プロフィール",
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
                    remain: "残り",
                    hour: "時間",
                    minute: "分",
                    second: "秒",
                    ableToUp: "で再度サーバーを更新できるようになります！",
                    serverUpdateSuccess: "サーバー更新成功",

                    setting: "設定",
                    update: "サーバーの表示順を更新",
                    addToDiscord: "Discord Listに追加",
                    mightLackOfInfo: "サーバー未登録 or 設定不足の可能性",
                    notDisplaying: "このサーバーは Discord List に表示されていません。",
                    updatingServer: "サーバー更新中"
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
            },
            serverStepper: {
                serverStepper: {
                    addToServer: "サーバーに接続",
                    registerInviteURL: "招待URLを登録",
                    inputServerInfo: "サーバー情報を入力",
                    finalConfirmation: "最終確認",
                    botNotAddedToServer: "サーバーにbotが追加されていません。",
                    checkServer: "サーバーを確認する",
                    back: "戻る",
                    end: "終了",
                    next: "次へ"
                },
                step4panel: {
                    congratulations: "おめでとうございます！これで Discord List の登録に必要な手順は全て完了です！",
                    checkView: "それではさっそく、登録したサーバーが Discord Listでどう表示されているのかを確認しに行きましょう♪",
                    check: "確認"
                },
                step2panel: {
                    botNotAdded: "DListがサーバーに追加されていません。",
                    inviteURLSettingIncomplete: "招待リンクが設定されていません。",
                    inviteURLSettingComplete: "招待リンクの設定完了",
                    description1: "招待リンクとは、「Discord List」と「Discord」を繋ぐパイプのようなものです。",
                    description2: "招待リンクを作成すると、Discord Listであなたのサーバーに興味を持った人が招待リンクを作成した場所（テキストチャンネル）に参加できるようになります。以下の手順で招待リンクを作成してみましょう！",
                    title1: "１．サーバー参加者の着地点を選ぼう",
                    title1Description1: "Discordでは、ユーザーがサーバーに参加して初めに目にするテキストチャンネルを設定することができます。",
                    title1Description2: "通常これは（ルール、初めまして、いらっしゃい）などの新規ユーザーを歓迎する為の専用テキストチャンネルに設定するのが良いでしょう。",
                    title2: "２．着地点でDListボットを操作しよう",
                    title2Description1: "新規ユーザーの着地点が決まれば後は簡単！",
                    title2Description2: "DListボット(Discord Listボット)を着地点のチャットに /invite という（スラッシュ /） から始まるコマンドを入力すると、Discord Listのアイコンと/inviteという文字のセットでボタンが表示されます。これをクリックすると、着地点に招待リンクを作成することができます。",
                    title3: "３．「確認」ボタンをクリック",
                    check: "確認"
                },
                step1panel: {
                    botNotAdded: "DListがサーバーに追加されていません。",
                    botAdded: "DListボット登録完了",
                    description1: "Discord ListにDiscordサーバーを登録する場合、DListボット(Discord Listボット)をDiscord List導入予定のサーバーに追加する必要があります。以下の手順でDiscord Listデビューしてみましょう！",
                    title1: "１．「追加」ボタンをクリック",
                    title1Description1: "サーバーにDListボットを追加しましょう！",
                    title2: "２．「確認」ボタンをクリック",
                    title2Description1: "サーバーにDListボットが追加されたか確認しましょう！",
                    title3: "３．DListボットの導入に成功！",
                    title3Description1: "画面右下に「次へ」ボタンが表示されます。",
                    title4: "４．「次へ」ボタンをクリック",
                    add: "追加",
                    check: "確認",
                }
            }
        }
    };
}


export default JPi18n();