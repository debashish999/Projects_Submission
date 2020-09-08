import sqlite3


conn = sqlite3.connect('cruddb.sqlite')
cur = conn.cursor()
cur.executescript('''

CREATE TABLE IF NOT EXISTS User(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
username TEXT,
password TEXT,
email TEXT,
mobile TEXT
);

''')
while True:
    print('1. Retriving user details')
    print('2. Insert data into the table')
    print('3. Update the data from table')
    print('4. Delete the data from table')
    print('5. Exit')

    try:
        ch = int(input('please Enter your choice: '))
    except Exception as e:
        print('please Enter numeric value')
        print('eg.-1,2...')
        continue
    if (ch == 1):
        username  = input('Enter the username: ')
        try:
            cur.execute('SELECT * FROM User WHERE username =?',(username,))
            row = cur.fetchone()
            print('Data Retriving.....')
            print(row[0],row[1],row[2],row[3])
        except:
            print('=====Failure======')
        conn.commit()
    elif (ch == 2):
        username = input('Enter the username: ')
        password  = input('Enter the password: ')
        email = input('Enter your email: ')
        mobile = input('Enter your mobile no.')
        try:
            cur.execute('INSERT INTO User(username,password,email,mobile) VALUES(?,?,?,?)',(username,password,email,mobile))
            print('Data Inserted.....')
        except:
            print('=====Failure=====')
        conn.commit()
    elif (ch == 3):
        print('a.Update the email')
        print('b.Update the mobile')
        up = input('Enter the choice a/b: ')
        if (up == 'a'):
            uh =input('Enter the email: ')
            try:
                cur.execute('UPDATE User SET email = ?',(uh,))
                print('Email is updated......')
            except:
                print('=====Failure=====')
            conn.commit()
        elif (up == 'b' ):
            uh = input('Enter the mobile: ')
            try:
                cur.execute('UPDATE User SET mobile = ?',(uh,))
                print('mobile no. is updated.....')
            except:
                print('=====Failure=====')

            conn.commit()
        else:
            print('plaese enter a/b')
            print('eg.-a or b')
            continue

    elif (ch == 4):
        us = input('Enter the username: ')
        try:
            cur.execute('DELETE FROM User WHERE username = ?',(us,))
            print(us,'details is deleted from the database')
        except:
            print('=====Failure=====')
        conn.commit()
    elif (ch ==5):
        quit()
    else:
        print('please dont give wrong inputs..')
        print('please enter eg.-1,2,3..')


cur.close()
