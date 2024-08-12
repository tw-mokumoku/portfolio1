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
                    updatedDataString: "更新："
                }
            },
            dashboard: {
                dashboard: {
                    discordServer: "ディスコード サーバー"
                }
            },
            serveredit: {
                serverEdit: {
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
                    edit: "編集",
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
            }
        }
    };
}


export default JPi18n();