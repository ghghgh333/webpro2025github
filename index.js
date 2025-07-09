// Node.jsの標準ライブラリであるhttpとurlをインポートする
import http from 'node:http';
import { URL } from 'node:url';

// 環境変数 `PORT` があればそれを使い、なければ8888番ポートを使う
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // リクエストのURLをパース（解析）して、パス名やクエリパラメータを取得しやすくする
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;
  const query = requestUrl.searchParams;

  // レスポンスのヘッダーに、文字コードをUTF-8に設定する
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // URLのパスによって処理を分岐させる
  if (pathname === '/') {
    // ルートパスにアクセスされた場合
    console.log("ルートパスへのアクセスがありました。");
    res.writeHead(200); // ステータスコード200 (OK) を返す
    res.end('こんにちは！');
  } else if (pathname === '/ask') {
    // /ask パスにアクセスされた場合
    const question = query.get('q'); // クエリパラメータ 'q' の値を取得
    console.log(`質問を受け付けました: ${question}`);
    res.writeHead(200);
    res.end(`Your question is '${question}'`);
  } else {
    // その他のパスにアクセスされた場合
    console.log("不明なパスへのアクセスがありました。");
    res.writeHead(404); // ステータスコード404 (Not Found) を返す
    res.end('ページが見つかりません');
  }
});

// 指定したポートでサーバーを起動し、リクエストを待ち受ける
server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました。 http://localhost:${PORT}/ を開いて確認してください。`);
});