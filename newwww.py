import sqlite3

conn = sqlite3.connect('db.sqlite3')
cur = conn.cursor()

# Grab id, username, and the encrypted password string
cur.execute("SELECT id, username, password FROM auth_user;")

rows = cur.fetchall()
for row in rows:
    print(f"User ID: {row[0]} | Username: {row[1]}")
    print(f"Hashed Password: {row[2]}\n")