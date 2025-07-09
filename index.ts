// 生成した Prisma Client をインポート
import { PrismaClient } from "./generated/prisma/client";
const prisma = new PrismaClient({
  // 実行されたクエリをログに表示する設定
  log: ['query'],
});

async function main() {
  // Prisma Client を使ってデータベースに接続
  console.log("Prisma Client を初期化しました。");

  // 現在のユーザー一覧を取得して表示
  const usersBefore = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", usersBefore);

  // 新しいユーザーを追加
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // もう一度ユーザー一覧を取得して表示
  const usersAfter = await prisma.user.findMany();
  console.log("After ユーザー一覧:", usersAfter);
}

// main 関数を実行する
main()
  .catch(e => {
    // エラーが発生した場合はメッセージを表示
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 最後に必ず Prisma Client との接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });