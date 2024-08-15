import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
export function JPHome() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    }, []);
    return (
        <>
            <Helmet>
                <title>【Discord List】Discordサーバー掲示板｜通話が活発か一目でわかる！</title>
                <meta name="title" content="【Discord List】Discordサーバー掲示板｜通話が活発か一目でわかる！" />
                <meta name="description"
                    content="ディスコードリストは全てのdiscordユーザーのサーバー検索のお悩みを解決します。サーバーに入る前から今通話中の人数が一目で分かる掲示板サイトです。もう活発なサーバー探しに悩まなくても大丈夫！あなたがdiscordを楽しめる環境を全力でサポートする掲示板サービス、ディスコードリストです。" />
                <meta name="keywords" content="ディスコードリスト, discord, ディスコード, discord list, 掲示板" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Discord List" />
                <meta property="og:description" content="通話が活発か一目でわかる！検索したら通話人数が一覧で表示される。さっそくDiscord Listでサーバーを探しましょう♪" />
                <meta property="og:url" content="https://discordlist.kolysis.com/jp" />
            </Helmet>
            <div></div>
        </>
    );
}
