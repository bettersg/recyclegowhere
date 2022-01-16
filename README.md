# RecycleGoWhere

<p align="center">
    <img height="100px" src="img/recyclegowhere2.png" />
</p>

Project Page: https://better.notion.site/RecycleGoWhere-1322027374844592ad12db971a234408

## Project Introduction 

**Project Goal**: To combat inaction/apathy towards recycling, we plan to create awareness/empathy using social influence, then help consumers actively change their behaviour by making recycling convenient via a technological tool.

## How to Run this Code

### Frontend Server (client folder)

Go to `client` folder via the following command:

```sh
cd client
```

Following this, install necessary node packages:

```sh
npm install
```

Next, run a production build:

```sh
npm run build
```

Start the application:

```sh
npm start
```

### Backend Server (server folder)

Go to `server` folder via the following command:

```sh
cd server
```

If you're trying to run for the first time, enter the below command:

```sh
pip install -r requirements.txt
```

Following this, run the following commands:

```sh
python manage.py makemigrations
python manage.py migrate --run-syncdb
python manage.py runserver
```

## better.sg

This is a nonprofit volunteer-run project by better.sg.

<a href="https://better.sg/join.html">
  <img width="192.35" height="50" src="https://better.sg/wp-content/uploads/2020/12/betterwordlogo@0.5x.png" /></a>

## License

This project is licensed under the [MIT License.](LICENSE)
