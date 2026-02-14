# DataBaseスキーマ
### テーブル名は.env.localのSUPABASE_TABLE_NAMEに格納
| Column       | Type      | Description | Allowed Values  | PK |
| ------------ | --------- | ----------- | --------------- | -- |
| id           | uuid      | レコードID      | —               | ✅  |
| sender       | text      | 送信者種別       | `user`, `other` |    |
| message_type | text      | メッセージ種別     | `text`, `image` |    |
| content      | text      | 本文またはURL    | —               |    |
| created_at   | timestamp | 作成日時        | —               |    |
