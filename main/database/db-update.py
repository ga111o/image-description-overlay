import sqlite3

conn = sqlite3.connect('./images.db')
cursor = conn.cursor()

# 이미지 이름별로 original_alt가 있는 행과 없는 행 찾기
sql = """
    SELECT image_name, original_alt
    FROM images
    WHERE original_alt IS NOT NULL
"""
cursor.execute(sql)
rows_with_original_alt = cursor.fetchall()

sql = """
    SELECT image_name, original_alt
    FROM images
    WHERE original_alt IS NULL
"""
cursor.execute(sql)
rows_without_original_alt = cursor.fetchall()

# 이미지 이름별로 original_alt 복사
for image_name, original_alt in rows_with_original_alt:
    for row in rows_without_original_alt:
        if row[0] == image_name:
            sql = """
                UPDATE images
                SET original_alt = %s
                WHERE image_name = %s AND original_alt IS NULL
            """
            cursor.execute(sql, (original_alt, image_name))
            conn.commit()

# 데이터베이스 연결 종료
conn.close()
